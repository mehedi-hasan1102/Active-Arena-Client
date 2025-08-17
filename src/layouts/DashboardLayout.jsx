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
  MdCheckCircleOutline,
  MdPendingActions,
} from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import Switch from "../components/DarkModeSidebar";
import { useRole } from "../hooks/useRole";
import Loading from "../components/Loading";

// Reusable common links for all roles
const commonLinks = [
  {
    to: "/dashboard/announcements",
    label: "Announcements",
    icon: <MdCampaign size={20} />,
  },
];

// Role-based navigation links
const userLinks = [
  { to: "/dashboard/user-profile", label: "My Profile", icon: <MdOutlinePerson size={20} /> },
  { to: "/dashboard/pending-bookings", label: "Pending Bookings", icon: <MdOutlineBook size={20} /> },
  ...commonLinks,
];

const memberLinks = [
  { to: "/dashboard/member-profile", label: "My Profile", icon: <MdOutlinePerson size={20} /> },
  { to: "/dashboard/pending-bookings", label: "Pending Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/approved-bookings", label: "Approved Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/confirmed-bookings", label: "Confirmed Bookings", icon: <MdOutlineBook size={20} /> },
  { to: "/dashboard/payment-history", label: "Payment History", icon: <MdHistory size={20} /> },
  ...commonLinks,
];

const adminLinks = [
  { to: "/dashboard/admin-profile", label: "Admin Profile", icon: <MdAdminPanelSettings size={20} /> },

  // Pending booking approvals
  {
    to: "/dashboard/manage-bookings",
    label: "Manage Bookings (Pending)",
    icon: <MdPendingActions size={20} />,
  },

  // Confirmed bookings list
  {
    to: "/dashboard/manage-confirmed-bookings",
    label: "Confirmed Bookings",
    icon: <MdCheckCircleOutline size={20} />,
  },

  { to: "/dashboard/manage-members", label: "Manage Members", icon: <MdOutlineCardMembership size={20} /> },
  { to: "/dashboard/manage-users", label: "All Users", icon: <MdOutlinePeople size={20} /> },
  { to: "/dashboard/manage-courts", label: "Manage Courts", icon: <MdOutlineSportsTennis size={20} /> },
  { to: "/dashboard/manage-coupons", label: "Manage Coupons", icon: <MdOutlineDiscount size={20} /> },
  { to: "/dashboard/make-announcement", label: "Make Announcement", icon: <MdCampaign size={20} /> },
  ...commonLinks,
];
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;

  const navItems = role === "admin" ? adminLinks : role === "member" ? memberLinks : userLinks;

  return (
    <div className="min-h-screen flex bg-emerald-50 dark:bg-zinc-900 transition-colors duration-300">
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white dark:bg-zinc-900 border-r-2 border-emerald-300 dark:border-emerald-700 p-4 flex flex-col justify-between transition-all duration-300 rounded-md`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
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
              className="text-emerald-600 dark:text-emerald-400 text-lg font-bold select-none rounded-md"
              aria-label="Toggle sidebar"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? "»" : "«"}
            </button>
          </div>

          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-700 mb-2 text-emerald-600 dark:text-emerald-400"
          >
            <MdHome size={20} />
            {!collapsed && "Home"}
          </NavLink>

          <nav className="space-y-3">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-700 ${
                  isActive
                    ? "bg-emerald-500 dark:bg-emerald-700 font-semibold text-white dark:text-emerald-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`
              }
            >
              <MdOutlineDashboard size={20} />
              {!collapsed && "Dashboard"}
            </NavLink>

            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-700 ${
                    isActive
                      ? "bg-emerald-500 dark:bg-emerald-700 font-semibold text-white dark:text-emerald-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`
                }
              >
                {icon}
                {!collapsed && label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-emerald-300 dark:border-emerald-700 flex justify-center">
          {!collapsed && <Switch />}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto bg-emerald-50 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 transition-colors duration-300 rounded-md">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;