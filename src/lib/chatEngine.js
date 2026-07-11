import { skills, experience, projects, education, socials } from '../data/portfolioData';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Simple word-level similarity scorer (Levenshtein-ish). Returns 0-1. */
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;
  const len = Math.max(a.length, b.length);
  if (len === 0) return 1;
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }
  return 1 - matrix[a.length][b.length] / len;
}

/** Check if any keyword fuzzy-matches any word in the input */
function fuzzyMatch(inputWords, keywords, threshold = 0.75) {
  return keywords.some((kw) =>
    inputWords.some((w) => similarity(w, kw) >= threshold),
  );
}

/** Pick a random element from an array */
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─── Derived data strings (auto-update when portfolioData changes) ──────────

const skillsList = skills.join(', ');
const topSkills = skills.slice(0, 5).join(', ');
const currentRole = experience[0];
const previousRole = experience[1];
const socialLinks = socials.map((s) => `${s.name}: ${s.url}`).join('\n');
const linkedIn = socials.find((s) => s.name === 'LinkedIn')?.url || '';
const github = socials.find((s) => s.name === 'GitHub')?.url || '';

// ─── Conversational fillers (prepended ~40 of the time) ─────────────────────

const fillers = [
  'Great question!',
  'Oh for sure!',
  'Glad you asked!',
  'Good one!',
  'Ah yes!',
  'Love that you asked!',
  'Nice, let me tell you!',
];

function maybeFiller() {
  return Math.random() < 0.4 ? pick(fillers) + ' ' : '';
}

// ─── Conversation history (to avoid repeating templates) ────────────────────

const usedTemplates = new Map(); // intent -> Set of used indices

function pickTemplate(intent, templates) {
  if (!usedTemplates.has(intent)) {
    usedTemplates.set(intent, new Set());
  }
  const used = usedTemplates.get(intent);
  // Reset if all have been used
  if (used.size >= templates.length) {
    used.clear();
  }
  const available = templates
    .map((t, i) => ({ t, i }))
    .filter(({ i }) => !used.has(i));
  const chosen = pick(available);
  used.add(chosen.i);
  return chosen.t;
}

// ─── Intent definitions ─────────────────────────────────────────────────────

