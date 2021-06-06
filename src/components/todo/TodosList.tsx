import { useState } from "react";

const TodosList = () => {
  const [state] = useState({
    todos: [
      {
        id: 1,
        description: "Learn React",
        done: false,
        targetDate: new Date(),
      },
      {
        id: 2,
        description: "Learn Angular",
        done: false,
        targetDate: new Date(),
      },
      { id: 3, description: "Learn Java", done: false, targetDate: new Date() },
    ],
  });

  return (
    <div>
      <div>List Todos</div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>Is Completed?</th>
              <th>Target Date</th>
            </tr>
          </thead>
          <tbody>
            {state.todos.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>{item.done.toString()}</td>
                <td>{item.targetDate.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodosList;
