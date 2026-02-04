import React, { useState } from 'react';
import { Translation, UserState } from '../types';
import { Home, Settings, ChevronDown, MailOpen, Clock, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  t: Translation['dashboard'];
  user: UserState;
  onNavigate: (page: 'BRIEFING' | 'SETTINGS') => void;
}

const Dashboard: React.FC<Props> = ({ t, user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'BRIEFING' | 'SETTINGS'>('BRIEFING');

  const handleNav = (tab: 'BRIEFING' | 'SETTINGS') => {
      setActiveTab(tab);
      onNavigate(tab);
  }

  // Find if user has special care rules
  const specialCareRule = user.rules.find(r => r.id === 'special_care');
  const hasSpecialCareKeywords = specialCareRule && specialCareRule.keywords.length > 0;

  // Real data would come from an API/Prop
  const specialEmails: Array<{id: number, subject: string, sender: string, time: string, snippet: string}> = [];
  const criticalEmails: Array<{id: number, subject: string, sender: string, time: string, snippet: string}> = [];
  const majorEmails: Array<{id: number, subject: string, sender: string, time: string, snippet: string}> = [];

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl px-6 py-5">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">{t.briefingTitle}</h1>
                <p className="text-sm text-zinc-500">{new Date().toLocaleDateString()} • {user.email}</p>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-gradient-to-br from-indigo-500 to-purple-500">
                {/* User Avatar Placeholder */}
            </div>
        </div>
      </div>

      <div className="flex-1 space-y-6 p-4">
        
        {/* Special Care Section - Only show if keywords exist, or for demo show example if it was just added */}
        <section>
             <div className="mb-3 flex items-center gap-2">
                <Sparkles className="text-fuchsia-400" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-400">{t.specialCare}</h2>
            </div>
            
            {hasSpecialCareKeywords ? (
                <div className="space-y-3">
                    {specialEmails.length > 0 ? specialEmails.map(email => (
                         <div key={email.id} className="relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-500/10 to-purple-900/20 p-5 shadow-[0_0_25px_-5px_rgba(217,70,239,0.3)]">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <Sparkles size={40} className="text-fuchsia-500/20" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-white leading-tight pr-4">{email.subject}</h3>
                                    <span className="shrink-0 text-xs font-bold text-fuchsia-300 bg-fuchsia-500/20 px-2 py-0.5 rounded-full">{email.time}</span>
                                </div>
                                <p className="text-xs font-semibold text-fuchsia-200 mb-2">{email.sender}</p>
                                <p className="text-sm text-zinc-300 line-clamp-2">{email.snippet}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                            <p className="text-sm text-zinc-500 italic">No new emails in Special Care.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
                    <p className="text-sm text-zinc-500">
                        No keywords configured for Special Care. <br/>
                        <span className="text-xs opacity-70">Add keywords in Settings to prioritize specific senders or topics here.</span>
                    </p>
                </div>
            )}
        </section>

        {/* Critical Section */}
        <section>
            <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="text-red-500" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-red-500">{t.critical}</h2>
            </div>
            <div className="space-y-3">
                {criticalEmails.length > 0 ? criticalEmails.map(email => (
                    <div key={email.id} className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-900/10 p-5 shadow-[0_0_20px_-10px_rgba(239,68,68,0.2)]">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-white leading-tight pr-4">{email.subject}</h3>
                            <span className="shrink-0 text-xs font-medium text-red-300 bg-red-500/20 px-2 py-0.5 rounded-full">{email.time}</span>
                        </div>
                        <p className="text-xs font-semibold text-red-200 mb-2">{email.sender}</p>
                        <p className="text-sm text-zinc-300 line-clamp-2">{email.snippet}</p>
                    </div>
                )) : (
                     <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                        <p className="text-sm text-zinc-500 italic">No critical emails found.</p>
                    </div>
                )}
            </div>
        </section>

        {/* Major Section */}
        <section>
            <div className="mb-3 flex items-center gap-2">
                <Clock className="text-blue-400" size={18} />
                <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400">{t.major}</h2>
            </div>
            <div className="space-y-3">
                {majorEmails.length > 0 ? majorEmails.map(email => (
                    <div key={email.id} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-white leading-tight pr-4">{email.subject}</h3>
                            <span className="text-xs text-zinc-500">{email.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-2">{email.sender}</p>
                        <p className="text-sm text-zinc-400 line-clamp-1">{email.snippet}</p>
                    </div>
                )) : (
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                        <p className="text-sm text-zinc-500 italic">No major emails found.</p>
                    </div>
                )}
            </div>
        </section>

         {/* General Collapsible */}
        <section className="mt-8">
            <button className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 p-4 text-zinc-400 transition-colors hover:text-white">
                <div className="flex items-center gap-3">
                    <MailOpen size={18} />
                    <span className="font-medium">{t.general}</span>
                    <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">0</span>
                </div>
                <ChevronDown size={18} />
            </button>
        </section>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl">
        <div className="grid grid-cols-2">
            <button 
                onClick={() => handleNav('BRIEFING')}
                className={`flex flex-col items-center justify-center gap-1 py-4 transition-colors ${activeTab === 'BRIEFING' ? 'text-indigo-400' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                <Home size={24} strokeWidth={activeTab === 'BRIEFING' ? 3 : 2} />
                <span className="text-[10px] font-bold tracking-wide">{t.navBriefing}</span>
            </button>
            <button 
                onClick={() => handleNav('SETTINGS')}
                className={`flex flex-col items-center justify-center gap-1 py-4 transition-colors ${activeTab === 'SETTINGS' ? 'text-indigo-400' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
                <Settings size={24} strokeWidth={activeTab === 'SETTINGS' ? 3 : 2} />
                <span className="text-[10px] font-bold tracking-wide">{t.navSettings}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;