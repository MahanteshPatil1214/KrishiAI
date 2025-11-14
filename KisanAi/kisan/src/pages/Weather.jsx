// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import TranslatorText from "../components/TranslatorText";

// export default function Weather() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
//   const OPENCAGE_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

//   // 🌍 Auto-detect location on page load
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (pos) => {
//           const { latitude, longitude } = pos.coords;
//           const detectedCity = await getCityFromCoords(latitude, longitude);
//           if (detectedCity) {
//             setCity(detectedCity);
//             fetchWeatherByCoords(latitude, longitude);
//           } else {
//             setError("⚠️ Could not determine your location city.");
//           }
//         },
//         (err) => {
//           console.warn("Geolocation denied:", err.message);
//           setError(
//             "⚠️ Location access denied. Please enter your city manually."
//           );
//         }
//       );
//     } else {
//       setError("❌ Geolocation not supported by your browser.");
//     }
//   }, []);

//   // 🧭 Convert coordinates to city using OpenCage API
//   const getCityFromCoords = async (lat, lon) => {
//     try {
//       const res = await fetch(
//         `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_KEY}`
//       );
//       const data = await res.json();
//       if (data.results && data.results.length > 0) {
//         const components = data.results[0].components;
//         return (
//           components.city ||
//           components.town ||
//           components.village ||
//           components.county ||
//           components.state_district ||
//           null
//         );
//       }
//       return null;
//     } catch (error) {
//       console.error("OpenCage error:", error);
//       return null;
//     }
//   };

//   // 🌦️ Fetch weather by coordinates
//   const fetchWeatherByCoords = async (lat, lon) => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
//       );
//       if (!res.ok) throw new Error("Failed to fetch weather data");
//       const data = await res.json();
//       setWeather(data);

//       // Fetch forecast
//       const res2 = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
//       );
//       const forecastData = await res2.json();

//       const daily = {};
//       forecastData.list.forEach((item) => {
//         const date = item.dt_txt.split(" ")[0];
//         if (!daily[date]) daily[date] = [];
//         daily[date].push(item.main.temp);
//       });

//       const forecastArr = Object.entries(daily)
//         .slice(0, 5)
//         .map(([date, temps]) => ({
//           date,
//           temp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
//         }));

//       setForecast(forecastArr);
//     } catch (error) {
//       console.error(error);
//       setError("⚠️ Unable to fetch weather data. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌇 Manual fetch by city name
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!city.trim()) return;

