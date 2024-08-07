import AuthService from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = AuthService.loggedIn();
  //so based on the token value present in the local storage, we give user the permission to access the dashboard
  //if user is not loggedIn(which checks the token in storage and its validity), we clear the token and redirect the user to the login/sinup page
  if (!isLoggedIn) {
    AuthService.logout();
    return <Navigate to="/auth" />;
  }

  //if user is logged in, we redirect the user to the dashboard page
  return <>{children}</>;
};
export default ProtectedRoute;
