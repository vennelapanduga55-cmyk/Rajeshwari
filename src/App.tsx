/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/resumeData';
import { PortfolioData } from './types/portfolio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ResumeEditorModal } from './components/ResumeEditorModal';

const STORAGE_KEY = 'vennela_portfolio_resume_data_v2';
const LEGACY_STORAGE_KEY = 'vennela_portfolio_resume_data_v1';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as PortfolioData;
      }
    } catch {
      // Ignore storage access errors
    }
    return initialPortfolioData;
  });

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
    } catch {
      // Ignore storage quota errors
    }
  }, [portfolioData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeModalOpen(false);
        setIsEditorModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdatePhoto = (dataUrl: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        profilePhotoUrl: dataUrl,
      },
    }));
  };

  const handleUploadResumePdf = (dataUrl: string, fileName: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        resumePdfUrl: dataUrl,
        resumeFileName: fileName,
      },
    }));
  };

  const handleResetDefault = () => {
    setPortfolioData(initialPortfolioData);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-stone-900">
      <Navbar
        name={portfolioData.hero.name}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenEditorModal={() => setIsEditorModalOpen(true)}
      />

      <main className="flex-1">
        <Hero
          hero={portfolioData.hero}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onUpdatePhoto={handleUpdatePhoto}
        />

        <AboutSection
          about={portfolioData.about}
          hero={portfolioData.hero}
        />

        <SkillsSection skills={portfolioData.skills} />

        <ProjectsSection
          projects={portfolioData.projects}
          onOpenEditorModal={() => setIsEditorModalOpen(true)}
        />

        <ExperienceSection
          experience={portfolioData.experience}
          fallbackNote={portfolioData.experienceFallbackNote}
        />

        <EducationSection education={portfolioData.education} />

        {/* Certifications and Achievements only render if actual entries exist */}
        <CertificationsSection certifications={portfolioData.certifications} />

        <AchievementsSection achievements={portfolioData.achievements} />

        <ContactSection hero={portfolioData.hero} />
      </main>

      <Footer
        hero={portfolioData.hero}
        onOpenEditorModal={() => setIsEditorModalOpen(true)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        data={portfolioData}
        onUploadResumePdf={handleUploadResumePdf}
      />

      <ResumeEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        data={portfolioData}
        onSaveData={(updated) => setPortfolioData(updated)}
        onResetDefault={handleResetDefault}
      />
    </div>
  );
}
