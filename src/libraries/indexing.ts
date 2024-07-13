import { contributors, decks, paths } from './data';
import { readCardFiles } from './file-system';

export function indexCardIds(): { cardId: string }[] {
  return decks.flatMap(({ id: folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function indexDeckIds(): { deckId: string }[] {
  return decks.map(({ id }) => ({ deckId: id }));
}

export function indexPathIds(): { pathId: string }[] {
  return paths.map(({ id }) => ({ pathId: id }));
}

export function indexContributorIds(): { contributorId: string }[] {
  return contributors.map(({ id }) => ({ contributorId: id }));
}
