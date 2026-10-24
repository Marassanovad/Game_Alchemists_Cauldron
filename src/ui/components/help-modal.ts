interface IHelpModalProperties {
  onClose: () => void;
}

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

export function HelpModal({ onClose }: IHelpModalProperties): HTMLDivElement {
  const overlay = createElement('div', 'help-modal-overlay');
  const modal = createElement('section', 'help-modal');

  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'help-modal-title');

  const closeButton = createElement('button', 'help-modal__close', '×');

  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close help');
  closeButton.addEventListener('click', onClose);

  const title = createElement('h2', 'help-modal__title', 'How the game works');
  title.id = 'help-modal-title';

  const content = createElement('div', 'help-modal__content');

  const steps = [
    'Start a game. The app picks one random recipe from the recipe pool. The recipe panel shows how many ingredients you may use, for example Ingredients: 0 / 4. When the run starts, the shelf is filled according to the chosen difficulty, the cauldron is empty, and the score, time and lives switch to the active game state.',
    'Add ingredients from the shelf to the cauldron. The counter grows with every ingredient (1 / 4, 2 / 4, and so on). At maximum capacity, the shelf is blocked.',
    'Watch the three bars: Temperature, Density and Magic Power.',
    'Try to move every value into the recipe target zones.',
    'Click Brew to check the mix. In Level 3, Pour Out is also available.',
    'Keep brewing until time runs out, you lose all lives, or the ingredients run out.',
  ];

  const stepsList = createElement('ol');

  for (const step of steps) {
    stepsList.append(createElement('li', undefined, step));
  }

  const stockDescription = createElement(
    'p',
    undefined,
    'Every ingredient has a limited stock. The number on its shelf card shows how many portions remain.',
  );

  const exampleTitle = createElement('h3', undefined, 'Worked example round');

  const exampleSteps = [
    'The selected recipe is Moon Mist. Its target ranges are Temperature 32–42, Density 12–22, and Magic Power 17–27.',
    'Add Dragon Tears (+25, +8, +10) and Fairy Dust (+12, +9, +12).',
    'The cauldron totals become 37 / 17 / 22, and the counter shows Ingredients: 2 / 4.',
    'Level 1 uses the Medium rules, so brew tolerance is ±8.',
    'The checked ranges become 24–50, 4–30 and 9–35.',
    'All three values (37 / 17 / 22) are inside their checked ranges, so the brew succeeds.',
  ];

  const exampleList = createElement('ol');

  for (const step of exampleSteps) {
    exampleList.append(createElement('li', undefined, step));
  }

  content.append(stepsList, stockDescription, exampleTitle, exampleList);
  modal.append(closeButton, title, content);
  overlay.append(modal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      onClose();
    }
  });

  modal.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  return overlay;
}
