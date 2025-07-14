import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthProvider from "./context/Provider/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import About from "./routes/About";
import AllCourtsPage from "./routes/AllCourtsPage";
import Support from "./routes/Support";
import Contact from "./routes/Contact";

// User Dashboard
import UserProfile from "./pages/dashboard/user/UserProfile";
import UserPendingBookings from "./pages/dashboard/user/UserPendingBookings";
import UserAnnouncements from "./pages/dashboard/user/UserAnnouncements";

// Member Dashboard
import MemberProfile from "./pages/dashboard/member/MemberProfile";
// import MemberPendingBookings from "./pages/dashboard/member/MemberPendingBookings";
import MemberApprovedBookings from "./pages/dashboard/member/MemberApprovedBookings";
import MemberConfirmedBookings from "./pages/dashboard/member/MemberConfirmedBookings";
import PaymentPage from "./pages/dashboard/member/PaymentPage";
import PaymentHistory from "./pages/dashboard/member/PaymentHistory";
// import MemberAnnouncements from "./pages/dashboard/member/MemberAnnouncements";

// Admin Dashboard
import AdminProfile from "./pages/dashboard/admin/AdminProfile";
import ManageBookingsApproval from "./pages/dashboard/admin/ManageBookingsApproval";
import ManageMembers from "./pages/dashboard/admin/ManageMembers";
import ManageAllUsers from "./pages/dashboard/admin/ManageAllUsers";
import ManageCourts from "./pages/dashboard/admin/ManageCourts";
import ManageConfirmedBookings from "./pages/dashboard/admin/ManageConfirmedBookings";
import ManageCoupons from "./pages/dashboard/admin/ManageCoupons";
import MakeAnnouncement from "./pages/dashboard/admin/MakeAnnouncement";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "all-courts", element: <AllCourtsPage /> },
      { path: "contact", element: <Contact /> },
      { path: "support", element: <Support /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true, element: <Overview /> },
      // User routes
      { path: "user-profile", element: <UserProfile /> },
      { path: "pending-bookings", element: <UserPendingBookings /> },
      { path: "announcements", element: <UserAnnouncements /> },
      // Member routes
      { path: "member-profile", element: <MemberProfile /> },
      { path: "approved-bookings", element: <MemberApprovedBookings /> },
      { path: "confirmed-bookings", element: <MemberConfirmedBookings /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "payment-history", element: <PaymentHistory /> },
      // Admin routes
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "manage-bookings", element: <ManageBookingsApproval /> },
      { path: "manage-members", element: <ManageMembers /> },
      { path: "manage-users", element: <ManageAllUsers /> },
      { path: "manage-courts", element: <ManageCourts /> },
      { path: "manage-confirmed-bookings", element: <ManageConfirmedBookings /> },
      { path: "manage-coupons", element: <ManageCoupons /> },
      { path: "make-announcement", element: <MakeAnnouncement /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={1500} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);