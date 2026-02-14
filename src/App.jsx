import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";


function App() {

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
