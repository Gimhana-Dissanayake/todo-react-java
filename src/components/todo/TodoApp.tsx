import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import Register from "../user/Register";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ErrorComponent from "./ErrorComponent";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import Logout from "./Logout";
import Todo from "./Todo";
import TodosList from "./TodosList";
import Welcome from "./Welcome";

const TodoApp = () => {
  return (
    <div>
      <Router>
        <UserProvider>
          <Header />
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path={"/register"} component={Register} />
            <AuthenticatedRoute path="/welcome/:name" component={Welcome} />
            <AuthenticatedRoute path="/todos/:id" component={Todo} />
            <AuthenticatedRoute path="/todos" component={TodosList} />
            <AuthenticatedRoute path="/logout" component={Logout} />
            <Route component={ErrorComponent} />
          </Switch>
          <Footer />
        </UserProvider>
      </Router>
    </div>
  );
};

export default TodoApp;
