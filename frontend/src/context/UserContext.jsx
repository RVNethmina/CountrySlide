import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryByCode, setCountryByCode] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [uToken, setUtoken] = useState(
    localStorage.getItem("uToken") || false
  );
  const [userData, setUserData] = useState([]);
  // Vite injects this at build time:
  const backendUrl = "https://countryslide-backend.onrender.com";

  // 1) Get all countries
  const getCountryData = async () => {
    try {
      const { data } = await axios.get(
        `https://countryslide-backend.onrender.com/api/countries/get-all-countries`
      );
      
      if (!data || data.length === 0) {
        toast.warning("No country data available");
        return;
      }
      console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
      console.log("Data : ", data.length);
      
      setCountries(data);
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.error || "Failed to load countries");
    }
  };

  // 2) Get one country by its code
  const getCountryByCode = async (code) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/countries/getByCode/${code}`
      );
      // our backend returns a single object
      setCountryByCode(data);
    } catch (error) {
      handleApiError(error);
    }
  };

  // 3) Search or filter
  const updateCountries = async (filterType, value) => {
    try {
      let url;
      switch (filterType) {
        case "search":
          url = `${backendUrl}/api/countries/searchByName/${value}`;
          break;
        case "region":
          url = `${backendUrl}/api/countries/filterByRegion/${value}`;
          break;
        default:
          url = `${backendUrl}/api/countries/get-all-countries`;
      }
      const { data } = await axios.get(url);
      setCountries(data);
      setCurrentFilter(filterType);
    } catch (error) {
      handleApiError(error);
    }
  };

  // 4) Toggle favorites
  const toggleFavorite = (code) => {
    setFavorites((prev) => {
      const next = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  // Handle errors
  const handleApiError = (error) => {
    console.error("API Error:", error);
    toast.error("Failed to load country data. Please try again later.");
  };

  // Fetch user profile
  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-profile`
      );
      if (data.success) setUserData(data.userData);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUtoken(false);
    localStorage.removeItem("uToken");
    setUserData([]);
  };

  // When uToken flips, re-fetch both countries & user
  useEffect(() => {
    getCountryData();
  }, [uToken]);

  

  return (
    <UserContext.Provider
      value={{
        countries,
        favorites,
        countryByCode,
        currentFilter,
        getCountryData,
        getCountryByCode,
        updateCountries,
        toggleFavorite,
        selectedCountry,
        setSelectedCountry,
        getUserData,
        userData,
        uToken,
        setUtoken,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
