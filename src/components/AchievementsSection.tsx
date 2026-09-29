import React from 'react';
import { AchievementItem } from '../types/portfolio';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
}) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              07. Achievements & Activities
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Academic involvement, technical practice, and community participation
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-stone-200/90 rounded-2xl divide-y divide-stone-200/80">
              {achievements.map((item) => (
                <div key={item.id} className="p-6 sm:px-8 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-base font-semibold text-stone-900">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 whitespace-nowrap">
                      {item.organizationOrEvent && <span>{item.organizationOrEvent}</span>}
                      {item.organizationOrEvent && item.date && (
                        <span aria-hidden="true">·</span>
                      )}
                      {item.date && <span className="font-mono">{item.date}</span>}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
