export const BUCKET: Record<string, { text: string; done: boolean }[]> = {
  Travel: [
    { text: "See the Northern Lights", done: false },
    { text: "Road trip across the country", done: true },
    { text: "Weekend in Kyoto", done: false },
    { text: "Italian countryside villa", done: false },
    { text: "Camping in Patagonia", done: false },
  ],
  Adventures: [
    { text: "Take a dance class together", done: false },
    { text: "Learn to surf", done: false },
    { text: "Hike a 14er", done: true },
    { text: "Go skydiving", done: false },
    { text: "White water rafting", done: true },
  ],
  Food: [
    { text: "Tasting menu at a Michelin star", done: false },
    { text: "Cook through Julia Child", done: false },
    { text: "Night market food tour", done: false },
    { text: "Take a pasta-making class", done: false },
    { text: "Grow our own vegetables", done: false },
  ],
  Home: [
    { text: "Host a dinner party for 8", done: true },
    { text: "Keep a plant alive for 6 months", done: false },
    { text: "Build something with our hands", done: false },
    { text: "Create a reading nook", done: false },
    { text: "Sunday farmers market ritual", done: true },
  ],
  Moments: [
    { text: "Slow dance with no occasion", done: false },
    { text: "Write letters to open in 10 years", done: false },
    { text: "Watch every Kubrick film", done: false },
    { text: "Stay up for a meteor shower", done: true },
    { text: "Learn each other's love languages", done: true },
  ],
};
