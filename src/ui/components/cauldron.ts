import cauldronImage from '../../assets/images/cauldron.png';
import type { IIngredient } from '../../data/types';
import { GAME_CONFIG } from '../../state/game-state';

interface ICauldronProperties {
  ingredients: IIngredient[];
  isBrewing: boolean;
}

export function Cauldron({ ingredients, isBrewing }: ICauldronProperties): HTMLDivElement {
  const container = document.createElement('div');
  container.className = 'cauldron';

  if (ingredients.length > 0) {
    container.classList.add('cauldron--active');
  }

  if (isBrewing) {
    container.classList.add('cauldron--brewing');
  }

  const imageContainer = document.createElement('div');
  imageContainer.className = 'cauldron__image-container';

  const magicEffect = document.createElement('div');
  magicEffect.className = 'cauldron__magic-effect';
  magicEffect.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.className = 'cauldron__image';
  image.src = cauldronImage;
  image.alt = 'Magical alchemy cauldron';

  imageContainer.append(magicEffect, image);

  const ingredientsList = document.createElement('div');
  ingredientsList.className = 'cauldron__ingredients';

  for (let index = 0; index < GAME_CONFIG.cauldronCapacity; index += 1) {
    const item = document.createElement('div');
    item.className = 'cauldron__ingredient';

    const ingredient = ingredients[index];

    if (ingredient) {
      item.title = ingredient.name;

      const icon = document.createElement('img');
      icon.className = 'cauldron__ingredient-icon';
      icon.src = ingredient.icon;
      icon.alt = ingredient.name;

      item.append(icon);
    } else {
      item.classList.add('cauldron__ingredient--empty');
    }

    ingredientsList.append(item);
  }

  container.append(imageContainer, ingredientsList);

  return container;
}
