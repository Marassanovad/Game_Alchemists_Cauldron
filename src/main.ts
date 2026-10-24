import './styles/style.scss';

import { createGameState, GAME_CONFIG, SHELF_INGREDIENTS } from './state/game-state';
import { createGameController } from './controllers/game-controller';
import { didAddIngredient } from './logic/ingredient-actions';
import { calculateCauldron } from './logic/calculate-cauldron';
import { IngredientsShelf } from './ui/components/ingredient-shelf';
import { Cauldron } from './ui/components/cauldron';
import { TopBar } from './ui/components/top-bar';
import { RecipePanel } from './ui/components/recipe-panel';
import { ParameterBar } from './ui/components/parameter-bar';
import { Footer } from './ui/components/footer';
import { GameModal } from './ui/components/game-modal';
import { LeaderboardModal } from './ui/components/leaderboard-modal';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App container not found');
}

const state = createGameState();

const gameContainer = document.createElement('div');
gameContainer.className = 'game-container';

const shelfContainer = document.createElement('div');
shelfContainer.className = 'ingredients-shelf-container';

const cauldronContainer = document.createElement('div');
cauldronContainer.className = 'cauldron-container';

const recipePanelContainer = document.createElement('div');
recipePanelContainer.className = 'recipe-panel-container';

const parameterBarsContainer = document.createElement('div');
parameterBarsContainer.className = 'parameter-bars';

const gameController = createGameController({
  state,
  render,
});

const topBar = TopBar({
  score: state.score,
  timeLeft: state.timeLeft,
  lives: state.lives,
  startingTime: GAME_CONFIG.startingTime,
  isPlaying: state.status === 'playing',
  onPauseClick: gameController.pauseGame,
});

const footer = Footer({
  onHelpClick: () => console.log('Open help'),
  onStartGame: gameController.startGame,
  onLeaderboardClick: openLeaderboard,
  onBrewStart: () => {},
  onBrewComplete: gameController.brew,
  isPlaying: state.status === 'playing',
  canBrew: state.status === 'playing' && state.cauldronIngredients.length > 0,
});

gameContainer.append(shelfContainer, cauldronContainer, recipePanelContainer);

app.append(topBar.element, gameContainer, parameterBarsContainer, footer.element);

document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.status === 'playing') {
    gameController.pauseGame();
  }
});

function handleIngredientClick(id: string): void {
  if (didAddIngredient(id, state)) {
    render();
  }
}

function renderCauldron(): void {
  cauldronContainer.replaceChildren(
    Cauldron({
      ingredients: state.cauldronIngredients,
    }),
  );
}

function renderRecipePanel(): void {
  recipePanelContainer.replaceChildren(
    RecipePanel({
      recipe: state.currentRecipe,
      ingredientsCount: state.cauldronIngredients.length,
      cauldronCapacity: GAME_CONFIG.cauldronCapacity,
    }),
  );
}

function renderParameterBars(): void {
  const values = calculateCauldron(state.cauldronIngredients);
  const recipe = state.currentRecipe;

  const temperatureBar = ParameterBar({
    type: 'temperature',
    label: 'Temperature',
    icon: '♨',
    value: values.temperature,
    min: recipe.temperature.min,
    max: recipe.temperature.max,
  });

  const densityBar = ParameterBar({
    type: 'density',
    label: 'Density',
    icon: '⚖',
    value: values.density,
    min: recipe.density.min,
    max: recipe.density.max,
  });

  const magicPowerBar = ParameterBar({
    type: 'magic-power',
    label: 'Magic Power',
    icon: '✧',
    value: values.magicPower,
    min: recipe.magicPower.min,
    max: recipe.magicPower.max,
  });

  parameterBarsContainer.replaceChildren(temperatureBar, densityBar, magicPowerBar);
}

function renderGameModal(): void {
  document.querySelector('.game-modal-overlay')?.remove();

  if (state.status === 'paused') {
    app?.append(
      GameModal({
        mode: 'paused',
        onContinue: gameController.resumeGame,
        onExit: gameController.exitToMenu,
      }),
    );

    return;
  }

  if (state.status === 'game-over') {
    app?.append(
      GameModal({
        mode: 'game-over',
        score: state.score,
        reason: gameController.getGameOverReason(),
        onPlayAgain: gameController.restartGame,
      }),
    );
  }
}

function render(): void {
  const shelf = IngredientsShelf({
    ingredients: SHELF_INGREDIENTS,
    stock: state.shelfStock,
    isCauldronFull: state.cauldronIngredients.length >= GAME_CONFIG.cauldronCapacity,
    onIngredientClick: handleIngredientClick,
  });

  shelfContainer.replaceChildren(shelf);

  gameContainer.classList.toggle('game-container--paused', state.status === 'paused');

  renderCauldron();
  renderRecipePanel();
  renderParameterBars();

  topBar.update(
    state.score,
    state.timeLeft,
    state.lives,
    GAME_CONFIG.startingTime,
    state.status === 'playing',
  );

  footer.update(state.status === 'playing', state.cauldronIngredients.length > 0);

  renderGameModal();
}

function openLeaderboard(): void {
  const leaderboardOverlay = LeaderboardModal({
    onClose: () => leaderboardOverlay.remove(),
  });

  app?.append(leaderboardOverlay);
}

render();
