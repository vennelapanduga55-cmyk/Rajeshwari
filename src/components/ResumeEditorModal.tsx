import React, { useState, useEffect } from 'react';
import { X, Copy, Check, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import {
  parsePlainTextResume,
  generateResumeDataTsFile,
} from '../utils/resumeParser';

interface ResumeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSaveData: (newData: PortfolioData) => void;
  onResetDefault: () => void;
}

type EditorTab = 'edit' | 'paste' | 'export';

export const ResumeEditorModal: React.FC<ResumeEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetDefault,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('edit');
  const [rawResumeText, setRawResumeText] = useState('');
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [copiedExport, setCopiedExport] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setDraft(data);
  }, [data, isOpen]);

  if (!isOpen) return null;

  const handleParseText = () => {
    if (!rawResumeText.trim()) return;
    const parsed = parsePlainTextResume(rawResumeText, draft);
    setDraft(parsed);
    onSaveData(parsed);
    setStatusMessage(
      'Extracted resume fields from your text without adding fabricated details.'
    );
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveData(draft);
    setStatusMessage('Saved changes to your live portfolio.');
  };

  const handleCopyExport = async () => {
    const code = generateResumeDataTsFile(draft);
    try {
      await navigator.clipboard.writeText(code);
      setCopiedExport(true);
      setTimeout(() => setCopiedExport(false), 2500);
    } catch {
      setCopiedExport(false);
    }
  };

  const splitCommaList = (val: string) =>
    val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-modal-title"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto no-print"
      onClick={onClose}
    >
      <div
        className="bg-white border border-stone-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F7F6F2] border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <h2
              id="editor-modal-title"
              className="text-base font-semibold text-stone-900"
            >
              Edit Resume Information
            </h2>
            <p className="text-xs text-stone-500">
              Add your real projects, hackathon participation, or profile links. Leave any missing field blank to omit it.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume editor"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Tab Bar */}
        <div className="px-6 py-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-stone-50">
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg">
            <button
              type="button"
              onClick={() => {
                setActiveTab('edit');
                setStatusMessage(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'edit'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              1. Edit Sections & Add Projects/Hackathons
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('paste');
                setStatusMessage(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'paste'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              2. Paste Resume Text
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('export');
                setStatusMessage(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'export'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              3. Export for Vercel
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onResetDefault();
              onClose();
            }}
            className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-900 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Verified Default</span>
          </button>
        </div>

        {statusMessage && (
          <div className="mx-6 mt-4 px-3.5 py-2.5 text-xs text-blue-900 bg-blue-50 border border-blue-200 rounded-lg">
            {statusMessage}
          </div>
        )}

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveDraft} className="space-y-8 text-xs">
              {/* 1. Profile & Actual Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-1.5">
                  1. Profile & Actual Links (Links appear only when URL is provided)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={draft.hero.name}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={draft.hero.headline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, headline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-stone-700 mb-1">
                      Hero Description
                    </label>
                    <textarea
                      rows={3}
                      value={draft.hero.shortIntroduction}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: {
                            ...draft.hero,
                            shortIntroduction: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={draft.hero.email}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, email: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      LinkedIn URL (leave blank to hide button)
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.linkedin.com/in/..."
                      value={draft.hero.linkedin}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      GitHub URL (leave blank to hide button)
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={draft.hero.github}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, github: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Kaggle URL (leave blank to hide button)
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.kaggle.com/..."
                      value={draft.hero.kaggle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, kaggle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Technical Skills */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-900 border-b border-stone-200 pb-1.5">
                  2. Technical Skills (comma-separated)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Programming
                    </label>
                    <input
                      type="text"
                      value={draft.skills.programming.join(', ')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills: {
                            ...draft.skills,
                            programming: splitCommaList(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Data Science / AI & ML
                    </label>
                    <input
                      type="text"
                      value={draft.skills.dataScienceAiMl.join(', ')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills: {
                            ...draft.skills,
                            dataScienceAiMl: splitCommaList(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Web / Other
                    </label>
                    <input
                      type="text"
                      value={draft.skills.webOther.join(', ')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills: {
                            ...draft.skills,
                            webOther: splitCommaList(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Tools
                    </label>
                    <input
                      type="text"
                      value={draft.skills.tools.join(', ')}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          skills: {
                            ...draft.skills,
                            tools: splitCommaList(e.target.value),
                          },
                        })
                      }
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Projects from Resume */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <h3 className="text-sm font-semibold text-stone-900">
                    3. Projects (Only add projects present in your resume)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        projects: [
                          ...draft.projects,
                          {
                            id: `proj-${Date.now()}`,
                            name: '',
                            shortDescription: '',
                            technologies: [],
                            roleContribution: '',
                            githubUrl: '',
                            liveDemoUrl: '',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {draft.projects.length === 0 ? (
                  <p className="text-xs text-stone-500">
                    No projects listed yet. Click &ldquo;Add Project&rdquo; to enter a project from your resume.
                  </p>
                ) : (
                  draft.projects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-stone-800">
                          Project #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              projects: draft.projects.filter((_, i) => i !== idx),
                            })
                          }
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-600 mb-1">
                            1. Project Name
                          </label>
                          <input
                            type="text"
                            value={proj.name}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...proj, name: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1">
                            3. Technologies Used (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={proj.technologies.join(', ')}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = {
                                ...proj,
                                technologies: splitCommaList(e.target.value),
                              };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-stone-600 mb-1">
                            2. Short Description
                          </label>
                          <textarea
                            rows={2}
                            value={proj.shortDescription}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = {
                                ...proj,
                                shortDescription: e.target.value,
                              };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-stone-600 mb-1">
                            4. My Role / Contribution
                          </label>
                          <input
                            type="text"
                            value={proj.roleContribution}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = {
                                ...proj,
                                roleContribution: e.target.value,
                              };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1">
                            5a. GitHub Link (optional)
                          </label>
                          <input
                            type="url"
                            value={proj.githubUrl || ''}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = { ...proj, githubUrl: e.target.value };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1">
                            5b. Live Demo Link (optional)
                          </label>
                          <input
                            type="url"
                            value={proj.liveDemoUrl || ''}
                            onChange={(e) => {
                              const updated = [...draft.projects];
                              updated[idx] = {
                                ...proj,
                                liveDemoUrl: e.target.value,
                              };
                              setDraft({ ...draft, projects: updated });
                            }}
                            className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* 4. Hackathon / Achievements */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                  <h3 className="text-sm font-semibold text-stone-900">
                    4. Hackathon Participation / Achievements (Optional)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        achievements: [
                          ...draft.achievements,
                          {
                            id: `ach-${Date.now()}`,
                            title: '',
                            organizationOrEvent: '',
                            date: '',
                            description: '',
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Hackathon / Achievement</span>
                  </button>
                </div>

                {draft.achievements.map((ach, idx) => (
                  <div
                    key={ach.id}
                    className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-stone-800">
                        Achievement #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            achievements: draft.achievements.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1">
                          Title / Hackathon Name
                        </label>
                        <input
                          type="text"
                          value={ach.title}
                          onChange={(e) => {
                            const updated = [...draft.achievements];
                            updated[idx] = { ...ach, title: e.target.value };
                            setDraft({ ...draft, achievements: updated });
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1">
                          Organizer / Date (optional)
                        </label>
                        <input
                          type="text"
                          value={ach.organizationOrEvent || ''}
                          onChange={(e) => {
                            const updated = [...draft.achievements];
                            updated[idx] = {
                              ...ach,
                              organizationOrEvent: e.target.value,
                            };
                            setDraft({ ...draft, achievements: updated });
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-stone-600 mb-1">
                          Factual Details (participation, qualification/shortlisting, recognition)
                        </label>
                        <textarea
                          rows={2}
                          value={ach.description}
                          onChange={(e) => {
                            const updated = [...draft.achievements];
                            updated[idx] = {
                              ...ach,
                              description: e.target.value,
                            };
                            setDraft({ ...draft, achievements: updated });
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Save Changes to Portfolio
                </button>
              </div>
            </form>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-4">
              <label
                htmlFor="raw-resume-textarea"
                className="block text-xs font-semibold text-stone-700"
              >
                Paste Text from Your Resume
              </label>
              <textarea
                id="raw-resume-textarea"
                rows={10}
                value={rawResumeText}
                onChange={(e) => setRawResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full p-3.5 text-xs font-mono text-stone-900 bg-[#F7F6F2]/60 border border-stone-300 rounded-xl focus:outline-none focus:border-blue-700"
              />
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleParseText}
                  className="px-4 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Extract Resume Text
                </button>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-stone-600">
                  Copy this TypeScript file content into <code className="font-mono text-stone-900">src/data/resumeData.ts</code> before deploying to Vercel.
                </p>
                <button
                  type="button"
                  onClick={handleCopyExport}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copiedExport ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied File</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy resumeData.ts</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-100 text-xs font-mono rounded-xl overflow-x-auto max-h-[50vh]">
                {generateResumeDataTsFile(draft)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
