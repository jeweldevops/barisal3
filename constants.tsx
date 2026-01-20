
import React from 'react';
import { Gavel, Landmark, Heart, BookOpen, GraduationCap, Building2, Scale, Droplets, Tractor, HeartPulse, Laptop, Zap, Trophy, Rocket, Cpu, Flag, ShieldCheck, Globe, Handshake, Users, HeartHandshake, Shield, Sparkles, CreditCard } from 'lucide-react';

export const CANDIDATE_NAME = "Advocate Zainul Abedin";
export const CANDIDATE_NAME_BN = "এ্যাডভোকেট জয়নুল আবেদীন";
export const CONSTITUENCY = "Barisal-3 (Babuganj-Muladi)";
export const CONSTITUENCY_BN = "বরিশাল-৩ (বাবুগঞ্জ–মুলাদী)";
export const PARTY = "Bangladesh Nationalist Party-BNP";
export const PARTY_BN = "বাংলাদেশ জাতীয়তাবাদী দল-বিএনপি";
export const OFFICIAL_DOMAIN = "barisal3.com";

// Projected Election Date: 12 February 2026
export const ELECTION_DATE = "2026-02-12T08:00:00";

// Official contact details
export const CONTACT_PHONE = "+8801712932567";
export const CONTACT_EMAIL = "adv.zabedin@gmail.com";
export const OFFICE_ADDRESS_EN = "Muladi & Babuganj, Barisal";
export const OFFICE_ADDRESS_BN = "মুলাদী ও বাবুগঞ্জ, বরিশাল";

// Official portrait
export const CANDIDATE_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000";

export type Language = 'en' | 'bn';

