/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface PlayerTrophies {
  club: string[];
  national: string[];
  individual: string[];
}

export interface GoalkeepingProficiency {
  reflexes: number;
  handling: number;
  kicking: number;
  positioning: number;
  diving: number;
}

export interface Player {
  id: string;
  name: string;
  fullName: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  club: string;
  age: number;
  caps: number;
  goals: number;
  rating: number;
  image: string; // Unsplash sports portrait / themed image URL
  stats: PlayerStats;
  tacticalRole: string; // Video game description
  bio: string; // Detailed story of their career & tournament ambitions
  achievements: string[];
  
  // NEW DETAILED PLAYER STATISTICS
  height: string;
  speed: number; // km/h or rating
  acceleration: number; // rating
  maxLift: string; // e.g., "120 kg"
  shotPower: number; // rating
  finishing: number; // rating
  shotAccuracy: number; // percentage
  passingAccuracy: number; // percentage
  strongFoot: string; // e.g. "Right", "Left", "Both"
  weakFootUsage: string; // e.g. "Very Frequent", "4/5"
  totalTrophies: number;
  trophiesList: PlayerTrophies;
  clubsPlayedFor: string[];
  careerGoals: number;
  careerAssists: number;
  specialSkills: string[];
  goalkeepingProficiency?: GoalkeepingProficiency;
  overallScore105: number; // Overall Score out of 105
}

export interface MatchStats {
  possession: [number, number]; // [Portugal, Opponent]
  shots: [number, number];
  shotsOnTarget: [number, number];
  passes: [number, number];
  passAccuracy: [number, number];
  corners: [number, number];
  fouls: [number, number];
  xg: [number, number];
}

export interface Match {
  id: string;
  opponent: string;
  opponentFlag: string; // Emoji or SVG
  opponentShort: string;
  date: string;
  time: string;
  stage: string;
  venue: string;
  countdownTarget: string; // ISO date string for countdown timer
}

export interface Commentary {
  minute: number;
  type: 'goal' | 'card' | 'shot' | 'save' | 'foul' | 'info';
  text: string;
}
