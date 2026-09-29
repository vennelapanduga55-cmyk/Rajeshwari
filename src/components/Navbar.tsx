import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  name: string;
  onOpenResumeModal: () => void;
  onOpenEditorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  name,
  onOpenResumeModal,
  onOpenEditorModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#F7F6F2]/95 backdrop-blur-sm border-b border-stone-200/80 no-print">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-tight text-stone-900 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          {name || 'Vennela Panduga'}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap py-1 hover:text-stone-900 hover:underline underline-offset-4 decoration-stone-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenEditorModal}
            className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Edit Resume Info
          </button>
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="px-4 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Resume
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#F7F6F2] border-b border-stone-200 px-4 py-3 shadow-xs"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-stone-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-stone-900 hover:underline underline-offset-4"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
