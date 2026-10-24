export interface IIngredientTooltipProperties {
  name: string;
  temperature: number;
  density: number;
  magicPower: number;
  description: string;
}

export function IngredientTooltip({
  name,
  temperature,
  density,
  magicPower,
  description,
}: IIngredientTooltipProperties): HTMLDivElement {
  const tooltip = document.createElement('div');
  tooltip.className = 'ingredient-tooltip';
  tooltip.setAttribute('role', 'tooltip');

  const title = document.createElement('h4');
  title.className = 'ingredient-tooltip__title';
  title.textContent = name;

  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'ingredient-tooltip__description';
  descriptionElement.textContent = description;

  const parameters = document.createElement('div');
  parameters.className = 'ingredient-tooltip__parameters';

  const createParameter = (
    label: string,
    value: number,
    modifier: string,
  ): HTMLParagraphElement => {
    const parameter = document.createElement('p');
    parameter.className = `ingredient-tooltip__parameter ingredient-tooltip__parameter--${modifier}`;

    const parameterName = document.createElement('span');
    parameterName.textContent = label;

    const parameterValue = document.createElement('span');
    parameterValue.textContent = `${value > 0 ? '+' : ''}${value}`;

    parameter.append(parameterName, parameterValue);

    return parameter;
  };

  parameters.append(
    createParameter('Temperature', temperature, 'temperature'),
    createParameter('Density', density, 'density'),
    createParameter('Magic Power', magicPower, 'magic'),
  );

  tooltip.append(
    title,
    document.createElement('hr'),
    parameters,
    document.createElement('hr'),
    descriptionElement,
  );

  return tooltip;
}
