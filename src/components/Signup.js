import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import TextField from '@mui/material/TextField';
import * as Yup from "yup";

import { signup } from "../slices/auth";
import { clearMessage } from "../slices/message";
import Logo from "../assets/images/logo.svg";

const validationSchema = Yup.object({
  name: Yup.string()
    .test(
      "len",
      "The name must be at least 3 characters",
      (val) =>
        val && val.toString().length >= 3
    )
    .required("This field is required"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("This field is required"),
  password: Yup.string()
    .test(
      "len",
      "Password should be of minimum 8 characters length",
      (val) =>
        val && val.toString().length >= 8
    )
    .required("This field is required"),
});

const Signup = () => {
  const navigate = useNavigate();

  const [successful, setSuccessful] = useState(false);

  const { isSignedUp } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;
      setSuccessful(false);

      dispatch(signup({ name, email, password }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
          navigate("/todos");
          window.location.reload();
        })
        .catch(() => {
          setSuccessful(false);
      });
    },
  })

  // const handleSignup = (formValue) => {
  //   const { name, email, password } = formValue;

  //   setSuccessful(false);

  //   dispatch(signup({ name, email, password }))
  //     .unwrap()
  //     .then(() => {
  //       setSuccessful(true);
  //     })
  //     .catch(() => {
  //       setSuccessful(false);
  //     });
  // };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isSignedUp) {
    return <Navigate to="/todos" />;
  }

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src={Logo}
          alt="profile-img"
          className="profile-img-card"
        />
        <h1>Welcome!</h1>
        <span>Sign up to start using Simpledo today.</span>
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched }) => ( */}
             <form onSubmit={formik.handleSubmit}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <TextField
                      fullWidth
                      name="name"
                      type="text"
                      label="Full Name"
                      variant="standard"
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
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
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </div>

                  <div className="signin">
                    <a href="/login">Do have an account? Sign in.</a>
                  </div>

                  <div className="form-group mt-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </form>
          {/* )}
        </Formik> */}
      </div>

      {/* {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Signup;