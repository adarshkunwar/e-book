
export type TBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  summary: string;
  published: string;
  genres: string[];
  totalChapter: number;
  currentChapter: number;
};

export type TLastReadingBook = Pick<TBook, 'id' | 'title' | 'currentChapter' | 'totalChapter' | 'author' | 'cover' | 'summary'>;

export type TBookCard = Pick<TBook, 'id' | 'title' | 'author' | 'cover'>;
