import { IdentityType, Language, PriorityRule, Translation } from './types';
import { Rocket, Coffee, PartyPopper, Scale, Microscope } from 'lucide-react';

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    welcome: {
      slogan: "Intelligent Email Classification Assistant",
      cta: "Start Setup",
    },
    identity: {
      title: "Choose Your Persona",
      subtitle: "This sets your initial AI baseline.",
      warningTitle: "Reset Configuration?",
      warningBody: "Changing identity will reset your default classification rules. Are you sure?",
      confirmReset: "Yes, Reset",
      cancel: "Cancel",
    },
    tuning: {
      title: "Fine-tune Priority",
      subtitle: "Drag keywords to reorder or add new ones.",
      save: "Save Changes",
      next: "Continue",
      addKeyword: "Add keyword...",
    },
    connect: {
      title: "Connect & Secure",
      subtitle: "Link your university Outlook account.",
      authorize: "Authorize with Outlook",
      privacy: "We promise: Data stays local-first. No training on personal content.",
      connecting: "Securely connecting...",
    },
    dashboard: {
      briefingTitle: "Daily Briefing",
      specialCare: "Special Care",
      critical: "Critical",
      major: "Major",
      general: "General / News",
      navBriefing: "Briefing",
      navSettings: "Settings",
    },
    settings: {
      title: "Settings",
      general: "General",
      language: "Language",
      coreLogic: "Core Logic",
      currentIdentity: "Current Persona",
      changeIdentity: "Switch Persona",
      rules: "Classification Rules",
      editRules: "Edit Rules",
      editRulesDesc: "Fine-tune keyword sorting and tags.",
      account: "Account",
      logout: "Log Out",
      connectedAs: "Connected as",
    },
  },
  [Language.ZH_CN]: {
    welcome: {
      slogan: "智能邮件分类助手",
      cta: "开始设置",
    },
    identity: {
      title: "选择你的身份",
      subtitle: "这将决定 AI 的初始分类逻辑。",
      warningTitle: "重置配置？",
      warningBody: "切换身份将重置您的默认分类规则。确定要重新选择吗？",
      confirmReset: "确定重置",
      cancel: "取消",
    },
    tuning: {
      title: "优先级微调",
      subtitle: "您可以拖动关键词调整分类，或添加新词。",
      save: "保存生效",
      next: "继续",
      addKeyword: "添加关键词...",
    },
    connect: {
      title: "连接账户",
      subtitle: "绑定您的学校 Outlook 邮箱。",
      authorize: "连接 Outlook",
      privacy: "隐私承诺：数据本地优先，绝不用于训练。",
      connecting: "安全连接中...",
    },
    dashboard: {
      briefingTitle: "每日简报",
      specialCare: "特别关注 (Special Care)",
      critical: "紧急 (Critical)",
      major: "重要 (Major)",
      general: "一般 / 资讯",
      navBriefing: "简报",
      navSettings: "设置",
    },
    settings: {
      title: "设置",
      general: "通用设置",
      language: "语言",
      coreLogic: "核心逻辑",
      currentIdentity: "当前身份",
      changeIdentity: "切换身份",
      rules: "分类规则",
      editRules: "编辑规则",
      editRulesDesc: "微调关键词排序和自定义标签。",
      account: "账号与数据",
      logout: "退出登录",
      connectedAs: "已连接邮箱",
    },
  },
  [Language.ZH_TW]: {
    welcome: {
      slogan: "智能郵件分類助手",
      cta: "開始設定",
    },
    identity: {
      title: "選擇你的身份",
      subtitle: "這將決定 AI 的初始分類邏輯。",
      warningTitle: "重置配置？",
      warningBody: "切換身份將重置您的默認分類規則。確定要重新選擇嗎？",
      confirmReset: "確定重置",
      cancel: "取消",
    },
    tuning: {
      title: "優先級微調",
      subtitle: "您可以拖動關鍵詞調整分類，或添加新詞。",
      save: "保存生效",
      next: "繼續",
      addKeyword: "添加關鍵詞...",
    },
    connect: {
      title: "連接賬戶",
      subtitle: "綁定您的學校 Outlook 信箱。",
      authorize: "連接 Outlook",
      privacy: "隱私承諾：數據本地優先，絕不用於訓練。",
      connecting: "安全連接中...",
    },
    dashboard: {
      briefingTitle: "每日簡報",
      specialCare: "特別關注 (Special Care)",
      critical: "緊急 (Critical)",
      major: "重要 (Major)",
      general: "一般 / 資訊",
      navBriefing: "簡報",
      navSettings: "設定",
    },
    settings: {
      title: "設定",
      general: "通用設定",
      language: "語言",
      coreLogic: "核心邏輯",
      currentIdentity: "當前身份",
      changeIdentity: "切換身份",
      rules: "分類規則",
      editRules: "編輯規則",
      editRulesDesc: "微調關鍵詞排序和自定義標籤。",
      account: "賬號與數據",
      logout: "登出",
      connectedAs: "已連接信箱",
    },
  },
};

