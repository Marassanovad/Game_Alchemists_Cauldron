import { createGameState, GAME_CONFIG } from '../state/game-state';
import type { IGameState } from '../state/game-state';
import { LEVEL_ONE_DIFFICULTY } from '../data/game-config';
import { calculateCauldron } from '../logic/calculate-cauldron';
import { doesRecipeMatch } from '../logic/check-recipe';
import { getRandomRecipe } from '../logic/get-random-recipe';

interface IGameControllerProperties {
  state: IGameState;
  render: () => void;
  updateTimer: () => void;
}

export function createGameController({ state, render, updateTimer }: IGameControllerProperties) {
  let timerId: ReturnType<typeof setInterval> | undefined;
  let endTime: number | undefined;
  let gameOverReason = '';
  let isBrewing = false;

  function stopTimer(): void {
    clearInterval(timerId);
    timerId = undefined;
    endTime = undefined;
  }

  function endGame(reason: string): void {
    if (state.status === 'game-over') return;

    state.status = 'game-over';
    gameOverReason = reason;

    stopTimer();
    render();
  }

  function areIngredientsDepleted(): boolean {
    const shelfIsEmpty = Object.values(state.shelfStock).every((stock) => stock === 0);
    const isCauldronIsEmpty = state.cauldronIngredients.length === 0;

    return shelfIsEmpty && isCauldronIsEmpty;
  }

  function runTimer(): void {
    stopTimer();
    endTime = Date.now() + state.timeLeft * 1000;

    timerId = setInterval(() => {
      if (endTime === undefined || state.status !== 'playing') {
        stopTimer();
        return;
      }

      state.timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

      if (state.timeLeft <= 0) {
        endGame('Time is up!');
        return;
      }

      updateTimer();
    }, 250);
  }

  function startGame(): void {
    if (state.status === 'playing') return;

    if (state.status === 'menu') {
      Object.assign(state, createGameState());
      gameOverReason = '';
    }

    state.status = 'playing';
    runTimer();
    render();
  }

  function pauseGame(): void {
    if (state.status !== 'playing') return;

    if (endTime !== undefined) {
      state.timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    }

    stopTimer();
    state.status = 'paused';
    render();
  }

  function resumeGame(): void {
    if (state.status !== 'paused') return;

    state.status = 'playing';
    runTimer();
    render();
  }

  function exitToMenu(): void {
    stopTimer();
    Object.assign(state, createGameState());
    gameOverReason = '';
    state.status = 'menu';
    render();
  }

  function restartGame(): void {
    stopTimer();
    Object.assign(state, createGameState());
    gameOverReason = '';
    startGame();
  }

  async function brew(): Promise<void> {
    if (isBrewing || state.status !== 'playing' || state.cauldronIngredients.length === 0) {
      return;
    }

    isBrewing = true;
    state.isBrewing = true;
    render();

    try {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 2500);
      });

      if (state.status !== 'playing') return;

      if (endTime !== undefined) {
        state.timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      }

      const values = calculateCauldron(state.cauldronIngredients);
      const success = doesRecipeMatch(values, state.currentRecipe, GAME_CONFIG.recipeTolerance);

      if (success) {
        state.score += GAME_CONFIG.scorePerBrew;
        state.timeLeft = Math.min(
          state.timeLeft + GAME_CONFIG.timeBonusPerBrew,
          GAME_CONFIG.startingTime,
        );

        endTime = Date.now() + state.timeLeft * 1000;
        state.currentRecipe = getRandomRecipe(LEVEL_ONE_DIFFICULTY);
      } else {
        state.lives -= 1;

        if (state.lives <= 0) {
          endGame('No lives left!');
          return;
        }

        if (state.timeLeft <= 0) {
          endGame('Time is up!');
          return;
        }
      }

      state.cauldronIngredients = [];

      if (areIngredientsDepleted()) {
        endGame('Out of ingredients!');
        return;
      }
    } finally {
      isBrewing = false;
      state.isBrewing = false;
      render();
    }
  }

  return {
    startGame,
    endGame,
    pauseGame,
    resumeGame,
    exitToMenu,
    restartGame,
    brew,
    getGameOverReason: () => gameOverReason,
  };
}
