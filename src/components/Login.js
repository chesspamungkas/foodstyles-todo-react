import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import Logo from "../assets/images/logo.svg";

const validationSchema = Yup.object({
  email: Yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);

      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/todos");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
      });
    },
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Navigate to="/todos" />;
  }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src={Logo}
          alt="profile-img"
          className="profile-img-card"
        />
        <h1>Welcome back!</h1>
        <span>Log in to continue.</span>
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        > */}
          {/* {({ errors, touched }) => ( */}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <TextField
                  fullWidth
                  name="email"
                  type="text"
                  label="Email"
                  variant="standard"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>

              <div className="form-group">
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  variant="standard"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              
              <div className="signup">
                <a href="/signup">Don’t have an account? Sign up.</a>
              </div>

              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Login
                </button>
              </div>
            </form>
          {/* )} */}
        {/* </Formik> */}
      </div>

      {/* {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Login;