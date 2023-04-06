import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch  } from "react-redux";
import { listTodo } from "../slices/todo";

import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  const initFetch = useCallback(() => {
      dispatch(listTodo());
    }, [dispatch])
  
    useEffect(() => {
      initFetch()
    }, [initFetch])

	return (  
    <div className="list-group">
      {todos && todos.map((todo, index) => (
      <TodoItem key={index} id={todo.id} description={todo.description} completed={todo.completed} />
      ))}
    </div>
	);
};

export default TodoList;