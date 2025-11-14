import { motion } from "framer-motion";
import farmer from "../assets/farmer.png";
import TranslatorText from "../components/TranslatorText";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const features = [
    {
      title: "AI Farming Diary",
      desc: "Get daily personalized farming insights and reminders powered by machine learning.",
      icon: "🤖",
    },
    {
      title: "Live Market Rates",
      desc: "Track real-time mandi prices and sell your crops at the best time.",
      icon: "📈",
    },
    {
      title: "Weather Alerts",
      desc: "Plan your farming activities with accurate weather forecasts.",
      icon: "⛅",
    },
    {
      title: "Crop Disease Detection",
      desc: "Upload crop photos to detect diseases instantly using AI.",
      icon: "🧠",
    },
    {
      title: "Community Forum",
      desc: "Connect with other farmers, share experiences, and learn from experts.",
      icon: "👥",
    },
    {
      title: "Crop Recommendation",
      desc: "Get AI-based crop suggestions based on soil nutrients, temperature, rainfall, and pH.",
      icon: "🌾",
      link: "/crop-prediction", // internal route
    },

    {
      title: "Government Schemes",
      desc: "Stay informed about latest subsidies and agricultural policies.",
      icon: "🏛️",
      link: "https://schemes.vikaspedia.in/viewcontent/schemesall/schemes-for-farmers?lgn=en",
    },
  ];

  return (
    <section className="w-screen min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-lime-100">
      {/* 🧭 HERO SECTION */}
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-[1280px] mx-auto px-6 py-20 md:py-28">
        {/* Text */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 leading-tight">
            🌱 Krishi Astra <br />
            <span className="text-lime-600">
              <TranslatorText text="Empowering Farmers with AI & Innovation" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-green-700 max-w-md mx-auto md:mx-0">
            <TranslatorText text="Revolutionizing Indian agriculture through AI-powered insights, smart market analysis, and personalized crop care." />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/market"
              className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all duration-300"
            >
              🌾 <TranslatorText text="Explore Market" />
            </a>

            <a
              href="/ai-diary"
              className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-100 transition-all duration-300"
            >
              🤖 <TranslatorText text="Try AI Diary" />
            </a>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.4, ease: "easeInOut" }}
        >
          <motion.img
            src={farmer}
            alt="Farmer illustration"
            className="w-80 md:w-[420px] drop-shadow-2xl"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* 🌿 FEATURES SECTION */}
      <div className="bg-white py-20 px-6 md:px-16 rounded-t-3xl shadow-inner">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-10">
          <TranslatorText text="Our Key Features" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {f.link ? (
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-green-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all border border-green-100 text-center hover:bg-green-100"
                >
                  <div className="text-5xl mb-4">{f.icon}</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    <TranslatorText text={f.title} />
                  </h3>
                  <p className="text-green-700 mb-2">
                    <TranslatorText text={f.desc} />
                  </p>
                  <span className="inline-block mt-2 text-green-700 font-semibold hover:text-green-800">
                    🔗 <TranslatorText text="View Schemes" />
                  </span>
                </a>
              ) : (
                <div className="bg-green-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all border border-green-100 text-center">
                  <div className="text-5xl mb-4">{f.icon}</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    <TranslatorText text={f.title} />
                  </h3>
                  <p className="text-green-700">
                    <TranslatorText text={f.desc} />
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🌾 MISSION SECTION */}
      <motion.div
        className="py-24 bg-gradient-to-r from-green-100 to-lime-100 text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-extrabold text-green-800 mb-6">
          <TranslatorText text="Why Choose Krishi Astra?" />
        </h2>
        <p className="text-lg text-green-700 max-w-3xl mx-auto">
          <TranslatorText text="We combine the power of artificial intelligence with agricultural expertise to make farming smarter, sustainable, and more profitable for every Indian farmer." />
        </p>
      </motion.div>

      {/* 🌟 CTA SECTION */}
      <motion.div
        className="bg-green-700 text-white text-center py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          <TranslatorText text="Join the Future of Smart Farming" />
        </h2>
        <p className="text-lg mb-8">
          <TranslatorText text="Sign up today and be part of India’s Agri-Tech Revolution." />
        </p>
        <a
          href="/signup"
          className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:bg-lime-100 transition-all"
        >
          🚀 <TranslatorText text="Get Started" />
        </a>
      </motion.div>

      {/* 💬 ChatBot */}
      <ChatBot />
    </section>
  );
}
