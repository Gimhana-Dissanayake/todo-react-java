import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TodoService from "../../api/todo/TodoService";
import AuthenticationService from "../services/AuthenticationService";

interface IState {
  id: string;
  username: string;
  description: string;
  targetDate: string;
  done: boolean;
}

const TodosList = () => {
  const history = useHistory();

  const [state, setState] = useState<IState[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      let username = AuthenticationService.getLoggedInUserName();
      try {
        const value = await TodoService.retrieveAllTodo(username);
        setState(value.data);
      } catch (e) {
        console.log(e.response);
        setState(e.response.data.message);
      }
    }
    fetchData();
  }, []);

  const deleteTodoClicked = async (id: string) => {
    let username = AuthenticationService.getLoggedInUserName();
    try {
      await TodoService.deleteTodo(username, id);
      setMessage(`Delete of todo ${id} successful`);
      refreshTodos();
    } catch (e) {
      console.log(e);
    }
  };

  const updateTodoClicked = (id: string) => {
    // let username = AuthenticationService.getLoggedInUserName();
    // try {
    //   await TodoService.deleteTodo(username, id);
    //   setMessage(`Delete of todo ${id} successful`);
    //   refreshTodos();
    // } catch (e) {
    //   console.log(e);
    // }
    history.push(`/todos/${id}`);
  };

  const addTodoClicked = () => {
    history.push("/todos/-1");
  };

  const refreshTodos = async () => {
    let username = AuthenticationService.getLoggedInUserName();
    try {
      const value = await TodoService.retrieveAllTodo(username);
      setState(value.data);
    } catch (e) {
      console.log(e.response);
      setState(e.response.data.message);
    }
  };

  return (
    <div>
      <div>List Todos</div>
      {message && <div className="alert alert-success">{message}</div>}

      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>Is Completed?</th>
              <th>Target Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.done.toString()}</td>
                <td>{moment(item.targetDate).format("YYYY-MM-DD")}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      updateTodoClicked(item.id);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      deleteTodoClicked(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <button
            className="btn btn-success"
            onClick={() => {
              addTodoClicked();
            }}
          >
            {" "}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodosList;
