import { contributorsData, decksData, pathsData } from './data';
import { readCardFiles } from './file-system';

export function indexCardIds(): { cardId: string }[] {
  return decksData.flatMap(({ id: folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function indexDeckIds(): { deckId: string }[] {
  return decksData.map(({ id }) => ({ deckId: id }));
}

export function indexPathIds(): { pathId: string }[] {
  return pathsData.map(({ id }) => ({ pathId: id }));
}

export function indexContributorIds(): { contributorId: string }[] {
  return contributorsData.map(({ id }) => ({ contributorId: id }));
}
