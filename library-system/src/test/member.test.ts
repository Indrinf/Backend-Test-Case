import request from 'supertest';
import app from '../application/app';

describe('Member API', () => {
    it('GET /api/members should return a list of members with borrowed books count', async () => {
        const response = await request(app).get('/api/members');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
