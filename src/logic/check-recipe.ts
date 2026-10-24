import type { IRecipe } from '../data/types';
import type { ICauldronValues } from './calculate-cauldron';

export function doesRecipeMatch(
  values: ICauldronValues,
  recipe: IRecipe,
  tolerance: number,
): boolean {
  return (
    values.temperature >= recipe.temperature.min - tolerance &&
    values.temperature <= recipe.temperature.max + tolerance &&
    values.density >= recipe.density.min - tolerance &&
    values.density <= recipe.density.max + tolerance &&
    values.magicPower >= recipe.magicPower.min - tolerance &&
    values.magicPower <= recipe.magicPower.max + tolerance
  );
}