export const TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      vision: "Manifesto",
      biography: "Biography",
      updates: "Updates",
      ai: "AI Assistant",
      support: "Support Us",
      feedback: "Your Opinion",
      youth: "Youth Vision",
      women: "Women's Vision",
      vision2030: "Vision 2030",
      back: "Back to Home"
    },
    women: {
      title: "Women's Empowerment & Rights",
      title_bn: "নারী ক্ষমতায়ন ও অধিকার",
      subtitle: "Building a safe, dignified, and inclusive future for the women of Babuganj & Muladi.",
      pillar1_title: "Safe & Justice-Oriented Barisal-3",
      pillar1_desc: "Establishing 24/7 dedicated help desks and free legal aid centers specifically for women's safety and protection.",
      pillar2_title: "Economic Self-Reliance",
      pillar2_desc: "Providing interest-free start-up capital and specialized market access for women entrepreneurs and small cottage industries.",
      pillar3_title: "Health & Maternity Care",
      pillar3_desc: "Modernizing every Union Health Complex with dedicated Mother and Child wings and free prenatal counseling.",
      pillar4_title: "Digital & Technical Skill",
      pillar4_desc: "Creating female-only IT training centers to bridge the digital gap and open doors to global freelancing.",
      pillar5_title: "BNP Declared Family Card",
      pillar5_desc: "Ensuring monthly subsistence allowance and essential commodity subsidies for low-income women through the party-declared Family Card system.",
      quote: '"A nation can only progress when its women are safe, educated, and economically independent."'
    },
    vision2030: {
      title: "Vision 2030",
      title_bn: "ভিশন ২০৩০",
      subtitle: "A national roadmap for a democratic, self-reliant, and modern Bangladesh.",
      intro: "Vision 2030 is our pledge to transform Bangladesh into a high-income, modern, and democratic state by the year 2030.",
      pillar1: "Democratic Restoration",
      pillar1_desc: "Restoring the rule of law, ensuring independence of the judiciary, and protecting freedom of speech.",
      pillar2: "Economic Growth",
      pillar2_desc: "Building a middle-income country through industrialization, infrastructure, and entrepreneurship.",
      pillar3: "Social Justice",
      pillar3_desc: "Eliminating poverty and ensuring equal rights for all citizens regardless of their background.",
      pillar4: "Foreign Policy",
      pillar4_desc: "Friendship to all, malice to none—protecting national interests on the global stage."
    },
    youth: {
      title: "The Bangladesh of Future in Youth's Thoughts",
      title_bn: "তারুণ্যের ভাবনায় আগামীর বাংলাদেশ",
      subtitle: "Empowering the next generation of Babuganj & Muladi through Technology, Innovation, and Leadership.",
      card1_title: "Freelancing & Gig Economy",
      card1_desc: "Establishing specialized IT hubs and high-speed internet zones in every union to create global employment opportunities.",
      card2_title: "Modern Sports Infrastructure",
      card2_desc: "Modernizing local stadiums and creating talent hunt programs for the youth of Barisal-3.",
      card3_title: "Entrepreneurship Fund",
      card3_desc: "Providing interest-free start-up capital for young entrepreneurs to build local industries.",
      card4_title: "Digital Education",
      card4_desc: "Introducing smart classrooms and coding bootcamps in all local high schools and colleges."
    },
    hero: {
      nominee: "General Election 2026 Candidate",
      nominee_full: "BNP Nominated Candidate for Bangladesh General Election 2026 — Barisal-3 (Muladi-Babuganj)",
      title: "A Voice of Justice for Barisal-3",
      subtitle: "Advocate Zainul Abedin is dedicated to building a prosperous, safe, and just future for the people of Babuganj and Muladi in the upcoming General Election.",
      cta_manifesto: "View Our Manifesto",
      cta_updates: "Latest Updates",
      stat_years: "Years of Legal Excellence",
      stat_focus: "Focus Constituency",
      stat_roadmap: "Development Roadmap",
      role1: "Vice-Chairman, BNP & President, Jatiotabadi Ainjibi Forum",
      role2: "Vice-Chairman, Bangladesh Bar Council & Former President, SCBA"
    },
    feedback: {
      title: "Your Opinion, Our Policy",
      subtitle: "Share your thoughts to build the Bangladesh of the future.",
      form_heading: "Submit Your Suggestion",
      fullName: "Full Name *",
      gender: "Gender *",
      profession: "Profession *",
      organization: "Organization/Institution *",
      phone: "Mobile Number *",
      email: "Email *",
      thana: "Upazila / Thana *",
      union: "Union *",
      village: "Village *",
      category: "Policy Category *",
      message: "Your Detailed Suggestion",
      submit: "Send Suggestion",
      success_title: "Thank You for Your Vision!",
      success_desc: "Your suggestion has been recorded and will be reviewed by our policy committee for the 2026 Manifesto.",
      gender_options: ["Male", "Female", "Other"],
      thana_options: ["Babuganj", "Muladi"],
      unions: {
        "Babuganj": ["Jahangirnagar Union", "Kedarpur Union", "Dehergoti Union", "Chandpasha Union", "Rahmatpur Union", "Madhabpasha Union"],
        "Muladi": ["Batamara Union", "Nazirpur Union", "Safipur Union", "Gachua Union", "Charkalekhan Union", "Muladi Union", "Kazirchar Union", "Muladi Pourashava"]
      },
      categories: [
        "Infrastructure", 
        "Education", 
        "Healthcare", 
        "Agriculture", 
        "Youth & IT", 
        "Legal Reform", 
        "Employment", 
        "Expatriates", 
        "Family Card", 
        "Sports", 
        "Environment", 
        "Farmer Card", 
        "Honor for Imams & Muazzins", 
        "Corruption-free Bangladesh", 
        "Other"
      ]
    },
    vision: {
      heading: "Our Commitment",
      subheading: "Manifesto for a Prosperous Barisal-3",
      desc: "A comprehensive plan focused on sustainable development, judicial integrity, and local empowerment for the 2026 mandate.",
      cta_full: "Explore Full 2026 Manifesto Roadmap",
      pledge_title: "Our Pledge",
      pledge_quote: '"This manifesto is my sacred contract with you. I pledge my life\'s experience as an Advocate to ensure that Barisal-3 becomes a model of justice and development after the 2026 General Election."',
      roadmap_title: "Strategic Timeline",
      roadmap_subtitle: "The First 1000 Days",
      download_title: "Download Full Manifesto",
      download_desc: "Available in PDF (English & Bengali versions)",
      download_bn: "Download Bengali PDF",
      download_en: "English Version"
    },
    bio: {
      heading: "A Prominent Figure in Legal Arena",
      title: "A Life Dedicated to Justice",
      subtitle: "Senior Advocate Zainul Abedin is a highly respected and prominent lawyer practicing in the Supreme Court of Bangladesh. With a legal career spanning several decades, he has established himself as a leading figure within the country's judiciary and legal fraternity.",
      detailed_bio: "Mr. Abedin began his legal journey in 1980 and was enrolled as an Advocate with the Bangladesh Bar Council. He achieved the esteemed status of Senior Advocate at the Supreme Court of Bangladesh in 2003, a testament to his expertise, experience, and standing in the legal profession. Throughout his distinguished career, he has held significant positions including President of the SCBA multiple times and elected member of the Bangladesh Bar Council. As the founder of Zainul Abedin & Associates (est. 1988), he oversees a wide range of legal matters from civil litigation to constitutional law.",
      stat_years: "Years of Service",
      journey: "Legal & Political Journey",
      chronicles: "Chronicles of Service",
      roots_title: "Deep Roots in Barisal-3",
      roots_desc: "Advocate Zainul Abedin's heart has always resided in the villages of Babuganj and the fields of Muladi. His political candidacy is a natural extension of his lifelong commitment to these communities.",
      personal_points: [
        "Regular presence in constituency during festivals and crises",
        "Supporting local educational institutions and religious centers",
        "Developing grassroots leadership for future generations"
      ],
      legal_leadership: "President, Jatiotabadi Ainjibi Forum",
      political_leadership: "Vice-Chairman, BNP"
    },
    updates: {
      badge: "News & Media",
      title: "Campaign Chronicle",
      subtitle: "Stay updated with the latest news, events, and strategic milestones from the official campaign of Zainul Abedin across Barisal-3 for the 2026 General Election.",
      search_placeholder: "Search news...",
      no_results: "No updates found",
      clear_filters: "Clear all filters",
      newsletter_title: "Never miss a critical update",
      newsletter_desc: "Sign up for alerts about rallies and press conferences.",
      subscribe: "Subscribe",
      read_more: "Read Full Article"
    },
    support: {
      title: "Support the Movement",
      subtitle: "Every voice matters. Join thousands of supporters in Barisal-3 working together for justice in the 2026 General Election.",
      form_title: "Join the Campaign Team",
      form_thanks: "Thank You!",
      form_success: "Your application has been received.",
      form_name: "Full Name *",
      form_gender: "Gender *",
      form_profession: "Profession *",
      form_phone: "Mobile Number *",
      form_email: "Email Address *",
      form_thana: "Upazila / Thana *",
      form_union: "Union *",
      form_village: "Village *",
      form_polling: "Polling Station",
      form_role: "Campaign Role / How would you like to help?",
      form_submit: "Register as Volunteer",
      financial_title: "Financial Contributions",
      financial_desc: "Your donations help us reach every household in the constituency.",
      bank_label: "Official Bank Account",
      media_kit: "Download Media Kit",
      office_title: "Visit Our Offices",
      office_desc: "Visit us to pick up campaign materials or speak with our coordinators.",
      hotline: "Campaign Hotline"
    },
    ai: {
      badge: "New: AI Assistant",
      heading: "Have questions for the campaign?",
      desc: "Interact with our dedicated AI Campaign Helper to learn instantly about our vision and plans for the 2026 election.",
      cta: "Open AI Assistant",
      prompt1: "What is the plan for river erosion?",
      prompt2: "Tell me more about education...",
      placeholder: "Ask a question..."
    },
    footer: {
      desc: "Official election campaign platform. Dedicated to justice and development.",
      links: "Quick Links",
      contact: "Contact Office",
      rights: "Official Campaign of Zainul Abedin. Authorized by BNP Election Committee for General Election 2026."
    },
    admin: {
      dashboard: "Dashboard",
      overview: "Overview",
      news: "News Feed",
      manifesto: "Manifesto",
      bio: "Biography",
      suggestions: "Suggestions",
      settings: "Account Access",
      hub: "CMS HUB",
      center: "Campaign Center",
      exit: "Exit Admin",
      save_profile: "Update Official Profile",
      save_news: "Deploy News Updates",
      save_manifesto: "Update Manifesto",
      save_bio: "Save Biography",
      reset: "Factory Reset",
      identity: "Candidate Identity & Roles",
      identity_desc: "Official profile data used across the hero section and footer.",
      manager: "Manager",
      lang_preference: "Language Preference"
    }
  },
  bn: {
    nav: {
      home: "মূল পাতা",
      vision: "ইশতেহার",
      biography: "জীবনী",
      updates: "আপডেট",
      ai: "এআই অ্যাসিস্ট্যান্ট",
      support: "সহযোগিতা করুন",
      feedback: "আপনার মতামত",
      youth: "তারুণ্যের ভাবনা",
      women: "নারীদের ভিশন",
      vision2030: "ভিশন ২০৩০",
      back: "মূল পাতায় ফিরুন"
    },
    women: {
      title: "নারী ক্ষমতায়ন ও অধিকার",
      title_bn: "নারীদের ভিশন",
      subtitle: "বাবুগঞ্জ ও মুলাদীর নারীদের জন্য একটি নিরাপদ, মর্যাদাশীল এবং অন্তর্ভুক্তিমূলক ভবিষ্যৎ গড়ে তোলা।",
      pillar1_title: "নিরাপদ ও ন্যায়বিচার-মুখী বরিশাল-৩",
      pillar1_desc: "নারীদের নিরাপত্তা ও সুরক্ষার জন্য ২৪/৭ ডেডিকেটেড হেল্প ডেস্ক এবং বিশেষায়িত ফ্রি আইনি সহায়তা কেন্দ্র স্থাপন।",
      pillar2_title: "অর্থনৈতিক স্বনির্ভরতা",
      pillar2_desc: "নারী উদ্যোক্তা এবং ক্ষুদ্র কুটির শিল্পের জন্য সুদমুক্ত স্টার্ট-আপ পুঁজি এবং বিশেষ বাজার সুবিধা প্রদান।",
      pillar3_title: "স্বাস্থ্য ও মাতৃত্বকালীন সেবা",
      pillar3_desc: "প্রতিটি ইউনিয়ন স্বাস্থ্য কমপ্লেক্সে মা ও শিশু ইউনিট এবং বিনামূল্যে প্রসবপূর্ব পরামর্শ প্রদানের জন্য আধুনিকায়ন।",
      pillar4_title: "ডিজিটাল ও কারিগরি দক্ষতা",
      pillar4_desc: "ডিজিটাল ব্যবধান কমাতে এবং বিশ্বজুড়ে ফ্রিল্যান্সিংয়ের সুযোগ তৈরি করতে শুধুমাত্র নারীদের জন্য আইটি ট্রেনিং সেন্টার গড়ে তোলা।",
      pillar5_title: "বিএনপি ঘোষিত ফ্যামিলি কার্ড",
      pillar5_desc: "অল্প আয়ের পরিবারের নারীদের জন্য মাসিক জীবনধারণ ভাতা এবং প্রয়োজনীয় পণ্য ভর্তুকি নিশ্চিত করতে বিএনপি ঘোষিত 'ফ্যামিলি কার্ড' সুবিধা প্রদান।",
      quote: '"একটি জাতি তখনই উন্নতি করতে পারে যখন তার নারীরা নিরাপদ, শিক্ষিত এবং অর্থনৈতিকভাবে স্বাধীন থাকে।"'
    },
    vision2030: {
      title: "ভিশন ২০৩০",
      title_bn: "ভিশন ২০৩০",
      subtitle: "একটি গণতান্ত্রিক, স্বনির্ভর এবং আধুনিক বাংলাদেশের জন্য জাতীয় রূপরেখা।",
      intro: "ভিশন ২০৩০ হলো ২০৩০ সালের মধ্যে বাংলাদেশকে একটি উচ্চ-আয়ের, আধুনিক এবং গণতান্ত্রিক রাষ্ট্রে পরিণত করার আমাদের অঙ্গীকার।",
      pillar1: "গণতন্ত্র পুনরুদ্ধার",
      pillar1_desc: "আইনের শাসন পুনঃপ্রতিষ্ঠা, বিচার বিভাগের স্বাধীনতা নিশ্চিত করা এবং মত প্রকাশের স্বাধীনতা রক্ষা।",
      pillar2: "অর্থনৈতিক প্রবৃদ্ধি",
      pillar2_desc: "শিল্পায়ন, অবকাঠামো এবং উদ্যোক্তা তৈরির মাধ্যমে একটি মধ্যম আয়ের দেশ গঠন।",
      pillar3: "সামাজিক ন্যায়বিচার",
      pillar3_desc: "দারিদ্র্য বিমোচন এবং সকল নাগরিকের জন্য সমান অধিকার নিশ্চিত করা।",
      pillar4: "পররাষ্ট্র নীতি",
      pillar4_desc: "সকলের সাথে বন্ধুত্ব, কারো সাথে বৈরিতা নয়—বিশ্ব মঞ্চে জাতীয় স্বার্থ রক্ষা।"
    },
    youth: {
      title: "তারুণ্যের ভাবনায় আগামীর বাংলাদেশ",
      title_bn: "তারুণ্যের ভাবনায় আগামীর বাংলাদেশ",
      subtitle: "প্রযুক্তি, উদ্ভাবন এবং নেতৃত্বের মাধ্যমে বাবুগঞ্জ ও মুলাদীর আগামী প্রজন্মকে ক্ষমতায়ন করা।",
      card1_title: "ফ্রিল্যান্সিং ও গিগ ইকোনমি",
      card1_desc: "বিশ্বজুড়ে কর্মসংস্থানের সুযোগ তৈরির জন্য প্রতিটি ইউনিয়নে বিশেষায়িত আইটি হাব এবং উচ্চগতির ইন্টারনেট জোন স্থাপন।",
      card2_title: "আধুনিক ক্রীড়া অবকাঠামো",
      card2_desc: "বরিশাল-৩ এর তরুণদের জন্য স্থানীয় স্টেডিয়ামগুলোর আধুনিকায়ন এবং প্রতিভা অনেষণ কর্মসূচি তৈরি।",
      card3_title: "উদ্যোক্তা তহবিল",
      card3_desc: "তরুণ উদ্যোক্তাদের স্থানীয় শিল্প গড়ে তোলার জন্য সুদমুক্ত স্টার্ট-আপ পুঁজি প্রদান।",
      card4_title: "ডিজিটাল শিক্ষা",
      card4_desc: "সব স্থানীয় হাই স্কুল ও কলেজে স্মার্ট ক্লাসরুম এবং কোডিং বুটক্যাম্প চালু করা।"
    },
    hero: {
      nominee: "জাতীয় নির্বাচন ২০২৬ প্রার্থী",
      nominee_full: "বিএনপি মনোনীত সংসদ সদস্য প্রার্থী — বরিশাল-৩ (বাবুগঞ্জ–মুলাদী)",
      title: "বরিশাল-৩ এর জন্য ন্যায়ের কণ্ঠস্বর",
      subtitle: "এ্যাডভোকেট জয়নুল আবেদীন আসন্ন জাতীয় নির্বাচনে বাবুগঞ্জ ও মুলাদীর জনগণের জন্য একটি সমৃদ্ধ, নিরাপদ ও ন্যায়সঙ্গত ভবিষ্যৎ গড়তে অঙ্গীকারবদ্ধ।",
      cta_manifesto: "আমাদের ইশতেহার দেখুন",
      cta_updates: "সাম্প্রতিক আপডেট",
      stat_years: "আইনি পেশায় ৩৫+ বছর",
      stat_focus: "নির্বাচনী এলাকা",
      stat_roadmap: "উন্নয়ন রোডম্যাপ",
      role1: "ভাইস চেয়ারম্যান — বিএনপি ও সভাপতি — জাতীয়তাবাদী আইনজীবী ফোরাম",
      role2: "ভাইস চেয়ারম্যান — বাংলাদেশ বার কাউন্সিল ও সাবেক সভাপতি — সুপ্রিমকোর্ট বার"
    },
    feedback: {
      title: "আপনার মতামত, আমাদের নীতি",
      subtitle: "আগামীর বাংলাদেশ বিনির্মাণে আপনার মতামত দিন।",
      form_heading: "আপনার প্রস্তাবনা জমা দিন",
      fullName: "পুরো নাম *",
      gender: "লিঙ্গ *",
      profession: "পেশা *",
      organization: "প্রতিষ্ঠান/ইনস্টিটিউশন *",
      phone: "মোবাইল নম্বর *",
      email: "ইমেইল *",
      thana: "উপজেলা/ Thana *",
      union: "ইউনিয়ন/ Union *",
      village: "গ্রাম/Village *",
      category: "বিষয়ের বিভাগ *",
      message: "আপনার বিস্তারিত প্রস্তাবনা",
      submit: "মতামত পাঠান",
      success_title: "আপনার মতামতের জন্য ধন্যবাদ!",
      success_desc: "আপনার প্রস্তাবনাটি সংরক্ষিত হয়েছে এবং ২০২৬ সালের নির্বাচনী ইশতেহার তৈরির জন্য আমাদের পলিসি কমিটি এটি পর্যালোচনা করবে।",
      gender_options: ["পুরুষ", "নারী", "অন্যান্য"],
      thana_options: ["বাবুগঞ্জ", "মুলাদী"],
      unions: {
        "Babuganj": ["জাহাঙ্গীরনগর ইউনিয়ন", "কেদারপুর ইউনিয়ন", "দেহেরগতি ইউনিয়ন", "চাঁদপাশা ইউনিয়ন", "রহমতপুর ইউনিয়ন", "মাধবপাশা ইউনিয়ন"],
        "Muladi": ["বাটামারা ইউনিয়ন", "নাজিরপুর ইউনিয়ন", "সফিপুর ইউনিয়ন", "গাছুয়া ইউনিয়ন", "চরকালেখান ইউনিয়ন", "মুলাদী ইউনিয়ন", "কাজীরচর ইউনিয়ন", "মুলাদী পৌরসভা"]
      },
      categories: [
        "অবকাঠামো", 
        "শিক্ষা", 
        "স্বাস্থ্যসেবা", 
        "কৃষি", 
        "তরুণ ও আইটি", 
        "আইনি সংস্কার", 
        "কর্মসংস্থান", 
        "প্রবাসী", 
        "ফ্যামিলি কার্ড", 
        "ক্রীড়া", 
        "পরিবেশ", 
        "কৃষক কার্ড", 
        "ইমাম মুয়াজ্জিনের সম্মান", 
        "দুর্নীতিমুক্ত বাংলাদেশ", 
        "অন্যান্য"
      ]
    },
    vision: {
      heading: "আমাদের অঙ্গীকার",
      subheading: "সমৃদ্ধ বরিশাল-৩ এর ইশতেহার",
      desc: "টেকসই উন্নয়ন, বিচারিক সততা এবং ২০২৬ সালের নির্বাচনী ম্যান্ডেটের ওপর আলোকপাত করে একটি ব্যাপক পরিকল্পনা।",
      cta_full: "সম্পূর্ণ ২০২৬ ইশহার রোডম্যাপ দেখুন",
      pledge_title: "আমাদের অঙ্গীকার",
      pledge_quote: '"এই ইশতেহারটি আপনার সাথে আমার পবিত্র চুক্তি। আমি আমার জীবনের অভিজ্ঞতাকে এ্যাডভোকেট হিসেবে ব্যবহার করে ২০২৬ সালের নির্বাচনের পর বরিশাল-৩ কে ন্যায়বিচার ও উন্নয়নের মডেলে পরিণত করার অঙ্গীকার করছি।।',
      roadmap_title: "কৌশলগত টাইমলাইন",
      roadmap_subtitle: "প্রথম ১০০০ দিন",
      download_title: "সম্পূর্ণ ইশতেহার ডাউনলোড করুন",
      download_desc: "পিডিএফ ফরম্যাটে উপলব্ধ (ইংরেজি ও বাংলা সংস্করণ)",
      download_bn: "বাংলা পিডিএফ ডাউনলোড",
      download_en: "ইংরেজি সংস্করণ"
    },
    bio: {
      heading: "বাংলাদেশের আইনি অঙ্গনের এক উজ্জ্বল নক্ষত্র",
      title: "ন্যায়বিচারের জন্য উৎসর্গীকৃত জীবন",
      subtitle: "সিনিয়র এ্যাডভোকেট জয়নুল আবেদীন বাংলাদেশ সুপ্রিম কোর্টের একজন অত্যন্ত সম্মানিত ও প্রথিতযশা আইনজীবী। দীর্ঘ কয়েক দশকের আইনি ক্যারিয়ারে তিনি দেশের বিচার বিভাগ ও আইনি অঙ্গনে নিজেকে এক শীর্ষস্থানীয় ব্যক্তিত্ব হিসেবে প্রতিষ্ঠিত করেছেন।",
      detailed_bio: "জনাব আবেদীন ১৯৮০ সালে তাঁর আইনি যাত্রা শুরু করেন এবং বাংলাদেশ বার কাউন্সিলে এ্যাডভোকেট হিসেবে তালিকাভুক্ত হন। ২০০৩ সালে তিনি বাংলাদেশ সুপ্রিম কোর্টের 'সিনিয়র এ্যাডভোকেট' হিসেবে মর্যাদা লাভ করেন। তাঁর বর্ণাধ্য ক্যারিয়ারে তিনি একাধিকবার সুপ্রিম কোর্ট আইনজীবী সমিতির সভাপতি নির্বাচিত হয়েছেন এবং বাংলাদেশ বার কাউন্সিলের নির্বাচিত সদস্য হিসেবে দায়িত্ব পালন করেছেন। ১৯৮৮ সালে প্রতিষ্ঠিত 'জয়নুল আবেদীন অ্যান্ড অ্যাসোসিয়েটস'-এর প্রতিষ্ঠাতা হিসেবে তিনি দেওয়ানি, ফৌজদারি ও সাংবিধানিক আইনের অসংখ্য গুরুত্বপূর্ণ মামলা পরিচালনা করে আসছেন।",
      stat_years: "সেবার বছর",
      journey: "আইনি ও রাজনৈতিক যাত্রা",
      chronicles: "সেবার ইতিবৃত্ত",
      roots_title: "বরিশাল-৩ এ গভীর শিকড়",
      roots_desc: "এ্যাডভোকেট জয়নুল আবেদীনের হৃদয় সবসময় বাবুগঞ্জের গ্রাম এবং মুলাদীর মাঠে রয়েছে। তাঁর রাজনৈতিক প্রার্থিতা এই জনপদগুলোর প্রতি তাঁর আজীবন অঙ্গীকারেরই প্রতিফলন।",
      personal_points: [
        "উৎসব ও সংকটের সময় নির্বাচনী এলাকায় নিয়মিত উপস্থিতি",
        "স্থানীয় শিক্ষা প্রতিষ্ঠান ও ধর্মীয় কেন্দ্রে সহায়তা",
        "ভবিষ্যৎ প্রজন্মের জন্য তৃণমূল নেতৃত্ব গড়ে তোলা"
      ],
      legal_leadership: "সভাপতি — জাতীয়তাবাদী আইনজীবী ফোরাম",
      political_leadership: "ভাইস চেয়ারম্যান — বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)"
    },
    updates: {
      badge: "খ খবর ও মিডিয়া",
      title: "ক্যাম্পেইন ক্রনিকল",
      subtitle: "২০২৬ সালের জাতীয় নির্বাচন উপলক্ষে বরিশাল-৩ জুড়ে জয়নুল আবেদীনের অফিসিয়াল ক্যাম্পেইনের সর্বশেষ খবর ও মাইলফলক সম্পর্কে আপডেট থাকুন।",
      search_placeholder: "খবর খুঁজুন...",
      no_results: "কোন আপডেট পাওয়া যায়নি",
      clear_filters: "ফিল্টার মুছে ফেলুন",
      newsletter_title: "গুরুত্বপূর্ণ আপডেট মিস করবেন না",
      newsletter_desc: "তৎক্ষণাৎ বিজ্ঞপ্তি পেতে আমাদের মোবাইল অ্যালার্টে সাইন আপ করুন।",
      subscribe: "সাবস্ক্রাইব করুন",
      read_more: "সম্পূর্ণ সংবাদ পড়ুন"
    },
    support: {
      title: "আন্দোলনে যোগ দিন",
      subtitle: "২০২৬ সালের জাতীয় নির্বাচনে ন্যায়বিচার ও উন্নয়ন নিশ্চিত করতে বরিশাল-৩ এর হাজার হাজার সমর্থকের সাথে যোগ দিন।",
      form_title: "ক্যাম্পেইন টিমে যোগ দিন",
      form_thanks: "ধন্যবাদ!",
      form_success: "আপনার আবেদন গ্রহণ করা হয়েছে।",
      form_name: "পুরো নাম *",
      form_gender: "লিঙ্গ *",
      form_profession: "পেশা *",
      form_phone: "মোবাইল নম্বর *",
      form_email: "ইমেইল *",
      form_thana: "উপজেলা/ Thana *",
      form_union: "ইউনিয়ন/ Union *",
      form_village: "গ্রাম/Village *",
      form_polling: "ভোটকেন্দ্র",
      form_role: "ভুমিকা/Role",
      form_submit: "স্বেচ্ছাসেবক হিসেবে নিবন্ধন করুন",
      financial_title: "আর্থিক অবদান",
      financial_desc: "আপনার অনুদান আমাদের প্রতিটি পরিবারে পৌঁছাতে সাহায্য করে।",
      bank_label: "অফিসিয়াল ব্যাংক অ্যাকাউন্ট",
      media_kit: "মিডিয়া কিট ডাউনলোড",
      office_title: "আমাদের অফিস পরিদর্শন করুন",
      office_desc: "প্রচার সামগ্রী সংগ্রহ করতে বা এলাকা সমন্বয়কারীর সাথে কথা বলতে আমাদের অফিসে আসুন।",
      hotline: "ক্যাম্পেইন হটলাইন"
    },
    ai: {
      badge: "নতুন: এআই অ্যাসিস্ট্যান্ট",
      heading: "ক্যাম্পেইন নিয়ে কোনো প্রশ্ন আছে?",
      desc: "২০২৬ সালের নির্বাচন ও আমাদের পরিকল্পনা সম্পর্কে তাৎক্ষণিকভাবে জানতে আমাদের এআই হেল্পারের সাথে কথা বলুন।",
      cta: "এআই অ্যাসিস্ট্যান্ট খুলুন",
      prompt1: "নদী ভাঙন রোধে পরিকল্পনা কী?",
      prompt2: "শিক্ষা ব্যবস্থা নিয়ে আরও বলুন...",
      placeholder: "প্রশ্ন জিজ্ঞাসা করুন..."
    },
    footer: {
      desc: "অফিসিয়াল নির্বাচনী প্রচার প্ল্যাটফর্ম। ২০২৬ জাতীয় নির্বাচনের জন্য নিবেদিত।",
      links: "দ্রুত লিঙ্ক",
      contact: "যোগাযোগ",
      rights: "জয়নুল আবেদীনের অফিসিয়াল ক্যাম্পেইন। ২০২৬ জাতীয় নির্বাচনের জন্য বিএনপি নির্বাচন কমিটি দ্বারা অনুমোদিত।"
    },
    admin: {
      dashboard: "ড্যাশবোর্ড",
      overview: "ওভারভিউ",
      news: "নিউজ ফিড",
      manifesto: "ইশতেহার",
      bio: "জীবনী",
      suggestions: "প্রস্তাবনাসমূহ",
      settings: "অ্যাকাউন্ট অ্যাক্সেস",
      hub: "সিএমএস হাব",
      center: "ক্যাম্পেইন সেন্টার",
      exit: "প্রস্থান করুন",
      save_profile: "অফিসিয়াল প্রোফাইল আপডেট করুন",
      save_news: "নিউজ আপডেট সেভ করুন",
      save_manifesto: "ইশতেহার আপডেট করুন",
      save_bio: "জীবনী সেভ করুন",
      reset: "ফ্যাক্টরি রিসেট",
      identity: "প্রার্থীর পরিচয় ও ভূমিকা",
      identity_desc: "হিরো সেকশন এবং ফুটারে ব্যবহৃত অফিসিয়াল প্রোফাইল ডাটা।",
      manager: "ম্যানেজার",
      lang_preference: "ভাষা পছন্দ"
    }
  }
};