const intents = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'sup', 'yo', 'hola', 'howdy', 'greetings', 'hii', 'hiii'],
    patterns: [/^hi+$/i, /^hey+$/i, /^hello+$/i, /^yo+$/i, /^sup$/i],
    templates: [
      `Hey there! 👋 Welcome! I'm Vipul's portfolio assistant. Feel free to ask me anything about his skills, experience, or projects.`,
      `Hi! Glad you stopped by. I can tell you all about Vipul — his work, tech stack, projects, you name it. What would you like to know?`,
      `Hello! 😊 I'm here to help you learn about Vipul. Ask me about his experience, skills, or anything else!`,
      `Hey! Welcome to Vipul's portfolio. I know a thing or two about him — go ahead, ask away!`,
    ],
    suggestions: [
      'Who is Vipul?',
      'What are his skills?',
      'Tell me about his experience',
    ],
  },
  {
    name: 'about',
    keywords: ['introduce', 'vipul', 'background'],
    patterns: [/who is (vipul|he|him|this guy|this person)/i, /who('?s| is) vipul/i, /tell me about (vipul|him|yourself)/i, /about (him|vipul)/i, /what does (he|vipul) do/i, /introduce/i, /^who is he$/i, /^who are you$/i, /^about$/i],
    templates: [
      `Vipul Badwaik is a ${currentRole.title} currently working at ${currentRole.company}. He's got a strong background in frontend development with skills in ${topSkills}, and more. He graduated with a ${education.degree} in ${education.field} from ${education.school}.`,
      `Vipul is a software engineer specializing in frontend and AI-powered web apps. Right now he's a ${currentRole.title} at ${currentRole.company}, and before that he worked at ${previousRole.company} as a ${previousRole.title}. Super passionate about building scalable, user-friendly products! 🚀`,
      `Here's the quick rundown — Vipul is a ${currentRole.title} at ${currentRole.company}. He holds a ${education.degree} in ${education.field} (${education.description}) and loves working with technologies like ${topSkills}. He's all about clean code and great user experiences.`,
      `Vipul Badwaik is a software engineer with experience at companies like ${currentRole.company} and ${previousRole.company}. He's skilled in ${topSkills} among other technologies, and he's passionate about building production-grade web applications.`,
    ],
    suggestions: [
      'What are his technical skills?',
      'Tell me about his work experience',
      'What projects has he built?',
    ],
  },
  {
    name: 'skills',
    keywords: ['skills', 'technologies', 'tech', 'stack', 'programming', 'languages', 'tools', 'frameworks', 'frontend', 'backend', 'knows'],
    patterns: [/tech\s*stack/i, /what can he (do|build)/i, /what.*skills/i, /technologies/i, /programming/i],
    templates: [
      `Vipul's tech toolkit is pretty solid! Here's what he works with:\n\n🛠 ${skillsList}\n\nHe's especially strong in React, TypeScript, and Node.js for building production-grade apps.`,
      `He's got a well-rounded skill set: ${skillsList}. From frontend frameworks like React and Next.js to backend with Node.js and databases like PostgreSQL and MongoDB — he covers the full spectrum.`,
      `Vipul works across the stack! His key technologies include ${skillsList}. He's particularly experienced with React and TypeScript, having used them extensively at both ${currentRole.company} and ${previousRole.company}. 💪`,
      `Great question about his tech stack! Vipul is proficient in: ${skillsList}. He also has hands-on experience with Docker, AWS, and design tools like Figma.`,
    ],
    suggestions: [
      'Tell me about his experience',
      'What projects has he built?',
      'How can I contact him?',
    ],
  },
  {
    name: 'experience',
    keywords: ['experience', 'work', 'job', 'company', 'career', 'role', 'worked', 'employment', 'professional'],
    patterns: [/where does he work/i, /current (role|job|position)/i, /work experience/i, /career/i, /employed/i],
    templates: [
      `Here's Vipul's professional journey:\n\n📌 ${currentRole.title} at ${currentRole.company} (${currentRole.period})\nHe's building scalable web apps with React, TypeScript, and Redux Toolkit, including a Loan Origination System and a payment SDK.\n\n📌 ${previousRole.title} at ${previousRole.company} (${previousRole.period})\nHe developed enterprise-grade frontend apps, optimized performance, and mentored junior developers.`,
      `Vipul currently works as a ${currentRole.title} at ${currentRole.company} (since ${currentRole.period.split('—')[0].trim()}). Before that, he was a ${previousRole.title} at ${previousRole.company} for about two years. He's been building complex fintech and enterprise applications throughout his career. 🏢`,
      `Work-wise, Vipul has solid industry experience:\n\n1️⃣ ${currentRole.company} — ${currentRole.title} (${currentRole.period}): Building fintech platforms, payment SDKs, and loan management systems.\n\n2️⃣ ${previousRole.company} — ${previousRole.title} (${previousRole.period}): Worked on enterprise dashboards, reusable component libraries, and API integrations.`,
      `Vipul's currently a ${currentRole.title} at ${currentRole.company}, where he builds production-grade fintech applications. Previously, he spent two years at ${previousRole.company} as a ${previousRole.title}, working on enterprise apps and mentoring junior devs. He's got a strong track record of shipping reliable software.`,
    ],
    suggestions: [
      'What technologies does he use?',
      'Tell me about his education',
      'What projects has he built?',
    ],
  },
  {
    name: 'education',
    keywords: ['education', 'college', 'university', 'degree', 'studied', 'qualification', 'school', 'academic', 'cgpa', 'graduated'],
    patterns: [/where did he study/i, /education/i, /college/i, /degree/i, /university/i, /qualification/i],
    templates: [
      `Vipul holds a ${education.degree} in ${education.field} from ${education.school} (${education.period}). He graduated with a ${education.description} — pretty impressive! 🎓`,
      `On the academic side, Vipul studied ${education.field} and earned his ${education.degree} from ${education.school}. He was there from ${education.period} and achieved a ${education.description}.`,
      `Education-wise, Vipul has a ${education.degree} in ${education.field}. He attended ${education.school} from ${education.period} with a solid ${education.description}. 📚`,
      `Vipul graduated from ${education.school} with a ${education.degree} in ${education.field} (${education.period}). His ${education.description} speaks to his strong academic foundation.`,
    ],
    suggestions: [
      'What does he do now?',
      'What are his skills?',
      'How can I reach him?',
    ],
  },
  {
    name: 'contact',
    keywords: ['contact', 'email', 'reach', 'hire', 'connect', 'phone', 'message', 'touch', 'socials', 'social', 'linkedin', 'github', 'twitter'],
    patterns: [/how (can|do) (i|we) (contact|reach|connect)/i, /get in touch/i, /hire him/i, /social media/i],
    templates: [
      `You can reach Vipul through his socials:\n\n${socialLinks}\n\nFeel free to connect — he's always open to interesting conversations and opportunities! 📬`,
      `Here are the best ways to get in touch with Vipul:\n\n${socialLinks}\n\nLinkedIn is probably the best bet for professional inquiries!`,
      `Want to connect? Here you go:\n\n${socialLinks}\n\nDon't hesitate to reach out — Vipul loves meeting new people and discussing tech! 🤝`,
      `Vipul is reachable on:\n\n${socialLinks}\n\nWhether it's a job opportunity, collaboration, or just a tech chat — he'd love to hear from you.`,
    ],
    suggestions: [
      'Is he available for hire?',
      'Tell me about his experience',
      'What projects has he built?',
    ],
  },
  {
    name: 'projects',
    keywords: ['projects', 'built', 'portfolio', 'samples', 'work samples', 'made', 'created', 'developed', 'showcase'],
    patterns: [/what.*built/i, /project/i, /portfolio.*work/i, /work samples/i, /show.*work/i],
    templates: () => {
      const projectDetails = projects
        .map((p) => `🔹 ${p.title}: ${p.description} [${p.tags.join(', ')}]`)
        .join('\n');
      return [
        `Here are some of Vipul's projects:\n\n${projectDetails}\n\nYou can check them out on his GitHub: ${github}`,
        `Vipul has built some cool stuff! Here's a peek:\n\n${projectDetails}\n\nHe's always working on something new. Check his GitHub for the latest! 🔧`,
        `Projects are where the magic happens! Here's what Vipul has been working on:\n\n${projectDetails}\n\nMore details on his GitHub profile: ${github}`,
        `Take a look at Vipul's project showcase:\n\n${projectDetails}\n\nHe uses a mix of ${skills.slice(0, 4).join(', ')} and more across these builds.`,
      ];
    },
    suggestions: [
      'What technologies does he use?',
      'How can I contact him?',
      'Tell me about his experience',
    ],
  },
  {
    name: 'location',
    keywords: ['where', 'location', 'based', 'country', 'city', 'live', 'from', 'india', 'remote'],
    patterns: [/where.*(is|does) he (based|live|from)/i, /location/i, /which (city|country)/i],
    templates: [
      `Vipul is based in India. He studied in Bhilai at ${education.school} and has been working in the Indian tech industry. 🇮🇳`,
      `He's based out of India! He completed his education at ${education.school}, Bhilai and is currently working as a ${currentRole.title} at ${currentRole.company}.`,
      `Vipul is from India. He's currently working as a ${currentRole.title} at ${currentRole.company}. The beauty of tech — location matters less when you build great software! 🌍`,
    ],
    suggestions: [
      'Is he available for remote work?',
      'How can I contact him?',
      'What does he do?',
    ],
  },
  {
    name: 'availability',
    keywords: ['available', 'hire', 'freelance', 'open', 'hiring', 'contract', 'opportunity', 'opportunities', 'looking'],
    patterns: [/open to (work|opportunities)/i, /available for/i, /hire/i, /freelance/i, /looking for/i],
    templates: [
      `Vipul is always open to exciting opportunities! If you have something interesting in mind, reach out to him on LinkedIn: ${linkedIn} 🚀`,
      `He's open to connecting about new opportunities. The best way to discuss that would be to reach him on LinkedIn: ${linkedIn} or check his other socials.`,
      `Want to work with Vipul? He's always happy to explore interesting roles and collaborations. Drop him a message on LinkedIn: ${linkedIn} ✨`,
      `Vipul is open to discussing new opportunities! Whether it's a full-time role, freelance gig, or collaboration — connect with him at: ${linkedIn}`,
    ],
    suggestions: [
      'What are his skills?',
      'Tell me about his experience',
      'How can I contact him?',
    ],
  },
  {
    name: 'thanks',
    keywords: ['thanks', 'thank', 'bye', 'goodbye', 'cya', 'later', 'see ya', 'appreciate', 'cheers'],
    patterns: [/thank/i, /bye/i, /goodbye/i, /see you/i, /take care/i],
    templates: [
      `You're welcome! 😊 If you have more questions later, I'm always here. Have a great day!`,
      `Happy to help! Feel free to come back anytime. Take care! 👋`,
      `Glad I could help! Don't hesitate to reach out again. Cheers!`,
      `Anytime! Hope you got what you were looking for. See you around! ✌️`,
    ],
    suggestions: [
      'Tell me about Vipul',
      'What are his skills?',
      'How can I contact him?',
    ],
  },
];

// ─── Fallback ───────────────────────────────────────────────────────────────

const fallbackTemplates = [
  `Hmm, I'm not sure I understood that. I can tell you about Vipul's skills, experience, projects, education, or how to contact him. What interests you?`,
  `I didn't quite catch that! Try asking about Vipul's tech stack, work experience, projects, or education — I'm pretty good with those topics. 😅`,
  `Oops, that one went over my head. I work best when you ask about Vipul's background, skills, projects, or how to reach him. Give it another shot!`,
  `Not sure about that one, but I can definitely help with questions about Vipul's career, technologies, projects, or contact info. What would you like to know?`,
];

const fallbackSuggestions = [
  'Who is Vipul?',
  'What are his skills?',
  'Tell me about his experience',
];

// ─── Off-topic detection ────────────────────────────────────────────────────

const offTopicPatterns = [
  /who is (?!vipul|he|him|this)\w+/i,
  /what is (?!vipul|his)\w+/i,
  /tell me about (?!vipul|him|his|experience|skills|education|work|projects|tech)\w+/i,
  /who (was|were|created|invented|discovered|founded)\b/i,
  /meaning of/i,
  /define\s/i,
  /translate/i,
  /weather/i,
  /news/i,
  /capital of/i,
  /president of/i,
  /prime minister/i,
  /how to (cook|make|play|solve|fix|install|download)/i,
  /recipe/i,
  /score/i,
  /movie/i,
  /song/i,
];

const offTopicTemplates = [
  `I appreciate the curiosity, but I only know about Vipul Badwaik! 😄 Try asking about his skills, experience, or projects.`,
  `That's outside my expertise — I'm Vipul's portfolio assistant, so I can only answer questions about him. Want to know about his tech stack or work experience?`,
  `Interesting question, but I'm only trained on Vipul's portfolio data! Ask me about his career, skills, education, or how to contact him.`,
  `I wish I could help with that, but I'm built specifically for Vipul's portfolio. How about asking what technologies he works with? 😊`,
];

// ─── Main engine ────────────────────────────────────────────────────────────

function detectIntent(input) {
  const cleaned = input.toLowerCase().replace(/[^\w\s']/g, '').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  // 0. Check for off-topic questions first
  if (offTopicPatterns.some((p) => p.test(cleaned))) {
    return null; // Will trigger off-topic response
  }

  // 1. Try pattern matching first (more precise)
  for (const intent of intents) {
    if (intent.patterns && intent.patterns.some((p) => p.test(cleaned))) {
      return intent;
    }
  }

  // 2. Try exact keyword matching
  for (const intent of intents) {
    if (intent.keywords.some((kw) => cleaned.includes(kw))) {
      return intent;
    }
  }

  // 3. Try fuzzy keyword matching (typo tolerance)
  for (const intent of intents) {
    if (fuzzyMatch(words, intent.keywords)) {
      return intent;
    }
  }

  return null;
}

function isOffTopic(input) {
  const cleaned = input.toLowerCase().replace(/[^\w\s']/g, '').trim();
  return offTopicPatterns.some((p) => p.test(cleaned));
}

/**
 * Get a chatbot response for the given user message.
 * @param {string} userMessage
 * @returns {{ text: string, suggestions: string[] }}
 */
export function getResponse(userMessage) {
  if (!userMessage || !userMessage.trim()) {
    return {
      text: "Looks like you didn't type anything! Go ahead, ask me something about Vipul. 😊",
      suggestions: ['Who is Vipul?', 'What are his skills?', 'Tell me about his experience'],
    };
  }

  // Check off-topic first
  if (isOffTopic(userMessage)) {
    return {
      text: pickTemplate('offtopic', offTopicTemplates),
      suggestions: fallbackSuggestions,
    };
  }

  const intent = detectIntent(userMessage);

  if (!intent) {
    return {
      text: maybeFiller() + pickTemplate('fallback', fallbackTemplates),
      suggestions: fallbackSuggestions,
    };
  }

  const templates =
    typeof intent.templates === 'function' ? intent.templates() : intent.templates;

  const text = maybeFiller() + pickTemplate(intent.name, templates);

  return {
    text,
    suggestions: intent.suggestions || fallbackSuggestions,
  };
}
