import React, { useState } from 'react';
import { SkillCategories } from '../types/portfolio';

interface SkillsSectionProps {
  skills: SkillCategories;
}

type SkillCategoryFilter =
  | 'all'
  | 'programming'
  | 'dataScienceAiMl'
  | 'webOther'
  | 'tools';

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [activeFilter, setActiveFilter] = useState<SkillCategoryFilter>('all');

  const categoryConfig: {
    key: Exclude<SkillCategoryFilter, 'all'>;
    label: string;
    shortLabel: string;
    note: string;
    items: string[];
  }[] = [
    {
      key: 'programming',
      label: 'Programming',
      shortLabel: 'Programming',
      note: 'Core programming languages and query foundations',
      items: skills.programming || [],
    },
    {
      key: 'dataScienceAiMl',
      label: 'Data Science / AI & ML',
      shortLabel: 'Data Science / AI & ML',
      note: 'Foundational concepts and Python data libraries currently practiced',
      items: skills.dataScienceAiMl || [],
    },
    {
      key: 'webOther',
      label: 'Web / Other',
      shortLabel: 'Web / Other',
      note: 'Web fundamentals',
      items: skills.webOther || [],
    },
    {
      key: 'tools',
      label: 'Tools',
      shortLabel: 'Tools',
      note: 'Development environments, notebooks, and version control',
      items: skills.tools || [],
    },
  ].filter((cat) => cat.items.length > 0);

  if (categoryConfig.length === 0) return null;

  const visibleCategories =
    activeFilter === 'all'
      ? categoryConfig
      : categoryConfig.filter((c) => c.key === activeFilter);

  return (
    <section id="skills" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              02. Technical Skills
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Technologies and tools I know or am currently learning as a 2nd-year B.Tech Data Science student
            </p>
          </div>

          {/* Interactive Segmented Filter Control */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All
            </button>
            {categoryConfig.map((cat) => (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={activeFilter === cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === cat.key
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Unboxed Skill Rows */}
        <div className="bg-white border border-stone-200/90 rounded-2xl divide-y divide-stone-200/80">
          {visibleCategories.map((category) => (
            <div
              key={category.key}
              className="p-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline"
            >
              <div className="md:col-span-4">
                <h3 className="text-sm font-semibold text-stone-900">
                  {category.label}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{category.note}</p>
              </div>

              <div className="md:col-span-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone-700 leading-relaxed">
                {category.items.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <span className="font-medium text-stone-800">{skill}</span>
                    {idx < category.items.length - 1 && (
                      <span aria-hidden="true" className="text-stone-400 select-none">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
