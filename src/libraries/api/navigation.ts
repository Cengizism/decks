import { NodesTreeType } from '@/interfaces/types';

import { getCardById } from './cards';
import { decks, paths } from './data';
import { readCardFiles } from './fileSystem';

export function getNodeTree(): NodesTreeType {
  return {
    paths: paths.map((path) => ({
      id: path.id,
      title: path.title,
      decks: decks
        .filter((deck) => deck.pathId === path.id)
        .map((deck) => ({
          id: deck.id,
          title: deck.title,
          cards: readCardFiles(deck.id).map((cardFile) => {
            const cardId = cardFile.replace(/\.mdx$/, '');
            return {
              id: cardId,
              title: getCardById(cardId)?.title || '',
            };
          }),
        })),
    })),
  };
}
