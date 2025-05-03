import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CountryCard = ({ country, onDetail }) => {
  const { toggleFavorite, favorites } = useContext(UserContext);
  const isFavorite = favorites.includes(country.cca3);

  if (!country) return null;

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onDetail}
    >
      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(country.cca3);
        }}
        className="absolute top-2 right-2 text-2xl z-10"
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Flag */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={country.flags?.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
        <p className="text-sm mb-1">
          <span className="font-semibold">Official Name:</span> {country.name.official}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        {country.capital?.length > 0 && (
          <p className="text-sm mb-1">
            <span className="font-semibold">Capital:</span> {country.capital[0]}
          </p>
        )}
        <p className="text-sm">
          <span className="font-semibold">Population:</span>{" "}
          {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;