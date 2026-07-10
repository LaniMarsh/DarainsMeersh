export type LoveReasonCategory =
  | "Little Things"
  | "Everyday"
  | "Funny"
  | "Adventures"
  | "Dancing"
  | "Future";

export type LoveReason = {
  id: number;
  category: LoveReasonCategory;
  title: string;
  text: string;
  emoji: string;
};

export const LOVE_REASONS: LoveReason[] = [
  {
    id: 1,
    category: "Little Things",
    title: "The way you look at me",
    text: "I love the way you look at me when you think I am not paying attention.",
    emoji: "🤍",
  },
  {
    id: 2,
    category: "Everyday",
    title: "You check on me",
    text: "I love that you try to make sure I am okay, even when you are not completely sure what I need.",
    emoji: "☀️",
  },
  {
    id: 3,
    category: "Funny",
    title: "You make me laugh",
    text: "I love how easily you can make me laugh, especially when I am trying very hard not to.",
    emoji: "😂",
  },
  {
    id: 4,
    category: "Dancing",
    title: "Dancing with you",
    text: "I love dancing with you and how the rest of the room sometimes seems to disappear.",
    emoji: "💃",
  },
  {
    id: 5,
    category: "Adventures",
    title: "Everything feels exciting",
    text: "I love that even ordinary plans feel like an adventure when I get to do them with you.",
    emoji: "🌎",
  },
  {
    id: 6,
    category: "Little Things",
    title: "Your voice",
    text: "I love hearing your voice, especially after a long day when all I want is to feel close to you.",
    emoji: "🎧",
  },
  {
    id: 7,
    category: "Everyday",
    title: "Your presence",
    text: "I love that simply being next to you can make an ordinary moment feel important.",
    emoji: "🌙",
  },
  {
    id: 8,
    category: "Funny",
    title: "Our inside jokes",
    text: "I love all of the jokes that would make absolutely no sense to anyone except us.",
    emoji: "🤭",
  },
  {
    id: 9,
    category: "Future",
    title: "I can imagine tomorrow",
    text: "I love that when I picture future adventures, celebrations, and quiet nights, you are there.",
    emoji: "✨",
  },
  {
    id: 10,
    category: "Little Things",
    title: "Your smile",
    text: "I love your smile and how quickly it can change my entire mood.",
    emoji: "😊",
  },
  {
    id: 11,
    category: "Everyday",
    title: "You listen",
    text: "I love when you listen to the things I care about, even when I am overexplaining every tiny detail.",
    emoji: "💬",
  },
  {
    id: 12,
    category: "Adventures",
    title: "New memories",
    text: "I love that there are still so many places for us to go and so many memories for us to make.",
    emoji: "🗺️",
  },
  {
    id: 13,
    category: "Dancing",
    title: "The way we move together",
    text: "I love the moments when we find the same rhythm without needing to say anything.",
    emoji: "🎶",
  },
  {
    id: 14,
    category: "Funny",
    title: "Your reactions",
    text: "I love your expressions and reactions, especially the ones you probably do not realize you make.",
    emoji: "😌",
  },
  {
    id: 15,
    category: "Future",
    title: "Choosing each other",
    text: "I love the idea of continuing to learn each other and choosing one another through every new chapter.",
    emoji: "💛",
  },
  {
    id: 16,
    category: "Little Things",
    title: "Your hugs",
    text: "I love the way your hugs make me feel closer to you and a little more at home.",
    emoji: "🫂",
  },
  {
    id: 17,
    category: "Everyday",
    title: "You make things memorable",
    text: "I love that a normal drive, meal, or conversation can become something I replay later because it was with you.",
    emoji: "🚗",
  },
  {
    id: 18,
    category: "Adventures",
    title: "Trying things together",
    text: "I love that we can discover new places, food, music, and experiences side by side.",
    emoji: "🌅",
  },
];

export const LOVE_REASON_CATEGORIES: Array<
  "All" | LoveReasonCategory
> = [
  "All",
  "Little Things",
  "Everyday",
  "Funny",
  "Adventures",
  "Dancing",
  "Future",
];