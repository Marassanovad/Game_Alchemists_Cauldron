import type { IRecipe } from '../../data/types';

interface IRecipePanelProperties {
  recipe: IRecipe;
  ingredientsCount: number;
  cauldronCapacity: number;
}

const DIFFICULTY_LEVELS = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

export function RecipePanel({
  recipe,
  ingredientsCount,
  cauldronCapacity,
}: IRecipePanelProperties): HTMLDivElement {
  const panel = document.createElement('div');
  panel.className = 'recipe-panel';
  panel.setAttribute('aria-label', 'Current recipe');

  const header = document.createElement('div');
  header.className = 'recipe-panel__header';

  const title = document.createElement('h2');
  title.className = 'recipe-panel__title';
  title.textContent = recipe.name;

  const difficulty = document.createElement('div');
  difficulty.className = `recipe-panel__difficulty recipe-panel__difficulty--${recipe.difficulty}`;
  difficulty.setAttribute('aria-label', `Difficulty: ${recipe.difficulty}`);

  const difficultyLevel = DIFFICULTY_LEVELS[recipe.difficulty];

  for (let index = 0; index < 3; index += 1) {
    const dot = document.createElement('span');
    dot.className = 'recipe-panel__difficulty-dot';

    if (index < difficultyLevel) {
      dot.classList.add('recipe-panel__difficulty-dot--active');
    }

    difficulty.append(dot);
  }

  header.append(title, difficulty);

  const parameters = document.createElement('div');
  parameters.className = 'recipe-panel__parameters';

  const temperature = createParameter(
    'temperature',
    'Temperature',
    recipe.temperature.min,
    recipe.temperature.max,
  );

  const density = createParameter('density', 'Density', recipe.density.min, recipe.density.max);

  const magicPower = createParameter(
    'magic-power',
    'Magic Power',
    recipe.magicPower.min,
    recipe.magicPower.max,
  );

  parameters.append(temperature, density, magicPower);

  const progress = document.createElement('div');
  progress.className = 'recipe-panel__progress';

  const progressLabel = document.createElement('span');
  progressLabel.className = 'recipe-panel__progress-label';
  progressLabel.textContent = 'Ingredients';

  const progressCount = document.createElement('span');
  progressCount.className = 'recipe-panel__progress-count';
  progressCount.textContent = `${ingredientsCount} / ${cauldronCapacity}`;
  progressCount.setAttribute(
    'aria-label',
    `${ingredientsCount} of ${cauldronCapacity} ingredients added`,
  );

  if (ingredientsCount >= cauldronCapacity) {
    progressCount.classList.add('recipe-panel__progress-count--full');
  }

  progress.append(progressLabel, progressCount);
  panel.append(header, parameters, progress);

  return panel;
}

function createParameter(type: string, label: string, min: number, max: number): HTMLDivElement {
  const parameter = document.createElement('div');
  parameter.className = `recipe-panel__parameter recipe-panel__parameter--${type}`;

  const parameterLabel = document.createElement('span');
  parameterLabel.className = 'recipe-panel__parameter-label';
  parameterLabel.textContent = label;

  const parameterRange = document.createElement('span');
  parameterRange.className = 'recipe-panel__parameter-range';
  parameterRange.textContent = `${min}...${max}`;

  parameter.append(parameterLabel, parameterRange);

  return parameter;
}
