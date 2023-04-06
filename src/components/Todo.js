import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import TodoAdd from './TodoAdd';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';

function Todo() {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <TodoAdd />
            <TodoList />
            <TodoFilter />
        </div>
    )

}
export default Todo;