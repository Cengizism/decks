export type CardType = {
  slug: string;
  deck: {
    folder: string;
    title: string;
  };
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
};

export interface DeckType {
  folder: string;
  title: string;
  description: string;
  cards?: string[];
}

export interface CardSlugType {
  slug: string;
  deck: string;
}
