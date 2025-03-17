import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./LoginPage";
import App from "../App";

export default function Customroute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
