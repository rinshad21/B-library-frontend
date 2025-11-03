import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthProvider>
      <main className="bg-gray-200 min-h-screen mx-auto px-4 py-6">
        <Navbar />
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default App;
