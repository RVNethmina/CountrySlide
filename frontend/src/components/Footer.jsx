// Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { assets } from "../assets/assessts";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={assets.logo} alt="Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering global connections through comprehensive country
              insights and cultural understanding.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              {/* Other social icons with same pattern */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
              </li>
              {/* Other links */}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 flex items-center gap-2">
                <span className="text-blue-600">✉</span>
                support@countryinsights.com
              </p>
              {/* Other contact info */}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Country Insights. All rights reserved.
            <br />
            <span className="text-blue-600">
              Bridging cultures through information
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
