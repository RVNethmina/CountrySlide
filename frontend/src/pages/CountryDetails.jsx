import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import CountryCard from "../components/CountryCard";
import CountryDetailsModal from "../components/CountryDetailsModal";

export default function CountryDetails() {
  const {
    countries,
    favorites,
    updateCountries,
    selectedCountry,
    setSelectedCountry,
    countryByCode,
    getCountryByCode,
    uToken,
  } = useUserContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Trigger search / region filter / all
  useEffect(() => {
    if (debouncedSearch.length > 2) {
      updateCountries("search", debouncedSearch);
    } else if (regionFilter) {
      updateCountries("region", regionFilter);
    } else {
      updateCountries("all");
    }
  }, [debouncedSearch, regionFilter, updateCountries]);

  // Reset on logout
  useEffect(() => {
    if (!uToken) {
      setSearchTerm("");
      setRegionFilter("");
      setShowFavorites(false);
      updateCountries("all");
      setSelectedCountry(null);
    }
  }, [uToken, updateCountries, setSelectedCountry]);

  // When a new country is selected, fetch its full data
  useEffect(() => {
    if (selectedCountry) {
      getCountryByCode(selectedCountry);
    }
  }, [selectedCountry, getCountryByCode]);

  // Ensure we always work with an array
  const filteredCountries = Array.isArray(countries)
    ? showFavorites
      ? countries.filter((c) => favorites.includes(c.cca3))
      : countries
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          World Countries Explorer
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Search by country name..."
            className="py-2 px-4 border border-gray-300 rounded w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="py-2 px-4 border border-gray-300 rounded w-full sm:w-64"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded ${
              showFavorites
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>
        </div>

        {/* Country Grid */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
        >
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onDetail={() => setSelectedCountry(country.cca3)}
            />
          ))}
        </div>

        {/* Details Modal */}
        {selectedCountry && countryByCode && (
          <CountryDetailsModal
            country={countryByCode}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </div>
    </div>
  );
}
