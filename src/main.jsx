import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import AuthProvider from "./context/Provider/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

import MyPlants from "./routes/MyPlants";
import AddPlantPage from "./routes/AddPlantPage";
import AllPlantsPage from "./routes/AllPlantsPage";
import PlantDetailsPage from "./routes/PlantDetailsPage";
import Profile from "./routes/Profile";
import UpdatePlant from "./pages/UpdatePlant";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import About from "./routes/About";
import Support from "./routes/Support";
import Contact from "./routes/Contact";
import AllPlantsDashboard from "./routes/AllPlantsDashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "support", element: <Support /> },
      {
        path: "all-plants",
        element: <AllPlantsPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "all-plants", element: <AllPlantsDashboard /> },
      { path: "add-plant", element: <AddPlantPage /> },
      { path: "my-plants", element: <MyPlants /> },
      { path: "user-profile", element: <Profile /> },

      {
        path: "update-plant/:id",
        loader: ({ params }) =>
          fetch(
            `https://project-web-b11-a10-plant-care-serv.vercel.app/plants/${params.id}`
          ),
        element: <UpdatePlant />,
      },

      {
        path: "plant-details/:id",
        element: <PlantDetailsPage />,
      },
    ],
  },

  // 404 Not Found route
  {
    path: "*",
    element: <NotFound />,
  },
]);

import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" autoClose={1500} />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
