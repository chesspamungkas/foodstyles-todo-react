import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import TodoService from "../services/todo.service";

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (payload, thunkAPI) => {
    try {
      const response = await TodoService.createTodo(payload);
      const todo = response.data;
      return { todo };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const todoCompleted = createAsyncThunk(
  "todos/todoCompleted",
  async (payload, thunkAPI) => {
    try {
      const response = await TodoService.markTodoCompleted(payload);
      const todo = response.data;
      return { todo };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const todoUncompleted = createAsyncThunk(
  "todos/todoUncompleted",
  async (payload, thunkAPI) => {
    try {
      const response = await TodoService.markTodoUnCompleted(payload);
      const todo = response.data;
      return { todo };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      const response = await TodoService.deleteTodo(payload.id);
      if(response.status === 200) {
        return { id: payload.id };
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const listTodo = createAsyncThunk(
  "todos/listTodo",
  async (thunkAPI) => {
    try {
      const response = await TodoService.getListTodos();
      const todos = response.data;
      return {todos};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const filterByStatus = createAsyncThunk(
  "todos/filterByStatus",
  async (payload) => {
    const response = await TodoService.filterByStatus(payload);
    return response.data;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    toggleTodo(state, action) {
      const toggleTodoItem = state.todo.find(
        (item) => item.id === action.payload.id
      );
      toggleTodoItem.completed = !toggleTodoItem.completed;
    },
    filterBy(state, action) {
      state.todo.filterBy = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
        state.push(action.payload.todo);
    })
    builder.addCase(todoCompleted.fulfilled, (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === parseInt(action.payload.todo.id)
      );
      state[index].completed = action.payload.todo.completed;
    })
    builder.addCase(todoUncompleted.fulfilled, (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === parseInt(action.payload.todo.id)
      );
      state[index].completed = action.payload.todo.completed;
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    })
    builder.addCase(listTodo.fulfilled, (state, action) => {
      return action.payload.todos;
    })
    builder.addCase(filterByStatus.fulfilled, (state, action) => {
      return [...action.payload];
    })
  }
});


export const { addTodo, toggleComplete } = todoSlice.actions;

export default todoSlice.reducer;

