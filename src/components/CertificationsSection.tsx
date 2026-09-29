import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
}) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-16 md:py-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
              06. Certifications
            </h2>
            <p className="mt-2 text-xs text-stone-500">
              Verified technical training and completed courses
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white border border-stone-200/90 rounded-2xl divide-y divide-stone-200/80">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-stone-900">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      {cert.issuer && <span>{cert.issuer}</span>}
                      {cert.issuer && cert.date && <span aria-hidden="true">·</span>}
                      {cert.date && <span className="font-mono">{cert.date}</span>}
                    </div>
                  </div>

                  {cert.credentialUrl && cert.credentialUrl.trim() !== '' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline underline-offset-4 whitespace-nowrap self-start sm:self-center"
                    >
                      <span>View Credential</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
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
