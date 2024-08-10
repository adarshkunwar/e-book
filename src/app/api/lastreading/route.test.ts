/**
 * @jest-environment node
 */
import { GET } from './route';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

it('should return 1 data with status 200', async () => {
	const response = await GET();
	const body = await response.json();

	expect(response.status).toBe(200);
	expect(body.length).toBe(1);
});


it('data should match the schema', async () => {
	const response = await GET();
	const body = await response.json();

	const schema = {
		type: 'object',
		properties: {
			id: { type: 'string' },
			title: { type: 'string' },
			currentChapter: { type: 'number' },
			totalChapter: { type: 'number' },
			author: { type: 'string' },
			cover: { type: 'string' },
			summary: { type: 'string' },
		},
		required: ['id', 'title', 'currentChapter', 'totalChapter', 'author', 'cover', 'summary'],
	};

	expect(body[0]).toMatchSchema(schema);
});

