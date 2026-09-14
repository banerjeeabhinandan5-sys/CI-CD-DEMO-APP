const request = require('supertest');
const { app, add } = require('./index');

describe('Math function tests', () => {
  test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds negative numbers correctly', () => {
    expect(add(-1, -1)).toBe(-2);
  });
});

describe('API endpoint tests', () => {
  test('GET / should return 200 and a message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  test('GET /health should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
