export interface CardType {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  lastModified: Date;
  likes?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}
