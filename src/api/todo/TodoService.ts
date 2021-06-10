import axios from "axios";

class TodoService {
  retrieveAllTodo(name: string) {
    return axios.get(`http://localhost:8080/users/${name}/todos`);
  }

  retrieveTodo(name: string, id: string) {
    return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
  }

  deleteTodo(name: string, id: string) {
    return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
  }

  updateTodo(name: string, id: string, todo: any) {
    return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
  }

  createTodo(name: string, todo: any) {
    return axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
  }
}

export default new TodoService();
