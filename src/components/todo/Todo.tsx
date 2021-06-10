import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";

import TodoDataService from "../../api/todo/TodoService";
import AuthenticationService from "./../services/AuthenticationService";
import TodoService from "../../api/todo/TodoService";
import { useHistory } from "react-router-dom";

const Todo = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();

  const [state, setState] = useState({
    id: params.id,
    description: "",
    targetDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  const { description, targetDate } = state;

  const onSubmit = (values: any) => {
    let username = AuthenticationService.getLoggedInUserName();
    if (state.id === "-1") {
      TodoService.createTodo(username, {
        id: "-1",
        description: values.description,
        targetDate: values.targetDate,
      }).then(() => {
        history.push(`/todos`);
      });
    } else {
      TodoService.updateTodo(username, state.id, {
        id: state.id,
        description: values.description,
        targetDate: values.targetDate,
      }).then(() => {
        history.push(`/todos`);
      });
    }
  };

  const validate = (values: any) => {
    let errors: { description?: string; targetDate?: string } = {
      description: "",
      targetDate: "",
    };

    if (!values.description) {
      errors.description = "Enter a Description";
    } else if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter a valid Target Date";
    }

    return errors;
  };

  useEffect(() => {
    if (state.id !== "-1") {
      const username = AuthenticationService.getLoggedInUserName();
      TodoDataService.retrieveTodo(username, state.id).then((res) => {
        const data = res.data;

        setState({
          id: data.id,
          description: data.description,
          targetDate: moment(data.targetDate).format("YYYY-MM-DD"),
        });
      });
    }
  }, [state.id]);

  return (
    <div>
      {
        validate({
          description: state.description,
          targetDate: state.targetDate,
        }).description
      }
      {
        validate({
          description: state.description,
          targetDate: state.targetDate,
        }).targetDate
      }
      <h1>Todo</h1>
      <div className="container">
        <form>
          <label>Description</label>
          <input
            type="text"
            onChange={(e: any) => {
              setState({ ...state, description: e.target.value });
            }}
            value={description}
          ></input>
          <label>Date</label>
          <input
            type="date"
            onChange={(e: any) => {
              setState({ ...state, targetDate: e.target.value });
            }}
            value={targetDate}
          ></input>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              onSubmit({
                id: state.id,
                description: state.description,
                targetDate: state.targetDate,
              });
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Todo;
