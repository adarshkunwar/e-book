
/**
 * @jest-environment node
 */
import { GET } from './route';

describe('GET /api/book/:id', () => {
  it('should return data with status 200', async () => {
    const requestObj = {
      nextUrl: {
        searchParams: new URLSearchParams({ Id: '1' }),
      },
    } as any;

    const response = await GET(requestObj, { params: { id: '1' } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe("1");
  });

  it('should return error with status 400 when item not found', async () => {
    const requestObj = {
      nextUrl: {
        searchParams: new URLSearchParams({ Id: '3' }),
      },
    } as any;

    const response = await GET(requestObj, { params: { id: '1000' } });
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toEqual(expect.any(String));
  });
});
