import React from "react";
import { ReactDOM, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = (values) => {
  const errors = {};

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
    errors.password = "Invalid password";
  }

  return errors;
};

const Login = () => {
  let navigates = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;

          localStorage.setItem("token", user.accessToken);
          formik.initialValues.email = "";
          formik.initialValues.password = "";
          toast.success("Login Successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            navigates("/dashboard");
          }, 5000);
        })
        .catch((error) => {
          const message = error.message;

          toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  const handleGoogleLogin = async () => {
    let googleAuthProvider = new GoogleAuthProvider();

    await signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        localStorage.setItem("token", res?.user?.accessToken);
        toast.success("Login Successful with Google!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          navigates("/dashboard");
        }, 5000);
      })
      .catch((error) => {
        toast.success(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <section>
        <div className="center">
          <h2>Sign In To Account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="txt_field">
              <input
                type="text"
                name="email"
                id="email"
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
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            {formik.errors.password ? (
              <small className="error-text">{formik.errors.password}</small>
            ) : null}
            {/* <div className="pass-login">Forgot Password</div> */}
            <button className="login-btn" type="submit">
              Login
            </button>
            <div className="google-text">Or sign-in using google</div>
            <button
              className="login-btn-google"
              type="button"
              onClick={handleGoogleLogin}
            >
              <GoogleIcon style={{ fontSize: "24px" }} />
            </button>
            <div className="signup_link">
              Not a member&nbsp;
              <Link to="signup">SignUp</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
