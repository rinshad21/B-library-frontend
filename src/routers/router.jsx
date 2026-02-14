import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
import AdminLogin from "../components/AdminLogin";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

// Lazy loading components
const Home = lazy(() => import("../pages/home/Home"));
const Login = lazy(() => import("../components/Login"));
const Signup = lazy(() => import("../components/Signup"));
const CartPage = lazy(() => import("../pages/Books/CartPage"));
const CheckoutPage = lazy(() => import("../pages/Books/CheckoutPage"));
const SingleBook = lazy(() => import("./../pages/Books/SingleBook"));
const OrderPage = lazy(() => import("../pages/Books/OrderPage"));
const DashboardLayout = lazy(() => import("./../pages/dashboard/DashboardLayout"));
const AddBook = lazy(() => import("./../pages/dashboard/addBook/AddBook"));
const EditBooks = lazy(() => import("../pages/dashboard/editBook/EditBooks"));
const ManageBook = lazy(() => import("../pages/dashboard/manageBooks/ManageBook"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Loading />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<Loading />}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Suspense fallback={<Loading />}>
              <CheckoutPage />
            </Suspense>
          </PrivateRoutes>
        ),
      },
      {
        path: "/books/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <SingleBook />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoutes>
        <Suspense fallback={<Loading />}>
          <DashboardLayout />
        </Suspense>
      </AdminRoutes>
    ),
    children: [
      {
        path: "add-newbook",
        element: (
          <Suspense fallback={<Loading />}>
            <AddBook />
          </Suspense>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditBooks />
          </Suspense>
        ),
      },
      {
        path: "manage-newbook",
        element: (
          <Suspense fallback={<Loading />}>
            <ManageBook />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
