import axios from "axios";
import { API_URL } from "../../components/consts/Consts";

class HelloService {
  executeHelloService() {
    return axios.get(`${API_URL}/hello`);
  }
  executeHelloBeanService() {
    return axios.get(`${API_URL}/hello-bean`);
  }
  executeHelloPathVariableService(name: string) {
    return axios.get(`${API_URL}/hello-bean/path-variable/${name}`);
  }
  executeHelloErrorService() {
    return axios.get(`${API_URL}/hello-error`);
  }
}

export default new HelloService();
