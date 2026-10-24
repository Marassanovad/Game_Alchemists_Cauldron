import { createButton } from './button.ts';

interface IFooterProperties {
  onHelpClick: () => void;
  onStartGame: () => void;
  onBrewStart: () => void;
  onBrewComplete: () => void;
  onLeaderboardClick: () => void;
  isPlaying: boolean;
  canBrew: boolean;
}

export interface IFooterComponent {
  element: HTMLElement;
  update: (isPlaying: boolean, canBrew: boolean) => void;
}

export function Footer({
  onHelpClick,
  onStartGame,
  onBrewStart,
  onBrewComplete,
  onLeaderboardClick,
  isPlaying,
  canBrew,
}: IFooterProperties): IFooterComponent {
  const footer = document.createElement('footer');
  footer.className = 'game-footer';

  const helpButton = createButton('help', '☾', 'Help', onHelpClick);

  const leaderboardButton = createButton('leaderboard', '🏆', 'Leaderboard', onLeaderboardClick);

  const startButton = createButton('brew', undefined, 'Start Game', () => {
    onStartGame();
    update(true, true);
  });

  const brewButton = createButton('brew', undefined, 'Brew', () => {
    if (brewButton.disabled) return;

    brewButton.disabled = true;
    brewButton.classList.add('game-footer__brew--brewing');

    onBrewStart();

    try {
      onBrewComplete();
    } finally {
      brewButton.classList.remove('game-footer__brew--brewing');
    }
  });

  footer.append(helpButton, startButton, brewButton, leaderboardButton);

  function update(isPlaying: boolean, canBrewNow: boolean): void {
    startButton.hidden = isPlaying;
    brewButton.hidden = !isPlaying;
    leaderboardButton.hidden = isPlaying;
    brewButton.disabled = !isPlaying || !canBrewNow;
  }

  update(isPlaying, canBrew);

  return {
    element: footer,
    update,
  };
}
