import { useState } from "react";

const Register = () => {
  const [state, setState] = useState({ username: "", password: "" });

  const onInputChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {};

  return (
    <form>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={state.username}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          value={state.password}
          onChange={onInputChange}
        />
      </div>
      <button onClick={onSubmit}></button>
    </form>
  );
};

export default Register;
