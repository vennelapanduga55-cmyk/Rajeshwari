import { PortfolioData } from '../types/portfolio';

/**
 * Portfolio Data Configuration — Vennela Panduga
 *
 * Contains ONLY verified personal, academic, and skill information.
 * Zero invented projects, internships, certifications, achievements, or fake URLs.
 */
export const initialPortfolioData: PortfolioData = {
  hero: {
    name: 'Vennela Panduga',
    currentStatus: '2nd-year B.Tech student',
    branch: 'Data Science',
    headline: 'B.Tech Data Science Student | Aspiring Data Scientist | AI/ML Enthusiast',
    shortIntroduction:
      'I am a second-year B.Tech Data Science student with a growing foundation in Python, programming, data structures, databases, and machine learning. I am interested in Data Science, Artificial Intelligence, and Machine Learning, and I enjoy learning new technologies and building my technical skills.',
    profilePhotoUrl: '',
    resumePdfUrl: '',
    resumeFileName: 'Vennela_Panduga_Resume.pdf',
    linkedin: '',
    github: '',
    kaggle: '',
    email: 'vennelapanduga55@gmail.com',
    location: 'India',
  },
  about: {
    summaryParagraphs: [
      'I am a second-year B.Tech student specializing in Data Science. I have a foundation in Python, programming concepts, data structures, databases, and basic machine learning concepts. I am continuously improving my technical and communication skills while exploring Artificial Intelligence, Machine Learning, and other emerging technologies.',
      'I am interested in applying what I learn through academic work, projects, hackathons, and practical learning experiences. My goal is to strengthen my skills in Data Science and AI/ML and gradually become a strong technology professional.',
    ],
  },
  skills: {
    programming: ['Python', 'C', 'Java', 'SQL'],
    dataScienceAiMl: [
      'Data Analysis',
      'Machine Learning Basics',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Scikit-learn',
    ],
    webOther: ['HTML', 'CSS', 'JavaScript'],
    tools: [
      'Git',
      'GitHub',
      'VS Code',
      'Jupyter Notebook',
      'Google Colab',
      'Kaggle',
    ],
  },
  projects: [],
  experience: [],
  experienceFallbackNote:
    'Currently building experience through academic projects, hackathons, technical learning, and self-directed practice.',
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech – Data Science',
      status: 'Currently in 2nd Year',
      institution: '',
      duration: '',
      scoreOrGpa: '',
    },
  ],
  certifications: [],
  achievements: [],
};
