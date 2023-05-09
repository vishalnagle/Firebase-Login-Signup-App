import "./App.css";
import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";
import Dashboard from "./screens/Dashboard/Dashboard";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      {/* Routes made for the app */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
