// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function Market() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const mockData = [
//     { crop: "Wheat", price: "₹2,150 / quintal", location: "Pune" },
//     { crop: "Rice", price: "₹3,100 / quintal", location: "Nagpur" },
//     { crop: "Soybean", price: "₹4,250 / quintal", location: "Kolhapur" },
//     { crop: "Sugarcane", price: "₹3,000 / quintal", location: "Nashik" },
//   ];

//   useEffect(() => {
//     setTimeout(() => {
//       setData(mockData);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   return (
//     <section className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 flex items-center justify-center">
//       <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 text-center">
//         <motion.h1
//           className="text-4xl md:text-5xl font-extrabold text-green-800 mb-10"
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           🌾 Live Market Prices
//         </motion.h1>

//         {loading ? (
//           <p className="text-green-700 text-xl font-semibold">
//             Fetching latest data...
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {data.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition border border-green-200"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2, duration: 0.6 }}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <h2 className="text-2xl font-bold text-green-700">
//                   {item.crop}
//                 </h2>
//                 <p className="text-gray-600 mt-2 text-lg">{item.location}</p>
//                 <p className="text-green-800 mt-4 text-xl font-semibold">
//                   {item.price}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import TranslatorText from "../components/TranslatorText";

// export default function Market() {
//   const [states] = useState([
//     "Maharashtra",
//     "Karnataka",
//     "Gujarat",
//     "Madhya Pradesh",
//     "Uttar Pradesh",
//   ]);
//   const [districts, setDistricts] = useState([]);
//   const [commodities, setCommodities] = useState([]);

//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedCommodity, setSelectedCommodity] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [prices, setPrices] = useState(null);
//   const [error, setError] = useState("");

//   // Simulated backend endpoints (replace with Flask or Node later)
//   const fetchFlaskData = async (endpoint, payload) => {
//     try {
//       const res = await axios.post(endpoint, payload);
//       return res.data;
//     } catch (err) {
//       console.error("Fetch error:", err);
//       return { error: "Network error or server connection failed." };
//     }
//   };

//   const handleStateChange = async (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setSelectedDistrict("");
//     setSelectedCommodity("");
//     setDistricts([]);
//     setCommodities([]);
//     setPrices(null);

//     // Replace with actual API call
//     const data = { districts: ["Pune", "Nagpur", "Nashik"] };
//     setDistricts(data.districts);
//   };

//   const handleDistrictChange = async (e) => {
//     const district = e.target.value;
//     setSelectedDistrict(district);
//     setSelectedCommodity("");
//     setCommodities([]);
//     setPrices(null);

//     // Replace with actual API call
//     const data = { commodities: ["Wheat", "Rice", "Sugarcane"] };
//     setCommodities(data.commodities);
//   };

//   const handleCommodityChange = (e) => setSelectedCommodity(e.target.value);

//   const getPrices = async () => {
//     if (!selectedState || !selectedDistrict || !selectedCommodity) return;

//     setLoading(true);
//     setError("");
//     setPrices(null);

//     // Replace with your real API later
//     setTimeout(() => {
//       setPrices({
//         current: {
//           date: "2025-11-05",
//           modal: 2450,
//           min: 2300,
//           max: 2550,
//           unit: "Quintal",
//         },
//         previous: {
//           date: "2025-11-04",
//           modal: 2400,
//           min: 2250,
//           max: 2500,
//           unit: "Quintal",
//         },
//       });
//       setLoading(false);
//     }, 1200);
//   };

//   const formatPrice = (price) =>
//     price ? `₹ ${price.toLocaleString("en-IN")}` : "--";

//   const calculateTrend = (current, previous) => {
//     if (!current || !previous) return null;
//     const change = current - previous;
//     const percentage = ((change / previous) * 100).toFixed(2);
//     if (change > 0)
//       return { text: `▲ ${percentage}%`, color: "text-green-600" };
//     if (change < 0)
//       return { text: `▼ ${Math.abs(percentage)}%`, color: "text-red-600" };
//     return { text: "▬ No Change", color: "text-gray-600" };
//   };

//   return (
//     <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 flex items-center justify-center">
//       <TranslatorText
//         text={
//           <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-20">
//             <motion.h1
//               className="text-5xl md:text-6xl font-extrabold text-green-800 text-center mb-6"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//             >
//               🌾 Real-Time Mandi Price Tracker
//             </motion.h1>

//             <p className="text-center text-green-700 text-lg mb-10">
//               Get current and historical market prices instantly.
//             </p>

//             {/* Market Selection */}
//             <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-green-100 mb-10">
//               <h2 className="text-2xl font-bold text-green-700 border-b pb-3 mb-6 text-center">
//                 Market Selection
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* State */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Select State
//                   </label>
//                   <select
//                     value={selectedState}
//                     onChange={handleStateChange}
//                     className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
//                   >
//                     <option value="">-- Select State --</option>
//                     {states.map((s) => (
//                       <option key={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* District */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Select District / Market
//                   </label>
//                   <select
//                     value={selectedDistrict}
//                     onChange={handleDistrictChange}
//                     disabled={!districts.length}
//                     className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
//                   >
//                     <option value="">-- Select District --</option>
//                     {districts.map((d) => (
//                       <option key={d}>{d}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Commodity */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Select Commodity
//                   </label>
//                   <select
//                     value={selectedCommodity}
//                     onChange={handleCommodityChange}
//                     disabled={!commodities.length}
//                     className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
//                   >
//                     <option value="">-- Select Commodity --</option>
//                     {commodities.map((c) => (
//                       <option key={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="text-center mt-10">
//                 <button
//                   onClick={getPrices}
//                   disabled={!selectedCommodity}
//                   className="px-10 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 disabled:opacity-50 transition-all"
//                 >
//                   Get Mandi Prices
//                 </button>
//               </div>
//             </div>

//             {/* Results Section */}
//             {loading && (
//               <div className="text-center mt-10">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
//                 <p className="mt-3 text-green-700">Fetching latest prices...</p>
//               </div>
//             )}

//             {error && (
//               <div className="bg-red-100 text-red-700 text-center p-4 rounded-lg mt-10 max-w-4xl mx-auto">
//                 {error}
//               </div>
//             )}

//             {prices && !loading && (
//               <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-green-100 mt-10">
//                 <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
//                   {selectedCommodity} Price in {selectedDistrict}
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {/* Current Price */}
//                   <div className="border border-green-300 p-6 rounded-2xl bg-green-50">
//                     <h3 className="text-xl font-bold text-green-700 mb-4">
//                       🟢 Current Price ({prices.current?.date || "N/A"})
//                     </h3>
//                     <p className="text-2xl font-extrabold text-green-600">
//                       {formatPrice(prices.current?.modal)}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Min: {formatPrice(prices.current?.min)} | Max:{" "}
//                       {formatPrice(prices.current?.max)}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2">
//                       Unit: {prices.current?.unit || "Quintal"}
//                     </p>
//                   </div>

//                   {/* Previous Price */}
//                   <div className="border border-gray-300 p-6 rounded-2xl bg-gray-50">
//                     <h3 className="text-xl font-bold text-gray-700 mb-4">
//                       ⚫ Previous Day ({prices.previous?.date || "N/A"})
//                     </h3>
//                     <p className="text-2xl font-extrabold text-gray-800">
//                       {formatPrice(prices.previous?.modal)}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Min: {formatPrice(prices.previous?.min)} | Max:{" "}
//                       {formatPrice(prices.previous?.max)}
//                     </p>
//                     <p className="text-xs text-gray-500 mt-2">
//                       Unit: {prices.previous?.unit || "Quintal"}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Trend */}
//                 <div className="text-center mt-8">
//                   {calculateTrend(
//                     prices.current?.modal,
//                     prices.previous?.modal
//                   ) && (
//                     <p
//                       className={`text-lg font-bold ${
//                         calculateTrend(
//                           prices.current?.modal,
//                           prices.previous?.modal
//                         )?.color
//                       }`}
//                     >
//                       {
//                         calculateTrend(
//                           prices.current?.modal,
//                           prices.previous?.modal
//                         )?.text
//                       }
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         }
//       />
//     </section>
//   );
// }

