import React from "react";
import { Link, useParams } from "react-router-dom";

const Welcome = () => {
  const params = useParams<{ name: string }>();
  return (
    <>
      <h1>Welcome!</h1>
      <div className="container">
        Welcome to the TODO {params.name}. You can manage you todos{" "}
        <Link to="/todos">here</Link>
      </div>
    </>
  );
};

export default Welcome;
