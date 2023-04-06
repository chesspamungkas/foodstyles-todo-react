import React from 'react';
import { useDispatch } from "react-redux";
import { todoCompleted, todoUncompleted, deleteTodo } from "../slices/todo";
import Delete from "../assets/images/delete.svg";

const TodoItem = ({id, description, completed}) => {
	const dispatch = useDispatch();
    
    const handleCheckboxClick = (e) => {       
        if (e.target.checked) {
            dispatch(todoCompleted({ id, completed: true }));
        } else {
            dispatch(todoUncompleted({ id, completed: false }));
        }
	};

	const handleDeleteClick = () => {
		dispatch(deleteTodo({id}))
	};

	return (
		<li className="list-group-item">
			<div className="d-flex justify-content-between">
				<span className="d-flex align-items-center">
					<input
						type="checkbox"
						className="check-todo"
                        checked={completed}
						onChange={handleCheckboxClick}
					></input>
                    <span style={completed?{textDecoration:"line-through"}:null}>{description}</span>
				</span>
                <img src={Delete} alt="delete todo" className="delete-img" onClick={()=>{handleDeleteClick(id)}}/>
			</div>
		</li>
	);
};

export default TodoItem;