// src/pages/Market.jsx
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TranslatorText from "../components/TranslatorText";

export default function Market() {
  const [states] = useState([
    "Maharashtra",
    "Karnataka",
    "Gujarat",
    "Madhya Pradesh",
    "Uttar Pradesh",
  ]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommodity, setSelectedCommodity] = useState("");

  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState("");

  // Simulated backend endpoints (replace with Flask or Node later)
  const fetchFlaskData = async (endpoint, payload) => {
    try {
      const res = await axios.post(endpoint, payload);
      return res.data;
    } catch (err) {
      console.error("Fetch error:", err);
      return { error: "Network error or server connection failed." };
    }
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedDistrict("");
    setSelectedCommodity("");
    setDistricts([]);
    setCommodities([]);
    setPrices(null);

    // Replace with actual API call or backend
    // Example mock:
    const data = { districts: ["Pune", "Nagpur", "Nashik"] };
    setDistricts(data.districts);
  };

  const handleDistrictChange = async (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedCommodity("");
    setCommodities([]);
    setPrices(null);

    // Replace with actual API call or backend
    const data = { commodities: ["Wheat", "Rice", "Sugarcane"] };
    setCommodities(data.commodities);
  };

  const handleCommodityChange = (e) => setSelectedCommodity(e.target.value);

  const getPrices = async () => {
    if (!selectedState || !selectedDistrict || !selectedCommodity) return;

    setLoading(true);
    setError("");
    setPrices(null);

    // Replace this with real API call; currently mocked
    setTimeout(() => {
      setPrices({
        current: {
          date: "2025-11-05",
          modal: 2450,
          min: 2300,
          max: 2550,
          unit: "Quintal",
        },
        previous: {
          date: "2025-11-04",
          modal: 2400,
          min: 2250,
          max: 2500,
          unit: "Quintal",
        },
      });
      setLoading(false);
    }, 1200);
  };

  const formatPrice = (price) =>
    price ? `₹ ${price.toLocaleString("en-IN")}` : "--";

  const calculateTrend = (current, previous) => {
    if (!current || !previous) return null;
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(2);
    if (change > 0)
      return { text: `▲ ${percentage}%`, color: "text-green-600" };
    if (change < 0)
      return { text: `▼ ${Math.abs(percentage)}%`, color: "text-red-600" };
    return { text: "▬ No Change", color: "text-gray-600" };
  };

  return (
    <section className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-16 md:py-20">
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
                <option value="">
                  <TranslatorText text="-- Select State --" />
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    <TranslatorText text={s} />
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
                disabled={!districts.length}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">
                  <TranslatorText text="-- Select District --" />
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    <TranslatorText text={d} />
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
                disabled={!commodities.length}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="">
                  <TranslatorText text="-- Select Commodity --" />
                </option>
                {commodities.map((c) => (
                  <option key={c} value={c}>
                    <TranslatorText text={c} />
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={getPrices}
              disabled={!selectedCommodity}
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
                text={`${selectedCommodity} Price in ${selectedDistrict}`}
              />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Price */}
              <div className="border border-green-300 p-6 rounded-2xl bg-green-50">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  🟢 <TranslatorText text="Current Price" /> (
                  {prices.current?.date || "N/A"})
                </h3>
                <p className="text-2xl font-extrabold text-green-600">
                  {formatPrice(prices.current?.modal)}
                </p>
                <p className="text-sm text-gray-600">
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

              {/* Previous Price */}
              <div className="border border-gray-300 p-6 rounded-2xl bg-gray-50">
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  ⚫ <TranslatorText text="Previous Price" /> (
                  {prices.previous?.date || "N/A"})
                </h3>
                <p className="text-2xl font-extrabold text-gray-800">
                  {formatPrice(prices.previous?.modal)}
                </p>
                <p className="text-sm text-gray-600">
                  <TranslatorText text="Min" />:{" "}
                  {formatPrice(prices.previous?.min)} |{" "}
                  <TranslatorText text="Max" />:{" "}
                  {formatPrice(prices.previous?.max)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  <TranslatorText text="Unit" />:{" "}
                  {prices.previous?.unit || "Quintal"}
                </p>
              </div>
            </div>

            {/* Trend */}
            <div className="text-center mt-8">
              {calculateTrend(
                prices.current?.modal,
                prices.previous?.modal
              ) && (
                <p
                  className={`text-lg font-bold ${
                    calculateTrend(
                      prices.current?.modal,
                      prices.previous?.modal
                    )?.color
                  }`}
                >
                  {calculateTrend(prices.current?.modal, prices.previous?.modal)
                    ?.text || ""}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
