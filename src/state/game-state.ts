import { INGREDIENTS } from '../data/ingredients';
import type { IIngredient, IRecipe } from '../data/types';
import { DIFFICULTY_CONFIG, INGREDIENT_STOCK, LEVEL_ONE_DIFFICULTY } from '../data/game-config';
import { getRandomRecipe } from '../logic/get-random-recipe.ts';

export const GAME_CONFIG = DIFFICULTY_CONFIG[LEVEL_ONE_DIFFICULTY];

export const SHELF_INGREDIENTS = INGREDIENTS.slice(0, GAME_CONFIG.shelfSize);

export type GameStatus = 'menu' | 'playing' | 'paused' | 'game-over';

export interface IGameState {
  status: GameStatus;
  score: number;
  timeLeft: number;
  lives: number;
  shelfStock: Record<string, number>;
  cauldronIngredients: IIngredient[];
  currentRecipe: IRecipe;
}

export function createStock(ingredients: IIngredient[]): Record<string, number> {
  return Object.fromEntries(
    ingredients.map((ingredient) => [
      ingredient.id,
      Math.floor(Math.random() * (INGREDIENT_STOCK.max - INGREDIENT_STOCK.min + 1)) +
        INGREDIENT_STOCK.min,
    ]),
  );
}

export function createGameState(): IGameState {
  return {
    status: 'menu',
    score: 0,
    timeLeft: GAME_CONFIG.startingTime,
    lives: GAME_CONFIG.startingLives,
    shelfStock: createStock(SHELF_INGREDIENTS),
    cauldronIngredients: [],
    currentRecipe: getRandomRecipe(LEVEL_ONE_DIFFICULTY),
  };
}
