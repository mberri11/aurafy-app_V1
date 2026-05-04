import { Module } from '../types';

export const MODULES: Module[] = [
  // RELATIONSHIP MODULES (multi-person)
  {
    id: 'who_loves_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🔮',
    color: '#8B5CF6',
    framework: 'attachment',
  },
  {
    id: 'who_hates_me',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '🖤',
    color: '#E84393',
    framework: 'sociometry',
  },
  {
    id: 'who_jealous',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '👁',
    color: '#F5C542',
    framework: 'sociometry',
  },
  {
    id: 'who_cut_off',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '✂',
    color: '#C73E1D',
    framework: 'mixed',
  },
  {
    id: 'energy_reading',
    type: 'multi',
    starsCost: { solo: 1, compare: 2, triangle: 3, circle: 5 },
    icon: '✨',
    color: '#2FEAAC',
    framework: 'colorWheel',
  },
  // SELF-DISCOVERY MODULES (solo)
  {
    id: 'attachment_style',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🧠',
    color: '#2FEAAC',
    framework: 'attachment',
  },
  {
    id: 'am_i_problem',
    type: 'solo',
    starsCost: { solo: 1, compare: 1, triangle: 1, circle: 1 },
    icon: '🪞',
    color: '#F5C542',
    framework: 'mixed',
  },
];