export const getManifestoPoints = (lang: Language) => [
  {
    title: lang === 'en' ? "Justice & Rule of Law" : "ন্যায়বিচার ও আইনের শাসন",
    description: lang === 'en' ? "Strengthening local judicial accessibility." : "স্থানীয় বিচার ব্যবস্থার সহজলভ্যতা নিশ্চিত করা।",
    icon: <Gavel className="w-8 h-8 text-green-700" />
  },
  {
    title: lang === 'en' ? "River Erosion Control" : "নদী ভাঙন রোধ",
    description: lang === 'en' ? "Permanent embankment solutions for Babuganj-Muladi." : "বাবুগঞ্জ-মুলাদীর জন্য স্থায়ী বাঁধ নির্মাণ।",
    icon: <Landmark className="w-8 h-8 text-green-700" />
  },
  {
    title: lang === 'en' ? "Healthcare Revolution" : "স্বাস্থ্যসেবায় বিপ্লব",
    description: lang === 'en' ? "Modernizing Upazila Health Complexes." : "উপজেলা স্বাস্থ্য কমপ্লেক্সের আধুনিকায়ন।",
    icon: <Heart className="w-8 h-8 text-green-700" />
  },
  {
    title: lang === 'en' ? "Educational Excellence" : "শিক্ষায় উৎকর্ষ",
    description: lang === 'en' ? "Vocational training for youth empowerment." : "তরুণদের ক্ষমতায়নে কারিগরি প্রশিক্ষণ।",
    icon: <GraduationCap className="w-8 h-8 text-green-700" />
  }
];

