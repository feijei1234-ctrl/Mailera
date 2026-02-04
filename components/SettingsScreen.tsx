import React, { useState } from 'react';
import { Translation, UserState, Language, IdentityType } from '../types';
import { IDENTITIES } from '../constants';
import { ChevronRight, LogOut, ArrowLeft, SlidersHorizontal, AlertTriangle, RefreshCw } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  t: Translation['settings'];
  tIdentity: Translation['identity'];
  user: UserState;
  currentLang: Language;
  setLang: (l: Language) => void;
  onLogout: () => void;
  onChangeIdentity: () => void;
  onEditRules: () => void;
  onBack: () => void;
}

const SettingsScreen: React.FC<Props> = ({ 
    t, tIdentity, user, currentLang, setLang, onLogout, onChangeIdentity, onEditRules, onBack 
}) => {
  const [showResetWarning, setShowResetWarning] = useState(false);
  
  const currentIdentity = IDENTITIES.find(i => i.id === user.identity);
  const IdentityIcon = currentIdentity?.icon;

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 flex items-center gap-4 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl px-6 py-5">
        <button onClick={onBack} className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t.title}</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* A. General */}
        <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">{t.general}</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between p-4">
                    <span className="font-medium text-white">{t.language}</span>
                    <LanguageSwitcher currentLang={currentLang} setLang={setLang} variant="inline" />
                </div>
            </div>
        </section>

        {/* B. Core Logic */}
        <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">{t.coreLogic}</h2>
            <div className="space-y-4">
                {/* Identity Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-5">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                             <p className="text-xs text-indigo-300 mb-1">{t.currentIdentity}</p>
                             <div className="flex items-center gap-2">
                                {IdentityIcon && <IdentityIcon size={20} className="text-white" />}
                                <h3 className="text-lg font-bold text-white">{currentIdentity?.title[currentLang]}</h3>
                             </div>
                        </div>
                        <button 
                            onClick={() => setShowResetWarning(true)}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
                        >
                            {t.changeIdentity}
                        </button>
                    </div>
                </div>

                {/* Rules Edit */}
                <button 
                    onClick={onEditRules}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 active:scale-[0.98]"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300">
                            <SlidersHorizontal size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-white">{t.editRules}</h3>
                            <p className="text-sm text-zinc-500">{t.editRulesDesc}</p>
                        </div>
                    </div>
                    <ChevronRight className="text-zinc-600" size={20} />
                </button>
            </div>
        </section>

        {/* C. Account */}
        <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">{t.account}</h2>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="border-b border-white/5 p-4">
                    <p className="text-xs text-zinc-500 mb-1">{t.connectedAs}</p>
                    <p className="font-mono text-sm text-white">{user.email}</p>
                </div>
                <button 
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 p-4 text-left text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-medium">{t.logout}</span>
                </button>
            </div>
        </section>
      </div>

      {/* Warning Modal */}
      {showResetWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
              <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{tIdentity.warningTitle}</h3>
                  <p className="mb-6 text-zinc-400 leading-relaxed">{tIdentity.warningBody}</p>
                  
                  <div className="flex gap-3">
                      <button 
                        onClick={() => setShowResetWarning(false)}
                        className="flex-1 rounded-xl bg-zinc-800 py-3 text-sm font-bold text-white hover:bg-zinc-700"
                      >
                          {tIdentity.cancel}
                      </button>
                      <button 
                        onClick={() => {
                            setShowResetWarning(false);
                            onChangeIdentity();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white hover:bg-red-500"
                      >
                          <RefreshCw size={16} />
                          {tIdentity.confirmReset}
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default SettingsScreen;