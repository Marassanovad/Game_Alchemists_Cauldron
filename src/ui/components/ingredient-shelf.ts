import type { IIngredient } from '../../data/types';
import { IngredientCard } from './ingredient-card.ts';

interface IIngredientsShelfProperties {
  ingredients: IIngredient[];
  stock: Record<string, number>;
  isCauldronFull: boolean;
  onIngredientClick: (id: string) => void;
}

export function IngredientsShelf({
  ingredients,
  stock,
  isCauldronFull,
  onIngredientClick,
}: IIngredientsShelfProperties): HTMLDivElement {
  const shelf = document.createElement('div');
  shelf.className = 'ingredients-shelf';

  for (const ingredient of ingredients) {
    const ingredientStock = stock[ingredient.id] ?? 0;

    const card = IngredientCard({
      ...ingredient,
      stock: ingredientStock,
      disabled: ingredientStock === 0 || isCauldronFull,
      onClick: onIngredientClick,
    });

    shelf.append(card);
  }

  if (isCauldronFull) {
    shelf.classList.add('ingredients-shelf--blocked');
  }

  return shelf;
}
