import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Filter = () => {
  const { updateCountries } = useContext(UserContext);

  const handleRegionChange = (e) => {
    const region = e.target.value;
    updateCountries(region ? 'region' : 'all', region);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <select
        className="py-2 px-4 border border-gray-300 rounded w-full sm:w-64"
        onChange={handleRegionChange}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;