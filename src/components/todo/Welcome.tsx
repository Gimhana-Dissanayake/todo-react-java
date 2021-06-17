import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HelloService from "../../api/todo/HelloService";

const Welcome = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const params = useParams<{ name: string }>();

  const retriveWelcomeMessage = async (name: string) => {
    // const value = await HelloService.executeHelloService();
    try {
      const value = await HelloService.executeHelloPathVariableService(name);

      setWelcomeMessage(value.data.message);
    } catch (e) {
      console.log(e.response);
      let errorMessage = "";

      if (e?.message) {
        errorMessage += e.message;
      }

      if (e?.response && e.response?.data) {
        errorMessage += e.response.data?.message;
      }

      setWelcomeMessage(errorMessage);
    }
  };

  return (
    <>
      <h1>Welcome!</h1>
      <div className="container">
        Welcome to the TODO {params.name}. You can manage you todos{" "}
        <Link to="/todos">here</Link>
      </div>
      <div className="container">
        Click here to get a customized welcome message. You can manage your
        <button
          onClick={() => {
            retriveWelcomeMessage(params.name);
          }}
          className="btn btn-success"
        >
          Get welcome message
        </button>
        <div>{welcomeMessage}</div>
      </div>
    </>
  );
};

export default Welcome;
