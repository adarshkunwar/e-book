import { TBook } from '@/types/book';
import { books } from './booksCollection';

describe('books function', () => {
	const expectedKeys: (keyof TBook)[] = [
		'id',
		'title',
		'author',
		'cover',
		'description',
		'summary',
		'published',
		'genres',
		'currentChapter',
		'totalChapter'
	];

	it('should generate an array of books with the specified length', () => {
		const numberOfBooks = 5;
		const generatedBooks = books(numberOfBooks);

		expect(generatedBooks).toHaveLength(numberOfBooks);
	});

	it('should generate books with unique and incrementing IDs', () => {
		const numberOfBooks = 5;
		const generatedBooks = books(numberOfBooks);

		generatedBooks.forEach((book, index) => {
			expect(book.id).toBe((index + 1).toString());
		});
	});

	it('should generate books with the correct structure and no extra properties', () => {
		const numberOfBooks = 1;
		const [book] = books(numberOfBooks);

		expect(Object.keys(book)).toEqual(expectedKeys);
	});

	it('should generate books with a valid published date', () => {
		const numberOfBooks = 1;
		const [book] = books(numberOfBooks);

		const publishedDate = new Date(book.published);
		expect(publishedDate.toString()).not.toBe('Invalid Date');
	});

	it('should generate books with an array of genres', () => {
		const numberOfBooks = 1;
		const [book] = books(numberOfBooks);

		expect(Array.isArray(book.genres)).toBe(true);
		expect(book.genres).toHaveLength(3); // Assuming you always want 3 genres
	});
});
