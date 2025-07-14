

import { FaFacebookF, FaInstagram, FaTwitter, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="px-4 md:px-12 py-10 border-t border-blue-400 
      bg-blue-100 text-blue-900 
      dark:bg-zinc-900 dark:text-blue-100 transition-colors duration-300
      min-h-[180px]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-white mb-4"
          >
            <FaTrophy className="text-yellow-500 text-3xl" />
            <span>
              Active<span className="text-green-500">Arena</span>
            </span>
          </Link>
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            One-stop solution for managing club memberships, bookings, and events. 
            Join ActiveArena and make every game count.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-200">
            Quick Links
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-courts"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Courts
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-900 dark:text-blue-200">
            Contact
          </h3>
          <p className="text-sm">Email: support@activearena.com</p>
          <p className="text-sm mb-3">Phone: +880 1700-123456</p>

          <div className="flex gap-4 mt-2">
            <a
              href="https://facebook.com/activearena"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-xl transition-transform hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/activearena"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-xl transition-transform hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/activearena"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-xl transition-transform hover:scale-110"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t mt-10 pt-4 text-center text-sm text-blue-700 dark:text-blue-400">
        &copy; {new Date().getFullYear()} ActiveArena — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
