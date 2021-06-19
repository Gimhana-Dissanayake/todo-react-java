import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthenticationService from "../services/AuthenticationService";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    hasLoginFailed: false,
    showSuccessMsg: false,
  });

  const handleOnChange = (e: any) => {
    setState((pS) => ({ ...pS, [e.target.name]: e.target.value }));
  };

  const updatePreviousSt = (args: any) => {
    setState((pS) => ({ ...pS, ...args }));
  };

  const { login } = useUser();

  return (
    <>
      <ShowMessage
        hasLoginFailed={state.hasLoginFailed}
        showSuccessMsg={state.showSuccessMsg}
        username={state.username}
      />
      <div className="container">
        <label>User Name: </label>{" "}
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleOnChange}
        />
        <label>Password: </label>{" "}
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleOnChange}
        />
        <button
          className="btn btn-success"
          onClick={() => {
            //   AuthenticationService.executeBasicAuthenticationService(
            //     state.username,
            //     state.password
            //   )
            //     .then(() => {
            //       login({ username: state.username, password: state.password });

            //       updatePreviousSt({
            //         showSuccessMsg: true,
            //         hasLoginFailed: false,
            //       });
            //     })
            //     .catch(() => {
            //       setState((pS) => ({
            //         ...pS,
            //         showSuccessMsg: false,
            //         hasLoginFailed: true,
            //       }));
            //     });
            // }

            AuthenticationService.executeJwtAuthenticationService(
              state.username,
              state.password
            )
              .then((response) => {
                console.log(response);

                login({ username: state.username, token: response.data.token });

                updatePreviousSt({
                  showSuccessMsg: true,
                  hasLoginFailed: false,
                });
              })
              .catch(() => {
                setState((pS) => ({
                  ...pS,
                  showSuccessMsg: false,
                  hasLoginFailed: true,
                }));
              });
          }}
        >
          Login
        </button>
      </div>
    </>
  );
};

const ShowMessage = (props: {
  hasLoginFailed: boolean;
  showSuccessMsg: boolean;
  username: string;
}) => {
  if (!(props.hasLoginFailed || props.showSuccessMsg)) {
    return <div></div>;
  } else if (props.hasLoginFailed) {
    return <div className="alert alert-warning">Invalid Credentials</div>;
  } else {
    return <Redirect to={`/welcome/${props.username}`} />;
  }
};

export default Login;
