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
  pathId?: string;
  path?: PathType;
  image: string;
  contributorId?: string;
  contributor?: ContributorType;
  cardSlugs?: string[];
}

export interface CardSlugType {
  slug: string;
  deck: string;
}

export interface PathType {
  id: string;
  title: string;
  description?: string;
}

export interface ContributorType {
  id: string;
  name: string;
  bio?: string;
}
