import React from "react";
import "./style.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  // The dashboard page
  let navigates = useNavigate();

  // Handle logout function
  const handleLogout = async () => {
    await signOut(auth)
      .then((resp) => {
        toast.success("Loggout Successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.clear();

        setTimeout(() => {
          navigates("/");
        }, 5000);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <section className="main">
      <div className="box">
        <h2 className="hello-world-text">Hello World👋</h2>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
