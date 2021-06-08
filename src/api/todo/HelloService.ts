import axios from "axios";

class HelloService {
  executeHelloService() {
    return axios.get("http://localhost:8080/hello");
  }
  executeHelloBeanService() {
    return axios.get("http://localhost:8080/hello-bean");
  }
  executeHelloPathVariableService(name: string) {
    return axios.get(`http://localhost:8080/hello-bean/path-variable/${name}`);
  }
  executeHelloErrorService() {
    return axios.get("http://localhost:8080/hello-error");
  }
}

export default new HelloService();
