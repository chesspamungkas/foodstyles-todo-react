import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

import { createTodo } from "../slices/todo";
import { clearMessage } from "../slices/message";
import Logo from "../assets/images/logo.svg";

const validationSchema = Yup.object({
  todo: Yup.string()
    .required('Todo is required')
});

const TodoAdd = () => {
  // const [setTodo] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      todo: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { todo } = values;
      if(todo.trim() === ''){
        return;
      } else {
        dispatch(createTodo({
					description: todo,
          completed: false
				}))
        .unwrap()
      }
    },
  });

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      event.target.value = '';
    }
  }

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return(
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src={Logo}
          alt="profile-img"
          className="profile-img-card"
        />
        <h1>Todo List</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <TextField
              fullWidth
              name="todo"
              type="text"
              label="Add a new todo"
              variant="standard"
              onChange={formik.handleChange}
              onKeyDown={handleKeyPress}
              error={formik.touched.todo && Boolean(formik.errors.todo)}
              helperText={formik.touched.todo && formik.errors.todo}
            />
          </div>
          <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary w-100" style={{display:'none'}}>
                Submit
          </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default TodoAdd;