import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

 const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector((state)=>state.auth.isAuth)
  console.log("isAuth",isAuth);
  if (!isAuth) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};
export default ProtectedRoute;