export const getFullManifesto = (lang: Language) => [
  {
    title: lang === 'en' ? "Judiciary & Human Rights" : "বিচার বিভাগ ও মানবাধিকার",
    description: lang === 'en' ? "As an Advocate, I am committed to a transparent, independent, and accessible legal system." : "এ্যাডভোকেট হিসেবে আমি একটি স্বচ্ছ, স্বাধীন এবং সহজলভ্য আইনি ব্যবস্থা নিশ্চিত করতে অঙ্গীকারবদ্ধ।",
    icon: <Scale className="w-10 h-10 text-green-700" />,
    points: lang === 'en' ? [
      "Establishment of 24/7 Free Legal Aid Centers in every Union.",
      "Protection against political harassment and false litigations.",
      "Digitization of local administration for zero-corruption transparency."
    ] : [
      "প্রতিটি ইউনিয়নে ২৪/৭ ফ্রি আইনি সহায়তা কেন্দ্র স্থাপন।",
      "রাজনৈতিক হয়রানি ও মিথ্যা মামলার বিরুদ্ধে সুরক্ষা।",
      "দুর্নীতিমুক্ত স্বচ্ছতার জন্য স্থানীয় প্রশাসনের ডিজিটালকরণ।"
    ]
  },
  {
    title: lang === 'en' ? "River Erosion & Embankment" : "নদী ভাঙন ও বাঁধ",
    description: lang === 'en' ? "Babuganj and Muladi have suffered long enough from the Ariyal Khan river." : "বাবুগঞ্জ ও মুলাদী আড়িয়াল খাঁ নদীর ভাঙনে দীর্ঘকাল ভুগেছে।",
    icon: <Droplets className="w-10 h-10 text-red-600" />,
    points: lang === 'en' ? [
      "Permanent CC-Block embankment for all vulnerable points.",
      "Sustainable dredging projects to improve river navigation.",
      "Compensation and rehabilitation for erosion-affected families."
    ] : [
      "সব ঝুঁকিপূর্ণ পয়েন্টে স্থায়ী সসিসি-ব্লক বাঁধ নির্মাণ।",
      "নদীর নাব্যতা বৃদ্ধির জন্য টেকসই ড্রেজিং প্রকল্প।",
      "নদী ভাঙনে ক্ষতিগ্রস্ত পরিবারের ক্ষতিপূরণ ও পুনর্বাসন।"
    ]
  },
  {
    title: lang === 'en' ? "Agriculture & Rural Economy" : "কৃষি ও গ্রামীণ অর্থনীতি",
    description: lang === 'en' ? "Empowering our farmers with modern technology and direct market access." : "আধুনিক প্রযুক্তি ও সরাসরি বাজার সুবিধা দিয়ে কৃষকদের ক্ষমতায়ন।",
    icon: <Tractor className="w-10 h-10 text-green-700" />,
    points: lang === 'en' ? [
      "Solar-powered deep tube-well irrigation networks.",
      "Cold storage facilities for local produce in Babuganj.",
      "Interest-free loans for small-scale and dairy farmers."
    ] : [
      "সৌরবিদ্যুৎ চালিত গভীর নলকূপ সেচ ব্যবস্থা।",
      "বাবুগঞ্জে স্থানীয় পণ্যের জন্য হিমাগার সুবিধা।",
      "ক্ষুদ্র ও দুগ্ধ খামারিদের জন্য সুদমুক্ত ঋণ।"
    ]
  },
  {
    title: lang === 'en' ? "Health & Social Safety" : "স্বাস্থ্য ও সামাজিক সুরক্ষা",
    description: lang === 'en' ? "Quality healthcare is a right, not a privilege." : "মানসম্মত স্বাস্থ্যসেবা একটি অধিকার, সুযোগ নয়।",
    icon: <HeartPulse className="w-10 h-10 text-red-600" />,
    points: lang === 'en' ? [
      "Specialized Mother and Child Healthcare Wing in Muladi.",
      "Full diagnostic labs and X-Ray facilities in every Upazila.",
      "Mobile Health Units for remote riverine areas."
    ] : [
      "মুলাদীতে বিশেষায়িত মা ও শিশু স্বাস্থ্য উইং।",
      "প্রতিটি উপজেলায় পূর্ণাঙ্গ ডায়াগনস্টিক ল্যাব ও এক্স-রে সুবিধা।",
      "দুর্গম চরাঞ্চলের জন্য ভ্রাম্যমাণ স্বাস্থ্য ইউনিট।"
    ]
  },
  {
    title: lang === 'en' ? "Education & Digital Youth" : "শিক্ষা ও ডিজিটাল তরুণ সমাজ",
    description: lang === 'en' ? "Preparing our youth for the global gig economy." : "আমাদের তরুণদের বিশ্ব অর্থনীতি ও দক্ষ কর্মীবাহিনী হিসেবে গড়ে তোলা।",
    icon: <Laptop className="w-10 h-10 text-green-700" />,
    points: lang === 'en' ? [
      "Establishment of the Zainul Abedin IT & Vocational Institute.",
      "High-speed free Wi-Fi zones in important market centers.",
      "University scholarship fund for merit-based students."
    ] : [
      "জয়নুল আবেদীন আইটি ও ভোকেশনাল ইনস্টিটিউট স্থাপন।",
      "গুরুত্বপূর্ণ বাজার কেন্দ্রে উচ্চগতির ফ্রি ওয়াই-ফাই জোন।",
      "মেধাবী শিক্ষার্থীদের জন্য বিশ্ববিদ্যালয় স্কলারশিপ ফান্ড।"
    ]
  }
];

