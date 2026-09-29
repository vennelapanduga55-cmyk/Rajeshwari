import React from 'react';
import { EducationItem } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              05. Education
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Current degree program and academic standing
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {education.map((edu) => (
              <article
                key={edu.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-semibold text-stone-900">
                      {edu.degree}
                    </h3>
                    {edu.status && (
                      <p className="text-sm font-medium text-stone-600">
                        {edu.status}
                      </p>
                    )}
                    {edu.institution && edu.institution.trim() !== '' && (
                      <p className="text-sm text-stone-500">{edu.institution}</p>
                    )}
                  </div>

                  {(edu.duration || edu.scoreOrGpa) && (
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500 whitespace-nowrap">
                      {edu.duration && <span>{edu.duration}</span>}
                      {edu.duration && edu.scoreOrGpa && (
                        <span aria-hidden="true">·</span>
                      )}
                      {edu.scoreOrGpa && <span>{edu.scoreOrGpa}</span>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
