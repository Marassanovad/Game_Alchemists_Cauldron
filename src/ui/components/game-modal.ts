import { LeaderboardModal } from './leaderboard-modal.ts';
import {
  didAddLeaderboardEntry,
  isTopTenScore,
  isValidPlayerName,
} from '../../logic/leaderboard.ts';

type GameModalMode = 'game-over' | 'paused';

interface IGameModalProperties {
  mode: GameModalMode;
  score?: number;
  reason?: string;
  onPlayAgain?: () => void;
  onContinue?: () => void;
  onExit?: () => void;
}

export function GameModal({
  mode,
  score = 0,
  reason = '',
  onPlayAgain,
  onContinue,
  onExit,
}: IGameModalProperties): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'game-modal-overlay';

  const modal = document.createElement('section');
  modal.className = 'game-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const title = document.createElement('h2');
  title.className = 'game-modal__title';

  const message = document.createElement('p');
  message.className = 'game-modal__message';

  const actions = document.createElement('div');
  actions.className = 'game-modal__actions';

  function createButton(
    text: string,
    onClick: (() => void) | undefined,
    className: string,
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;

    if (onClick) {
      button.addEventListener('click', onClick);
    }

    return button;
  }

  function openLeaderboard(): void {
    const leaderboardOverlay = LeaderboardModal({
      onClose: () => {
        leaderboardOverlay.remove();
        overlay.hidden = false;
      },
    });

    overlay.hidden = true;
    overlay.after(leaderboardOverlay);
  }

  function createNameForm(): HTMLFormElement {
    const form = document.createElement('form');
    form.className = 'game-modal__name-form';

    const label = document.createElement('label');
    label.htmlFor = 'game-over-player-name';
    label.textContent = 'You made the Top-10! Enter your name:';

    const input = document.createElement('input');
    input.id = 'game-over-player-name';
    input.name = 'playerName';
    input.type = 'text';
    input.minLength = 2;
    input.maxLength = 15;
    input.required = true;
    input.setAttribute('autocomplete', 'nickname');
    input.placeholder = 'Your name';

    const error = document.createElement('p');
    error.className = 'game-modal__error';
    error.setAttribute('aria-live', 'polite');

    const saveButton = createButton('Save score', undefined, 'game-modal__button');
    saveButton.type = 'submit';

    form.append(label, input, error, saveButton);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = input.value.trim();

      if (!isValidPlayerName(name)) {
        error.textContent = 'Use 2–15 letters, digits, spaces, "_" or "-".';
        input.focus();
        return;
      }

      if (!didAddLeaderboardEntry(name, score)) {
        error.textContent = 'Could not save your score. Please try again.';
        return;
      }

      form.remove();
    });

    requestAnimationFrame(() => input.focus());

    return form;
  }

  if (mode === 'game-over') {
    title.textContent = 'Game Over';
    message.textContent = reason;

    const scoreElement = document.createElement('p');
    scoreElement.className = 'game-modal__score';
    scoreElement.textContent = `Final score: ${score}`;

    modal.append(title, message, scoreElement);

    if (isTopTenScore(score)) {
      modal.append(createNameForm());
    }

    actions.append(
      createButton('Play again', onPlayAgain, 'game-modal__button'),
      createButton(
        'Leaderboard',
        openLeaderboard,
        'game-modal__button game-modal__button--secondary',
      ),
    );

    modal.append(actions);
  } else {
    title.textContent = 'Game paused';
    message.textContent = 'Take a break, alchemist.';

    actions.append(
      createButton('Continue', onContinue, 'game-modal__button'),
      createButton('Exit', onExit, 'game-modal__button game-modal__button--secondary'),
    );

    modal.append(title, message, actions);
  }

  overlay.append(modal);

  return overlay;
}
