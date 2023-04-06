import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/todos/";

const createTodo = (todo) => {
  return axios.post(API_URL + "create", todo, { headers: authHeader() });
};

const markTodoCompleted = (todo) => {
  return axios.patch(API_URL + `completed/${todo.id}`, {completed: todo.completed}, { headers: authHeader() });
};

const markTodoUnCompleted = (todo) => {
  return axios.patch(API_URL + `uncompleted/${todo.id}`, {completed: todo.completed}, { headers: authHeader() });
};

const deleteTodo = (id) => {
  return axios.delete(API_URL + `delete/${id}`, { headers: authHeader() });
};

const getListTodos = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};

const filterByStatus = status => {
  return axios.get(API_URL + `filter/${status}`, { headers: authHeader() });
};

const TodoService = {
  createTodo,
  markTodoCompleted,
  markTodoUnCompleted,
  deleteTodo,
  getListTodos,
  filterByStatus
};

export default TodoService;