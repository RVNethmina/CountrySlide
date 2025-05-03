import axios from "axios";

const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: "No countries found" });
    }
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching all countries:", error);
    res.status(500).json({ 
      error: "Failed to fetch countries",
      details: error.message 
    });
  }
};

const getCountryByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    res.json(response.data[0]);
  } catch (error) {
    console.error("Error fetching country by code:", error);
    res.status(500).json({ error: "Failed to fetch country" });
  }
};

const searchCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error searching country:", error);
    res.status(500).json({ error: "Search failed" });
  }
};

const filterByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error filtering countries by region:", error);
    res.status(500).json({ error: "Failed to filter by region" });
  }
};

export {
  getAllCountries,
  getCountryByCode,
  filterByRegion,
  searchCountryByName,
};
