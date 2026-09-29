import React, { useRef } from 'react';
import { X, Printer, Upload, Download } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUploadResumePdf: (dataUrl: string, fileName: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  data,
  onUploadResumePdf,
}) => {
  const pdfInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadResumePdf(reader.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-stone-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-[#F7F6F2] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div>
            <h2
              id="resume-modal-title"
              className="text-sm font-semibold text-stone-900"
            >
              Resume — {data.hero.name}
            </h2>
            <p className="text-xs text-stone-500">
              Contains only verified resume details · Print or attach your PDF resume
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => pdfInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Attach Resume PDF</span>
            </button>
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />

            {data.hero.resumePdfUrl && (
              <a
                href={data.hero.resumePdfUrl}
                download={data.hero.resumeFileName || 'Vennela_Panduga_Resume.pdf'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-stone-900 text-sm">
          {/* Header */}
          <div className="border-b border-stone-300 pb-4">
            <h1 className="font-display text-2xl font-semibold text-stone-900">
              {data.hero.name}
            </h1>
            {data.hero.headline && (
              <p className="text-sm font-medium text-stone-700 mt-0.5">
                {data.hero.headline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-stone-600 mt-2">
              {data.hero.email && <span>{data.hero.email}</span>}
              {data.hero.location && (
                <>
                  <span>·</span>
                  <span>{data.hero.location}</span>
                </>
              )}
              {data.hero.linkedin && data.hero.linkedin.trim() !== '' && (
                <>
                  <span>·</span>
                  <span>LinkedIn: {data.hero.linkedin}</span>
                </>
              )}
              {data.hero.github && data.hero.github.trim() !== '' && (
                <>
                  <span>·</span>
                  <span>GitHub: {data.hero.github}</span>
                </>
              )}
              {data.hero.kaggle && data.hero.kaggle.trim() !== '' && (
                <>
                  <span>·</span>
                  <span>Kaggle: {data.hero.kaggle}</span>
                </>
              )}
            </div>
          </div>

          {/* About / Summary */}
          {data.about.summaryParagraphs.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
                Profile Summary
              </h2>
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                {data.about.summaryParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-xs text-stone-900">
                      {edu.degree}
                    </span>
                    {edu.duration && (
                      <span className="text-xs font-mono text-stone-600">
                        {edu.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-700">
                    {edu.status}
                    {edu.institution ? ` · ${edu.institution}` : ''}
                    {edu.scoreOrGpa ? ` · ${edu.scoreOrGpa}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Technical Skills */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
              Technical Skills
            </h2>
            <div className="space-y-1 text-xs text-stone-700">
              {data.skills.programming.length > 0 && (
                <p>
                  <span className="font-semibold">Programming: </span>
                  {data.skills.programming.join(', ')}
                </p>
              )}
              {data.skills.dataScienceAiMl.length > 0 && (
                <p>
                  <span className="font-semibold">Data Science / AI & ML: </span>
                  {data.skills.dataScienceAiMl.join(', ')}
                </p>
              )}
              {data.skills.webOther.length > 0 && (
                <p>
                  <span className="font-semibold">Web / Other: </span>
                  {data.skills.webOther.join(', ')}
                </p>
              )}
              {data.skills.tools.length > 0 && (
                <p>
                  <span className="font-semibold">Tools: </span>
                  {data.skills.tools.join(', ')}
                </p>
              )}
            </div>
          </div>

          {/* Projects (only if present) */}
          {data.projects.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
                Projects
              </h2>
              {data.projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-xs text-stone-900">
                      {proj.name}
                    </span>
                    <span className="text-xs font-mono text-stone-500">
                      {proj.technologies.join(' · ')}
                    </span>
                  </div>
                  {proj.shortDescription && (
                    <p className="text-xs text-stone-700">{proj.shortDescription}</p>
                  )}
                  {proj.roleContribution && (
                    <p className="text-xs text-stone-600">
                      <span className="font-medium">Role / Contribution: </span>
                      {proj.roleContribution}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
              Experience
            </h2>
            {data.experience.length > 0 ? (
              data.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-xs text-stone-900">
                      {exp.role} — {exp.organization}
                    </span>
                    <span className="text-xs font-mono text-stone-600">
                      {exp.duration}
                    </span>
                  </div>
                  <ul className="list-disc pl-4 text-xs text-stone-600 space-y-0.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-700">
                {data.experienceFallbackNote}
              </p>
            )}
          </div>

          {/* Certifications & Hackathon/Achievements (only if present) */}
          {(data.certifications.length > 0 || data.achievements.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.certifications.length > 0 && (
                <div className="space-y-1.5">
                  <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
                    Certifications
                  </h2>
                  <ul className="list-disc pl-4 text-xs text-stone-700 space-y-1">
                    {data.certifications.map((c) => (
                      <li key={c.id}>
                        <span className="font-medium">{c.title}</span>
                        {c.issuer ? ` — ${c.issuer}` : ''}
                        {c.date ? ` (${c.date})` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.achievements.length > 0 && (
                <div className="space-y-1.5">
                  <h2 className="text-xs font-semibold text-stone-900 border-b border-stone-200 pb-1">
                    Hackathons & Achievements
                  </h2>
                  <ul className="list-disc pl-4 text-xs text-stone-700 space-y-1">
                    {data.achievements.map((a) => (
                      <li key={a.id}>
                        <span className="font-medium">{a.title}: </span>
                        {a.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
