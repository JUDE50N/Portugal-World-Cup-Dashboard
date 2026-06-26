/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Player } from '../types';

// @ts-ignore
import netoImg from '../assets/images/pedro_neto_fw_1782451287643.jpg';
// @ts-ignore
import conceicaoImg from '../assets/images/francisco_conceicao_1782445165653.jpg';
// @ts-ignore
import ramosImg from '../assets/images/goncalo_ramos_1782445178757.jpg';
// @ts-ignore
import jotaImg from '../assets/images/diogo_jota_1782445191477.jpg';
// @ts-ignore
import felixImg from '../assets/images/joao_felix_1782445204034.jpg';
// @ts-ignore
import leaoImg from '../assets/images/rafael_leao_1782445215886.jpg';
// @ts-ignore
import ronaldoImg from '../assets/images/cristiano_ronaldo_1782445227396.jpg';
// @ts-ignore
import matheusImg from '../assets/images/matheus_nunes_1782447022834.jpg';
// @ts-ignore
import rubennevesImg from '../assets/images/ruben_neves_1782447036302.jpg';
// @ts-ignore
import joaonevesImg from '../assets/images/joao_neves_1782447049301.jpg';
// @ts-ignore
import vitinhaImg from '../assets/images/vitinha_1782447064026.jpg';
// @ts-ignore
import bernardoImg from '../assets/images/bernardo_silva_1782447077200.jpg';
// @ts-ignore
import brunoImg from '../assets/images/bruno_fernandes_1782447088546.jpg';
// @ts-ignore
import tomasaraujoImg from '../assets/images/tomas_araujo_1782447546208.jpg';
// @ts-ignore
import renatoveigaImg from '../assets/images/renato_veiga_1782447563323.jpg';
// @ts-ignore
import samucostaImg from '../assets/images/samu_costa_1782447577845.jpg';
// @ts-ignore
import ruisilvaImg from '../assets/images/rui_silva_gk_1782448205946.jpg';
// @ts-ignore
import diogocostaImg from '../assets/images/diogo_costa_gk_1782448218998.jpg';
// @ts-ignore
import josesaImg from '../assets/images/jose_sa_gk_1782448233386.jpg';
// @ts-ignore
import rubendiasImg from '../assets/images/ruben_dias_def_1782449243631.jpg';
// @ts-ignore
import nunomendesImg from '../assets/images/nuno_mendes_def_1782449258993.jpg';
// @ts-ignore
import joaocanceloImg from '../assets/images/joao_cancelo_def_1782449272180.jpg';
// @ts-ignore
import diogodalotImg from '../assets/images/diogo_dalot_def_1782449284123.jpg';
// @ts-ignore
import goncaloinacioImg from '../assets/images/goncalo_inacio_def_1782449295074.jpg';
// @ts-ignore
import nelsonsemedoImg from '../assets/images/nelson_semedo_def_1782449307556.jpg';

