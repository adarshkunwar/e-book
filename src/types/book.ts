export type TAuthor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TBook = {
  id: string;
  title: string;
  author: TAuthor;
  data: string;
  coverImage: string;
  summary: string;
  published: string;
  genres: string[];
  totalChapter: number;
  currentChapter: number;
};

export type TLastReadingBook = Pick<
  TBook,
  | "id"
  | "title"
  | "currentChapter"
  | "totalChapter"
  | "author"
  | "coverImage"
  | "summary"
>;

export type TBookCard = Pick<TBook, "id" | "title" | "author" | "coverImage">;
