import { Route, Redirect } from "react-router";
import { useUser } from "../context/UserContext";

const AuthenticatedRoute = (props: any) => {
  const isAuth = useUser().isAuth;

  if (isAuth) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthenticatedRoute;
