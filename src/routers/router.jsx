import { Navigate, createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import CartPage from "../pages/Books/CartPage";
import CheckoutPage from "../pages/Books/CheckoutPage";
import SingleBook from "./../pages/Books/SingleBook";
import PrivateRoutes from "./PrivateRoutes";
import OrderPage from "../pages/Books/OrderPage";
import AdminRoutes from "./AdminRoutes";
import App from "./../App";
import AdminLogin from "../components/AdminLogin";

import ManageBook from "../pages/dashboard/manageBooks/ManageBook";

import EditBooks from "../pages/dashboard/editBook/EditBooks";
import DashboardLayout from "./../pages/dashboard/DashboardLayout";
import AddBook from "./../pages/dashboard/addBook/AddBook";

const router = createBrowserRouter([
  // Main site layout (App handles Navbar, footer, etc.)
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <div>About</div> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "cart", element: <CartPage /> },
      { path: "order", element: <OrderPage /> },
      {
        path: "checkout",
        element: (
          <PrivateRoutes>
            <CheckoutPage />
          </PrivateRoutes>
        ),
      },
      { path: "books/:id", element: <SingleBook /> },
    ],
  },

  // Admin login page (not part of App layout)
  {
    path: "/admin",
    element: <AdminLogin />,
  },

  // Admin dashboard layout (full screen)
  {
    path: "/dashboard",
    element: (
      <AdminRoutes>
        <DashboardLayout />
      </AdminRoutes>
    ),
    children: [
      {
        path: "add-newbook",
        element: <AddBook />,
      },
      {
        path: "edit-book/:id",
        element: <EditBooks />,
      },
      {
        path: "manage-newbook",
        element: <ManageBook />,
      },
    ],
  },
]);

export default router;
