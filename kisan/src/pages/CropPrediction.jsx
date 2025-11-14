import { useState } from "react";
import { motion } from "framer-motion";
import TranslatorText from "../components/TranslatorText";

export default function CropPrediction() {
  const [form, setForm] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH: "",
    Rainfall: "",
  });
  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ⚙️ API call placeholder
    // Replace with your actual Flask or Node API
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setPrediction(data.prediction || "🌾 Predicted crop: Wheat");
    } catch (err) {
      console.error(err);
      setPrediction("⚠️ Server not responding. Please try again later.");
    }
  };

  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 flex items-center justify-center px-4 py-10">
      {/* Background overlay animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-200 via-lime-100 to-emerald-200 opacity-80"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 text-center mb-8">
          🌾 <TranslatorText text="Crop Recommendation System" /> 🌱
        </h1>

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 rounded-xl text-green-700 text-center p-4 mb-6 shadow-md"
          >
            <h3 className="font-bold text-lg">
              <TranslatorText text={prediction} />
            </h3>
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[
            { name: "Nitrogen", label: "Nitrogen" },
            { name: "Phosphorus", label: "Phosphorus" },
            { name: "Potassium", label: "Potassium" },
            { name: "Temperature", label: "Temperature (°C)" },
            { name: "Humidity", label: "Humidity (%)" },
            { name: "pH", label: "pH Value" },
            { name: "Rainfall", label: "Rainfall (mm)" },
          ].map((f, i) => (
            <div key={i} className="flex flex-col">
              <label
                htmlFor={f.name}
                className="font-semibold text-green-800 mb-1"
              >
                <TranslatorText text={f.label} />
              </label>
              <input
                type="number"
                step="0.1"
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

          <div className="col-span-1 md:col-span-3 flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-md hover:bg-green-700 transition-all"
            >
              🌱 <TranslatorText text="Get Recommendation" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
