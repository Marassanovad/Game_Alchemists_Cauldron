export function createButton(
  type: 'help' | 'brew' | 'leaderboard',
  icon: string | undefined,
  label: string,
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `game-footer__button game-footer__${type}`;

  if (icon) {
    const iconElement = document.createElement('span');
    iconElement.className = 'game-footer__icon';
    iconElement.textContent = icon;
    iconElement.setAttribute('aria-hidden', 'true');
    button.append(iconElement);
  }

  const labelElement = document.createElement('span');
  labelElement.className = 'game-footer__label';
  labelElement.textContent = label;

  button.append(labelElement);
  button.addEventListener('click', onClick);

  return button;
}
