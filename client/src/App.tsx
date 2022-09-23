import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NewSkill from "./pages/NewSkill";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addskill" element={<NewSkill />} />
      </Routes>
    </>
  );
}

export default App;
