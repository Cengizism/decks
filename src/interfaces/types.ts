export interface CardType {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  lastModified: Date;
}

export interface DeckType {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  pathId: string;
  contributorId: string;
}

export interface PathType {
  id: string;
  title: string;
  description: string;
}

export interface ContributorType {
  id: string;
  name: string;
  email: string;
  bio: string;
}

export interface NodeType {
  id: string;
  title?: string;
}

interface CardNode {
  id: string;
  title: string;
}

interface DeckNode {
  id: string;
  title: string;
  cards: CardNode[];
}

interface PathNode {
  id: string;
  title: string;
  decks: DeckNode[];
}

export interface NodesTreeType {
  paths: PathNode[];
}
