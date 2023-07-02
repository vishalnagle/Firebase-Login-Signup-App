import "./App.css";
import Login from "./screens/Login/Login";
import SignUp from "./screens/SignUp/SignUp";
import Dashboard from "./screens/Dashboard/Dashboard";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import SolveArr from "./SolveArr";
import Dflex from "./DFlex/DFlex";
import Test from "./classComponents/Test/Test";
import Crud from "./classComponents/CRUD/Crud";

function App() {
  return (
    <div className="App">
      {/* Routes made for the app */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/arr" element={<SolveArr/>}/>
        <Route path="/dflex" element={<Dflex/>}/>
        <Route path="/test" element={<Test myname={"Rinku Nagle"} age={26}/>}/>
        <Route path="/crud" element={<Crud/>}/>
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
