import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "sweetalert2/dist/sweetalert2.js";
import router from "./routers/router.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
