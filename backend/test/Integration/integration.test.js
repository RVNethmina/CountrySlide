// test/Integration/integration.test.js
import request from 'supertest';
import axios from 'axios';
import app from '../..';

jest.mock('axios');

describe('🧩 Integration – /api/countries routes', () => {
  describe('GET /api/countries/get-all-countries', () => {
    it('200 → array of countries', async () => {
      const fake = [{ name: { common: 'X' } }, { name: { common: 'Y' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const res = await request(app).get('/api/countries/get-all-countries');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fake);
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    });

    it('404 → when API returns empty array', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });

      const res = await request(app).get('/api/countries/get-all-countries');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'No countries found' });
    });

    it('500 → when axios throws', async () => {
      axios.get.mockRejectedValueOnce(new Error('offline'));

      const res = await request(app).get('/api/countries/get-all-countries');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: 'Failed to fetch countries',
        details: 'offline'
      });
    });
  });

  describe('GET /api/countries/getByCode/:code', () => {
    it('200 → single country object', async () => {
      const fake = [{ name: { common: 'ZZZ' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const res = await request(app).get('/api/countries/getByCode/ZZZ');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fake[0]);
      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/ZZZ');
    });

    it('500 → on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('boom'));

      const res = await request(app).get('/api/countries/getByCode/ZZZ');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch country' });
    });
  });

  describe('GET /api/countries/searchByName/:name', () => {
    it('200 → array of matches', async () => {
      const fake = [{ name: { common: 'ABC' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const res = await request(app).get('/api/countries/searchByName/ABC');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fake);
      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/name/ABC');
    });

    it('500 → on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('err'));

      const res = await request(app).get('/api/countries/searchByName/ABC');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Search failed' });
    });
  });

  describe('GET /api/countries/filterByRegion/:region', () => {
    it('200 → array for region', async () => {
      const fake = [{ name: { common: 'REG1' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const res = await request(app).get('/api/countries/filterByRegion/REG1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(fake);
      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/region/REG1');
    });

    it('500 → on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('err'));

      const res = await request(app).get('/api/countries/filterByRegion/REG1');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to filter by region' });
    });
  });
});
