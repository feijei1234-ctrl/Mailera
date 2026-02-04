import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface Props {
  currentLang: Language;
  setLang: (l: Language) => void;
  variant?: 'floating' | 'inline';
}

const LanguageSwitcher: React.FC<Props> = ({ currentLang, setLang, variant = 'floating' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { code: Language.ZH_CN, label: '简体中文' },
    { code: Language.ZH_TW, label: '繁體中文' },
    { code: Language.EN, label: 'English' },
  ];

  if (variant === 'inline') {
    return (
        <div className="flex gap-2">
            {options.map((opt) => (
                <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                        currentLang === opt.code
                            ? 'bg-white/20 text-white'
                            : 'bg-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
      >
        <Globe size={16} />
        {currentLang === Language.ZH_CN ? '简' : currentLang === Language.ZH_TW ? '繁' : 'EN'}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 flex w-32 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121212] py-1 shadow-2xl ring-1 ring-black/5">
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  setLang(opt.code);
                  setIsOpen(false);
                }}
                className={`flex w-full px-4 py-2.5 text-left text-sm transition-colors ${
                  currentLang === opt.code
                    ? 'bg-white/10 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;