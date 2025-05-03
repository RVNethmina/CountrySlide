import express from 'express';
import { filterByRegion, getAllCountries, getCountryByCode, searchCountryByName } from '../controllers/ContriesController.js';

const CountryRouter = express.Router();

CountryRouter.get("/get-all-countries",getAllCountries);
CountryRouter.get("/getByCode/:code",getCountryByCode);
CountryRouter.get("/searchByName/:name",searchCountryByName);
CountryRouter.get("/filterByRegion/:region",filterByRegion);

export default CountryRouter;