import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import Market from "../pages/Market.jsx";
import AIDiary from "../pages/AIDiary.jsx";
import Community from "../pages/Community.jsx";
import CropPrediction from "../pages/CropPrediction";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/ai-diary" element={<AIDiary />} />
        <Route path="/community" element={<Community />} />
        <Route path="/crop-prediction" element={<CropPrediction />} />
      </Routes>
    </Router>
  );
}
