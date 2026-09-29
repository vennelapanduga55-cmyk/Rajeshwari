import React from 'react';
import { PortfolioData } from '../types/portfolio';

interface FooterProps {
  hero: PortfolioData['hero'];
  onOpenEditorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ hero, onOpenEditorModal }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200/80 py-10 bg-[#F7F6F2] no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
        <div>
          <span className="font-medium text-stone-800">{hero.name}</span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <span>B.Tech Data Science</span>
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <span className="font-mono">{year}</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a href="#home" className="hover:text-stone-900 transition-colors">
            Back to top
          </a>
          <button
            type="button"
            onClick={onOpenEditorModal}
            className="hover:text-stone-900 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Edit Resume Info
          </button>
        </div>
      </div>
    </footer>
  );
};
