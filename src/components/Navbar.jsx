
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Provider/AuthProvider";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";
import Switch from "./DarkModeSidebar"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    const isDark = document.documentElement.classList.contains("dark");
    const result = await Swal.fire({
      title: "Logout?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#e5e7eb" : "#111827",
    });

    if (result.isConfirmed) {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out",
        showConfirmButton: false,
        timer: 1500,
        background: isDark ? "#1f2937" : "#fff",
        color: isDark ? "#e5e7eb" : "#111827",
      });
    }
  };

  const navLinks = (
    
    <>
  <NavLink
    to="/"
    className={({ isActive }) =>
      (isActive
        ? "text-blue-700 font-semibold dark:text-white"
        : "hover:text-blue-600 dark:text-white dark:hover:text-gray-300")
    }
  >
    Home
  </NavLink>
  <NavLink
    to="/all-courts"
    className={({ isActive }) =>
      (isActive
        ? "text-blue-700 font-semibold dark:text-white"
        : "hover:text-blue-600 dark:text-white dark:hover:text-gray-300")
    }
  >
    Courts
  </NavLink>
  <NavLink
    to="/about"
    className={({ isActive }) =>
      (isActive
        ? "text-blue-700 font-semibold dark:text-white"
        : "hover:text-blue-600 dark:text-white dark:hover:text-gray-300")
    }
  >
    About
  </NavLink>
  <NavLink
    to="/contact"
    className={({ isActive }) =>
      (isActive
        ? "text-blue-700 font-semibold dark:text-white"
        : "hover:text-blue-600 dark:text-white dark:hover:text-gray-300")
    }
  >
    Contact
  </NavLink>
  <NavLink
    to="/support"
    className={({ isActive }) =>
      (isActive
        ? "text-blue-700 font-semibold dark:text-white"
        : "hover:text-blue-600 dark:text-white dark:hover:text-gray-300")
    }
  >
    Support
  </NavLink>
</>

  );

  return (
    <nav className="bg-white dark:bg-zinc-900 border-b shadow-md fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-white"
        >
          <FaTrophy className="text-yellow-500 text-3xl" />
          <span>
            Active<span className="text-green-500">Arena</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 text-lg font-medium dark:text-white">
          {navLinks}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <Switch />

          {!user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full ring-2 ring-blue-500 cursor-pointer object-cover"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-800 rounded-md shadow-lg z-50 border dark:border-zinc-700">
                  <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                    {user.displayName || user.email}
                  </div>
                  <hr className="border-blue-200 dark:border-zinc-700" />
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-200 text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-200 text-sm text-red-500"
                  >
                    Logout <FiLogOut className="inline ml-1" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-blue-700 dark:text-white"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 pt-2 bg-white dark:bg-zinc-900 border-t">
          <div className="flex flex-col gap-3 text-lg font-medium">{navLinks}</div>
          {!user ? (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="mt-4 border-t pt-3">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {user.displayName || user.email}
              </p>
              <Link
                to="/dashboard"
                className="block py-2 text-blue-600 hover:underline"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-left w-full text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
