import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = { 
    loggedIn: localStorage.getItem("token"), 
    role: localStorage.getItem("role") 
  };
  return user && user.loggedIn ? user : null;
};

const ProtectedRoutes = ({ allowedRoles }) => {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
