import { getLeaderboard, type ILeaderboardEntry } from '../../storage/leaderboard-storage.ts';
import { didClearLeaderboard, formatLeaderboardDate } from '../../logic/leaderboard.ts';

interface ILeaderboardModalProperties {
  onClose: () => void;
}

export function LeaderboardModal({ onClose }: ILeaderboardModalProperties): HTMLDivElement {
  const overlay = document.createElement('div');
  overlay.className = 'leaderboard-overlay';

  const modal = document.createElement('section');
  modal.className = 'leaderboard-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'leaderboard-title');

  overlay.append(modal);

  function createButton(text: string, className: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = text;
    button.addEventListener('click', onClick);

    return button;
  }

  function render(): void {
    modal.replaceChildren();

    const title = document.createElement('h2');
    title.id = 'leaderboard-title';
    title.className = 'leaderboard-modal__title';
    title.textContent = 'Leaderboard';

    modal.append(title);

    const entries = getLeaderboard();

    if (entries.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'leaderboard-modal__empty';
      emptyMessage.textContent = 'No records yet. Play a game!';

      modal.append(emptyMessage);
    } else {
      renderTable(entries);
    }

    const actions = document.createElement('div');
    actions.className = 'leaderboard-modal__actions';

    const clearButton = createButton(
      'Clear leaderboard',
      'leaderboard-modal__button leaderboard-modal__button--danger',
      renderClearConfirmation,
    );

    const closeButton = createButton('Close', 'leaderboard-modal__button', onClose);

    actions.append(clearButton, closeButton);
    modal.append(actions);
  }

  function renderTable(entries: ILeaderboardEntry[]): void {
    const table = document.createElement('table');
    table.className = 'leaderboard-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    for (const text of ['Rank', 'Name', 'Score', 'Date']) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = text;
      headerRow.append(th);
    }

    thead.append(headerRow);

    const tbody = document.createElement('tbody');

    for (const [index, entry] of entries.entries()) {
      const row = document.createElement('tr');

      const values = [
        String(index + 1),
        entry.name,
        String(entry.score),
        formatLeaderboardDate(entry.date),
      ];

      for (const value of values) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      }

      tbody.append(row);
    }

    table.append(thead, tbody);
    modal.append(table);
  }

  function renderClearConfirmation(): void {
    modal.querySelector('.leaderboard-confirmation')?.remove();

    const confirmation = document.createElement('div');
    confirmation.className = 'leaderboard-confirmation';
    confirmation.setAttribute('role', 'alertdialog');
    confirmation.setAttribute('aria-modal', 'true');

    const message = document.createElement('p');
    message.textContent = 'Are you sure you want to delete all leaderboard records?';

    const error = document.createElement('p');
    error.className = 'leaderboard-modal__error';
    error.setAttribute('aria-live', 'polite');

    const actions = document.createElement('div');
    actions.className = 'leaderboard-modal__actions';

    const confirmButton = createButton(
      'Yes, clear',
      'leaderboard-modal__button leaderboard-modal__button--danger',
      () => {
        if (!didClearLeaderboard()) {
          error.textContent = 'Could not clear the leaderboard. Please try again.';
          return;
        }

        render();
      },
    );

    const cancelButton = createButton(
      'Cancel',
      'leaderboard-modal__button leaderboard-modal__button--secondary',
      () => confirmation.remove(),
    );

    actions.append(confirmButton, cancelButton);
    confirmation.append(message, error, actions);
    modal.append(confirmation);

    confirmButton.focus();
  }

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      onClose();
    }
  });

  render();

  return overlay;
}
