export type TAuthor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type TChapter = {
  id: string;
  title: string;
  content: string;
};

export type TBook = {
  id: string;
  title: string;
  author: TAuthor;
  data: string;
  coverImage: string;
  summary: string;
  publishedDate: string;
  genres: string[];
  chapters: TChapter[];
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
