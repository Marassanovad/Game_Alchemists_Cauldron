import timer from '../../assets/icons/timer.svg';
import paused from '../../assets/icons/paused.svg';

interface ITopBarProperties {
  score: number;
  timeLeft: number;
  lives: number;
  startingTime: number;
  isPlaying: boolean;
  onPauseClick: () => void;
}

export interface ITopBarComponent {
  element: HTMLDivElement;
  update: (
    score: number,
    timeLeft: number,
    lives: number,
    startingTime: number,
    isPlaying: boolean,
  ) => void;
}

export function TopBar({
  score,
  timeLeft,
  lives,
  startingTime,
  isPlaying,
  onPauseClick,
}: ITopBarProperties): ITopBarComponent {
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';

  let currentlyPlaying = isPlaying;

  const scoreItem = createStatItem('score', '★', 'Score');
  const livesItem = createStatItem('lives', '♥', 'Lives');

  const timeItem = document.createElement('div');
  timeItem.className = 'top-bar__item top-bar__item--time';

  const timeRow = document.createElement('div');
  timeRow.className = 'top-bar__time-row';

  const timeIconButton = document.createElement('button');
  timeIconButton.className = 'top-bar__icon top-bar__pause-button';
  timeIconButton.type = 'button';
  timeIconButton.setAttribute('aria-label', 'Pause game');

  const timeIcon = document.createElement('img');
  timeIcon.className = 'top-bar__pause-icon';
  timeIcon.src = paused;
  timeIcon.alt = '';

  timeIconButton.append(timeIcon);

  timeIconButton.addEventListener('click', () => {
    if (currentlyPlaying) {
      onPauseClick();
    }
  });

  const timeInfo = document.createElement('div');
  timeInfo.className = 'top-bar__info';

  const timeLabel = document.createElement('span');
  timeLabel.className = 'top-bar__label';
  timeLabel.textContent = 'Time';

  const timeValue = document.createElement('span');
  timeValue.className = 'top-bar__time-value';

  timeInfo.append(timeLabel, timeValue);
  timeRow.append(timeIconButton, timeInfo);

  const timeBar = document.createElement('div');
  timeBar.className = 'top-bar__time-track';
  timeBar.setAttribute('role', 'progressbar');
  timeBar.setAttribute('aria-label', 'Remaining time');
  timeBar.setAttribute('aria-valuemin', '0');
  timeBar.setAttribute('aria-valuemax', String(startingTime));

  const timeBarFill = document.createElement('div');
  timeBarFill.className = 'top-bar__time-fill';

  timeBar.append(timeBarFill);
  timeItem.append(timeRow, timeBar);

  topBar.append(scoreItem.item, timeItem, livesItem.item);

  function update(
    currentScore: number,
    currentTimeLeft: number,
    currentLives: number,
    currentStartingTime: number,
    isCurrentPlaying: boolean,
  ): void {
    const safeTime = Math.max(0, currentTimeLeft);
    const maxTime = Math.max(0, currentStartingTime);

    const percentage = maxTime > 0 ? Math.min(100, (safeTime / maxTime) * 100) : 0;

    currentlyPlaying = isCurrentPlaying;

    scoreItem.valueElement.textContent = String(currentScore);
    timeValue.textContent = formatTime(safeTime);
    livesItem.valueElement.textContent = String(currentLives);

    timeBarFill.style.width = `${percentage}%`;

    timeBar.setAttribute('aria-valuemax', String(maxTime));
    timeBar.setAttribute('aria-valuenow', String(safeTime));

    timeIcon.src = isCurrentPlaying ? paused : timer;
    timeIconButton.setAttribute('aria-label', isCurrentPlaying ? 'Pause game' : 'Timer');
    timeIconButton.disabled = !isCurrentPlaying;

    timeItem.classList.toggle('top-bar__item--critical', safeTime < 15 && safeTime > 0);
  }

  update(score, timeLeft, lives, startingTime, isPlaying);

  return {
    element: topBar,
    update,
  };
}

function formatTime(timeLeft: number): string {
  const totalSeconds = Math.floor(timeLeft);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function createStatItem(
  type: string,
  icon: string,
  label: string,
): {
  item: HTMLDivElement;
  iconElement: HTMLSpanElement;
  valueElement: HTMLSpanElement;
} {
  const item = document.createElement('div');
  item.className = `top-bar__item top-bar__item--${type}`;

  const iconElement = document.createElement('span');
  iconElement.className = 'top-bar__icon';
  iconElement.textContent = icon;
  iconElement.setAttribute('aria-hidden', 'true');

  const info = document.createElement('div');
  info.className = 'top-bar__info';

  const labelElement = document.createElement('span');
  labelElement.className = 'top-bar__label';
  labelElement.textContent = label;

  const valueElement = document.createElement('span');
  valueElement.className = 'top-bar__value';

  info.append(labelElement, valueElement);
  item.append(iconElement, info);

  return { item, iconElement, valueElement };
}
