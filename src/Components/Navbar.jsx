

// import { Link, NavLink } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/Provider/AuthProvider";
// import { Tooltip } from "react-tooltip";
// import { FiLogOut } from "react-icons/fi";
// import { FaLeaf } from "react-icons/fa";
// import { HiMenuAlt3, HiX } from "react-icons/hi";
// import Switch from "./DarkModeSidebar";
// import Swal from "sweetalert2";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     const isDarkMode = document.documentElement.classList.contains("dark");
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#16a34a",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, logout",
//       background: isDarkMode ? "#1f2937" : "#ffffff",
//       color: isDarkMode ? "#d1d5db" : "#111827",
//     });

//     if (result.isConfirmed) {
//       try {
//         await logout();
//         Swal.fire({
//           icon: "success",
//           title: "Logged out",
//           text: "You have been successfully logged out.",
//           timer: 2000,
//           showConfirmButton: false,
//           background: isDarkMode ? "#1f2937" : "#ffffff",
//           color: isDarkMode ? "#d1d5db" : "#111827",
//         });
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Logout Failed",
//           text: error.message || "Something went wrong. Please try again.",
//           background: isDarkMode ? "#1f2937" : "#ffffff",
//           color: isDarkMode ? "#d1d5db" : "#111827",
//         });
//       }
//     }
//   };

//   const navItems = (
//     <>
//       <li>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-700 dark:text-blue-300 font-semibold"
//               : "hover:text-blue-600 dark:hover:text-blue-400"
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/all-plants"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-700 dark:text-blue-300 font-semibold"
//               : "hover:text-blue-600 dark:hover:text-blue-400"
//           }
//         >
//           All Plants
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-700 dark:text-blue-300 font-semibold"
//               : "hover:text-blue-600 dark:hover:text-blue-400"
//           }
//         >
//           About
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-700 dark:text-blue-300 font-semibold"
//               : "hover:text-blue-600 dark:hover:text-blue-400"
//           }
//         >
//           Contact
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/support"
//           className={({ isActive }) =>
//             isActive
//               ? "text-blue-700 dark:text-blue-300 font-semibold"
//               : "hover:text-blue-600 dark:hover:text-blue-400"
//           }
//         >
//           Support
//         </NavLink>
//       </li>
//     </>
//   );

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-50 dark:bg-zinc-900 border-b-2 border-blue-400 shadow-md transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-2 text-2xl font-bold text-blue-700 dark:text-blue-400">
//             <FaLeaf />
//             <Link
//               to="/"
//               className="hover:text-blue-600 dark:hover:text-blue-300 transition"
//               aria-label="Go to Home"
//             >
//               assignment 12
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex lg:space-x-8 lg:flex-1 lg:justify-center">
//             <ul className="flex space-x-8 text-lg font-medium dark:text-white">{navItems}</ul>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-3">
//             <Switch />
//             {!user ? (
//               <div className="flex space-x-3">
//                 <Link
//                   to="/login"
//                   className="btn btn-outline btn-sm rounded-md dark:border-blue-500 dark:text-white dark:hover:bg-blue-600"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="btn btn-primary btn-sm rounded-md text-white dark:bg-blue-600 dark:hover:bg-blue-700"
//                 >
//                   Register
//                 </Link>
//               </div>
//             ) : (
//               <div className="hidden lg:flex items-center space-x-3">
//                 <img
//                   src={user.photoURL}
//                   alt={user.displayName || "User"}
//                   className="w-9 h-9 rounded-full ring-2 ring-blue-400"
//                 />
//                 <Link
//                   to="/dashboard"
//                   className="btn btn-outline btn-sm rounded-md dark:border-blue-500 dark:text-white dark:hover:bg-blue-600"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="btn btn-ghost btn-circle rounded-md text-red-500 dark:text-red-400 text-lg"
//                   data-tooltip-id="tooltip-logout"
//                   data-tooltip-content="Logout"
//                   aria-label="Logout"
//                 >
//                   <FiLogOut />
//                 </button>
//               </div>
//             )}

//             {/* Hamburger */}
//             <div className="lg:hidden ml-1">
//               <button
//                 type="button"
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="p-2 rounded-md text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 aria-label="Toggle menu"
//                 aria-expanded={menuOpen}
//               >
//                 {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden bg-white dark:bg-gray-900 border-t border-blue-400 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
//           menuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
//         }`}
//       >
//         <ul className="space-y-2 px-4 text-lg font-medium dark:text-white">{navItems}</ul>

//         {user && (
//           <div className="mt-4 pt-4 border-t border-blue-400 px-4">
//             <div className="flex items-center gap-3 bg-blue-50 dark:bg-zinc-800 p-3 rounded-lg shadow-sm mb-3">
//               <img
//                 src={user.photoURL}
//                 alt={user.displayName || "User"}
//                 className="w-10 h-10 rounded-full ring-2 ring-blue-400 object-cover"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800 dark:text-white">
//                   {user.displayName || "User"}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">Logged in</p>
//               </div>
//             </div>
//             <Link
//               to="/dashboard"
//               className="block w-full text-center px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
//             >
//               Go to Dashboard
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Provider/AuthProvider";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";
import Switch from "./DarkModeSidebar"; // ✅ Import toggle switch

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
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/courts"
        className={({ isActive }) =>
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        Courts
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
                    className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-700 text-sm"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-sm text-red-500"
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
