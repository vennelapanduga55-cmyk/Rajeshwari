import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

interface ContactSectionProps {
  hero: PortfolioData['hero'];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ hero }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const hasLinkedin = Boolean(hero.linkedin && hero.linkedin.trim() !== '');
  const hasGithub = Boolean(hero.github && hero.github.trim() !== '');
  const hasKaggle = Boolean(hero.kaggle && hero.kaggle.trim() !== '');
  const hasAnyProfile = hasLinkedin || hasGithub || hasKaggle;

  const handleCopyEmail = async () => {
    if (!hero.email) return;
    try {
      await navigator.clipboard.writeText(hero.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = hero.email || 'vennelapanduga55@gmail.com';
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${senderName.trim() || 'Visitor'}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`
    );

    const mailtoLink = `mailto:${targetEmail}?subject=${mailSubject}&body=${mailBody}`;
    window.location.href = mailtoLink;
    setSubmittedNotice(
      `Prepared email to ${targetEmail}. You can also copy the email address directly.`
    );
  };

  return (
    <section id="contact" className="py-16 md:py-24 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-900 tracking-tight">
                06. Contact
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Feel free to get in touch regarding Data Science and AI/ML learning opportunities, academic projects, or hackathons.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {hero.email && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-stone-500">Email</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${hero.email}`}
                      className="text-sm font-mono font-medium text-stone-900 hover:text-blue-700 hover:underline underline-offset-4 break-all"
                    >
                      {hero.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-stone-600 bg-stone-200/70 rounded-md hover:bg-stone-200 hover:text-stone-900 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-800">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {hero.location && (
                <div className="space-y-1 pt-1">
                  <p className="text-xs font-semibold text-stone-500">Location</p>
                  <p className="text-sm text-stone-800">{hero.location}</p>
                </div>
              )}

              {hasAnyProfile && (
                <div className="space-y-1.5 pt-2">
                  <p className="text-xs font-semibold text-stone-500">Profiles</p>
                  <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-stone-700">
                    {hasLinkedin && (
                      <a
                        href={hero.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-blue-700 hover:underline underline-offset-4"
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
                        className="inline-flex items-center gap-1 hover:text-blue-700 hover:underline underline-offset-4"
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
                        className="inline-flex items-center gap-1 hover:text-blue-700 hover:underline underline-offset-4"
                      >
                        <span>Kaggle</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Clean Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2 text-sm text-stone-900 bg-[#F7F6F2]/60 border border-stone-300 rounded-lg focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2 text-sm text-stone-900 bg-[#F7F6F2]/60 border border-stone-300 rounded-lg focus:outline-none focus:border-blue-700"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-stone-700 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project / Learning Opportunity"
                  className="w-full px-3.5 py-2 text-sm text-stone-900 bg-[#F7F6F2]/60 border border-stone-300 rounded-lg focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-stone-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2 text-sm text-stone-900 bg-[#F7F6F2]/60 border border-stone-300 rounded-lg focus:outline-none focus:border-blue-700 resize-y"
                />
              </div>

              {submittedNotice && (
                <p className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  {submittedNotice}
                </p>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