//     setWeather(null);
//     setForecast([]);
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${WEATHER_KEY}&units=metric`
//       );
//       if (!res.ok) throw new Error("City not found");
//       const data = await res.json();
//       setWeather(data);
//       fetchWeatherByCoords(data.coord.lat, data.coord.lon);
//     } catch {
//       setError("⚠️ City not found or invalid API key.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative w-screen min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-lime-100 flex items-center justify-center px-4 py-10 overflow-hidden">
//       {/* Animated Background */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-sky-200 via-green-100 to-lime-200 opacity-70"
//         animate={{
//           backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//         }}
//         transition={{ duration: 20, ease: "linear", repeat: Infinity }}
//         style={{ backgroundSize: "200% 200%" }}
//       />

//       {/* Main Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 text-center"
//       >
//         <h1 className="text-5xl font-extrabold text-green-700 mb-6">
//           🌤️ <TranslatorText text="Weather Forecast" />
//         </h1>

//         {/* City Input */}
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
//         >
//           <input
//             type="text"
//             placeholder="Enter your city name"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="flex-1 border border-green-400 rounded-full px-4 py-3 text-green-800 focus:ring-2 focus:ring-green-500 outline-none"
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             disabled={loading}
//             type="submit"
//             className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-200 disabled:opacity-60"
//           >
//             {loading ? "Fetching..." : "🔍 Get Weather"}
//           </motion.button>
//         </form>

//         {/* Error Display */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl font-medium"
//           >
//             <TranslatorText text={error} />
//           </motion.div>
//         )}

//         {/* Current Weather */}
//         {weather && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="mt-8 bg-green-50 border border-green-300 rounded-2xl p-6 shadow-inner"
//           >
//             <h2 className="text-2xl font-bold text-green-800 mb-2">
//               <TranslatorText text={weather.name} />, {weather.sys.country}
//             </h2>
//             <p className="text-green-700 text-lg">
//               🌡️ <TranslatorText text="Temperature" />: {weather.main.temp}°C
//             </p>
//             <p className="text-green-700 text-lg">
//               💧 <TranslatorText text="Humidity" />: {weather.main.humidity}%
//             </p>
//             <p className="text-green-700 text-lg">
//               🌬️ <TranslatorText text="Wind Speed" />: {weather.wind.speed} m/s
//             </p>
//             <p className="text-green-700 text-lg capitalize">
//               ☁️ <TranslatorText text="Condition" />:{" "}
//               {weather.weather[0].description}
//             </p>
//           </motion.div>
//         )}

//         {/* 5-Day Forecast Chart */}
//         {forecast.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="mt-10 bg-white p-6 rounded-2xl shadow-inner"
//           >
//             <h3 className="text-2xl font-semibold text-green-800 mb-4">
//               <TranslatorText text="5-Day Temperature Trend" />
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={forecast}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="temp"
//                   stroke="#16a34a"
//                   strokeWidth={3}
//                   dot={{ r: 6 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </motion.div>
//         )}
//       </motion.div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import TranslatorText from "../components/TranslatorText";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const OPENCAGE_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  // 🌍 Auto-detect location and city using OpenCage
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const detectedCity = await getCityFromCoords(latitude, longitude);
          if (detectedCity) {
            setCity(detectedCity);
            fetchWeatherByCoords(latitude, longitude);
          } else {
            setError("⚠️ Could not determine your exact city location.");
          }
        },
        (err) => {
          console.warn("Geolocation denied:", err.message);
          setError(
            "⚠️ Location access denied. Please enter your city manually."
          );
        }
      );
    } else {
      setError("❌ Geolocation not supported by your browser.");
    }
  }, []);

  // 🧭 Convert lat/lon to city name via OpenCage API
  const getCityFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_KEY}`
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        const components = data.results[0].components;
        return (
          components.city ||
          components.town ||
          components.village ||
          components.county ||
          components.state_district ||
          null
        );
      }
      return null;
    } catch (error) {
      console.error("OpenCage error:", error);
      return null;
    }
  };

  // 🌦️ Fetch weather + fixed forecast logic
  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      setWeather(data);

      // Forecast
      const res2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
      );
      const forecastData = await res2.json();

      // 🌍 Convert UTC → local day
      const toLocalDate = (utcStr) => {
        const local = new Date(utcStr);
        return local.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      };

      // Group by day and average
      const daily = {};
      forecastData.list.forEach((item) => {
        const localDate = toLocalDate(item.dt_txt);
        if (!daily[localDate]) daily[localDate] = [];
        daily[localDate].push(item.main.temp);
      });

      const forecastArr = Object.entries(daily)
        .slice(0, 5)
        .map(([date, temps]) => ({
          date,
          temp: parseFloat(
            (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
          ),
        }));

      setForecast(forecastArr);
    } catch (error) {
      console.error(error);
      setError("⚠️ Unable to fetch weather data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // 🌇 Fetch by manual city entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setWeather(null);
    setForecast([]);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${WEATHER_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
      fetchWeatherByCoords(data.coord.lat, data.coord.lon);
    } catch {
      setError("⚠️ City not found or invalid API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-screen min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-lime-100 flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sky-200 via-green-100 to-lime-200 opacity-70"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 text-center"
      >
        <h1 className="text-5xl font-extrabold text-green-700 mb-6">
          🌤️ <TranslatorText text="Weather Forecast" />
        </h1>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <input
            type="text"
            placeholder="Enter your city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 border border-green-400 rounded-full px-4 py-3 text-green-800 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Fetching..." : "🔍 Get Weather"}
          </motion.button>
        </form>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl font-medium"
          >
            <TranslatorText text={error} />
          </motion.div>
        )}

        {/* Current Weather */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-green-50 border border-green-300 rounded-2xl p-6 shadow-inner"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              <TranslatorText text={weather.name} />, {weather.sys.country}
            </h2>
            <p className="text-green-700 text-lg">
              🌡️ <TranslatorText text="Temperature" />: {weather.main.temp}°C
            </p>
            <p className="text-green-700 text-lg">
              💧 <TranslatorText text="Humidity" />: {weather.main.humidity}%
            </p>
            <p className="text-green-700 text-lg">
              🌬️ <TranslatorText text="Wind Speed" />: {weather.wind.speed} m/s
            </p>
            <p className="text-green-700 text-lg capitalize">
              ☁️ <TranslatorText text="Condition" />:{" "}
              {weather.weather[0].description}
            </p>
          </motion.div>
        )}

        {/* 5-Day Forecast Chart */}
        {forecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 bg-white p-6 rounded-2xl shadow-inner"
          >
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              <TranslatorText text="5-Day Temperature Trend" />
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
