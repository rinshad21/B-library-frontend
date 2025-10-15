import { useAuth } from "../context/AuthContext";

import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { currrentUser, loading } = useAuth();
  if (loading) {
    <div>loading...</div>;
  }
  if (currrentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoutes;
