import axios from "axios";

class AuthenticationService {
  executeBasicAuthenticationService(username: string, password: string) {
    return axios.get("http://localhost:8080/basicauth", {
      headers: { authorization: this.createBasicAuthToken(username, password) },
    });
  }

  createBasicAuthToken(username: string, password: string) {
    return "Basic " + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: any, password: any) {
    sessionStorage.setItem("authenticatedUser", username);
    this.setUpAxiosInterceptors(this.createBasicAuthToken(username, password));
  }

  logout() {
    sessionStorage.removeItem("authenticatedUser");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return "";
    return user;
  }

  setUpAxiosInterceptors(basicAuthHeader: any) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn()) {
        config.headers.authorization = basicAuthHeader;
      }

      return config;
    });
  }
}

export default new AuthenticationService();
