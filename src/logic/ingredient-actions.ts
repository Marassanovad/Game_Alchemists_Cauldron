import type { IIngredient } from '../data/types';
import type { IGameState } from '../state/game-state';
import { GAME_CONFIG, SHELF_INGREDIENTS } from '../state/game-state';

export function didAddIngredient(id: string, state: IGameState): boolean {
  if (
    state.status !== 'playing' ||
    state.cauldronIngredients.length >= GAME_CONFIG.cauldronCapacity
  ) {
    return false;
  }

  const ingredient: IIngredient | undefined = SHELF_INGREDIENTS.find((item) => item.id === id);

  const stock = state.shelfStock[id];

  if (!ingredient || stock === undefined || stock <= 0) {
    return false;
  }

  state.shelfStock[id] = stock - 1;
  state.cauldronIngredients.push(ingredient);

  return true;
}
