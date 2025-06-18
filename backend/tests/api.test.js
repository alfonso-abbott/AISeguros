const request = require('supertest');
const app = require('../server');

describe('API routes', () => {
  test('GET /api/ping returns pong', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.status).toBe(200);
    expect(res.text).toBe('pong');
  });
});
