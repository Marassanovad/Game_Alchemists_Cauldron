export interface ILeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string;
}

const STORAGE_KEY = 'alchemists-cauldron-leaderboard';

export function getLeaderboard(): ILeaderboardEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed.filter(isLeaderboardEntry).slice(0, 10) : [];
  } catch {
    return [];
  }
}

export function didSaveLeaderboard(entries: ILeaderboardEntry[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 10)));

    return true;
  } catch {
    return false;
  }
}

function isLeaderboardEntry(value: unknown): value is ILeaderboardEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === 'string' &&
    typeof entry.name === 'string' &&
    typeof entry.score === 'number' &&
    Number.isFinite(entry.score) &&
    typeof entry.date === 'string' &&
    Number.isFinite(Date.parse(entry.date))
  );
}
