import {
  getLeaderboard,
  didSaveLeaderboard,
  type ILeaderboardEntry,
} from '../storage/leaderboard-storage.ts';

const MAX_ENTRIES = 10;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 15;

const NAME_PATTERN = /^[\p{L}\p{N} _-]+$/u;

export function isValidPlayerName(name: string): boolean {
  const trimmedName = name.trim();

  return (
    trimmedName.length >= MIN_NAME_LENGTH &&
    trimmedName.length <= MAX_NAME_LENGTH &&
    NAME_PATTERN.test(trimmedName)
  );
}

export function isTopTenScore(score: number): boolean {
  if (!Number.isFinite(score) || score < 0) {
    return false;
  }

  const entries = getLeaderboard();

  if (entries.length < MAX_ENTRIES) {
    return true;
  }

  const lowestEntry = entries[MAX_ENTRIES - 1];

  return !lowestEntry || score > lowestEntry.score;
}

export function didAddLeaderboardEntry(name: string, score: number): boolean {
  if (!isValidPlayerName(name) || !Number.isFinite(score) || score < 0) {
    return false;
  }

  const entries = getLeaderboard();

  const newEntry: ILeaderboardEntry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    score,
    date: new Date().toISOString(),
  };

  const sortedEntries = [...entries, newEntry]
    .toSorted((a, b) => {
      const scoreDifference = b.score - a.score;

      return scoreDifference || Date.parse(a.date) - Date.parse(b.date);
    })
    .slice(0, MAX_ENTRIES);

  return didSaveLeaderboard(sortedEntries);
}

export function didClearLeaderboard(): boolean {
  return didSaveLeaderboard([]);
}

export function formatLeaderboardDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '—';
  }

  const day = String(parsedDate.getDate()).padStart(2, '0');
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const year = parsedDate.getFullYear();
  const hours = String(parsedDate.getHours()).padStart(2, '0');
  const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
