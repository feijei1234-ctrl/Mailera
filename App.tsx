import React, { useState, useEffect } from 'react';
import { AppStep, IdentityType, Language, UserState, PriorityRule } from './types';
import { TRANSLATIONS, INITIAL_RULES } from './constants';
import Welcome from './components/Welcome';
import IdentitySelection from './components/IdentitySelection';
import PriorityTuning from './components/PriorityTuning';
import ConnectScreen from './components/ConnectScreen';
import Dashboard from './components/Dashboard';
import SettingsScreen from './components/SettingsScreen';
import LanguageSwitcher from './components/LanguageSwitcher';
import Callback from './components/Callback';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [step, setStep] = useState<AppStep>(() => {
    // 检查是否是 OAuth callback
    if (window.location.pathname === '/callback') {
      return AppStep.CALLBACK;
    }
    return AppStep.WELCOME;
  });
  
  const [user, setUser] = useState<UserState>({
    hasCompletedSetup: false,
    identity: null,
    email: null,
    rules: INITIAL_RULES,
  });

  const t = TRANSLATIONS[lang];

  // Helper to scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // -- Handlers --

  const handleIdentitySelect = (id: IdentityType) => {
    setUser(prev => ({ ...prev, identity: id }));
    // In a real app, we might modify INITIAL_RULES based on Identity here
    // For now, we just proceed
    setStep(AppStep.TUNING);
  };

  const handleTuningComplete = (rules: PriorityRule[]) => {
    setUser(prev => ({ ...prev, rules }));
    if (step === AppStep.EDIT_RULES) {
      setStep(AppStep.SETTINGS);
    } else {
      setStep(AppStep.CONNECT);
    }
  };

  const handleTuningBack = () => {
      if (step === AppStep.EDIT_RULES) {
          setStep(AppStep.SETTINGS);
      } else {
          setStep(AppStep.IDENTITY);
      }
  };

  const handleConnect = () => {
    setUser(prev => ({ ...prev, email: 'student@connect.hku.hk', hasCompletedSetup: true }));
    setStep(AppStep.DASHBOARD);
  };

  const handleChangeIdentity = () => {
    // Reset Logic
    setStep(AppStep.IDENTITY);
    setUser(prev => ({ ...prev, identity: null, rules: INITIAL_RULES }));
  };

  const handleLogout = () => {
      // Full Reset
      setUser({
          hasCompletedSetup: false,
          identity: null,
          email: null,
          rules: INITIAL_RULES
      });
      setStep(AppStep.WELCOME);
  };

  const handleOAuthSuccess = (email: string, name: string) => {
    setUser(prev => ({ ...prev, email, hasCompletedSetup: true }));
    window.history.replaceState({}, document.title, '/');
    setStep(AppStep.DASHBOARD);
  };

  const handleOAuthError = (error: string) => {
    console.error('OAuth error:', error);
    window.history.replaceState({}, document.title, '/');
    setStep(AppStep.CONNECT);
  };

  // -- Render Logic --

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30">
      
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Global Language Switcher (Only visible in early steps) */}
        {(step === AppStep.WELCOME || step === AppStep.IDENTITY || step === AppStep.TUNING || step === AppStep.CONNECT) && (
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
        )}

        {step === AppStep.WELCOME && (
            <Welcome t={t.welcome} onStart={() => setStep(AppStep.IDENTITY)} />
        )}

        {step === AppStep.IDENTITY && (
            <IdentitySelection 
                t={t.identity} 
                lang={lang}
                currentId={user.identity} 
                onSelect={handleIdentitySelect} 
            />
        )}

        {(step === AppStep.TUNING || step === AppStep.EDIT_RULES) && (
            <PriorityTuning 
                t={t.tuning}
                initialRules={user.rules}
                onComplete={handleTuningComplete}
                onBack={handleTuningBack}
                isSettingsMode={step === AppStep.EDIT_RULES}
            />
        )}

        {step === AppStep.CONNECT && (
            <ConnectScreen 
                t={t.connect} 
                onConnect={handleConnect} 
            />
        )}

        {step === AppStep.CALLBACK && (
            <Callback 
                onSuccess={handleOAuthSuccess}
                onError={handleOAuthError}
            />
        )}

        {step === AppStep.DASHBOARD && (
            <Dashboard 
                t={t.dashboard} 
                user={user} 
                onNavigate={(page) => {
                    if(page === 'SETTINGS') setStep(AppStep.SETTINGS);
                }} 
            />
        )}

        {step === AppStep.SETTINGS && (
            <SettingsScreen 
                t={t.settings}
                tIdentity={t.identity}
                user={user}
                currentLang={lang}
                setLang={setLang}
                onBack={() => setStep(AppStep.DASHBOARD)}
                onLogout={handleLogout}
                onChangeIdentity={handleChangeIdentity}
                onEditRules={() => setStep(AppStep.EDIT_RULES)}
            />
        )}
      </div>
    </div>
  );
};

export default App;