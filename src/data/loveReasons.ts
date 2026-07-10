export type LoveReasonCategory =
  | "Little Things"
  | "Everyday"
  | "Funny"
  | "Adventures"
  | "Dancing"
  | "Future";

export type LoveReason = {
  id: number;
  title: string;
  text: string;
  emoji: string | undefined;
};

export const LOVE_REASONS: LoveReason[] = [
  {
    id: 1,
    title: "The way you look at me",
    text: "I just love the way you look at me.",
    emoji: "🤍",
  },
  {
    id: 2,
    title: "You get me",
    text: "I notice more and more small things you do or say that show me you actually understand me.",
    emoji: "☀️",
  },
  {
    id: 3,
    title: "You make me laugh",
    text: "I love how easily you can make me laugh, you're so very silly.",
    emoji: undefined,
  },
  {
    id: 4,
    title: "Dancing with you",
    text: "I love dancing with you although I still need to learn to just relax",
    emoji: "💃",
  },
  {
    id: 5,
    title: "Your voice",
    text: "I love hearing your voice, especially after a long day when all I want is to be with you",
    emoji: undefined,
  },
  {
    id: 6,
    title: "Your presence",
    text: "While I hate long distance, it does make me appreciate your presence even more when we are together.",
    emoji: undefined,
  },
  {
    id: 7,
    title: "Your smile",
    text: "I love your smile its so cute. Oh and also you're so cute and handsome and amazing and wonderful",
    emoji: undefined,
  },
  {
    id: 8,
    title: "You listen",
    text: "I love when you listen to the things I care about, even when I am overexplaining",
    emoji: undefined,
  },
  {
    id: 15,
    title: "Your hugs",
    text: "I love the way your hugs make me feel safe and cozy",
    emoji: undefined,
  },
];