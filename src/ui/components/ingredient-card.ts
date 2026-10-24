export interface IIngredientCardProperties {
  id: string;
  name: string;
  icon: string;
  temperature: number;
  density: number;
  magicPower: number;
  stock: number;
  disabled: boolean;
  onClick: (id: string) => void;
}

export function IngredientCard({
  id,
  name,
  icon,
  temperature,
  density,
  magicPower,
  stock,
  disabled,
  onClick,
}: IIngredientCardProperties): HTMLButtonElement {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'ingredient-card';
  card.disabled = disabled || stock === 0;

  if (stock === 0) {
    card.classList.add('ingredient-card--empty');
  }

  const iconElement = document.createElement('img');
  iconElement.src = icon;
  iconElement.alt = name;
  iconElement.className = 'ingredient-card__icon';

  const labelElement = document.createElement('div');
  labelElement.className = 'ingredient-card__label';

  const title = document.createElement('span');
  title.className = 'ingredient-card__name';
  title.textContent = name;

  const stockBadge = document.createElement('span');
  stockBadge.className = 'ingredient-card__stock';
  stockBadge.textContent = String(stock);

  const parameters = document.createElement('div');
  parameters.className = 'ingredient-card__parameters';

  const createParameter = (label: string, value: number): HTMLSpanElement => {
    const parameter = document.createElement('span');
    parameter.className = 'ingredient-card__parameter';
    parameter.textContent = `${label} ${value}`;
    return parameter;
  };

  parameters.append(
    createParameter('T', temperature),
    createParameter('D', density),
    createParameter('M', magicPower),
  );

  labelElement.append(title, parameters);
  card.append(iconElement, labelElement, stockBadge);

  card.addEventListener('click', () => {
    if (!card.disabled) {
      onClick(id);
    }
  });

  return card;
}
