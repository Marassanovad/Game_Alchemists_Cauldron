import type { IIngredient } from '../data/types';

export interface ICauldronValues {
  temperature: number;
  density: number;
  magicPower: number;
}

export function calculateCauldron(ingredients: IIngredient[]): ICauldronValues {
  let temperature = 0;
  let density = 0;
  let magicPower = 0;

  for (const ingredient of ingredients) {
    temperature += ingredient.temperature;
    density += ingredient.density;
    magicPower += ingredient.magicPower;
  }

  return {
    temperature,
    density,
    magicPower,
  };
}
