import axios from "axios";
import { useState } from "react";
import { API_URL } from "../consts/Consts";

const Register = () => {
  const [state, setState] = useState({ username: "", password: "" });

  const onInputChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    axios
      .post(`${API_URL}/register`, {
        id: null,
        username: state.username,
        password: state.password,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((e: any) => {});
  };

  return (
    <div>
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
      <button onClick={onSubmit}>Register</button>
    </div>
  );
};

export default Register;
