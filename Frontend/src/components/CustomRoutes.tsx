import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./LoginPage";
import App from "../App";
import { NavSidebar } from "./actualpage/Sidebar";

export default function Customroute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/dashboard" element={<NavSidebar />} />
      </Routes>
    </Router>
  );
}
