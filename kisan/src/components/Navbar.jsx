import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const location = useLocation();
  const active = "text-yellow-300 font-semibold";
  const { language, setLanguage } = useLanguage();

  return (
    <>
      <motion.nav
        className="bg-green-700 text-white flex justify-between items-center p-4 shadow-md sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl font-bold tracking-wide">🌾 Krishi-Astra</h1>
        <div className="space-x-6 text-lg">
          <Link to="/" className={location.pathname === "/" ? active : ""}>
            Home
          </Link>
          <Link
            to="/market"
            className={location.pathname === "/market" ? active : ""}
          >
            Market
          </Link>
          <Link
            to="/ai-diary"
            className={location.pathname === "/ai-diary" ? active : ""}
          >
            AI Diary
          </Link>
          <Link
            to="/community"
            className={location.pathname === "/community" ? active : ""}
          >
            Community
          </Link>
          <select
            className="bg-green-700 p-2 rounded"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
            <option value="bn">Bengali</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
            <option value="gu">Gujarati</option>
            <option value="pa">Punjabi</option>
            <option value="ur">Urdu</option>
          </select>
        </div>
      </motion.nav>
    </>
  );
}
