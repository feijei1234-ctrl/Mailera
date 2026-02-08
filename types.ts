export enum AppStep {
  WELCOME = 'WELCOME',
  IDENTITY = 'IDENTITY',
  TUNING = 'TUNING',
  CONNECT = 'CONNECT',
  CALLBACK = 'CALLBACK',
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  EDIT_RULES = 'EDIT_RULES', // Re-using TUNING screen logic
}

export enum Language {
  EN = 'EN',
  ZH_CN = 'ZH_CN',
  ZH_TW = 'ZH_TW',
}

export enum IdentityType {
  OVERACHIEVER = 'OVERACHIEVER',
  LAYING_FLAT = 'LAYING_FLAT',
  PARTY = 'PARTY',
  BALANCED = 'BALANCED',
  RESEARCHER = 'RESEARCHER',
}

export interface PriorityRule {
  id: string;
  name: string;
  keywords: string[];
  color: string;
}

export interface UserState {
  hasCompletedSetup: boolean;
  identity: IdentityType | null;
  email: string | null;
  rules: PriorityRule[];
}

export interface Translation {
  welcome: {
    slogan: string;
    cta: string;
  };
  identity: {
    title: string;
    subtitle: string;
    warningTitle: string;
    warningBody: string;
    confirmReset: string;
    cancel: string;
  };
  tuning: {
    title: string;
    subtitle: string;
    save: string;
    next: string;
    addKeyword: string;
  };
  connect: {
    title: string;
    subtitle: string;
    authorize: string;
    privacy: string;
    connecting: string;
  };
  dashboard: {
    briefingTitle: string;
    specialCare: string;
    critical: string;
    major: string;
    general: string;
    navBriefing: string;
    navSettings: string;
  };
  settings: {
    title: string;
    general: string;
    language: string;
    coreLogic: string;
    currentIdentity: string;
    changeIdentity: string;
    rules: string;
    editRules: string;
    editRulesDesc: string;
    account: string;
    logout: string;
    connectedAs: string;
  };
}