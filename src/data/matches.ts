/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, Commentary } from '../types';

export const upcomingMatches: Match[] = [
  {
    id: 'm1',
    opponent: 'Spain',
    opponentFlag: '🇪🇸',
    opponentShort: 'ESP',
    date: 'July 1, 2026',
    time: '20:00 WEST',
    stage: 'World Cup 2026 - Group Stage',
    venue: 'MetLife Stadium, New York/New Jersey',
    countdownTarget: '2026-07-01T19:00:00Z' // Real ISO Date for counting down
  },
  {
    id: 'm2',
    opponent: 'Brazil',
    opponentFlag: '🇧🇷',
    opponentShort: 'BRA',
    date: 'July 6, 2026',
    time: '18:00 WEST',
    stage: 'World Cup 2026 - Group Stage',
    venue: 'Azteca Stadium, Mexico City',
    countdownTarget: '2026-07-06T17:00:00Z'
  },
  {
    id: 'm3',
    opponent: 'France',
    opponentFlag: '🇫🇷',
    opponentShort: 'FRA',
    date: 'July 11, 2026',
    time: '21:00 WEST',
    stage: 'World Cup 2026 - Round of 16',
    venue: 'SoFi Stadium, Los Angeles',
    countdownTarget: '2026-07-11T20:00:00Z'
  }
];

export const liveMatchCommentary: Commentary[] = [
  { minute: 1, type: 'info', text: 'KICK-OFF! The referee blows the whistle. Portugal in classic red and green kicks off from left to right.' },
  { minute: 4, type: 'shot', text: 'EARLY THREAT! Rafael Leão sprints past his fullback down the left wing and delivers a low cross. Cristiano Ronaldo strikes first time! Saved by the goalkeeper!' },
  { minute: 9, type: 'foul', text: 'Hard challenge by the opponent midfielder on João Palhinha. The referee warns the player. High tactical tension in the middle.' },
  { minute: 14, type: 'shot', text: 'CHANCE! Bruno Fernandes picks up the ball in midfield and fires a signature long-range bomb. It skims the crossbar!' },
  { minute: 21, type: 'info', text: 'TACTICAL UPDATE: Portugal dominates possession (62%), conducting intricate passing patterns through Vitinha and Bernardo Silva.' },
  { minute: 28, type: 'save', text: 'SENSATIONAL REFLEXES! Diogo Costa pulls off a world-class diving save to block a close-range header! Corner conceded but crisis averted.' },
  { minute: 34, type: 'card', text: 'YELLOW CARD! Rúben Dias receives a booking for a tactical foul stopping a fast-break counter-offensive.' },
  { minute: 41, type: 'shot', text: 'BLOCK! João Félix cuts inside from the right wing, dribbles past two defenders and shoots, but it is blocked by a desperate sliding tackle.' },
  { minute: 45, type: 'goal', text: 'GOOOOOOOOOAL PORTUGAL!!! CRISTIANO RONALDO!!! Bruno Fernandes lofts an exquisite cross into the box. Ronaldo leaps majestically, hanging in the air for what feels like eternity, and powers a bullet header into the top corner! 1-0!' },
  { minute: 45, type: 'info', text: 'HALF TIME: Portugal leads 1-0. Stadium acoustics are buzzing. Dynamic tactical instructions being delivered in the locker room.' },
  { minute: 46, type: 'info', text: 'SECOND HALF BEGINS. No substitutions for Portugal. Absolute determination in the players eyes.' },
  { minute: 52, type: 'shot', text: 'POST! Diogo Jota, coming off the left, drives into the box and fires a low shot across the keeper. It beats the gloves but rattles the post!' },
  { minute: 59, type: 'save', text: 'EASY CLAIM! Diogo Costa comes out confidently to claim a looping cross under intense pressure from the opponent strikers.' },
  { minute: 65, type: 'foul', text: 'Tactical stoppage: Nuno Mendes fouled on the wing. Bruno Fernandes preparing a set-piece delivery.' },
  { minute: 73, type: 'info', text: 'SUBSTITUTION PORTUGAL: Rafael Leão and João Félix are replaced by Pedro Neto and Francisco Conceição. Injecting pure raw speed on the flanks.' },
  { minute: 79, type: 'goal', text: 'GOOOOOOOOOAL PORTUGAL!!! BRUNO FERNANDES!!! A dazzling counter-attack orchestrated by Vitinha, who feeds Bernardo Silva. Bernardo slips a pass to Bruno Fernandes inside the box. Bruno takes one touch and curls it elegantly into the far post! Magnificent! 2-0!' },
  { minute: 85, type: 'info', text: 'CHANTS FILL THE ARENA: The Portuguese fans are singing in unison. The team is managing possession beautifully with safe passing.' },
  { minute: 89, type: 'save', text: 'STUNNING STOP! Diogo Costa denies a fierce volley from close range. His concentration is unmatched!' },
  { minute: 90, type: 'info', text: '4 MINUTES OF ADDED TIME. Portugal playing with absolute composure.' },
  { minute: 94, type: 'info', text: 'FULL TIME! PORTUGAL VICTORIOUS! A dominant 2-0 performance showing elite tactical structure, solid defense, and lethal efficiency.' }
];
