import React, { useState, useRef } from 'react';
import { FileText, ArrowUpRight, Camera, Trash2, Mail } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface HeroProps {
  hero: PortfolioData['hero'];
  onOpenResumeModal: () => void;
  onUpdatePhoto: (dataUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  hero,
  onOpenResumeModal,
  onUpdatePhoto,
}) => {
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = hero.name
    ? hero.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('')
    : 'VP';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImgError(false);
        onUpdatePhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const hasCustomPhoto = Boolean(
    hero.profilePhotoUrl && hero.profilePhotoUrl.trim() !== '' && !imgError
  );

  const hasLinkedin = Boolean(hero.linkedin && hero.linkedin.trim() !== '');
  const hasGithub = Boolean(hero.github && hero.github.trim() !== '');
  const hasKaggle = Boolean(hero.kaggle && hero.kaggle.trim() !== '');

  return (
    <section
      id="home"
      className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-stone-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Name, Headline, Short Description, Actions & Verified Links */}
          <div className="lg:col-span-8 space-y-6">
            {/* Unboxed Status Metadata */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-stone-500">
              {hero.currentStatus && <span>{hero.currentStatus}</span>}
              {hero.branch && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{hero.branch}</span>
                </>
              )}
              {hero.location && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{hero.location}</span>
                </>
              )}
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.15]">
                {hero.name}
              </h1>
              {hero.headline && (
                <p className="text-base sm:text-lg font-medium text-stone-700 leading-snug">
                  {hero.headline}
                </p>
              )}
            </div>

            {hero.shortIntroduction && (
              <p className="text-base text-stone-600 max-w-[65ch] leading-relaxed">
                {hero.shortIntroduction}
              </p>
            )}

            {/* Primary Actions & Conditional Profile Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <Mail className="w-4 h-4 text-stone-600" />
                <span>Contact</span>
              </a>

              {(hasLinkedin || hasGithub || hasKaggle) && (
                <div className="flex flex-wrap items-center gap-5 pl-2 text-sm font-medium text-stone-700">
                  {hasLinkedin && (
                    <a
                      href={hero.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1.5 hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  )}

                  {hasGithub && (
                    <a
                      href={hero.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1.5 hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  )}

                  {hasKaggle && (
                    <a
                      href={hero.kaggle}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-1.5 hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                    >
                      <span>Kaggle</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Clean Professional Profile Photo Frame (No Generated Person or Stock Image) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            <div className="w-full max-w-[260px] bg-white border border-stone-200/90 rounded-2xl p-4">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F6F2] border border-stone-200/80 flex items-center justify-center">
                {hasCustomPhoto ? (
                  <img
                    src={hero.profilePhotoUrl}
                    alt={`${hero.name} profile photo`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="w-20 h-20 rounded-full bg-white border border-stone-200/90 flex items-center justify-center mb-3 shadow-2xs">
                      <span className="font-display text-2xl font-semibold text-stone-800 tracking-tight">
                        {initials}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-stone-700">
                      {hero.name}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      B.Tech Data Science
                    </p>
                  </div>
                )}
              </div>

              {/* Upload / Remove Photo Controls */}
              <div className="mt-3 flex items-center justify-between gap-2 text-xs text-stone-500">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-blue-700 font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{hasCustomPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                </button>

                {hasCustomPhoto && (
                  <button
                    type="button"
                    onClick={() => onUpdatePhoto('')}
                    className="inline-flex items-center gap-1 text-stone-500 hover:text-red-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
