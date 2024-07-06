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
  lastModified: Date;
};

export interface DeckType {
  folder: string;
  title: string;
  description: string;
  cardSlugs?: string[];
}

export interface CardSlugType {
  slug: string;
  deck: string;
}
