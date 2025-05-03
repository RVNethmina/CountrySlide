import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const CountryDetailsModal = ({ onClose }) => {
  const { countryByCode, getCountryByCode, selectedCountry } = useContext(UserContext);

  useEffect(() => {
    if (selectedCountry) {
      getCountryByCode(selectedCountry);
    }
  }, [selectedCountry]);

  if (!countryByCode) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{countryByCode.name.common}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={countryByCode.flags.png}
                alt={`Flag of ${countryByCode.name.common}`}
                className="w-full h-48 object-contain"
              />
            </div>
            
            <div className="space-y-2">
              <p><strong>Official Name:</strong> {countryByCode.name.official}</p>
              <p><strong>Region:</strong> {countryByCode.region}</p>
              <p><strong>Subregion:</strong> {countryByCode.subregion}</p>
              <p><strong>Capital:</strong> {countryByCode.capital?.join(', ')}</p>
              <p><strong>Population:</strong> {countryByCode.population.toLocaleString()}</p>
              <p><strong>Area:</strong> {countryByCode.area?.toLocaleString()} km²</p>
              <p><strong>Languages:</strong> {Object.values(countryByCode.languages || {}).join(', ')}</p>
              <p><strong>Currencies:</strong> {Object.values(countryByCode.currencies || {})
                .map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
              <p><strong>Time Zones:</strong> {countryByCode.timezones?.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsModal;