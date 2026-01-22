import imgImage1 from "figma:asset/a58bff95e38d1eef23bab058f0ede9bcc287192e.png";
import imgImage2 from "figma:asset/bd8c26711b42d9824251ddffe2917288e02582a6.png";
import imgImage3 from "figma:asset/2f2a4278676870bd4b14a1ba6544a4438fc53b98.png";
import imgImage4 from "figma:asset/e159137de17bd63ae194d24c968da0a0852f069f.png";
import imgCard1 from "figma:asset/8ff67fbd850326ea6af659bc13e9ac8dbc37d16a.png";
import imgCard2 from "figma:asset/b6b2dd85428ea511bce874d4f06430114aad6aef.png";
import imgCard3 from "figma:asset/70ce267f1a846de764bc9f5d4f525565f6d7295f.png";
import imgCard4 from "figma:asset/264e196e9b74fa3a6e3776ed82ab09ee14efabbb.png";

export type RemixIdea = {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  image: string;
  accent: string;
  gradient: [string, string];
  flavor?: string;
  variantKey?: string;
};

export const remixIdeas: RemixIdea[] = [
  {
    id: 'remix-zootopia',
    beforeImage: imgImage1,
    image: imgCard1,
    title: 'A Moment in Zootopia',
    description: 'Place yourself inside a lighthearted scene inspired by the world of Zootopia, blending your presence with animated charm.',
    accent: '#4ade80',
    gradient: ['#0d1117', '#102a1c'],
    flavor: 'Playful, cinematic, character-first',
    variantKey: 'a_moment_in_zootopia',
  },
  {
    id: 'remix-character',
    beforeImage: imgImage2,
    image: imgCard2,
    title: 'Step Into a Character',
    description: 'Reimagine yourself as a character you love, preserving your features while shifting costume, style, and atmosphere.',
    accent: '#f59e0b',
    gradient: ['#111827', '#2b1a10'],
    flavor: 'Bold, story-driven, immersive',
    variantKey: 'step_into_a_character',
  },
  {
    id: 'remix-lines',
    beforeImage: imgImage3,
    image: imgCard3,
    title: 'Scenes in Simple Lines',
    description: 'Transform a favorite film moment into a minimal line illustration, focusing on form, mood, and visual rhythm.',
    accent: '#22d3ee',
    gradient: ['#0b1021', '#0f2333'],
    flavor: 'Minimal, graphic, design-led',
    variantKey: 'a_moment_in_zootopia',
  },
  {
    id: 'remix-office-selfie',
    beforeImage: imgImage4,
    image: imgCard4,
    title: 'Office Selfie',
    description: 'A playful remix that frames your pet like an office worker caught in a spontaneous selfie — earnest, awkward, and strangely relatable.',
    accent: '#a855f7',
    gradient: ['#12101a', '#21132b'],
    flavor: 'Cheeky, candid, lighthearted',
    variantKey: 'a_moment_in_zootopia',
  },
];

export const remixIdeasMap = remixIdeas.reduce<Record<string, RemixIdea>>((acc, idea) => {
  acc[idea.id] = idea;
  return acc;
}, {});

