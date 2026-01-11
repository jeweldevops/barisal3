
import { Language, TRANSLATIONS, getNewsUpdates, getFullManifesto, getMilestones, CANDIDATE_NAME, CANDIDATE_NAME_BN, PARTY, PARTY_BN, CONTACT_PHONE, CONTACT_EMAIL, OFFICE_ADDRESS_EN, OFFICE_ADDRESS_BN } from '../constants';

const KEYS = {
  NEWS: 'zainul_campaign_news',
  MANIFESTO: 'zainul_campaign_manifesto',
  BIO: 'zainul_campaign_bio',
  PROFILE: 'zainul_campaign_profile',
  ADMINS: 'zainul_campaign_admins',
  SUGGESTIONS: 'zainul_campaign_suggestions',
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
    }));
  }
  if (!localStorage.getItem(KEYS.ADMINS)) {
    localStorage.setItem(KEYS.ADMINS, JSON.stringify([
      { username: 'admin', password: 'bnp2026', role: 'Super Admin' },
      { username: 'jewel', password: 'Dhaka@1216', role: 'Admin' }
    ]));
  }
  if (!localStorage.getItem(KEYS.SUGGESTIONS)) {
    localStorage.setItem(KEYS.SUGGESTIONS, JSON.stringify([]));
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
