import axios from "axios";
import { API_URL } from "../../components/consts/Consts";

class TodoService {
  retrieveAllTodo(name: string) {
    return axios.get(`${API_URL}/users/${name}/todos`);
  }

  retrieveTodo(name: string, id: string) {
    return axios.get(`${API_URL}/users/${name}/todos/${id}`);
  }

  deleteTodo(name: string, id: string) {
    return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
  }

  updateTodo(name: string, id: string, todo: any) {
    return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
  }

  createTodo(name: string, todo: any) {
    return axios.post(`${API_URL}/users/${name}/todos/`, todo);
  }
}

export default new TodoService();