export const squadData: Player[] = [
  {
    id: 'cr7',
    name: 'Cristiano Ronaldo',
    fullName: 'Cristiano Ronaldo dos Santos Aveiro',
    number: 7,
    position: 'Forward',
    club: 'Al-Nassr FC',
    age: 41,
    caps: 215,
    goals: 135,
    rating: 90,
    image: ronaldoImg,
    stats: { pace: 82, shooting: 93, passing: 80, dribbling: 83, defending: 35, physical: 85 },
    tacticalRole: 'TACTICAL UNIT: PRIMARY TARGET-MAN / LETHAL FINISHER',
    bio: 'CRISTIANO RONALDO: THE UNDISPUTED CAPTAIN. A modern footballing deity setting foot into his final and record-breaking FIFA World Cup. Operating with razor-sharp clinical precision, his movement off the ball remains elite. Under high-pressure scenarios, Ronaldo acts as the primary weapon, capable of unlocking any defense via direct headers, lethal free-kicks, and world-class positional intelligence.',
    achievements: [
      '5x Ballon d\'Or Winner',
      'All-Time International Top Scorer (135 goals)',
      'Euro 2016 Champion',
      '5x UEFA Champions League Champion'
    ],
    height: '187 cm',
    speed: 82,
    acceleration: 81,
    maxLift: '125 kg Bench',
    shotPower: 94,
    finishing: 95,
    shotAccuracy: 89,
    passingAccuracy: 81,
    strongFoot: 'Right',
    weakFootUsage: 'Very Frequent (4/5)',
    totalTrophies: 35,
    trophiesList: {
      club: [
        '5x UEFA Champions League',
        '3x Premier League',
        '2x La Liga',
        '2x Serie A',
        '1x FA Cup',
        '2x Copa del Rey',
        '1x Arab Club Champions Cup'
      ],
      national: [
        'Euro 2016 Champion',
        'UEFA Nations League 2019'
      ],
      individual: [
        '5x Ballon d\'Or',
        '4x European Golden Shoe',
        '3x Best FIFA Men\'s Player',
        '1x FIFA Puskás Award'
      ]
    },
    clubsPlayedFor: ['Sporting CP', 'Manchester United', 'Real Madrid', 'Juventus', 'Al-Nassr FC'],
    careerGoals: 895,
    careerAssists: 251,
    specialSkills: ['Power Free-Kick', 'Acrobatic Header', 'Knuckle Shot', 'First-Time Volley'],
    overallScore105: 102
  },
  {
    id: 'bruno',
    name: 'Bruno Fernandes',
    fullName: 'Bruno Miguel Borges Fernandes',
    number: 8,
    position: 'Midfielder',
    club: 'Manchester United',
    age: 31,
    caps: 78,
    goals: 24,
    rating: 88,
    image: brunoImg,
    stats: { pace: 75, shooting: 86, passing: 91, dribbling: 84, defending: 68, physical: 77 },
    tacticalRole: 'TACTICAL UNIT: CREATIVE MAESTRO / LONG-RANGE THREAT',
    bio: 'BRUNO FERNANDES: THE ORCHESTRATOR. A high-octane advanced playmaker whose vision creates lethal chances out of nothing. Boasting supreme passing precision and unmatched stamina, Bruno conducts Portugal\'s transition. His long-range strike capabilities from outside the box are designated secondary bombardment procedures.',
    achievements: [
      'Manchester United Captain',
      '2x Premier League Player of the Season Nominee',
      'UEFA Nations League 2019 Champion',
      'Primeiro Ministro of Midfield Assistances'
    ],
    height: '179 cm',
    speed: 75,
    acceleration: 78,
    maxLift: '85 kg Bench',
    shotPower: 88,
    finishing: 81,
    shotAccuracy: 84,
    passingAccuracy: 91,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 4,
    trophiesList: {
      club: [
        '1x FA Cup',
        '1x EFL Cup',
        '1x Portuguese Cup (Taça de Portugal)',
        '1x Portuguese League Cup (Taça da Liga)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        '2x Sir Matt Busby Player of the Year',
        'UEFA Europa League Squad of the Season'
      ]
    },
    clubsPlayedFor: ['Novara', 'Udinese', 'Sampdoria', 'Sporting CP', 'Manchester United'],
    careerGoals: 184,
    careerAssists: 155,
    specialSkills: ['Pinpoint Crossing', 'Diving Pass', 'Long-Range Rocket', 'No-Look Penalty'],
    overallScore105: 97
  },
  {
    id: 'bernardo',
    name: 'Bernardo Silva',
    fullName: 'Bernardo Mota Veiga de Carvalho e Silva',
    number: 10,
    position: 'Midfielder',
    club: 'Manchester City',
    age: 31,
    caps: 95,
    goals: 12,
    rating: 88,
    image: bernardoImg,
    stats: { pace: 78, shooting: 79, passing: 88, dribbling: 92, defending: 72, physical: 69 },
    tacticalRole: 'TACTICAL UNIT: BALL RETENTION / SPACE MANIPULATOR',
    bio: 'BERNARDO SILVA: THE DRIBBLING GENIUS. Blessed with micro-dribbling capacity, Bernardo operates as the ultimate possession stabilizer. Capable of weaving through heavy traffic in the final third, he manipulates structural gaps with high defensive workrate and flawless short passing.',
    achievements: [
      '6x Premier League Champion',
      'UEFA Champions League Winner 2023',
      'UEFA Nations League Player of the Tournament 2019',
      'PFA Team of the Year Member'
    ],
    height: '173 cm',
    speed: 78,
    acceleration: 81,
    maxLift: '75 kg Bench',
    shotPower: 76,
    finishing: 78,
    shotAccuracy: 80,
    passingAccuracy: 89,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 16,
    trophiesList: {
      club: [
        '1x UEFA Champions League',
        '6x Premier League',
        '2x FA Cup',
        '4x EFL Cup',
        '1x Ligue 1 (AS Monaco)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'Nations League Player of the Tournament 2019',
        'Manchester City Player of the Year 2018/19'
      ]
    },
    clubsPlayedFor: ['Benfica', 'AS Monaco', 'Manchester City'],
    careerGoals: 98,
    careerAssists: 110,
    specialSkills: ['Micro-Dribbling', 'Space Pocket Explorer', 'Tiki-Taka Conductor', 'High-Intensity Pressing'],
    overallScore105: 96
  },
  {
    id: 'ruben',
    name: 'Rúben Dias',
    fullName: 'Rúben dos Santos Gato Alves Dias',
    number: 3,
    position: 'Defender',
    club: 'Man City',
    age: 29,
    caps: 65,
    goals: 3,
    rating: 89,
    image: rubendiasImg,
    stats: { pace: 72, shooting: 39, passing: 74, dribbling: 68, defending: 91, physical: 88 },
    tacticalRole: 'TACTICAL UNIT: DEFENSIVE COMMANDER / LEAD SHIELD',
    bio: 'RÚBEN DIAS: THE BULWARK. A physical titan and tactical communicator who directs the defensive defensive grid. Exhibiting outstanding positioning, aerial superiority, and crucial tackle reflexes, Dias stands as the primary defensive barrier, stopping opposing incursions with absolute authority.',
    achievements: [
      'FWA Footballer of the Year 2021',
      '4x Premier League Champion',
      'UEFA Champions League Winner 2023',
      'Champions League Defender of the Season'
    ],
    height: '187 cm',
    speed: 72,
    acceleration: 71,
    maxLift: '135 kg Bench',
    shotPower: 65,
    finishing: 35,
    shotAccuracy: 45,
    passingAccuracy: 84,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 11,
    trophiesList: {
      club: [
        '1x UEFA Champions League',
        '4x Premier League',
        '1x FA Cup',
        '1x Primeira Liga (Benfica)',
        '1x Supertaça (Benfica)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'FWA Footballer of the Year 2021',
        'Premier League Player of the Season 2020/21',
        'UEFA Champions League Defender of the Season'
      ]
    },
    clubsPlayedFor: ['Benfica', 'Manchester City'],
    careerGoals: 19,
    careerAssists: 8,
    specialSkills: ['Block Mastery', 'Aerial Anchor', 'Vocal Commander', 'Slide Tackle Specialist'],
    overallScore105: 98
  },
  {
    id: 'leao',
    name: 'Rafael Leão',
    fullName: 'Rafael Alexandre da Conceição Leão',
    number: 17,
    position: 'Forward',
    club: 'AC Milan',
    age: 27,
    caps: 36,
    goals: 5,
    rating: 86,
    image: leaoImg,
    stats: { pace: 96, shooting: 82, passing: 79, dribbling: 90, defending: 28, physical: 79 },
    tacticalRole: 'TACTICAL UNIT: EXPLOSIVE FLANK PENETRATION / WINGER',
    bio: 'RAFAEL LEÃO: THE ROCKET. Fitted with explosive acceleration and superb dribbling skill, Leão is a terrifying prospect on the left wing. He specializes in isolated 1v1 engagements, using direct burst acceleration to slice open flanks and deploy low driven crosses into the target box.',
    achievements: [
      'Serie A MVP 2021/22',
      'Serie A Champion with AC Milan',
      'Top Dribbler in Italian top tier',
      'Lethal Counter-Attack Specialist'
    ],
    height: '188 cm',
    speed: 96,
    acceleration: 95,
    maxLift: '110 kg Bench',
    shotPower: 85,
    finishing: 83,
    shotAccuracy: 81,
    passingAccuracy: 78,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x Serie A (AC Milan)',
        '1x Primeira Liga (Sporting CP)'
      ],
      national: [],
      individual: [
        'Serie A MVP 2021/22',
        'Serie A Footballer of the Year 2022'
      ]
    },
    clubsPlayedFor: ['Sporting CP', 'Lille OSC', 'AC Milan'],
    careerGoals: 82,
    careerAssists: 58,
    specialSkills: ['Burst Acceleration', 'Stepover Maestro', 'Flick-On', 'Outside-Foot Curler'],
    overallScore105: 95
  },
  {
    id: 'costa',
    name: 'Diogo Costa',
    fullName: 'Diogo Meireles da Costa',
    number: 22,
    position: 'Goalkeeper',
    club: 'FC Porto',
    age: 26,
    caps: 32,
    goals: 0,
    rating: 86,
    image: diogocostaImg,
    stats: { pace: 55, shooting: 20, passing: 84, dribbling: 30, defending: 86, physical: 78 },
    tacticalRole: 'TACTICAL UNIT: PRECISE SHOT-STOPPER / DISTRIBUTOR',
    bio: 'DIOGO COSTA: THE GUARDIAN. Possessing elite-grade reflex parameters and world-class penalty denial metrics. Costa acts as the final firewall. His pinpoint ball distribution from the penalty box initiates lightning-quick counter offensive actions, turning defense to attack in under 3 seconds.',
    achievements: [
      'First Goalkeeper with 3 Penalty Saves in a single Euro Shootout (Euro 2024)',
      '2x Primeira Liga Champion with FC Porto',
      'Golden Glove Recipient',
      'Highest Passing Accuracy Goalkeeper in UEFA'
    ],
    height: '186 cm',
    speed: 55,
    acceleration: 58,
    maxLift: '95 kg Bench',
    shotPower: 72,
    finishing: 15,
    shotAccuracy: 25,
    passingAccuracy: 84,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 6,
    trophiesList: {
      club: [
        '2x Primeira Liga',
        '2x Portuguese Cup (Taça de Portugal)',
        '1x Portuguese League Cup (Taça da Liga)'
      ],
      national: [
        'UEFA Under-17 Championship 2016',
        'UEFA Under-19 Championship 2018'
      ],
      individual: [
        'Primeira Liga Goalkeeper of the Year',
        'Euro 2024 Penalty Shootout Record Holder'
      ]
    },
    clubsPlayedFor: ['FC Porto'],
    careerGoals: 0,
    careerAssists: 1,
    specialSkills: ['Penalty Stop Special', 'Sweeper Keeper', 'Counter Launch Kick', 'Reflex Mastery'],
    goalkeepingProficiency: { reflexes: 92, handling: 84, kicking: 88, positioning: 86, diving: 89 },
    overallScore105: 94
  },
  {
    id: 'vitinha',
    name: 'Vitinha',
    fullName: 'Vítor Machado Ferreira',
    number: 23,
    position: 'Midfielder',
    club: 'Paris Saint-Germain',
    age: 26,
    caps: 25,
    goals: 1,
    rating: 85,
    image: vitinhaImg,
    stats: { pace: 80, shooting: 78, passing: 89, dribbling: 87, defending: 75, physical: 72 },
    tacticalRole: 'TACTICAL UNIT: TRANSITIONAL ENGINE / HUB CONNECTOR',
    bio: 'VITINHA: THE MOTOR. A deep-lying orchestrator who controls the match tempo. His supreme escape-ability under high-pressure pressing systems makes him a core transitional asset. He acts as the fluid linkage between back four and advanced lines.',
    achievements: [
      'Ligue 1 Champion with PSG',
      'Primeira Liga Winner with Porto',
      'UEFA Under-21 Euro Team of the Tournament',
      'PSG Midfield Player of the Year'
    ],
    height: '172 cm',
    speed: 80,
    acceleration: 82,
    maxLift: '70 kg Bench',
    shotPower: 81,
    finishing: 74,
    shotAccuracy: 79,
    passingAccuracy: 90,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 8,
    trophiesList: {
      club: [
        '2x Ligue 1',
        '1x French Cup (Coupe de France)',
        '1x Primeira Liga (FC Porto)',
        '1x Portuguese Cup'
      ],
      national: [],
      individual: [
        'Ligue 1 Team of the Year 2023/24',
        'UNFP Player of the Month'
      ]
    },
    clubsPlayedFor: ['FC Porto', 'Wolverhampton Wanderers', 'Paris Saint-Germain'],
    careerGoals: 22,
    careerAssists: 31,
    specialSkills: ['Press-Resistance', 'Dribble Out of Danger', 'Tempo Conductor', 'Flick Pass'],
    overallScore105: 94
  },
  {
    id: 'mendes',
    name: 'Nuno Mendes',
    fullName: 'Nuno Alexandre Tavares Mendes',
    number: 25,
    position: 'Defender',
    club: 'PSG',
    age: 24,
    caps: 30,
    goals: 0,
    rating: 84,
    image: nunomendesImg,
    stats: { pace: 93, shooting: 66, passing: 78, dribbling: 84, defending: 80, physical: 81 },
    tacticalRole: 'TACTICAL UNIT: HIGH-SPEED LEFT OVERLAP / SHIELD',
    bio: 'NUNO MENDES: THE BULLET. A young explosive left-back combining ferocious recovery speed with direct attacking overlaps. Mendes forms a fearsome tactical axis with Rafael Leão on the left wing, providing unmatched defensive speed-cover and technical overlapping crossing.',
    achievements: [
      '2x Ligue 1 Champion with PSG',
      'Primeira Liga Champion with Sporting CP',
      'Ligue 1 Young Player of the Year nominee',
      'Top Speed clocked at 35.6 km/h'
    ],
    height: '184 cm',
    speed: 93,
    acceleration: 92,
    maxLift: '105 kg Bench',
    shotPower: 79,
    finishing: 60,
    shotAccuracy: 65,
    passingAccuracy: 80,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 7,
    trophiesList: {
      club: [
        '2x Ligue 1',
        '1x Coupe de France',
        '1x Primeira Liga (Sporting CP)',
        '1x Portuguese Cup'
      ],
      national: [],
      individual: [
        'Ligue 1 Young Player of the Year 2022/23',
        'Ligue 1 Team of the Year'
      ]
    },
    clubsPlayedFor: ['Sporting CP', 'Paris Saint-Germain'],
    careerGoals: 8,
    careerAssists: 24,
    specialSkills: ['High-Speed Overlap', 'Recovery Sprints', 'Sliding Interception', 'Direct Cross'],
    overallScore105: 93
  },
  {
    id: 'cancelo',
    name: 'João Cancelo',
    fullName: 'João Pedro Cavaco Cancelo',
    number: 20,
    position: 'Defender',
    club: 'Barcelona',
    age: 32,
    caps: 58,
    goals: 10,
    rating: 86,
    image: joaocanceloImg,
    stats: { pace: 83, shooting: 73, passing: 86, dribbling: 87, defending: 78, physical: 72 },
    tacticalRole: 'TACTICAL UNIT: INVERTED PLAYMAKING FULL-BACK',
    bio: 'JOÃO CANCELO: THE INVERTER. A highly technical full-back who shifts into standard central midfield zones during attacking phases. Armed with spectacular outside-of-foot crossing (trivela) and sleek dribbling skills, he plays as an auxiliary tactical playmaker.',
    achievements: [
      'Premier League Champion (Manchester City)',
      'Serie A Champion (Juventus)',
      'Bundesliga Champion (Bayern Munich)',
      'FIFPro World XI Member'
    ],
    height: '182 cm',
    speed: 83,
    acceleration: 82,
    maxLift: '90 kg Bench',
    shotPower: 83,
    finishing: 70,
    shotAccuracy: 76,
    passingAccuracy: 86,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 12,
    trophiesList: {
      club: [
        '3x Premier League',
        '1x Serie A (Juventus)',
        '1x Bundesliga (Bayern Munich)',
        '1x Primeira Liga (Benfica)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        '2x PFA Team of the Year',
        'FIFPro World XI 2022'
      ]
    },
    clubsPlayedFor: ['Benfica', 'Valencia', 'Inter Milan', 'Juventus', 'Manchester City', 'Bayern Munich', 'FC Barcelona', 'Al-Hilal FC'],
    careerGoals: 24,
    careerAssists: 72,
    specialSkills: ['Trivela Crossing', 'Inverted Playmaker', 'Skill Stepover', 'Slick Feints'],
    overallScore105: 94
  },
  {
    id: 'felix',
    name: 'João Félix',
    fullName: 'João Félix Sequeira',
    number: 11,
    position: 'Forward',
    club: 'Chelsea FC',
    age: 26,
    caps: 41,
    goals: 8,
    rating: 83,
    image: felixImg,
    stats: { pace: 81, shooting: 80, passing: 81, dribbling: 87, defending: 36, physical: 68 },
    tacticalRole: 'TACTICAL UNIT: SECOND STRIKER / FLOATING ATTACKER',
    bio: 'JOÃO FÉLIX: THE ARTIST. An elegant second striker who thrives in the pockets between midfield and defense. Using supreme close control and delicate body feints, Felix manipulates tight areas and executes exquisite flick passes to unlock dense defensive formations.',
    achievements: [
      'Golden Boy Winner 2019',
      'La Liga Champion with Atlético Madrid',
      'Chelsea FC Star Attacker',
      'Elite Pocket Explorer'
    ],
    height: '181 cm',
    speed: 81,
    acceleration: 83,
    maxLift: '78 kg Bench',
    shotPower: 79,
    finishing: 81,
    shotAccuracy: 81,
    passingAccuracy: 82,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x La Liga (Atlético Madrid)',
        '1x Primeira Liga (Benfica)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'Golden Boy 2019',
        'Primeira Liga Breakthrough Player'
      ]
    },
    clubsPlayedFor: ['Benfica', 'Atlético Madrid', 'Chelsea FC', 'FC Barcelona'],
    careerGoals: 88,
    careerAssists: 44,
    specialSkills: ['Pocket Pocketing', 'Creative Flick-On', 'Delicate Chip', 'Nutmeg Mastery'],
    overallScore105: 91
  },
  {
    id: 'jota',
    name: 'Diogo Jota',
    fullName: 'Diogo José Teixeira da Silva',
    number: 21,
    position: 'Forward',
    club: 'Liverpool FC',
    age: 29,
    caps: 42,
    goals: 14,
    rating: 84,
    image: jotaImg,
    stats: { pace: 83, shooting: 85, passing: 75, dribbling: 84, defending: 54, physical: 77 },
    tacticalRole: 'TACTICAL UNIT: CLINICAL STRIKER / INTENSE PRESSER',
    bio: 'DIOGO JOTA: THE SNIPER. A highly efficient attacker celebrated for outstanding finishing with both feet. Known for intense physical pressing off-the-ball and brilliant aerial headers despite his height, Jota is a dangerous dynamic attacking weapon.',
    achievements: [
      'FA Cup and EFL Cup Champion with Liverpool',
      'UEFA Champions League Runner-up',
      'Over 50 Premier League Goals Scored',
      'Both-Feet Lethal Rating of 95%'
    ],
    height: '178 cm',
    speed: 83,
    acceleration: 85,
    maxLift: '105 kg Bench',
    shotPower: 84,
    finishing: 87,
    shotAccuracy: 86,
    passingAccuracy: 78,
    strongFoot: 'Right',
    weakFootUsage: 'Very Frequent (5/5 - Both Feet)',
    totalTrophies: 5,
    trophiesList: {
      club: [
        '1x FA Cup',
        '2x EFL Cup',
        '1x FA Community Shield'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'UEFA Champions League Breakthrough XI',
        'Primeira Liga Player of the Month'
      ]
    },
    clubsPlayedFor: ['Paços de Ferreira', 'Atlético Madrid', 'FC Porto', 'Wolverhampton Wanderers', 'Liverpool FC'],
    careerGoals: 124,
    careerAssists: 52,
    specialSkills: ['Ambidextrous Finishing', 'Elite Aerial Header', 'High-Intensity Pressing', 'Slick Tap-In'],
    overallScore105: 92
  },
  {
    id: 'dalot',
    name: 'Diogo Dalot',
    fullName: 'Jose Diogo Dalot Teixeira',
    number: 5,
    position: 'Defender',
    club: 'Man United',
    age: 27,
    caps: 42,
    goals: 4,
    rating: 85,
    image: diogodalotImg,
    stats: { pace: 84, shooting: 68, passing: 82, dribbling: 80, defending: 82, physical: 79 },
    tacticalRole: 'TACTICAL UNIT: OVERLAPPING FULLBACK / HYBRID DEFENDER',
    bio: 'DIOGO DALOT: THE ADAPTABLE SHIELD. A highly versatile full-back whose positional sense makes him a major asset. Excellent in dual-flank overlap protocols and physical resistance.',
    achievements: [
      'Manchester United Players\' Player of the Year 2023/24',
      'FA Cup Winner 2024',
      'Primeira Liga Champion 2018'
    ],
    height: '184 cm',
    speed: 84,
    acceleration: 82,
    maxLift: '115 kg Bench',
    shotPower: 81,
    finishing: 68,
    shotAccuracy: 72,
    passingAccuracy: 82,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x Primeira Liga (Porto)',
        '1x FA Cup (Man United)',
        '1x EFL Cup (Man United)'
      ],
      national: [
        'UEFA Under-17 Championship 2016'
      ],
      individual: [
        'Manchester United Players\' Player of the Year 23/24'
      ]
    },
    clubsPlayedFor: ['FC Porto', 'AC Milan', 'Manchester United'],
    careerGoals: 15,
    careerAssists: 24,
    specialSkills: ['Overlapping Run', 'Tactical Versatility', 'Interception King', 'Hard-Line Block'],
    overallScore105: 91
  },
  {
    id: 'tomas_araujo',
    name: 'Tomás Araújo',
    fullName: 'Tomás Lino Araújo',
    number: 4,
    position: 'Defender',
    club: 'Benfica',
    age: 24,
    caps: 5,
    goals: 0,
    rating: 81,
    image: tomasaraujoImg,
    stats: { pace: 78, shooting: 40, passing: 76, dribbling: 72, defending: 82, physical: 79 },
    tacticalRole: 'TACTICAL UNIT: MODERN BALL-PLAYING CENTER-BACK',
    bio: 'TOMÁS ARAÚJO: THE ASCENDANT DEFENDER. A modern ball-playing central defender from Benfica\'s famed youth system. Known for outstanding composure under press, slick short passing, and clean, elegant recovery tackles.',
    achievements: [
      'Primeira Liga Champion 2022/23',
      'UEFA Youth League Winner 2021/22'
    ],
    height: '187 cm',
    speed: 78,
    acceleration: 77,
    maxLift: '115 kg Bench',
    shotPower: 68,
    finishing: 35,
    shotAccuracy: 42,
    passingAccuracy: 84,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x Primeira Liga (Benfica)',
        '1x Supertaça (Benfica)',
        '1x UEFA Youth League (Benfica U19)'
      ],
      national: [],
      individual: [
        'Primeira Liga Defender of the Month'
      ]
    },
    clubsPlayedFor: ['Benfica', 'Gil Vicente'],
    careerGoals: 4,
    careerAssists: 2,
    specialSkills: ['Composed Buildup', 'Clean Recovery Tackle', 'Intercept Coverage', 'Aerial Domination'],
    overallScore105: 89
  },
  {
    id: 'inacio',
    name: 'Gonçalo Inácio',
    fullName: 'Gonçalo Bernardo Inácio',
    number: 14,
    position: 'Defender',
    club: 'Sporting',
    age: 24,
    caps: 22,
    goals: 2,
    rating: 84,
    image: goncaloinacioImg,
    stats: { pace: 76, shooting: 52, passing: 82, dribbling: 72, defending: 84, physical: 80 },
    tacticalRole: 'TACTICAL UNIT: LEFT-FOOTED BUILD-UP CONTROLLER',
    bio: 'GONÇALO INÁCIO: THE DISTRIBUTOR. A left-footed central defender crucial to modern buildup protocols. Armed with exceptional diagonal distribution ranges and direct diagonal crossing sweeps.',
    achievements: [
      '2x Primeira Liga Champion with Sporting CP',
      'Portuguese League Cup Winner'
    ],
    height: '185 cm',
    speed: 76,
    acceleration: 75,
    maxLift: '110 kg Bench',
    shotPower: 74,
    finishing: 52,
    shotAccuracy: 55,
    passingAccuracy: 88,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 5,
    trophiesList: {
      club: [
        '2x Primeira Liga (Sporting CP)',
        '2x Taça da Liga (Sporting CP)',
        '1x Supertaça Cândido de Oliveira'
      ],
      national: [],
      individual: [
        'Primeira Liga Team of the Year',
        'Sporting CP Breakthrough of the Year'
      ]
    },
    clubsPlayedFor: ['Sporting CP'],
    careerGoals: 15,
    careerAssists: 9,
    specialSkills: ['Left-Footed Long Pass', 'Build-Up Playmaker', 'Zone Control', 'Set-Piece Header'],
    overallScore105: 91
  },
  {
    id: 'neves',
    name: 'João Neves',
    fullName: 'João Pedro Gonçalves Neves',
    number: 15,
    position: 'Midfielder',
    club: 'Paris Saint-Germain',
    age: 21,
    caps: 16,
    goals: 0,
    rating: 85,
    image: joaonevesImg,
    stats: { pace: 79, shooting: 70, passing: 88, dribbling: 86, defending: 82, physical: 80 },
    tacticalRole: 'TACTICAL UNIT: POCKET-SIZED MIDFIELD TITAN',
    bio: 'JOÃO NEVES: THE TRANSITIONAL MIRACLE. Unbelievable defensive covers for his height. Positional speed-carrying and press defiance of international-grade caliber. A deep-lying anchor who breaks up lines and distributes seamlessly.',
    achievements: [
      'Primeira Liga Champion 2022/23',
      'Golden Boy Nominee 2024',
      'Ligue 1 Star Rising Midfielder'
    ],
    height: '174 cm',
    speed: 79,
    acceleration: 83,
    maxLift: '100 kg Squat',
    shotPower: 77,
    finishing: 70,
    shotAccuracy: 74,
    passingAccuracy: 91,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x Primeira Liga (Benfica)',
        '1x Supertaça Cândido de Oliveira',
        '1x Trophée des Champions (PSG)'
      ],
      national: [],
      individual: [
        'Primeira Liga Midfielder of the Month',
        'Golden Boy Nominee 2024'
      ]
    },
    clubsPlayedFor: ['SL Benfica', 'Paris Saint-Germain'],
    careerGoals: 7,
    careerAssists: 15,
    specialSkills: ['Pressing Resistance', 'Tenacious Tackling', 'Midfield Pivot', '360-Degree Vision'],
    overallScore105: 92
  },
  {
    id: 'ramos',
    name: 'Gonçalo Ramos',
    fullName: 'Gonçalo Matias Ramos',
    number: 9,
    position: 'Forward',
    club: 'Paris Saint-Germain',
    age: 25,
    caps: 16,
    goals: 8,
    rating: 83,
    image: ramosImg,
    stats: { pace: 80, shooting: 84, passing: 70, dribbling: 76, defending: 40, physical: 82 },
    tacticalRole: 'TACTICAL UNIT: PRESSING TARGET FORWARD / LETHAL SWEEPER',
    bio: 'GONÇALO RAMOS: THE RAIDER. Celebrated for high-octane defensive runs from the front, setting templates for deep defensive disruption. Armed with brutal off-the-ball movements and clinical penalty-box finishing.',
    achievements: [
      'World Cup Hat-Trick Hero vs Switzerland (Qatar 2022)',
      'Primeira Liga Champion 2022/23',
      'Ligue 1 Champion 2023/24'
    ],
    height: '185 cm',
    speed: 80,
    acceleration: 78,
    maxLift: '115 kg Bench',
    shotPower: 86,
    finishing: 88,
    shotAccuracy: 83,
    passingAccuracy: 75,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 4,
    trophiesList: {
      club: [
        '1x Primeira Liga (Benfica)',
        '1x Ligue 1 (PSG)',
        '1x Coupe de France (PSG)',
        '1x Trophée des Champions (PSG)'
      ],
      national: [],
      individual: [
        'World Cup Hat-Trick Hero (Qatar 2022)',
        'Benfica Top Scorer 2022/23'
      ]
    },
    clubsPlayedFor: ['SL Benfica', 'Paris Saint-Germain'],
    careerGoals: 72,
    careerAssists: 20,
    specialSkills: ['Off-the-Ball Run', 'First-Time Volley', 'Pressing Forward', 'Target-Man Linkup'],
    overallScore105: 91
  },
  {
    id: 'conceicao',
    name: 'Francisco Conceição',
    fullName: 'Francisco Fernandes da Conceição',
    number: 26,
    position: 'Forward',
    club: 'Juventus',
    age: 23,
    caps: 10,
    goals: 2,
    rating: 81,
    image: conceicaoImg,
    stats: { pace: 89, shooting: 75, passing: 76, dribbling: 88, defending: 32, physical: 62 },
    tacticalRole: 'TACTICAL UNIT: POCKET DYNAMITE / DRIBBLE SPECIALIST',
    bio: 'FRANCISCO CONCEIÇÃO: THE SPARK. A dynamic right winger blessed with lethal close-quarter cuts and unpredictable acceleration. Highly creative in isolated wide flanks.',
    achievements: [
      'Euro 2024 Game-Winning Goal scorer vs Czechia',
      'Primeira Liga Champion with Porto'
    ],
    height: '170 cm',
    speed: 89,
    acceleration: 92,
    maxLift: '72 kg Bench',
    shotPower: 79,
    finishing: 78,
    shotAccuracy: 79,
    passingAccuracy: 81,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 3,
    trophiesList: {
      club: [
        '1x Primeira Liga (Porto)',
        '1x Taça de Portugal (Porto)',
        '1x KNVB Cup (Ajax)'
      ],
      national: [],
      individual: [
        'FC Porto Golden Dragon Award 2023',
        'Euro 2024 Late Game Winner vs Czechia'
      ]
    },
    clubsPlayedFor: ['FC Porto', 'Ajax Amsterdam', 'Juventus'],
    careerGoals: 18,
    careerAssists: 22,
    specialSkills: ['Inside Cut-Dribble', 'Micro-Burst Acceleration', 'Foul Magnet', 'Aggressive Winger Pressing'],
    overallScore105: 90
  },
  {
    id: 'neto',
    name: 'Pedro Neto',
    fullName: 'Pedro Lomba Neto',
    number: 18,
    position: 'Forward',
    club: 'Chelsea FC',
    age: 26,
    caps: 15,
    goals: 2,
    rating: 83,
    image: netoImg,
    stats: { pace: 92, shooting: 77, passing: 81, dribbling: 85, defending: 30, physical: 72 },
    tacticalRole: 'TACTICAL UNIT: TRANSITIONAL SPEED CARRY WINGER',
    bio: 'PEDRO NETO: THE VELOCITY UNIT. Capable of driving deep into opponent channels on absolute lightning lines. Features supreme crossing profiles and transitional carries.',
    achievements: [
      'Coppa Italia Winner with Lazio',
      'Chelsea Premier Assist-Provider'
    ],
    height: '172 cm',
    speed: 92,
    acceleration: 93,
    maxLift: '95 kg Bench',
    shotPower: 82,
    finishing: 77,
    shotAccuracy: 80,
    passingAccuracy: 83,
    strongFoot: 'Left',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 2,
    trophiesList: {
      club: [
        '1x Taça de Portugal (Braga)',
        '1x Coppa Italia (Lazio)'
      ],
      national: [],
      individual: [
        'Wolverhampton Player of the Year nominee 2021',
        'Top Assist Provider in UEFA Qualifier rounds'
      ]
    },
    clubsPlayedFor: ['Sporting de Braga', 'Lazio Roma', 'Wolverhampton Wanderers', 'Chelsea FC'],
    careerGoals: 25,
    careerAssists: 48,
    specialSkills: ['Linear Sprint', 'Slick Cutback', 'Transition Carry', 'Whipped Cross'],
    overallScore105: 91
  },
  {
    id: 'rubenneves',
    name: 'Rúben Neves',
    fullName: 'Rúben Diogo da Silva Neves',
    number: 21,
    position: 'Midfielder',
    club: 'Al-Hilal FC',
    age: 29,
    caps: 54,
    goals: 2,
    rating: 84,
    image: rubennevesImg,
    stats: { pace: 68, shooting: 76, passing: 87, dribbling: 77, defending: 78, physical: 76 },
    tacticalRole: 'TACTICAL UNIT: LONG-RANGE DEEP QUARTERBACK',
    bio: 'RÚBEN NEVES: THE DIAL. Operates as deep playmaker sweep, sending pristine 50-yard diagonals to wingers. Elite free-kick taker and shot power specialist.',
    achievements: [
      'EFL Championship Winner with Wolves',
      'Saudi Pro League Champion 2023/24'
    ],
    height: '180 cm',
    speed: 68,
    acceleration: 67,
    maxLift: '105 kg Bench',
    shotPower: 91,
    finishing: 72,
    shotAccuracy: 78,
    passingAccuracy: 89,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 5,
    trophiesList: {
      club: [
        '1x EFL Championship (Wolves)',
        '1x Saudi Pro League (Al-Hilal)',
        '1x Saudi King Cup (Al-Hilal)',
        '1x Saudi Super Cup (Al-Hilal)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'Wolverhampton Player of the Season 2017/18',
        'Championship Team of the Year'
      ]
    },
    clubsPlayedFor: ['FC Porto', 'Wolverhampton Wanderers', 'Al-Hilal FC'],
    careerGoals: 55,
    careerAssists: 38,
    specialSkills: ['Long-Range Laser', 'Deep Quarterback Diagonal', 'Free-Kick Specialist', 'Zone Intercept'],
    overallScore105: 92
  },
  {
    id: 'matheus',
    name: 'Matheus Nunes',
    fullName: 'Matheus Luiz Nunes',
    number: 6,
    position: 'Midfielder',
    club: 'Manchester City',
    age: 27,
    caps: 16,
    goals: 2,
    rating: 81,
    image: matheusImg,
    stats: { pace: 84, shooting: 71, passing: 79, dribbling: 84, defending: 68, physical: 78 },
    tacticalRole: 'TACTICAL UNIT: VERTICAL TRANSITION LINE-BREAKER',
    bio: 'MATHEUS NUNES: THE CARRIER. Known for outstanding capabilities in carrying the ball out from crowded deep segments into offensive sectors.',
    achievements: [
      'Primeira Liga Champion with Sporting',
      'Premier League Champion with Manchester City 2023/24',
      'FIFA Club World Cup Champion'
    ],
    height: '183 cm',
    speed: 84,
    acceleration: 83,
    maxLift: '110 kg Bench',
    shotPower: 81,
    finishing: 71,
    shotAccuracy: 73,
    passingAccuracy: 85,
    strongFoot: 'Right',
    weakFootUsage: 'Frequent (4/5)',
    totalTrophies: 5,
    trophiesList: {
      club: [
        '1x Primeira Liga (Sporting CP)',
        '1x Premier League (Man City)',
        '1x FIFA Club World Cup',
        '1x UEFA Super Cup'
      ],
      national: [],
      individual: [
        'Primeira Liga Midfielder of the Season 2021/22'
      ]
    },
    clubsPlayedFor: ['Ericeirense', 'Estoril Praia', 'Sporting CP', 'Wolverhampton Wanderers', 'Manchester City'],
    careerGoals: 18,
    careerAssists: 26,
    specialSkills: ['Transition Carrier', 'Burst Through Lines', 'Turn on a Dime', 'Midfield Overlap'],
    overallScore105: 90
  },
  {
    id: 'renato_veiga',
    name: 'Renato Veiga',
    fullName: 'Renato Palma Veiga',
    number: 13,
    position: 'Defender',
    club: 'Villarreal',
    age: 22,
    caps: 6,
    goals: 0,
    rating: 80,
    image: renatoveigaImg,
    stats: { pace: 75, shooting: 68, passing: 77, dribbling: 74, defending: 80, physical: 84 },
    tacticalRole: 'TACTICAL UNIT: MULTI-POSITIONAL DEFENSIVE PROTECTOR',
    bio: 'RENATO VEIGA: THE VERSATILE ENFORCER. An incredibly strong, physical, and versatile defensive asset who can operate as a left-sided center-back, full-back, or defensive midfielder. Possesses a powerful left foot, high tactical aggression, and supreme dual-winning capability.',
    achievements: [
      'Debuted in Portugal National Team (2024)',
      'Key transfer to Villarreal (2026)'
    ],
    height: '190 cm',
    speed: 75,
    acceleration: 74,
    maxLift: '130 kg Bench',
    shotPower: 86,
    finishing: 58,
    shotAccuracy: 64,
    passingAccuracy: 81,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 1,
    trophiesList: {
      club: [],
      national: [],
      individual: []
    },
    clubsPlayedFor: ['Sporting CP B', 'FC Augsburg', 'FC Basel', 'Chelsea FC', 'Villarreal'],
    careerGoals: 8,
    careerAssists: 5,
    specialSkills: ['Aggressive Dual Winner', 'Multi-Position Shield', 'Powerful Left-Foot Longshot', 'Aerial Dominance'],
    overallScore105: 88
  },
  {
    id: 'samu_costa',
    name: 'Samú Costa',
    fullName: 'Samuel de Almeida Costa',
    number: 24,
    position: 'Defender',
    club: 'Mallorca',
    age: 25,
    caps: 4,
    goals: 0,
    rating: 80,
    image: samucostaImg,
    stats: { pace: 74, shooting: 68, passing: 76, dribbling: 75, defending: 79, physical: 82 },
    tacticalRole: 'TACTICAL UNIT: INTENSE PRESSING SHIELD',
    bio: 'SAMÚ COSTA: THE BALL-WINNING SHIELD. An energetic, tenacious player for Mallorca who excels at breaking up opposition play and initiating direct transition. Known for his high tactical discipline and dominant physical presence.',
    achievements: [
      'Debuted in Portugal National Team (2024)',
      'Key midfielder/defender for Mallorca'
    ],
    height: '183 cm',
    speed: 74,
    acceleration: 73,
    maxLift: '115 kg Bench',
    shotPower: 81,
    finishing: 62,
    shotAccuracy: 65,
    passingAccuracy: 79,
    strongFoot: 'Left',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 1,
    trophiesList: {
      club: [
        '1x Copa del Rey Runner-up (Mallorca)'
      ],
      national: [],
      individual: []
    },
    clubsPlayedFor: ['Braga', 'Almería', 'Mallorca'],
    careerGoals: 6,
    careerAssists: 5,
    specialSkills: ['Intense Pressing', 'Tackle Interception', 'Physical Shielding', 'Defensive Coverage'],
    overallScore105: 88
  },
  {
    id: 'semedo',
    name: 'Nélson Semedo',
    fullName: 'Nélson Cabral Semedo',
    number: 2,
    position: 'Defender',
    club: 'Fenerbahçe',
    age: 32,
    caps: 30,
    goals: 0,
    rating: 80,
    image: nelsonsemedoImg,
    stats: { pace: 87, shooting: 52, passing: 76, dribbling: 81, defending: 76, physical: 72 },
    tacticalRole: 'TACTICAL UNIT: HIGH-SPEED RIGHT OVERLAPPING SHIELD',
    bio: 'NÉLSON SEMEDO: THE RECOVERY SPRINT full-back. Combines spectacular pace values with excellent wing retention and recovery capabilities.',
    achievements: [
      '2x La Liga Champion with FC Barcelona',
      '2x Primeira Liga Champion with Benfica'
    ],
    height: '177 cm',
    speed: 87,
    acceleration: 86,
    maxLift: '92 kg Bench',
    shotPower: 73,
    finishing: 55,
    shotAccuracy: 60,
    passingAccuracy: 80,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 10,
    trophiesList: {
      club: [
        '2x Primeira Liga (Benfica)',
        '2x La Liga (FC Barcelona)',
        '1x Copa del Rey (FC Barcelona)',
        '1x Taça de Portugal'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'Primeira Liga Breakthrough Player of the Year'
      ]
    },
    clubsPlayedFor: ['Sintrense', 'SL Benfica', 'FC Barcelona', 'Wolverhampton Wanderers', 'Fenerbahçe'],
    careerGoals: 9,
    careerAssists: 38,
    specialSkills: ['Linear Overlap', 'Tight-Area Escape', 'Slide Interception', 'Sprint Back-Cover'],
    overallScore105: 90
  },
  {
    id: 'sa',
    name: 'José Sá',
    fullName: 'José Pedro Malheiro de Sá',
    number: 12,
    position: 'Goalkeeper',
    club: 'Wolverhampton Wanderers',
    age: 33,
    caps: 2,
    goals: 0,
    rating: 81,
    image: josesaImg,
    stats: { pace: 52, shooting: 12, passing: 75, dribbling: 25, defending: 82, physical: 83 },
    tacticalRole: 'TACTICAL UNIT: AGGRESSIVE AIR DOMAIN SHOT STOPPER',
    bio: 'JOSÉ SÁ: THE TOWERING SENTRY. Dominates the air block domain. Possesses high-quality reaction capabilities and aggressive clearing mechanisms.',
    achievements: [
      'Primeira Liga Champion with Porto',
      'Greek Champion with Olympiacos',
      'Wolverhampton Players\' Player of the Year nominee'
    ],
    height: '192 cm',
    speed: 52,
    acceleration: 54,
    maxLift: '115 kg Bench',
    shotPower: 75,
    finishing: 12,
    shotAccuracy: 20,
    passingAccuracy: 78,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 4,
    trophiesList: {
      club: [
        '1x Primeira Liga (FC Porto)',
        '1x Greek Super League (Olympiacos)'
      ],
      national: [
        'UEFA Nations League 2019'
      ],
      individual: [
        'Greek Super League Goalkeeper of the Year 2019/20'
      ]
    },
    clubsPlayedFor: ['Marítimo', 'FC Porto', 'Olympiacos FC', 'Wolverhampton Wanderers'],
    careerGoals: 0,
    careerAssists: 0,
    specialSkills: ['Commanding Air Domain', 'Acrobatic Save', 'Aggressive Rush Out', 'Quick Throw Release'],
    goalkeepingProficiency: { reflexes: 84, handling: 82, kicking: 76, positioning: 83, diving: 85 },
    overallScore105: 89
  },
  {
    id: 'ruisilva',
    name: 'Rui Silva',
    fullName: 'Rui Tiago Dantas da Silva',
    number: 22,
    position: 'Goalkeeper',
    club: 'Real Betis',
    age: 32,
    caps: 1,
    goals: 0,
    rating: 80,
    image: ruisilvaImg,
    stats: { pace: 46, shooting: 12, passing: 68, dribbling: 25, defending: 81, physical: 78 },
    tacticalRole: 'TACTICAL UNIT: STEADY REFLEX LINE SHOT STOPPER',
    bio: 'RUI SILVA: THE CALM GUARDIAN. An incredibly reliable goalkeeper playing for Real Betis in La Liga. Known for his robust handling, superb positioning, and calm command over his penalty area.',
    achievements: [
      'Debuted for Portugal National Team (2021)',
      'Copa del Rey Champion with Real Betis (2021/22)',
      'La Liga Consistent Top Performer'
    ],
    height: '191 cm',
    speed: 46,
    acceleration: 48,
    maxLift: '110 kg Bench',
    shotPower: 68,
    finishing: 12,
    shotAccuracy: 18,
    passingAccuracy: 75,
    strongFoot: 'Right',
    weakFootUsage: 'Occasional (3/5)',
    totalTrophies: 1,
    trophiesList: {
      club: [
        '1x Copa del Rey (Real Betis)'
      ],
      national: [],
      individual: []
    },
    clubsPlayedFor: ['Nacional', 'Granada CF', 'Real Betis'],
    careerGoals: 0,
    careerAssists: 0,
    specialSkills: ['Positioning Master', 'Clean Catching', 'Penalty Spot Defense', 'Calm Distributer'],
    goalkeepingProficiency: { reflexes: 82, handling: 81, kicking: 72, positioning: 83, diving: 79 },
    overallScore105: 88
  }
];
export const completeSquadData: Player[] = squadData;
