export type CardType = {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  lastModified: Date;
};

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
