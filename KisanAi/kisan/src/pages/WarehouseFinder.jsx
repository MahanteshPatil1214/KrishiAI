import { useState } from "react";
import { motion } from "framer-motion";
import TranslatorText from "../components/TranslatorText";

export default function WarehouseFinder() {
  const [city, setCity] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Dummy warehouse data (local mock dataset)
  const DUMMY_WAREHOUSES = [
    {
      name: "Maharashtra Agri Storage Pvt Ltd",
      address: "MIDC Industrial Area, Pune",
      city: "Pune",
      state: "Maharashtra",
      total_capacity_mt: "15000",
      available_capacity_mt: "6500",
      contact_phone: "+91 98230 12345",
      source_url: "https://mahaagriwarehouse.in",
    },
    {
      name: "Bharat Agro Warehousing",
      address: "Nagpur Road, Nashik",
      city: "Nashik",
      state: "Maharashtra",
      total_capacity_mt: "10000",
      available_capacity_mt: "4200",
      contact_phone: "+91 97654 32109",
      source_url: "https://bharatagrowarehouse.in",
    },
    {
      name: "Delhi Farmers Storage Hub",
      address: "Sector 18, Noida",
      city: "Delhi",
      state: "Delhi",
      total_capacity_mt: "12000",
      available_capacity_mt: "7000",
      contact_phone: "+91 98100 55555",
      source_url: "https://delhiagrihub.in",
    },
    {
      name: "Punjab State Warehouse Corporation",
      address: "Near GT Road, Ludhiana",
      city: "Ludhiana",
      state: "Punjab",
      total_capacity_mt: "20000",
      available_capacity_mt: "8000",
      contact_phone: "+91 98765 43210",
      source_url: "https://pswc.punjab.gov.in",
    },
    {
      name: "Karnataka Farmers Cold Storage",
      address: "Mysuru Road, Bengaluru",
      city: "Bangalore",
      state: "Karnataka",
      total_capacity_mt: "13000",
      available_capacity_mt: "5000",
      contact_phone: "+91 98450 67890",
      source_url: "https://karagristorage.in",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setWarehouses([]);

    setTimeout(() => {
      const results = DUMMY_WAREHOUSES.filter((w) =>
        w.city.toLowerCase().includes(city.trim().toLowerCase())
      );

      if (results.length > 0) {
        setWarehouses(results);
      } else {
        setError("No warehouses found for this city.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 flex items-center justify-center">
      {/* 🌈 Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-200 via-lime-100 to-emerald-200 opacity-70"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* 🌿 Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 md:p-12 m-4"
      >
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 text-center mb-8">
          🏭 <TranslatorText text="Warehouse Finder" /> 📍
        </h1>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <input
            type="text"
            placeholder="Enter your city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full md:w-2/3 border border-green-400 rounded-full px-6 py-4 text-green-800 focus:ring-4 focus:ring-green-300 focus:border-green-600 outline-none shadow-sm text-lg"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Finding..." : "🔍 Find Warehouses"}
          </motion.button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600"></div>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-red-100 border border-red-400 text-red-700 text-center p-5 rounded-2xl shadow-sm"
          >
            <TranslatorText text={error} />
          </motion.div>
        )}

        {/* Results Section */}
        {!loading && warehouses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {warehouses.map((w, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-green-50 p-6 rounded-2xl border border-green-200 shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  <TranslatorText text={w.name} />
                </h3>
                <p className="text-green-700 text-sm mb-1">
                  📍 {w.address}, {w.city}, {w.state}
                </p>
                <p className="text-green-700 text-sm mb-1">
                  🏗️ Capacity: {w.total_capacity_mt} MT (Available:{" "}
                  {w.available_capacity_mt} MT)
                </p>
                <p className="text-green-700 text-sm mb-2">
                  ☎️ {w.contact_phone}
                </p>
                <a
                  href={w.source_url}
                  className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 shadow transition-all"
                >
                  🔗 <TranslatorText text="View Details" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
