import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "./styles/index.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
