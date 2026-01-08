import request from 'supertest';
import { app } from '../src/app';

describe('API Tests', () => {
  // Test GET /api/health
  test('GET /api/health doit contenir status et timestamp', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Test POST /api/generate-lorem avec theme vide
  test('POST /api/generate-lorem avec theme vide doit retourner 400', async () => {
    const response = await request(app)
      .post('/api/generate-lorem')
      .send({ theme: '' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  // Test POST /api/generate-lorem avec paragraphLength invalide
  test('POST /api/generate-lorem avec paragraphLength invalide doit retourner 400', async () => {
    const response = await request(app)
      .post('/api/generate-lorem')
      .send({ 
        theme: 'Space pirates', 
        paragraphs: 2,
        paragraphLength: 'invalid' 
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});