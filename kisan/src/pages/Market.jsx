// src/pages/Market.jsx (Connected to Flask Backend)
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TranslatorText from "../components/TranslatorText"; // Assuming this component exists

// Define the base URL for the Flask backend
// Ensure your Flask server is running on this address!
const FLASK_API_BASE_URL = "http://127.0.0.1:5000/api";

export default function Market() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");

  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  // --- Initial State Fetch (New useEffect) ---
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get(`${FLASK_API_BASE_URL}/get_states`);
        setStates(res.data.states || []);
      } catch (err) {
        console.error("Error fetching initial states:", err);
        setError("Failed to load initial states. Check Flask server connection.");
      }
    };
    fetchStates();
  }, []);

  // --- Handlers Connected to Flask API ---

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");
    setSelectedCommodity("");
    setDistricts([]);
    setCommodities([]);
    setPrices(null);
    setError("");

    if (!state) return;

    setLoading(true);
    try {
      const res = await axios.post(`${FLASK_API_BASE_URL}/get_districts`, { state });
      setDistricts(res.data.districts || []);
    } catch (err) {
      console.error("Error fetching districts:", err);
      setError("Failed to load districts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = async (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCommodity("");
    setCommodities([]);
    setPrices(null);
    setError("");

    if (!district) return;

    setLoading(true);
    try {
      const res = await axios.post(`${FLASK_API_BASE_URL}/get_commodities`, {
        state: selectedState,
        district: district,
      });
      setCommodities(res.data.commodities || []);
    } catch (err) {
      console.error("Error fetching commodities:", err);
      setError("Failed to load commodities.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommodityChange = (e) => setSelectedCommodity(e.target.value);

  const getPrices = async () => {
    if (!selectedState || !selectedDistrict || !selectedCommodity) return;

    setLoading(true);
    setError("");
    setPrices(null);

    try {
      // *** THIS IS THE LIVE API CALL ***
      const res = await axios.post(`${FLASK_API_BASE_URL}/get_prices`, {
        state: selectedState,
        district: selectedDistrict,
        commodity: selectedCommodity,
      });

      if (res.data.error) {
        setError(res.data.error);
        setPrices(null);
      } else {
        setPrices(res.data);
      }
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError("API Request failed. Ensure your Flask server is running and accessible.");
    } finally {
      setLoading(false);
    }
  };

  // --- Formatting and Trend Logic ---

  const formatPrice = (price) =>
    price ? `₹ ${price.toLocaleString("en-IN")}` : "--";

  const calculateTrend = (change) => {
    if (!change || change.status === "N/A" || change.amount === 0) return null;
    
    const percentage = Math.abs(change.percent).toFixed(2);
    
    if (change.status === "UP")
      return { text: `▲ ${percentage}%`, color: "text-green-600" };
    if (change.status === "DOWN")
      return { text: `▼ ${percentage}%`, color: "text-red-600" };
    return { text: "▬ No Change", color: "text-gray-600" };
  };

  // --- Render UI ---
  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-20">
        {/* Title and Subtitle */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-green-800 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🌾 <TranslatorText text="Real-Time Mandi Price Tracker" />
        </motion.h1>

        <p className="text-center text-green-700 text-lg mb-10">
          <TranslatorText text="Get current and historical market prices instantly." />
        </p>

        {/* Market Selection */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-green-100 mb-10">
          <h2 className="text-2xl font-bold text-green-700 border-b pb-3 mb-6 text-center">
            <TranslatorText text="Market Selection" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TranslatorText text="Select State" />
              </label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
              >
                {/* Fixed option nesting issue: TranslatorText wraps the whole option label */}
                <option value="">
                  -- <TranslatorText text="Select State" /> --
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s} {/* Only plain text inside <option> */}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TranslatorText text="Select District / Market" />
              </label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedState || loading}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">
                  -- <TranslatorText text="Select District" /> --
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Commodity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TranslatorText text="Select Commodity" />
              </label>
              <select
                value={selectedCommodity}
                onChange={handleCommodityChange}
                disabled={!selectedDistrict || loading}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">
                  -- <TranslatorText text="Select Commodity" /> --
                </option>
                {commodities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={getPrices}
              disabled={!selectedCommodity || loading}
              className="px-10 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 disabled:opacity-50 transition-all"
            >
              <TranslatorText text="Get Mandi Prices" />
            </button>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="text-center mt-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-3 text-green-700">
              <TranslatorText text="Fetching latest prices..." />
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 text-center p-4 rounded-lg mt-10 max-w-4xl mx-auto">
            {error}
          </div>
        )}

        {prices && !loading && (
          <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-green-100 mt-10">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              <TranslatorText
                text={`${prices.commodity} Price in ${prices.district}`}
              />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Price (Modal) */}
              <div className="border border-green-300 p-6 rounded-2xl bg-green-50">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  🟢 <TranslatorText text="Modal Price" /> ({prices.current?.date || "N/A"})
                </h3>
                <p className="text-4xl font-extrabold text-green-600">
                  {formatPrice(prices.current?.modal)}
                </p>
                {prices.change && calculateTrend(prices.change) && (
                  <p className={`text-lg font-bold mt-2 ${calculateTrend(prices.change)?.color}`}>
                    {calculateTrend(prices.change).text} 
                    <span className="text-sm text-gray-600 ml-2"> vs previous day</span>
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-4">
                  <TranslatorText text="Min" />:{" "}
                  {formatPrice(prices.current?.min)} |{" "}
                  <TranslatorText text="Max" />:{" "}
                  {formatPrice(prices.current?.max)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <TranslatorText text="Unit" />:{" "}
                  {prices.current?.unit || "Quintal"}
                </p>
              </div>

              {/* District Price Range */}
              <div className="border border-blue-300 p-6 rounded-2xl bg-blue-50">
                <h3 className="text-xl font-bold text-blue-700 mb-4">
                  📊 <TranslatorText text="District Price Range" />
                </h3>
                <p className="text-2xl font-extrabold text-blue-600">
                  {formatPrice(prices.range?.min_district)} 
                  <span className="text-xl font-normal text-gray-600"> to </span>
                  {formatPrice(prices.range?.max_district)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <TranslatorText text="Highest price recorded in" /> {prices.district} 
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <TranslatorText text="Data collected across different markets and dates." />
                </p>
              </div>
            </div>
            
            {/* Competitive Markets */}
            {prices.competitive_markets && prices.competitive_markets.length > 0 && (
                <div className="mt-10 pt-6 border-t border-green-100">
                    <h3 className="text-2xl font-bold text-green-700 mb-5 text-center">
                        💰 <TranslatorText text="Competitive Markets in" /> {prices.state}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {prices.competitive_markets.map((market, index) => (
                            <div 
                                key={index} 
                                className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-md text-center"
                            >
                                <p className="text-lg font-semibold text-yellow-800">
                                    {formatPrice(market.modal)}
                                </p>
                                <p className="text-sm text-gray-700 mt-1">
                                    {market.market}
                                </p>
                                <p className="text-xs text-gray-500">
                                    ({market.district})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}