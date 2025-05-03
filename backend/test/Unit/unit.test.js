// test/Unit/unit.test.js
import axios from 'axios';
import { 
  getAllCountries, 
  getCountryByCode, 
  searchCountryByName, 
  filterByRegion 
} from '../../controllers/ContriesController.js';  // adjust path/filename!

jest.mock('axios');

describe('CountriesController', () => {
  describe('getAllCountries', () => {
    it('→ responds with data when axios returns an array', async () => {
      const fake = [{ name: { common: 'Foo' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const req = {};
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await getAllCountries(req, res);

      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
      expect(res.json).toHaveBeenCalledWith(fake);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('→ returns 404 if no countries found', async () => {
      axios.get.mockResolvedValueOnce({ data: [] });

      const req = {};
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await getAllCountries(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'No countries found' });
    });

    it('→ returns 500 on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('network down'));

      const req = {};
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await getAllCountries(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to fetch countries',
        details: 'network down'
      });
    });
  });

  describe('getCountryByCode', () => {
    it('→ responds with single country object', async () => {
      const fake = [{ name: { common: 'Bar' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const req = { params: { code: 'BAR' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await getCountryByCode(req, res);

      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/BAR');
      expect(res.json).toHaveBeenCalledWith(fake[0]);
    });

    it('→ returns 500 on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('oops'));

      const req = { params: { code: 'BAR' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await getCountryByCode(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to fetch country' });
    });
  });

  describe('searchCountryByName', () => {
    it('→ responds with array of matches', async () => {
      const fake = [{ name: { common: 'Baz' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const req = { params: { name: 'Baz' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await searchCountryByName(req, res);

      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Baz');
      expect(res.json).toHaveBeenCalledWith(fake);
    });

    it('→ returns 500 on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('fail'));

      const req = { params: { name: 'Baz' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await searchCountryByName(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Search failed' });
    });
  });

  describe('filterByRegion', () => {
    it('→ responds with array for a region', async () => {
      const fake = [{ name: { common: 'Qux' } }];
      axios.get.mockResolvedValueOnce({ data: fake });

      const req = { params: { region: 'Qux' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await filterByRegion(req, res);

      expect(axios.get)
        .toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Qux');
      expect(res.json).toHaveBeenCalledWith(fake);
    });

    it('→ returns 500 on axios error', async () => {
      axios.get.mockRejectedValueOnce(new Error('fail'));

      const req = { params: { region: 'Qux' } };
      const res = { 
        json: jest.fn(), 
        status: jest.fn().mockReturnThis() 
      };

      await filterByRegion(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to filter by region' });
    });
  });
});
