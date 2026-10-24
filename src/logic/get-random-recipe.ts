import { RECIPES } from '../data/recipes';
import type { Difficulty, IRecipe } from '../data/types';

export function getRandomRecipe(difficulty: Difficulty): IRecipe {
  const availableRecipes = RECIPES.filter((recipe) => recipe.difficulty === difficulty);

  if (availableRecipes.length === 0) {
    throw new Error(`No recipes found for difficulty: ${difficulty}`);
  }

  const randomIndex = Math.floor(Math.random() * availableRecipes.length);
  const recipe = availableRecipes[randomIndex];

  if (!recipe) {
    throw new Error(`Failed to select a recipe for difficulty: ${difficulty}`);
  }

  return recipe;
}
