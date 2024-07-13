import fs from 'fs';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'content');

export const cardFilesCache: Record<string, string[]> = {};

export function initializeCardFilesCache(decks: { id: string }[]): void {
  decks.forEach(({ id }) => {
    const deckPath = join(contentDirectory, id);
    try {
      cardFilesCache[id] = fs
        .readdirSync(deckPath)
        .filter((file) => file.endsWith('.mdx'));
    } catch (error) {
      console.error(`Error reading directory at path ${deckPath}:`, error);
      cardFilesCache[id] = [];
    }
  });
}
