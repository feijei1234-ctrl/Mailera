import React from 'react';
import { Translation, IdentityType, Language } from '../types';
import { IDENTITIES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  t: Translation['identity'];
  lang: Language;
  onSelect: (id: IdentityType) => void;
  currentId: IdentityType | null;
}

const IdentitySelection: React.FC<Props> = ({ t, lang, onSelect, currentId }) => {
  return (
    <div className="flex min-h-screen flex-col px-4 pt-24 pb-8 max-w-2xl mx-auto">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">{t.title}</h2>
        <p className="text-lg text-zinc-400">{t.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {IDENTITIES.map((identity) => {
          const Icon = identity.icon;
          const isSelected = currentId === identity.id;
          
          return (
            <button
              key={identity.id}
              onClick={() => onSelect(identity.id)}
              className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 active:scale-[0.98] ${
                isSelected
                  ? 'border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)]'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${identity.gradient} shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {identity.title[lang]}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-zinc-400 leading-relaxed max-w-[260px] sm:max-w-none">
                      {identity.desc[lang]}
                    </p>
                  </div>
                </div>
                
                <div className={`h-6 w-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-zinc-600'
                }`}>
                    {isSelected && <CheckCircle2 size={16} className="text-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IdentitySelection;