export interface SkillCategories {
  programming: string[];
  dataScienceAiMl: string[];
  webOther: string[];
  tools: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  shortDescription: string;
  technologies: string[];
  roleContribution: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  status: string;
  institution?: string;
  duration?: string;
  scoreOrGpa?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organizationOrEvent?: string;
  date?: string;
  description: string;
}

export interface PortfolioData {
  hero: {
    name: string;
    currentStatus: string;
    branch: string;
    headline: string;
    shortIntroduction: string;
    profilePhotoUrl?: string;
    resumePdfUrl?: string;
    resumeFileName?: string;
    linkedin: string;
    github: string;
    kaggle: string;
    email: string;
    location: string;
  };
  about: {
    summaryParagraphs: string[];
  };
  skills: SkillCategories;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  experienceFallbackNote: string;
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
}
