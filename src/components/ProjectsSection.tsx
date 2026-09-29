import React from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onOpenEditorModal: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onOpenEditorModal,
}) => {
  const hasProjects = Boolean(projects && projects.length > 0);

  return (
    <section id="projects" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Section Header */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              03. Projects
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Academic and practical projects from my resume
            </p>
          </div>

          {/* Section Body */}
          <div className="lg:col-span-8">
            {!hasProjects ? (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-stone-800">
                    Currently developing academic and self-directed projects in Python, Data Analysis, and Machine Learning.
                  </p>
                  <p className="text-xs text-stone-500">
                    Only verified projects from my resume are listed here.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenEditorModal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-[#F7F6F2] border border-stone-300 rounded-lg hover:bg-stone-200/70 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Resume Project</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project, index) => {
                  const hasGithub = Boolean(
                    project.githubUrl && project.githubUrl.trim() !== ''
                  );
                  const hasLiveDemo = Boolean(
                    project.liveDemoUrl && project.liveDemoUrl.trim() !== ''
                  );

                  return (
                    <article
                      key={project.id}
                      className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-4"
                    >
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono text-stone-400">
                          0{index + 1}
                        </span>
                        {/* 1. Project Name */}
                        <h3 className="font-display text-xl font-semibold text-stone-900 leading-snug">
                          {project.name}
                        </h3>
                      </div>

                      {/* 2. Short Description */}
                      {project.shortDescription && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-stone-500">
                            Description
                          </p>
                          <p className="text-sm text-stone-700 leading-relaxed">
                            {project.shortDescription}
                          </p>
                        </div>
                      )}

                      {/* 4. My Role / Contribution */}
                      {project.roleContribution && (
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-stone-500">
                            My Role & Contribution
                          </p>
                          <p className="text-sm text-stone-700 leading-relaxed">
                            {project.roleContribution}
                          </p>
                        </div>
                      )}

                      {/* 3. Technologies Used & 5. Optional Links */}
                      <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-stone-600">
                            {project.technologies.map((tech, idx) => (
                              <React.Fragment key={tech}>
                                <span>{tech}</span>
                                {idx < project.technologies.length - 1 && (
                                  <span aria-hidden="true" className="text-stone-300">
                                    ·
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        )}

                        {(hasGithub || hasLiveDemo) && (
                          <div className="flex items-center gap-5 text-xs font-medium shrink-0">
                            {hasGithub && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-stone-800 hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                              >
                                <span>GitHub</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {hasLiveDemo && (
                              <a
                                href={project.liveDemoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                              >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
