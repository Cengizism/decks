export interface NodeType {
  id: string;
  title?: string;
}

export interface CardNode {
  id: string;
  title: string;
}

export interface DeckNode {
  id: string;
  title: string;
  cards: CardNode[];
}

export interface PathNode {
  id: string;
  title: string;
  decks: DeckNode[];
}

export interface NodesTreeType {
  paths: PathNode[];
}
