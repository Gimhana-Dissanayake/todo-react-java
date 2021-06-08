import axios from "axios";

class TodoService {
  retrieveAllTodo(name: string) {
    return axios.get(`http://localhost:8080/users/${name}/todos`);
  }
  deleteTodo(name: string, id: string) {
    return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
  }
}

export default new TodoService();
