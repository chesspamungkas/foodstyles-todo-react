import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/todos/";

const createTodo = () => {
  return axios.post(API_URL + "create", { headers: authHeader() });
};

const markTodoCompleted = () => {
  return axios.put(API_URL + "completed/:id", { headers: authHeader() });
};

const markTodoUnCompleted = () => {
  return axios.get(API_URL + "uncompleted/:id", { headers: authHeader() });
};

const deleteTodo = () => {
    return axios.delete(API_URL + "delete/:id", { headers: authHeader() });
  };

const getListTodos = () => {
    return axios.get(API_URL + "list", { headers: authHeader() });
};

export default {
    createTodo,
    getModeratorBoard,
    markTodoCompleted,
    markTodoUnCompleted,
    deleteTodo,
    getListTodos,
};