import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// Signup page

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length > 10) {
    errors.username = "Must be 10 characters or less";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
      values.password
    )
  ) {
    errors.password =
      "Password should should be atleast 8 characters contains numbers,symbols,smallcase and uppercase";
  }

  if (!values.conPassword) {
    errors.conPassword = "Confirm password is required";
  } else if (values.password !== values.conPassword) {
    errors.conPassword = "Password don't match";
  }

  return errors;
};

const SignUp = () => {
  const navigates = useNavigate();

  // formik for form validations

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      conPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;

          toast.success("Account Created Successfully Please Login", {
            position: toast.POSITION.TOP_RIGHT,
          });
          formik.initialValues.username = "";
          formik.initialValues.email = "";
          formik.initialValues.password = "";
          formik.initialValues.conPassword = "";

          setTimeout(() => {
            navigates("/");
          }, 7000);
        })
        .catch((error) => {
          const code = error.code;
          const message = error.message;
          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <section>
        <div className="center">
          <h2>Create Account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />

              <label htmlFor="username">Username</label>
            </div>
            {formik.errors.username ? (
              <small className="error-text">{formik.errors.username}</small>
            ) : null}
            <div className="txt_field">
              <input
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            {formik.errors.email ? (
              <small className="error-text">{formik.errors.email}</small>
            ) : null}
            <div className="txt_field">
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            {formik.errors.password ? (
              <small className="error-text">{formik.errors.password}</small>
            ) : null}
            <div className="txt_field">
              <input
                type="password"
                id="conPassword"
                name="conPassword"
                value={formik.values.conPassword}
                onChange={formik.handleChange}
              />
              <label htmlFor="conPassword">Confirm Password</label>
            </div>
            {formik.errors.conPassword ? (
              <small className="error-text">{formik.errors.conPassword}</small>
            ) : null}
            <button type="submit" className="signup-btn">
              Sign Up
            </button>

            <div className="signup_link">
              Already created account &nbsp;
              <Link to="/">Sign In</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
