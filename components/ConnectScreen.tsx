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
<img 
            src="/outlook-icon.png" 
            alt="Outlook" 
            className="w-20 h-20 drop-shadow-xl"
        />
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
