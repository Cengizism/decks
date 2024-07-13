import { NodesTreeType } from '@/interfaces/types';

import { getCardById } from './cards';
import { decksData, pathsData } from './data';
import { readCardFiles } from './file-system';

export function getNodeTree(): NodesTreeType {
  return {
    paths: pathsData.map((path) => ({
      id: path.id,
      title: path.title,
      decks: decksData
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
