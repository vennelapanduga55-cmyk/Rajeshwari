import { PortfolioData } from '../types/portfolio';

/**
 * Deterministic, zero-hallucination resume text parser.
 * Extracts only information explicitly present in the user's pasted resume text.
 * Never invents skills, achievements, experience, or links.
 */
export function parsePlainTextResume(rawText: string, currentData: PortfolioData): PortfolioData {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return currentData;

  const updated: PortfolioData = JSON.parse(JSON.stringify(currentData));

  // Extract email if present
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    updated.hero.email = emailMatch[0];
  }

  // Extract actual URLs only if explicitly present
  const linkedinMatch = rawText.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s,;)]+/i);
  if (linkedinMatch) updated.hero.linkedin = linkedinMatch[0];

  const githubMatch = rawText.match(/https?:\/\/(www\.)?github\.com\/[^\s,;)]+/i);
  if (githubMatch) updated.hero.github = githubMatch[0];

  const kaggleMatch = rawText.match(/https?:\/\/(www\.)?kaggle\.com\/[^\s,;)]+/i);
  if (kaggleMatch) updated.hero.kaggle = kaggleMatch[0];

  // Group lines by recognizable section headings
  type SectionKey =
    | 'header'
    | 'summary'
    | 'skills'
    | 'projects'
    | 'experience'
    | 'education'
    | 'certifications'
    | 'achievements';

  const sections: Record<SectionKey, string[]> = {
    header: [],
    summary: [],
    skills: [],
    projects: [],
    experience: [],
    education: [],
    certifications: [],
    achievements: [],
  };

  let currentSection: SectionKey = 'header';

  const headingPatterns: { key: SectionKey; regex: RegExp }[] = [
    {
      key: 'summary',
      regex: /^(summary|about\s*me|profile|objective|professional\s*summary|career\s*objective)\s*:?$/i,
    },
    {
      key: 'skills',
      regex: /^(technical\s*skills|skills|core\s*competencies|technologies)\s*:?$/i,
    },
    {
      key: 'projects',
      regex: /^(projects|academic\s*projects|personal\s*projects|key\s*projects)\s*:?$/i,
    },
    {
      key: 'experience',
      regex: /^(experience|work\s*experience|internships?|professional\s*experience|employment)\s*:?$/i,
    },
    {
      key: 'education',
      regex: /^(education|academic\s*background|academics|qualifications)\s*:?$/i,
    },
    {
      key: 'certifications',
      regex: /^(certifications?|licenses?\s*&?\s*certifications?|courses|training)\s*:?$/i,
    },
    {
      key: 'achievements',
      regex: /^(achievements?|activities|hackathons?|extracurriculars?|honors?\s*&?\s*awards?|awards)\s*:?$/i,
    },
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const cleanHeading = line.replace(/^[#*\-\d.)\s]+/, '').trim();
    const matchedHeading = headingPatterns.find((h) => h.regex.test(cleanHeading));

    if (matchedHeading) {
      currentSection = matchedHeading.key;
      continue;
    }

    sections[currentSection].push(line);
  }

  // Summary / About
  if (sections.summary.length > 0) {
    updated.about.summaryParagraphs = sections.summary;
  }

  // Skills parsing if skills section exists
  if (sections.skills.length > 0) {
    const parsedSkills = {
      programming: [] as string[],
      dataScienceAiMl: [] as string[],
      webOther: [] as string[],
      tools: [] as string[],
    };

    const splitItems = (str: string) =>
      str
        .split(/[,|•·/]/)
        .map((s) => s.replace(/^[-*•]\s*/, '').trim())
        .filter(Boolean);

    for (const line of sections.skills) {
      const lower = line.toLowerCase();
      const colonIdx = line.indexOf(':');
      const content = colonIdx !== -1 ? line.slice(colonIdx + 1) : line;
      const items = splitItems(content);

      if (lower.includes('programming') || lower.includes('language')) {
        parsedSkills.programming.push(...items);
      } else if (
        lower.includes('data') ||
        lower.includes('ai') ||
        lower.includes('ml') ||
        lower.includes('machine')
      ) {
        parsedSkills.dataScienceAiMl.push(...items);
      } else if (lower.includes('web') || lower.includes('other') || lower.includes('frontend')) {
        parsedSkills.webOther.push(...items);
      } else if (lower.includes('tool') || lower.includes('platform') || lower.includes('ide')) {
        parsedSkills.tools.push(...items);
      } else {
        parsedSkills.programming.push(...items);
      }
    }

    updated.skills = parsedSkills;
  }

  // Certifications parsing if present
  if (sections.certifications.length > 0) {
    updated.certifications = sections.certifications.map((line, idx) => {
      const clean = line.replace(/^[-*•\d.)]+\s*/, '').trim();
      const parts = clean.split(/\s*[—–-]\s*|\s*\|\s*/);
      return {
        id: `cert-parsed-${idx + 1}`,
        title: parts[0] || clean,
        issuer: parts[1] || '',
        date: parts[2] || '',
        credentialUrl: '',
      };
    });
  }

  // Achievements / Hackathon parsing if present
  if (sections.achievements.length > 0) {
    updated.achievements = sections.achievements.map((line, idx) => {
      const clean = line.replace(/^[-*•\d.)]+\s*/, '').trim();
      return {
        id: `ach-parsed-${idx + 1}`,
        title: clean.length > 65 ? `${clean.slice(0, 62)}...` : clean,
        organizationOrEvent: '',
        date: '',
        description: clean,
      };
    });
  }

  return updated;
}

export function generateResumeDataTsFile(data: PortfolioData): string {
  const serialized = JSON.stringify(data, null, 2);
  return `import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = ${serialized};
`;
}
