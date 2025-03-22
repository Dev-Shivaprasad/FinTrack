import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./LoginPage";
import App from "../App";
import { DashBoardApp } from "./actualpage/DashBoardApp";

export default function Customroute() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoardApp />} />
        </Routes>
      </Router>
    </>
  );
}
