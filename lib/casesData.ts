export type Clue = {
  id: string;
  name: string;
  description: string;
  scanned: boolean; 
  added?: boolean;
  discovered: boolean;
};

export type Case = {
  number: string;
  image: string;
  original: string;
  title: string;
  suspectName: string;
  briefing: string;
  chiefMessage: string[];
  clues: Clue[];
  targetAreas: {
    id: string;
    x: number;
    y: number;
    radius: number;
    hint: string;
  }[];
};

export const casesData: Case[] = [
  {
    number: '027',
    image: '/evidence_027.jpg',
    original: '/evidence_027.jpg',
    title: 'NIGHT SHIFT // EAST LOS SANTOS',
    suspectName: 'Marcus "Viper" Vance',
    briefing: 'Suspect claims he was nowhere near East Los Santos on the night of the incident. He stated on record that he was asleep in his apartment by midnight and does not own a vehicle. The LSPD needs you to scrub this raw memory frame to prove he was at the scene.',
    chiefMessage: [
      "Good work on this one, detective. The evidence checks out.",
      "Vance thought he could outsmart the precinct with that weak alibi, but you proved he was armed and at the scene.",
      "I'm sending this straight to the DA. The Neural Archive reconstructor is booting up now."
    ],
    clues: [
      { id: 'person', name: 'UNKNOWN PERSON', description: 'Face profile obscured. Wearing a hood.', scanned: false, discovered: false },
      { id: 'weapon', name: 'DRAWN WEAPON', description: 'Suspect is actively aiming a firearm.', scanned: false, discovered: false },
      { id: 'time', name: 'TIMESTAMP', description: '2024/10/26 23:45:12. Camera clock drift: +00:03.', scanned: false, discovered: false },
      { id: 'sign', name: 'NEON SIGN', description: 'Partial vertical letters.', scanned: false, discovered: false },
    ],
    targetAreas: [
      { id: 'person', x: 48, y: 42, radius: 12, hint: "Look closely at the person in the alley." },
      { id: 'weapon', x: 45, y: 53, radius: 12, hint: "What is the suspect holding?" },
      { id: 'time', x: 80, y: 18, radius: 15, hint: "Scan the upper right timestamp." },
      { id: 'sign', x: 33, y: 20, radius: 15, hint: "Analyze the vertical glowing neon letters." }
    ]
  },
  {
    number: '028',
    image: '/evidence_028.jpg',
    original: '/evidence_028.jpg',
    title: 'SIGNAL LOST // VESPUCCI BLVD',
    suspectName: 'Unknown Assailant',
    briefing: 'The victim disappeared from the Vespucci Blvd subway platform moments before a city-wide blackout. Initial police reports suggest they tripped and fell onto the tracks while intoxicated. We suspect foul play. Find evidence of a struggle or another person present on the platform.',
    chiefMessage: [
      "Incredible eye, detective. The LSPD was ready to write this off as a drunk accident.",
      "You've proven this was a targeted abduction at the Uptown 42nd St station.",
      "SWAT is mobilized and heading to those coordinates. Let's see how this played out."
    ],
    clues: [
      { id: 'phone', name: 'DROPPED DEVICE', description: 'Encrypted smartphone. Screen active.', scanned: false, discovered: false },
      { id: 'time', name: 'TIMESTAMP', description: '1996-10-14 02:34:11 AM.', scanned: false, discovered: false },
      { id: 'station', name: 'STATION SIGN', description: 'UPTOWN 42 ST. Confirms location.', scanned: false, discovered: false },
    ],
    targetAreas: [
      { id: 'phone', x: 54, y: 70, radius: 15, hint: "Focus on the glowing device on the ground." },
      { id: 'time', x: 80, y: 85, radius: 18, hint: "Scan the timestamp at the bottom right." },
      { id: 'station', x: 16, y: 38, radius: 15, hint: "Check the station sign on the left wall." }
    ]
  },
  {
    number: '029',
    image: '/evidence_029.jpg',
    original: '/evidence_029.jpg',
    title: 'BLACKOUT // CYPRESS FLATS',
    suspectName: 'Elias Thorne (Inside Job)',
    briefing: 'Secure-Corp claims an external cyber-terrorist group breached their network from the outside during the blackout, stealing the main corporate ledger. We believe it was an inside job and the physical drive was stolen. Search the server room memory for signs of a physical breach.',
    chiefMessage: [
      "Just as we suspected. It wasn't a cyber attack, it was a smash-and-grab.",
      "Thorne staged the whole thing, but your evidence proves someone broke OUT, not in.",
      "He left his blood all over the scene. We've got him dead to rights. Initiating playback."
    ],
    clues: [
      { id: 'glass', name: 'SHATTERED WINDOW', description: 'Impact originated from the inside.', scanned: false, discovered: false },
      { id: 'chair', name: 'OVERTURNED CHAIR', description: 'Signs of a sudden struggle.', scanned: false, discovered: false },
      { id: 'blood', name: 'BLOOD EVIDENCE', description: 'Marker #3 indicates a biological trace.', scanned: false, discovered: false },
    ],
    targetAreas: [
      { id: 'glass', x: 23, y: 40, radius: 15, hint: "Check the shattered window." },
      { id: 'chair', x: 64, y: 64, radius: 15, hint: "Scan the overturned chair." },
      { id: 'blood', x: 81, y: 80, radius: 18, hint: "Look at the evidence marker #3 on the floor." }
    ]
  },
  {
    number: '030',
    image: '/evidence_030.jpg',
    original: '/evidence_030.jpg',
    title: 'THE DROP // PILLBOX HILL',
    suspectName: 'Vincent Moretti',
    briefing: 'Moretti claims the briefcase exchange went smoothly and our informant simply walked away with the money. Our informant hasn\'t been seen since. Reconstruct this memory fragment from the alleyway to figure out what really happened during the drop.',
    chiefMessage: [
      "I knew Moretti was lying through his teeth.",
      "The informant didn't walk away with the money. The drop was ambushed and the bonds were left behind.",
      "You just gave us the leverage we need to break the Moretti family. Booting reconstruction."
    ],
    clues: [
      { id: 'briefcase', name: 'ALUMINUM CASE', description: 'Contains unregistered bearer bonds.', scanned: false, discovered: false },
      { id: 'marker', name: 'EVIDENCE MARKER', description: 'Marker #4 placed near the case.', scanned: false, discovered: false },
      { id: 'neon', name: 'NEON REFLECTION', description: 'OPEN 24 HR THE BLUE ROOM COCKTAILS.', scanned: false, discovered: false },
    ],
    targetAreas: [
      { id: 'briefcase', x: 55, y: 65, radius: 15, hint: "Extract the dropped package." },
      { id: 'marker', x: 73, y: 70, radius: 15, hint: "Analyze evidence marker #4 on the floor." },
      { id: 'neon', x: 36, y: 30, radius: 15, hint: "Scan the neon sign." }
    ]
  }
];
