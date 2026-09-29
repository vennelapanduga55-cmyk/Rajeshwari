import React from 'react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  fallbackNote: string;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  fallbackNote,
}) => {
  const hasFormalExperience = Boolean(experience && experience.length > 0);

  return (
    <section id="experience" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              04. Experience
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Practical learning and technical development
            </p>
          </div>

          <div className="lg:col-span-8">
            {!hasFormalExperience ? (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8">
                <p className="text-base text-stone-700 leading-relaxed">
                  {fallbackNote ||
                    'Currently building experience through academic projects, hackathons, technical learning, and self-directed practice.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {experience.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200/70 pb-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-stone-900">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-stone-600 mt-0.5">
                          {item.organization}
                        </p>
                      </div>
                      {item.duration && (
                        <span className="text-xs font-mono text-stone-500 whitespace-nowrap">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    {item.responsibilities && item.responsibilities.length > 0 && (
                      <ul className="space-y-2 text-sm text-stone-700 list-disc pl-4 leading-relaxed">
                        {item.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