export const IDENTITIES = [
  {
    id: IdentityType.OVERACHIEVER,
    icon: Rocket,
    title: { [Language.EN]: 'Overachiever', [Language.ZH_CN]: '全能卷王', [Language.ZH_TW]: '全能卷王' },
    desc: { [Language.EN]: 'GPA is only 4.2, panic mode on.', [Language.ZH_CN]: 'GPA才4.2，怎么办啊', [Language.ZH_TW]: 'GPA才4.2，怎麼辦啊' },
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: IdentityType.RESEARCHER,
    icon: Microscope,
    title: { [Language.EN]: 'Researcher', [Language.ZH_CN]: '科研大佬', [Language.ZH_TW]: '科研大佬' },
    desc: { [Language.EN]: 'Journals & Grants first. Admin later.', [Language.ZH_CN]: '期刊基金第一，行政琐事靠边。', [Language.ZH_TW]: '期刊基金第一，行政瑣事靠邊。' },
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: IdentityType.BALANCED,
    icon: Scale,
    title: { [Language.EN]: 'Balanced', [Language.ZH_CN]: '端水大师', [Language.ZH_TW]: '端水大師' },
    desc: { [Language.EN]: 'Work-life balance is key.', [Language.ZH_CN]: '生活工作两不误。', [Language.ZH_TW]: '生活工作兩不誤。' },
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: IdentityType.PARTY,
    icon: PartyPopper,
    title: { [Language.EN]: 'Socialite', [Language.ZH_CN]: '派对达人', [Language.ZH_TW]: '派對達人' },
    desc: { [Language.EN]: 'Events & Socials are top priority.', [Language.ZH_CN]: '活动社交最重要。', [Language.ZH_TW]: '活動社交最重要。' },
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: IdentityType.LAYING_FLAT,
    icon: Coffee,
    title: { [Language.EN]: 'Chill Mode', [Language.ZH_CN]: '躺平模式', [Language.ZH_TW]: '躺平模式' },
    desc: { [Language.EN]: 'Only wake me up for emergencies.', [Language.ZH_CN]: '除非着火，否则别喊我。', [Language.ZH_TW]: '除非著火，否則別喊我。' },
    gradient: 'from-violet-500 to-purple-500'
  },
];

export const INITIAL_RULES: PriorityRule[] = [
  { id: 'special_care', name: 'Special Care', keywords: [], color: 'bg-fuchsia-500' },
  { id: 'critical', name: 'Critical', keywords: ['Deadline', 'Exam', 'Grade', 'Interview', 'Offer'], color: 'bg-red-500' },
  { id: 'major', name: 'Major', keywords: ['Assignment', 'Seminar', 'Society', 'Payment'], color: 'bg-blue-500' },
  { id: 'general', name: 'General', keywords: ['Newsletter', 'Library', 'Announcement'], color: 'bg-zinc-500' },
];