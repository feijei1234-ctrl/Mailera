import React, { useState } from 'react';
import { Translation } from '../types';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface Props {
  t: Translation['connect'];
  onConnect: () => void;
}

const ConnectScreen: React.FC<Props> = ({ t, onConnect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
        onConnect();
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
      <div className="mb-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/10 p-8 shadow-[0_0_50px_-20px_rgba(59,130,246,0.5)]">
       <svg className="w-20 h-20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.596 2H11.404A1.404 1.404 0 0 0 10 3.404V5l9.69 3.5L30 5V3.404A1.404 1.404 0 0 0 28.596 2Z" fill="#0364B8"/>
          <path d="M31.65 17.405A11.341 11.341 0 0 0 32 16a.666.666 0 0 0-.333-.576l-.013-.008-.004-.002L20.5 9.5V5l-10 5v14l10 5 10.5-5.5-.004-.003-.013-.007A.666.666 0 0 0 32 18a11.344 11.344 0 0 0-.35-1.595Z" fill="#0A2767"/>
          <path d="M24 5h-7.5v5l7.5 3.5L30 10V6.5A1.5 1.5 0 0 0 28.5 5Z" fill="#28A8EA"/>
          <path d="M10 10h6.5v5H10Z" fill="#0078D4"/>
          <path d="M16.5 10H24v5h-7.5Z" fill="#50D9FF"/>
          <path d="M24 15h-7.5v5l7.5 3.5 6-3.5v-5Z" fill="#0364B8"/>
          <path d="M16.5 15H10v5h6.5Z" fill="#0078D4"/>
          <path d="M24 20h-7.5v5H24Z" fill="#064A8C"/>
          <path d="M10 20v5h6.5v-5Z" fill="#0A2767"/>
          <path d="M0 10.5v14A1.5 1.5 0 0 0 1.5 26h9a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 10.5 9h-9A1.5 1.5 0 0 0 0 10.5Z" fill="#0078D4"/>
          <path d="M3.5 13h5v1.5h-5zm0 3h5v1.5h-5zm0 3h3v1.5h-3z" fill="white"/>
        </svg>
      </div>

      <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">{t.title}</h2>
      <p className="mb-10 text-lg text-zinc-400">{t.subtitle}</p>

      <button
        disabled={isLoading}
        onClick={handleAuth}
        className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-[#0078D4] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#106EBE] hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
      >
        {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
        ) : (
            <span className="flex items-center gap-2">
                {t.authorize}
            </span>
        )}
      </button>

      {isLoading && (
          <p className="mt-4 text-sm font-medium text-blue-400 animate-pulse">{t.connecting}</p>
      )}

      <div className="mt-12 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-left">
        <ShieldCheck className="shrink-0 text-emerald-400" size={24} />
        <p className="text-sm font-medium text-emerald-200/80 leading-relaxed">
            {t.privacy}
        </p>
      </div>
    </div>
  );
};

export default ConnectScreen;
