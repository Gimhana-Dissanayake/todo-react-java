import axios from "axios";
import { API_URL } from "../consts/Consts";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";

class AuthenticationService {
  executeBasicAuthenticationService(username: string, password: string) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  executeJwtAuthenticationService(
    username: string,
    password: string,
    role: string
  ) {
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password,
      role,
    });
  }

  createBasicAuthToken(username: string, password: string) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  createJWTToken(token: string) {
    return "Bearer " + token;
  }

  registerSuccessfulLogin(username: any, token: any) {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    this.setUpAxiosInterceptors(this.createJWTToken(token));
  }

  logout() {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return "";
    return user;
  }

  setUpAxiosInterceptors(token: any) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        console.log(token);
        config.headers.authorization = token;
      }

      return config;
    });
  }
}

export default new AuthenticationService();
