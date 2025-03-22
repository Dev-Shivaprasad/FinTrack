import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoginPage from "./LoginPage";
import App from "../App";
import { DashBoardApp } from "./actualpage/DashBoardApp";
import Theme from "./Theme";

export default function Customroute() {
  return (
    <>
      <Theme className="absolute top-10 flex w-full  items-center justify-center z-30 " />

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
