
import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdHome,
  MdOutlineBook,
  MdHistory,
  MdCampaign,
  MdAdminPanelSettings,
  MdOutlineSportsTennis,
  MdOutlineCardMembership,
  MdOutlinePeople,
  MdOutlineDiscount,
} from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import Switch from "../components/DarkModeSidebar";

const navLinks = [
  { to: "/dashboard/user-profile", label: "My Profile", icon: <MdOutlinePerson size={20} /> },
  { to: "/dashboard/pending-bookings", label: "Pending Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/approved-bookings", label: "Approved Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/confirmed-bookings", label: "Confirmed Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/payment-history", label: "Payment History", icon: <MdHistory size={20} /> },
  { to: "/dashboard/admin-profile", label: "Admin Profile", icon: <MdAdminPanelSettings size={20} /> },
  { to: "/dashboard/manage-bookings", label: "Manage Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/manage-members", label: "Manage Members", icon: <MdOutlineCardMembership size={20} /> },
  { to: "/dashboard/manage-users", label: "All Users", icon: <MdOutlinePeople size={20} /> },
  { to: "/dashboard/manage-courts", label: "Manage Courts", icon: <MdOutlineSportsTennis size={20} /> },
  { to: "/dashboard/manage-coupons", label: "Manage Coupons", icon: <MdOutlineDiscount size={20} /> },
  { to: "/dashboard/make-announcement", label: "Make Announcement", icon: <MdCampaign size={20} /> },
  { to: "/dashboard/announcements", label: "Announcements", icon: <MdCampaign size={20} /> },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-zinc-900 border-r-2 border-blue-300 dark:border-blue-700 p-4 flex flex-col justify-between transition-all duration-300 rounded-md`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
            >
              <FaTrophy size={24} />
              {!collapsed && (
                <span className="text-xl font-bold tracking-wide select-none">
                  ActiveArena
                </span>
              )}
            </Link>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-blue-600 dark:text-blue-400 text-lg font-bold select-none rounded-md"
              aria-label="Toggle sidebar"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>

          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 mb-2 text-gray-800 dark:text-zinc-300"
          >
            <MdHome size={20} />
            {!collapsed && "Home"}
          </NavLink>

          <nav className="space-y-3">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-700 font-semibold text-blue-700 dark:text-blue-300"
                    : "text-gray-800 dark:text-zinc-300"
                }`
              }
            >
              <MdOutlineDashboard size={20} />
              {!collapsed && "Dashboard"}
            </NavLink>

            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 ${
                    isActive
                      ? "bg-blue-200 dark:bg-blue-700 font-semibold text-blue-700 dark:text-blue-300"
                      : "text-gray-800 dark:text-zinc-300"
                  }`
                }
              >
                {icon}
                {!collapsed && label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-blue-300 dark:border-blue-700 flex justify-center">
          {!collapsed && <Switch />}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 transition-colors duration-300 rounded-md">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;




// rale base 

// import { Outlet, NavLink, Link } from "react-router-dom";
// import { useState } from "react";
// import {
//   MdOutlineDashboard,
//   MdOutlinePerson,
//   MdHome,
//   MdOutlineBook,
//   MdHistory,
//   MdCampaign,
//   MdAdminPanelSettings,
//   MdOutlineSportsTennis,
//   MdOutlineCardMembership,
//   MdOutlinePeople,
//   MdOutlineDiscount,
// } from "react-icons/md";
// import { FaTrophy } from "react-icons/fa";
// import Switch from "../components/DarkModeSidebar";
// import { useRole } from "../hooks/useRole";
// import Loading from "../components/Loading"; // ✅ make sure this component exists

// // Reusable links
// const commonLinks = [
//   {
//     to: "/dashboard/announcements",
//     label: "Announcements",
//     icon: <MdCampaign size={20} />,
//   },
// ];

// const userLinks = [
//   { to: "/dashboard/user-profile", label: "My Profile", icon: <MdOutlinePerson size={20} /> },
//   { to: "/dashboard/pending-bookings", label: "Pending Bookings", icon: <MdOutlineBook size={20} /> },
//   ...commonLinks,
// ];

// const memberLinks = [
//   { to: "/dashboard/member-profile", label: "My Profile", icon: <MdOutlinePerson size={20} /> },
//   { to: "/dashboard/pending-bookings", label: "Pending Bookings", icon: <MdOutlineBook size={20} /> },
//   { to: "/dashboard/approved-bookings", label: "Approved Bookings", icon: <MdOutlineBook size={20} /> },
//   { to: "/dashboard/confirmed-bookings", label: "Confirmed Bookings", icon: <MdOutlineBook size={20} /> },
//   { to: "/dashboard/payment-history", label: "Payment History", icon: <MdHistory size={20} /> },
//   ...commonLinks,
// ];

// const adminLinks = [
//   { to: "/dashboard/admin-profile", label: "Admin Profile", icon: <MdAdminPanelSettings size={20} /> },
//   { to: "/dashboard/manage-bookings", label: "Manage Bookings", icon: <MdOutlineBook size={20} /> },
//   { to: "/dashboard/manage-members", label: "Manage Members", icon: <MdOutlineCardMembership size={20} /> },
//   { to: "/dashboard/manage-users", label: "All Users", icon: <MdOutlinePeople size={20} /> },
//   { to: "/dashboard/manage-courts", label: "Manage Courts", icon: <MdOutlineSportsTennis size={20} /> },
//   { to: "/dashboard/manage-coupons", label: "Manage Coupons", icon: <MdOutlineDiscount size={20} /> },
//   { to: "/dashboard/make-announcement", label: "Make Announcement", icon: <MdCampaign size={20} /> },
//   ...commonLinks,
// ];

// const DashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const { role, isLoading } = useRole();

//   if (isLoading) return <Loading />;

//   const navItems =
//     role === "admin" ? adminLinks : role === "member" ? memberLinks : userLinks;

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
//       <aside
//         className={`$ {
//           collapsed ? "w-20" : "w-64"
//         } bg-white dark:bg-zinc-900 border-r-2 border-blue-300 dark:border-blue-700 p-4 flex flex-col justify-between transition-all duration-300 rounded-md`}
//       >
//         <div>
//           <div className="flex items-center justify-between mb-6">
//             <Link
//               to="/"
//               className="flex items-center gap-2 text-blue-700 dark:text-blue-400"
//             >
//               <FaTrophy size={24} />
//               {!collapsed && (
//                 <span className="text-xl font-bold tracking-wide select-none">
//                   ActiveArena
//                 </span>
//               )}
//             </Link>
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="text-blue-600 dark:text-blue-400 text-lg font-bold select-none rounded-md"
//               aria-label="Toggle sidebar"
//               title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               {collapsed ? "»" : "«"}
//             </button>
//           </div>

//           <NavLink
//             to="/"
//             className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 mb-2 text-gray-800 dark:text-zinc-300"
//           >
//             <MdHome size={20} />
//             {!collapsed && "Home"}
//           </NavLink>

//           <nav className="space-y-3">
//             <NavLink
//               to="/dashboard"
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 ${
//                   isActive
//                     ? "bg-blue-200 dark:bg-blue-700 font-semibold text-blue-700 dark:text-blue-300"
//                     : "text-gray-800 dark:text-zinc-300"
//                 }`
//               }
//             >
//               <MdOutlineDashboard size={20} />
//               {!collapsed && "Dashboard"}
//             </NavLink>

//             {navItems.map(({ to, label, icon }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-blue-100 dark:hover:bg-blue-700 ${
//                     isActive
//                       ? "bg-blue-200 dark:bg-blue-700 font-semibold text-blue-700 dark:text-blue-300"
//                       : "text-gray-800 dark:text-zinc-300"
//                   }`
//                 }
//               >
//                 {icon}
//                 {!collapsed && label}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         <div className="pt-4 border-t border-blue-300 dark:border-blue-700 flex justify-center">
//           {!collapsed && <Switch />}
//         </div>
//       </aside>

//       <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-200 transition-colors duration-300 rounded-md">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
