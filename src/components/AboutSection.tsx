import React from 'react';
import { PortfolioData } from '../types/portfolio';

interface AboutSectionProps {
  about: PortfolioData['about'];
  hero: PortfolioData['hero'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about, hero }) => {
  const hasSummary = about.summaryParagraphs && about.summaryParagraphs.length > 0;

  if (!hasSummary) return null;

  return (
    <section id="about" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Section Title */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              01. About Me
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Academic focus and learning path
            </p>
          </div>

          {/* Section Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4 text-base text-stone-700 leading-relaxed max-w-[68ch]">
              {about.summaryParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-stone-600">
              <span>Status: {hero.currentStatus || '2nd-year B.Tech student'}</span>
              <span aria-hidden="true" className="text-stone-300">
                ·
              </span>
              <span>Branch: {hero.branch || 'Data Science'}</span>
              {hero.location && (
                <>
                  <span aria-hidden="true" className="text-stone-300">
                    ·
                  </span>
                  <span>Location: {hero.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
