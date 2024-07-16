import fs from 'fs';
import { join } from 'path';

import { cardExists, storeCard } from '@/libraries/db';

const contentDirectory = join(process.cwd(), 'content');

export const cardFilesCache: Record<string, string[]> = {};

export function initializeCardFilesCache(decks: { id: string }[]): void {
  decks.forEach(({ id }) => {
    const deckPath = join(contentDirectory, id);
    try {
      const cardFiles = fs
        .readdirSync(deckPath)
        .filter((file) => file.endsWith('.mdx'));

      cardFilesCache[id] = cardFiles;

      cardFiles.forEach((file) => {
        const cardId = file.replace('.mdx', '');
        if (!cardExists(cardId, id)) {
          storeCard(cardId, id);
        }
      });
    } catch (error) {
      console.error(`Error reading directory at path ${deckPath}:`, error);
      cardFilesCache[id] = [];
    }
  });
}
