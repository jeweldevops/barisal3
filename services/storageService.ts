
import { Language, TRANSLATIONS, getNewsUpdates, getFullManifesto, getMilestones, CANDIDATE_NAME, CANDIDATE_NAME_BN, PARTY, PARTY_BN, CONTACT_PHONE, CONTACT_EMAIL, OFFICE_ADDRESS_EN, OFFICE_ADDRESS_BN } from '../constants';

const KEYS = {
  NEWS: 'zainul_campaign_news',
  MANIFESTO: 'zainul_campaign_manifesto',
  BIO: 'zainul_campaign_bio',
  PROFILE: 'zainul_campaign_profile',
  ADMINS: 'zainul_campaign_admins',
  SUGGESTIONS: 'zainul_campaign_suggestions',
  VOLUNTEERS: 'zainul_campaign_volunteers',
  VISION2030: 'zainul_campaign_vision2030',
  YOUTH: 'zainul_campaign_youth',
  SUPPORT_CONFIG: 'zainul_campaign_support_config'
};

export const initStorage = () => {
  if (!localStorage.getItem(KEYS.NEWS)) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify({
      en: getNewsUpdates('en'),
      bn: getNewsUpdates('bn')
    }));
  }
  if (!localStorage.getItem(KEYS.MANIFESTO)) {
    localStorage.setItem(KEYS.MANIFESTO, JSON.stringify({
      en: getFullManifesto('en'),
      bn: getFullManifesto('bn')
    }));
  }
  if (!localStorage.getItem(KEYS.BIO)) {
    localStorage.setItem(KEYS.BIO, JSON.stringify({
      en: getMilestones('en'),
      bn: getMilestones('bn')
    }));
  }
  if (!localStorage.getItem(KEYS.PROFILE)) {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify({
      name_en: CANDIDATE_NAME,
      name_bn: CANDIDATE_NAME_BN,
      party_en: PARTY,
      party_bn: PARTY_BN,
      phone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      addr_en: OFFICE_ADDRESS_EN,
      addr_bn: OFFICE_ADDRESS_BN,
      role1_en: TRANSLATIONS.en.hero.role1,
      role1_bn: TRANSLATIONS.bn.hero.role1,
      role2_en: TRANSLATIONS.en.hero.role2,
      role2_bn: TRANSLATIONS.bn.hero.role2,
      nominee_full_en: TRANSLATIONS.en.hero.nominee_full,
      nominee_full_bn: TRANSLATIONS.bn.hero.nominee_full,
      subtitle_en: TRANSLATIONS.en.hero.subtitle,
      subtitle_bn: TRANSLATIONS.bn.hero.subtitle,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000'
    }));
  }
  if (!localStorage.getItem(KEYS.SUPPORT_CONFIG)) {
    localStorage.setItem(KEYS.SUPPORT_CONFIG, JSON.stringify({
      bank_account: "Zainul Campaign Fund",
      bank_number: "Acc: 102XXXXX231",
      volunteer_roles: [
        { title_en: "Door-to-Door Campaigning", title_bn: "দ্বারে দ্বারে প্রচার" },
        { title_en: "Social Media Team", title_bn: "সোশ্যাল মিডিয়া টিম" },
        { title_en: "Event Planning", title_bn: "ইভেন্ট প্ল্যানিং" },
        { title_en: "Legal Research", title_bn: "আইনি গবেষণা" }
      ]
    }));
  }
  if (!localStorage.getItem(KEYS.ADMINS)) {
    localStorage.setItem(KEYS.ADMINS, JSON.stringify([
      { username: 'admin', password: 'Bangla@1216', role: 'Super Admin' },
      { username: 'jewel', password: 'Dhaka@1216', role: 'Admin' }
    ]));
  }
  if (!localStorage.getItem(KEYS.SUGGESTIONS)) {
    localStorage.setItem(KEYS.SUGGESTIONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.VOLUNTEERS)) {
    localStorage.setItem(KEYS.VOLUNTEERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.VISION2030)) {
    localStorage.setItem(KEYS.VISION2030, JSON.stringify({
      en: {
        subtitle: TRANSLATIONS.en.vision2030.subtitle,
        intro: TRANSLATIONS.en.vision2030.intro,
        pillars: [
          { title: TRANSLATIONS.en.vision2030.pillar1, desc: TRANSLATIONS.en.vision2030.pillar1_desc },
          { title: TRANSLATIONS.en.vision2030.pillar2, desc: TRANSLATIONS.en.vision2030.pillar2_desc },
          { title: TRANSLATIONS.en.vision2030.pillar3, desc: TRANSLATIONS.en.vision2030.pillar3_desc },
          { title: TRANSLATIONS.en.vision2030.pillar4, desc: TRANSLATIONS.en.vision2030.pillar4_desc },
        ]
      },
      bn: {
        subtitle: TRANSLATIONS.bn.vision2030.subtitle,
        intro: TRANSLATIONS.bn.vision2030.intro,
        pillars: [
          { title: TRANSLATIONS.bn.vision2030.pillar1, desc: TRANSLATIONS.bn.vision2030.pillar1_desc },
          { title: TRANSLATIONS.bn.vision2030.pillar2, desc: TRANSLATIONS.bn.vision2030.pillar2_desc },
          { title: TRANSLATIONS.bn.vision2030.pillar3, desc: TRANSLATIONS.bn.vision2030.pillar3_desc },
          { title: TRANSLATIONS.bn.vision2030.pillar4, desc: TRANSLATIONS.bn.vision2030.pillar4_desc },
        ]
      }
    }));
  }
  if (!localStorage.getItem(KEYS.YOUTH)) {
    localStorage.setItem(KEYS.YOUTH, JSON.stringify({
      en: {
        subtitle: TRANSLATIONS.en.youth.subtitle,
        cards: [
          { title: TRANSLATIONS.en.youth.card1_title, desc: TRANSLATIONS.en.youth.card1_desc },
          { title: TRANSLATIONS.en.youth.card2_title, desc: TRANSLATIONS.en.youth.card2_desc },
          { title: TRANSLATIONS.en.youth.card3_title, desc: TRANSLATIONS.en.youth.card3_desc },
          { title: TRANSLATIONS.en.youth.card4_title, desc: TRANSLATIONS.en.youth.card4_desc },
        ]
      },
      bn: {
        subtitle: TRANSLATIONS.bn.youth.subtitle,
        cards: [
          { title: TRANSLATIONS.bn.youth.card1_title, desc: TRANSLATIONS.bn.youth.card1_desc },
          { title: TRANSLATIONS.bn.youth.card2_title, desc: TRANSLATIONS.bn.youth.card2_desc },
          { title: TRANSLATIONS.bn.youth.card3_title, desc: TRANSLATIONS.bn.youth.card3_desc },
          { title: TRANSLATIONS.bn.youth.card4_title, desc: TRANSLATIONS.bn.youth.card4_desc },
        ]
      }
    }));
  }
};

export const getData = (key: keyof typeof KEYS) => {
  let data = localStorage.getItem(KEYS[key]);
  if (!data) {
    initStorage();
    data = localStorage.getItem(KEYS[key]);
  }
  return data ? JSON.parse(data) : null;
};

export const saveData = (key: keyof typeof KEYS, data: any) => {
  localStorage.setItem(KEYS[key], JSON.stringify(data));
};

export const resetData = () => {
  localStorage.clear();
  initStorage();
  window.location.reload();
};
