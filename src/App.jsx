import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();
  //admin routes hiding
  const hideNavbarRoutes = ["/admin", "/dashboard"];

  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AuthProvider>
        {isLoading ? (
          <Loading />
        ) : (
          <main className="bg-gray-200 min-h-screen mx-auto px-4 py-6">
            {!shouldHideNavbar && <Navbar />}
            <Outlet />
          </main>
        )}
      </AuthProvider>
    </>
  );
}

export default App;
