import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Translation } from '../types';

interface Props {
  t: Translation['welcome'];
  onStart: () => void;
}

const Welcome: React.FC<Props> = ({ t, onStart }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      
      {/* Hero Icon */}
      <div className="relative mb-12 animate-float">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="relative flex h-32 w-32 items-center justify-center rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-2xl backdrop-blur-2xl">
          <Mail size={48} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </div>

      {/* Brand */}
      <h1 className="mb-4 text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-zinc-500 sm:text-7xl">
        Mailera
      </h1>
      
      <p className="mb-12 max-w-md text-xl font-medium text-zinc-400 leading-relaxed">
        {t.slogan}
      </p>

      {/* CTA */}
      <button
        onClick={onStart}
        className="group relative flex w-full max-w-xs items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-5 text-lg font-bold tracking-tight text-white shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.6)] active:scale-95"
      >
        {t.cta}
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </button>

      {/* Footer Decoration */}
      <div className="fixed bottom-8 text-xs font-medium text-zinc-700">
        v1.4 • Designed for HKU
      </div>
    </div>
  );
};

export default Welcome;