import {
  CardType, // NavigationTree,
  // NavigationPath,
  CompleteNavigationTree,
  ContributorType,
  DeckType,
  PathType,
} from '@/interfaces/types';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const contentDirectory = join(process.cwd(), 'content');

const contributors: ContributorType[] = JSON.parse(
  fs.readFileSync(join(contentDirectory, 'contributors.json'), 'utf8')
);
const decks: DeckType[] = JSON.parse(
  fs.readFileSync(join(contentDirectory, 'decks.json'), 'utf8')
);
const paths: PathType[] = JSON.parse(
  fs.readFileSync(join(contentDirectory, 'paths.json'), 'utf8')
);

function readCardFiles(folder: string): string[] {
  const deckPath = join(contentDirectory, folder);
  return fs.readdirSync(deckPath).filter((file) => file.endsWith('.mdx'));
}

// ------------------------------------------------------------------------------------------
// Indexing functions
export function indexCardIds(): { cardId: string }[] {
  return decks.flatMap(({ id: folder }) => {
    const cardFiles = readCardFiles(folder);
    return cardFiles.map((cardId) => ({
      cardId: cardId.replace(/\.mdx$/, ''),
    }));
  });
}

export function indexDeckIds(): { deckId: string }[] {
  return decks.map((deck) => ({
    deckId: deck.id,
  }));
}

export function indexPathIds(): { pathId: string }[] {
  return paths.map((path) => ({
    pathId: path.id,
  }));
}

export function indexContributorIds(): { contributorId: string }[] {
  return contributors.map((contributor) => ({
    contributorId: contributor.id,
  }));
}

// ------------------------------------------------------------------------------------------
// Deck functions
export function findDeckByCardId(cardId: string): DeckType | undefined {
  for (const deck of decks) {
    const cardFiles = readCardFiles(deck.id);
    if (cardFiles.includes(cardId + '.mdx')) {
      return deck;
    }
  }
  return undefined;
}

export function getAllDecks(): DeckType[] {
  return decks;
}

export function getDeckById(id: string): DeckType | null {
  return decks.find((deck) => deck.id === id) || null;
}

export function getDecksByPathId(pathId: string): DeckType[] {
  return decks.filter((deck) => deck.pathId === pathId);
}

// ------------------------------------------------------------------------------------------
// Card functions
export function getCardById(cardId: string): CardType | null {
  if (!cardId) {
    console.error('Invalid slug parameter:', { slug: cardId });
    return null;
  }

  const cardIdWithoutExtension = cardId.replace(/\.mdx$/, '');
  const deck = findDeckByCardId(cardIdWithoutExtension);
  if (!deck) {
    console.error('Deck not found for slug:', { slug: cardId });
    return null;
  }

  const fullPath = join(
    contentDirectory,
    deck.id,
    `${cardIdWithoutExtension}.mdx`
  );

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = content.replace(
      /!\[([^\]]*)\]\((images\/[^)]+)\)/g,
      (_, imageTitle, imageFileNameWithExtension) => {
        return `![${imageTitle}](/api/content/${deck.id}/${imageFileNameWithExtension})`;
      }
    );

    return {
      ...data,
      id: cardIdWithoutExtension,
      content: processedContent,
    } as CardType;
  } catch (error) {
    console.error(`Error reading file at path ${fullPath}:`, error);
    return null;
  }
}

export function getCardsOfDeck(deck: DeckType): CardType[] {
  const { id: deckFolder } = deck;
  const cardFiles = readCardFiles(deckFolder);
  return cardFiles
    .map((cardFileName) => getCardById(cardFileName.replace(/\.mdx$/, '')))
    .filter((card) => card !== null) as CardType[];
}

// ------------------------------------------------------------------------------------------
// Path functions
export function getAllPaths(): PathType[] {
  return paths;
}

export function getPathById(id: string): PathType | null {
  return paths.find((path) => path.id === id) || null;
}

export function getPathOfDeck(deckId: string): PathType | null {
  const deck = decks.find((deck) => deck.id === deckId) || null;
  if (deck) {
    return paths.find((path) => path.id === deck.pathId) || null;
  }
  return null;
}

// ------------------------------------------------------------------------------------------
// Contributor functions
export function getAllContributors(): ContributorType[] {
  return contributors.map((contributor) => ({
    id: contributor.id,
    name: contributor.name,
    email: contributor.email,
    bio: contributor.bio,
  }));
}

export function getContributorById(id: string): ContributorType | null {
  return contributors.find((contributor) => contributor.id === id) || null;
}

// ------------------------------------------------------------------------------------------
// Navigation tree functions
// function isPathType(obj: any): obj is PathType {
//   return 'title' in obj && 'description' in obj && !('pathId' in obj);
// }

// function isDeckType(obj: any): obj is DeckType {
//   return 'pathId' in obj && 'contributorId' in obj;
// }

// function isCardType(obj: any): obj is CardType {
//   return 'excerpt' in obj && 'coverImage' in obj;
// }

// export function getNavigationTree(node: PathType | DeckType | CardType): NavigationTree {
//   const tree = {
//     paths: paths.map(path => ({
//       id: path.id,
//       title: path.title,
//       decks: decks.filter(deck => deck.pathId === path.id).map(deck => ({
//         id: deck.id,
//         title: deck.title,
//         cards: readCardFiles(deck.id).map(cardFile => ({
//           id: cardFile.replace(/\.mdx$/, ''),
//           title: getCardById(cardFile.replace(/\.mdx$/, ''))?.title || '',
//         })),
//       })),
//     })),
//   };

//   function findNode(tree: { paths: NavigationPath[] }, nodeId: string, nodeType: 'path' | 'deck' | 'card'): NavigationTree | null {
//     for (const path of tree.paths) {
//       if (nodeType === 'path' && path.id === nodeId) {
//         return { path };
//       }
//       for (const deck of path.decks) {
//         if (nodeType === 'deck' && deck.id === nodeId) {
//           return { path, deck };
//         }
//         for (const card of deck.cards) {
//           if (nodeType === 'card' && card.id === nodeId) {
//             return { path, deck, card };
//           }
//         }
//       }
//     }
//     return null;
//   }

//   if (isPathType(node)) {
//     const result = findNode(tree, node.id, 'path');
//     return result ? { path: result.path } : {};
//   } else if (isDeckType(node)) {
//     const result = findNode(tree, node.id, 'deck');
//     return result ? { path: result.path, deck: result.deck } : {};
//   } else if (isCardType(node)) {
//     const result = findNode(tree, node.id, 'card');
//     return result ? { path: result.path, deck: result.deck, card: result.card } : {};
//   } else {
//     return {};
//   }
// }

// Function to get the entire navigation tree
export function getCompleteNavigationTree(): CompleteNavigationTree {
  return {
    paths: paths.map((path) => ({
      id: path.id,
      title: path.title,
      decks: decks
        .filter((deck) => deck.pathId === path.id)
        .map((deck) => ({
          id: deck.id,
          title: deck.title,
          cards: readCardFiles(deck.id).map((cardFile) => ({
            id: cardFile.replace(/\.mdx$/, ''),
            title: getCardById(cardFile.replace(/\.mdx$/, ''))?.title || '',
          })),
        })),
    })),
  };
}
