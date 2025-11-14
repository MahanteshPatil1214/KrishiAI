import { useState } from "react";
import { motion } from "framer-motion";
import TranslatorText from "../components/TranslatorText";

export default function FertilizerRecommendation() {
  const [form, setForm] = useState({
    crop: "",
    soil: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation("");
    try {
      const res = await fetch("http://localhost:5000/api/fertilizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setRecommendation(data.recommendation || "⚠️ No response from AI.");
    } catch (err) {
      console.error(err);
      setRecommendation("⚠️ Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-lime-100 via-green-50 to-emerald-100 flex items-center justify-center px-4 py-10">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-200 via-lime-100 to-emerald-200 opacity-80"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center mb-8">
          🧪 <TranslatorText text="Fertilizer Recommendation System" /> 🌿
        </h1>

        {recommendation && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 rounded-xl text-green-700 text-center p-4 mb-6 shadow-md"
          >
            <TranslatorText text={recommendation} />
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {[
            { name: "crop", label: "Crop Name" },
            { name: "soil", label: "Soil Type" },
            { name: "nitrogen", label: "Nitrogen Level (N)" },
            { name: "phosphorus", label: "Phosphorus Level (P)" },
            { name: "potassium", label: "Potassium Level (K)" },
          ].map((f) => (
            <div key={f.name} className="flex flex-col">
              <label
                htmlFor={f.name}
                className="font-semibold text-green-800 mb-1"
              >
                <TranslatorText text={f.label} />
              </label>
              <input
                type="text"
                id={f.name}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                required
                placeholder={`Enter ${f.label}`}
                className="border border-green-300 rounded-lg px-3 py-2 bg-white/70 focus:ring-2 focus:ring-green-500 outline-none text-green-800"
              />
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-md hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {loading ? "Analyzing ..." : "🌱 Get Recommendation"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