export const getMilestones = (lang: Language) => [
  {
    year: "1980",
    title: lang === 'en' ? "Legal Enrollment" : "আইনি যাত্রা শুরু",
    description: lang === 'en' ? "Began legal journey and was enrolled as an Advocate with the Bangladesh Bar Council." : "আইনি যাত্রা শুরু করেন এবং বাংলাদেশ বার কাউন্সিলে এ্যাডভোকেট হিসেবে তালিকাভুক্ত হন।"
  },
  {
    year: "1988",
    title: lang === 'en' ? "Founding of Firm" : "ল' ফার্ম প্রতিষ্ঠা",
    description: lang === 'en' ? "Established Zainul Abedin & Associates, overseeing diverse legal matters across Bangladesh." : "জয়নুল আবেদীন অ্যান্ড অ্যাসোসিয়েটস প্রতিষ্ঠা করেন, যা সারা দেশে বিভিন্ন আইনি সেবা দিয়ে আসছে।"
  },
  {
    year: "2003",
    title: lang === 'en' ? "Senior Advocate Status" : "সিনিয়র এ্যাডভোকেট মর্যাদা",
    description: lang === 'en' ? "Achieved the esteemed status of Senior Advocate at the Supreme Court of Bangladesh." : "বাংলাদেশ সুপ্রিম কোর্টের অত্যন্ত সম্মানজনক 'সিনিয়র এ্যাডভোকেট' মর্যাদা লাভ করেন।"
  },
  {
    year: "2011-2019",
    title: lang === 'en' ? "Leadership in SCBA" : "সুপ্রিম কোর্ট বার নেতৃত্ব",
    description: lang === 'en' ? "Elected President of the Supreme Court Bar Association multiple times (2011-12, 2017-18, 2018-19)." : "একাধিকবার সুপ্রিম কোর্ট আইনজীবী সমিতির সভাপতি নির্বাচিত হয়ে বিজ্ঞ আইনজীবীদের নেতৃত্ব দেন।"
  },
  {
    year: lang === 'en' ? "Present" : "বর্তমান",
    title: lang === 'en' ? "Vice-Chairman, BNP" : "বিএনপি ভাইস চেয়ারম্যান",
    description: lang === 'en' ? "Serving as Vice-Chairman of Bangladesh Nationalist Party and candidate for Barisal-3." : "বাংলাদেশ জাতীয়তাবাদী দলের ভাইস চেয়ারম্যান হিসেবে দায়িত্ব পালন এবং বরিশাল-৩ এর প্রার্থী।"
  }
];

