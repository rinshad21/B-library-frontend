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
import DashboardLayout from "../pages/dashboard/dashboardLayout";

import ManageBook from "../pages/dashboard/manageBooks/ManageBook";
import AddBook from "../pages/dashboard/addBook/addBook";
import EditBooks from "../pages/dashboard/editBook/EditBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order", element: <OrderPage /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <CheckoutPage />
          </PrivateRoutes>
        ),
      },
      { path: "/books/:id", element: <SingleBook /> },
      {
        path: "/admin",
        element: <AdminLogin />,
      },
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
            element: (
              <AdminRoutes>
                <AddBook />
              </AdminRoutes>
            ),
          },
          {
            path: "edit-book/:id",
            element: (
              <AdminRoutes>
                <EditBooks />
              </AdminRoutes>
            ),
          },
          {
            path: "manage-newbook",
            element: (
              <AdminRoutes>
                <ManageBook />
              </AdminRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
