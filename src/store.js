import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import todoReducer from "./slices/todo";
import messageReducer from "./slices/message";

const reducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
  message: messageReducer
});

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;