export const getNewsUpdates = (lang: Language) => [
  {
    id: "1",
    date: lang === 'en' ? "Oct 24, 2023" : "২৪ অক্টোবর, ২০২৩",
    title: lang === 'en' ? "Advocate Zainul Abedin meets with Local Elders in Babuganj" : "বাবুগঞ্জে স্থানীয় মুরুব্বিদের সাথে এ্যাডভোকেট জয়নুল আবেদীনের মতবিনিময়",
    excerpt: lang === 'en' ? "The candidate discussed grassroots development plans for General Election 2026..." : "প্রার্থী ২০ ২৬ সালের জাতীয় নির্বাচনের তৃণমূল উন্নয়ন পরিকল্পনা নিয়ে আলোচনা করেন...",
    image: "https://picsum.photos/seed/campaign1/800/600",
    category: lang === 'en' ? "Community" : "সামাজিক"
  },
  {
    id: "2",
    date: lang === 'en' ? "Oct 20, 2023" : "২০ অক্টোবর, ২০২৩",
    title: lang === 'en' ? "Massive Rally in Muladi Market Area" : "মুলাদী বাজার এলাকায় বিশাল জনসভা",
    excerpt: lang === 'en' ? "Thousands gathered to hear the vision for a 'New Barisal-3' in 2026..." : "২০২৬ সালে 'নতুন বরিশাল-৩' এর লক্ষ্য শুনতে হাজার হাজার মানুষ সমবেত হন...",
    image: "https://picsum.photos/seed/campaign2/800/600",
    category: lang === 'en' ? "Rallies" : "জনসভা"
  },
  {
    id: "3",
    date: lang === 'en' ? "Oct 15, 2023" : "১৫ অক্টোবর, ২০২৩",
    title: lang === 'en' ? "Legal Aid Camp for Underprivileged Voters" : "অসহায় ভোটারদের জন্য আইনি সহায়তা ক্যাম্প",
    excerpt: lang === 'en' ? "A free legal clinic was held at the constituency office to support the 2026 mandate..." : "২০২৬ সালের ম্যান্ডেটকে সমর্থন করতে নির্বাচনী কার্যালয়ে একটি ফ্রি লিগ্যাল ক্লিনিক অনুষ্ঠিত হয়...",
    image: "https://picsum.photos/seed/campaign3/800/600",
    category: lang === 'en' ? "Legal Aid" : "আইনি সহায়তা"
  }
];
