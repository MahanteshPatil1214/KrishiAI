// import { useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// export default function ChatBot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: "bot",
//       text: "👋 Namaste! I'm Krishi Astra AI. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     try {
//       const res = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are Krishi Astra AI assistant helping Indian farmers.",
//             },
//             ...messages.map((m) => ({
//               role: m.sender === "user" ? "user" : "assistant",
//               content: m.text,
//             })),
//             { role: "user", content: input },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//           },
//         }
//       );

//       const botReply = res.data.choices[0].message.content;
//       setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "⚠️ Sorry, I’m having trouble connecting right now.",
//         },
//       ]);
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       console.log(import.meta.env.VITE_OPENAI_API_KEY);
//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg z-50"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         💬
//       </motion.button>
//       {/* Chat Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-24 right-6 w-80 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-green-200 z-50"
//           >
//             <div className="bg-green-600 text-white p-3 font-semibold">
//               🌿 Krishi Astra Chat
//             </div>

//             <div className="flex-1 p-3 overflow-y-auto space-y-3 h-64">
//               {messages.map((msg, i) => (
//                 <div
//                   key={i}
//                   className={`p-2 rounded-xl text-sm max-w-[80%] ${
//                     msg.sender === "user"
//                       ? "bg-gradient-to-r from-green-500 to-green-700 text-white self-end ml-auto text-right shadow-md"
//                       : i === 0
//                       ? "bg-emerald-100 text-emerald-800 font-semibold shadow-sm"
//                       : "bg-gray-100 text-gray-800 shadow-sm"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//             </div>

//             {/* Input Section */}
//             <div className="p-3 flex gap-2 border-t bg-white/60 backdrop-blur-md">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Type your question..."
//                 className="flex-1 border border-green-300 rounded-full px-3 py-2 text-sm bg-green-50 focus:bg-black focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-200 outline-none"
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//               <button
//                 onClick={sendMessage}
//                 className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 shadow-md hover:shadow-lg transition-all duration-200"
//               >
//                 Send
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! I'm Krishi Astra AI. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 🕒 Add delay to prevent rate limit (429)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are Krishi Astra AI assistant helping Indian farmers with information about crops, weather, markets, and modern techniques.",
            },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const botReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("ChatBot Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I’m having trouble connecting right now. Please try again in a few seconds.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        💬
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-green-200 z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-3 font-semibold text-center">
              🌿 Krishi Astra Chat
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 h-64 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm max-w-[80%] transition-all duration-200 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-green-700 text-white self-end ml-auto text-right shadow-md"
                      : i === 0
                      ? "bg-emerald-100 text-emerald-800 font-semibold shadow-sm"
                      : "bg-gray-100 text-gray-800 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="p-3 flex gap-2 border-t bg-white/70 backdrop-blur-md">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 border border-green-300 rounded-full px-3 py-2 text-sm bg-green-50 focus:bg-black focus:border-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-200 outline-none"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-full text-sm hover:from-green-700 hover:to-emerald-800 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
