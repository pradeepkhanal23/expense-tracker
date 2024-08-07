import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //pulling the loggedIn method from our auth service
  const isLoggedIn = Auth.loggedIn();

  //if the user is not logged in , we clear the token by logging out and redirecting the user to the login/signup page
  if (!isLoggedIn) {
    Auth.logout();
    return <Navigate to="/auth" />;
  }

  //if user is logged in, we redirect the user to the dashboard page now
  return <>{children}</>;
};
export default ProtectedRoute;
