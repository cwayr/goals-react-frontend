import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Goalpage from "./Goalpage";
import Landingpage from "./Landingpage";

function AppRoutes() {
  return (
    <div className="Routes">
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/:username" element={<Homepage />} />
        <Route path="/:username/:goal_id" element={<Goalpage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
