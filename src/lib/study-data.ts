export const studyTopics = [
  "Faith",
  "Prayer",
  "Obedience",
  "Repentance",
  "Hope",
  "Love",
  "Endurance",
] as const;

export type StudyTopic = (typeof studyTopics)[number];

export type ScripturePrompt = {
  topic: StudyTopic;
  reference: string;
  text: string;
  prompt: string;
};

export const scripturePrompts: ScripturePrompt[] = [
  {
    topic: "Faith",
    reference: "Hebrews 11:1",
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    prompt: "Where is God inviting you to trust before you can see the full path?",
  },
  {
    topic: "Prayer",
    reference: "Philippians 4:6-7",
    text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    prompt: "What worry can become a specific prayer today?",
  },
  {
    topic: "Obedience",
    reference: "John 14:15",
    text: "If ye love me, keep my commandments.",
    prompt: "What small act of obedience would express love for Christ this week?",
  },
  {
    topic: "Repentance",
    reference: "Acts 3:19",
    text: "Repent ye therefore, and be converted, that your sins may be blotted out.",
    prompt: "What needs to be brought honestly into the light before God?",
  },
  {
    topic: "Hope",
    reference: "Romans 15:13",
    text: "Now the God of hope fill you with all joy and peace in believing.",
    prompt: "What evidence of God's faithfulness can anchor your hope today?",
  },
  {
    topic: "Love",
    reference: "1 Corinthians 13:4",
    text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
    prompt: "Who needs patient, practical love from you right now?",
  },
  {
    topic: "Endurance",
    reference: "James 1:12",
    text: "Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life.",
    prompt: "What promise can help you remain steady under pressure?",
  },
];

export const reflectionQuestions: Record<StudyTopic, string[]> = {
  Faith: [
    "What does this passage reveal about God's character?",
    "Where do I need to move from fear into trust?",
    "What promise can I rehearse after this session?",
  ],
  Prayer: [
    "What am I carrying that God has invited me to bring to Him?",
    "How can thanksgiving shape this request?",
    "Who should I intercede for today?",
  ],
  Obedience: [
    "What command, example, or warning stands out?",
    "What is one concrete response I can take today?",
    "What might distract me from obeying with joy?",
  ],
  Repentance: [
    "What attitude or habit is the Spirit exposing?",
    "Where do I need confession instead of excuses?",
    "What would turning toward God look like in practice?",
  ],
  Hope: [
    "What future promise changes how I see the present?",
    "What testimony of God's goodness should I remember?",
    "How can I speak hope to someone else today?",
  ],
  Love: [
    "How does this passage define love differently from my instincts?",
    "Where can I choose patience or kindness today?",
    "Who is God asking me to serve without needing attention?",
  ],
  Endurance: [
    "What pressure is testing my attention or faithfulness?",
    "What truth helps me continue without rushing?",
    "What support, rhythm, or boundary would help me persevere?",
  ],
};

export const prayerPoints: Record<StudyTopic, string[]> = {
  Faith: [
    "Lord, strengthen my trust where I feel uncertain.",
    "Help me remember Your faithfulness before I react.",
    "Teach me to walk by faith with patience and courage.",
  ],
  Prayer: [
    "Draw my attention back to You throughout the day.",
    "Make my requests honest, humble, and full of thanksgiving.",
    "Teach me to listen as well as speak.",
  ],
  Obedience: [
    "Give me a willing heart that delights in Your ways.",
    "Expose compromises that dull my love for You.",
    "Help my choices reflect what I have studied.",
  ],
  Repentance: [
    "Create in me a clean heart and renewed spirit.",
    "Give me courage to confess without hiding.",
    "Lead me toward restoration and changed desires.",
  ],
  Hope: [
    "Fill me with joy and peace in believing.",
    "Lift my eyes from temporary pressure to eternal promise.",
    "Make me a witness of hope to others.",
  ],
  Love: [
    "Teach me to love with patience, humility, and truth.",
    "Give me eyes to notice practical needs around me.",
    "Make my words gentle and my service sincere.",
  ],
  Endurance: [
    "Help me remain faithful in hidden places.",
    "Renew my strength when the work feels long.",
    "Keep my heart fixed on Christ through difficulty.",
  ],
};

export const ambientTracks = [
  { id: "rain", label: "Rain", path: "/audio/rain-placeholder.mp3" },
  { id: "fireplace", label: "Fireplace", path: "/audio/fireplace-placeholder.mp3" },
  { id: "wind", label: "Wind", path: "/audio/wind-placeholder.mp3" },
  { id: "coffeeShop", label: "Coffee shop", path: "/audio/coffee-shop-placeholder.mp3" },
  { id: "pages", label: "Page turning", path: "/audio/page-turning-placeholder.mp3" },
] as const;

export type AmbientId = (typeof ambientTracks)[number]["id"];

export const defaultTasks = [
  "Read passage",
  "Write reflection",
  "Memorise verse",
  "Pray",
  "Review notes",
];
