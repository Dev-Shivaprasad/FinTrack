import { createRoot } from "react-dom/client";
import "./index.css";
import Customroute from "./components/CustomRoutes.tsx";

createRoot(document.getElementsByTagName("FinTrack")[0]!).render(
  <Customroute />
);
