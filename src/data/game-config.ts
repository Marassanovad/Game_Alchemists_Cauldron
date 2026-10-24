import type { Difficulty } from './types';

export interface IDifficultyConfig {
  shelfSize: number;
  cauldronCapacity: number;
  startingTime: number;
  recipeTolerance: number;
  startingLives: number;
  scorePerBrew: number;
  timeBonusPerBrew: number;
  reactionCount: number;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, IDifficultyConfig> = {
  easy: {
    shelfSize: 4,
    cauldronCapacity: 4,
    startingTime: 180,
    recipeTolerance: 12,
    startingLives: 5,
    scorePerBrew: 100,
    timeBonusPerBrew: 15,
    reactionCount: 0,
  },
  medium: {
    shelfSize: 6,
    cauldronCapacity: 4,
    startingTime: 150,
    recipeTolerance: 8,
    startingLives: 3,
    scorePerBrew: 200,
    timeBonusPerBrew: 10,
    reactionCount: 2,
  },
  hard: {
    shelfSize: 8,
    cauldronCapacity: 5,
    startingTime: 150,
    recipeTolerance: 5,
    startingLives: 3,
    scorePerBrew: 300,
    timeBonusPerBrew: 5,
    reactionCount: 3,
  },
};

export const LEVEL_ONE_DIFFICULTY: Difficulty = 'medium';

export const INGREDIENT_STOCK = {
  min: 2,
  max: 15,
} as const;
