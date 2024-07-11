export type CardType = {
  id: string;
  // deck:
  //   | {
  //       folder: string | undefined;
  //       title: string | undefined;
  //       path:
  //         | {
  //             id: string;
  //             title: string;
  //           }
  //         | undefined;
  //     }
  //   | undefined;
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
  // pathId?: string | undefined;
  // path?: PathType;
  image: string;
  // contributorId?: string;
  // contributor?: ContributorType;
  // cardSlugs?: string[];
}

// export interface CardSlugType {
//   cardId: string;
//   // deck: string;
// }

export interface PathType {
  id: string;
  title: string;
  description?: string;
  // deckCount?: number;
}

export interface ContributorType {
  id: string;
  name: string;
  email: string;
  bio?: string;
}
