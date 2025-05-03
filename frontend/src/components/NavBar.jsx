import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FiMenu, FiX, FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import { assets } from "../assets/assessts";

const NavBar = () => {
  const navigate = useNavigate();
  const { uToken, setUtoken, userData , logOut} = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate("/")} 
          className="cursor-pointer flex items-center gap-2"
        >
          <img 
            src={assets.logo} 
            alt="Logo" 
            className="h-12 w-auto transition-transform hover:scale-105" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>

            {uToken ?  (<NavLink 
              to="/countydetails" 
              className={({ isActive }) => 
                `text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Country Details
            </NavLink> ) : ("")}
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* User Section */}
          <div className="relative ml-4">
            {uToken ? (
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {userData?.name?.[0]?.toUpperCase() || <FiUser size={20} />}
                </div>
                <FiChevronDown className="text-gray-600" />
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Dropdown Menu */}
            {uToken && showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
                <div className="p-2">
                  <div
                    onClick={() => navigate("/my-profile")}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <FiUser className="text-gray-500" />
                    My Profile
                  </div>
                  <div
                    onClick={logOut}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <FiLogOut className="text-gray-500" />
                    Log Out
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden p-2 text-gray-600 hover:text-blue-600"
        >
          <FiMenu size={24} />
        </button>

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg">
              <div className="p-4 flex justify-between items-center border-b">
                <img src={assets.logo} alt="Logo" className="h-10" />
                <button 
                  onClick={() => setShowMenu(false)}
                  className="p-2 text-gray-500 hover:text-blue-600"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="p-4 flex flex-col gap-4">
                <NavLink
                  to="/"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/countydetails"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Country Details
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setShowMenu(false)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </NavLink>
                
                <div className="mt-8 border-t pt-4">
                  {uToken ? (
                    <button
                      onClick={logOut}
                      className="w-full py-2 px-4 text-gray-600 hover:text-blue-600 text-left"
                    >
                      Log Out
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        navigate("/login");
                      }}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;