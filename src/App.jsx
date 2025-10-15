import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();
  // Hide Navbar for these routes
  const hideNavbarRoutes = ["/admin", "/dashboard"];

  // Check if current path starts with any of them
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <>
      <AuthProvider>
        <main className="bg-gray-200 min-h-screen mx-auto px-4 py-6">
          {!shouldHideNavbar && <Navbar />}
          <Outlet />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
