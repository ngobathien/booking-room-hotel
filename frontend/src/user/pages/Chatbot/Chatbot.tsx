// import React, { useState } from "react";
// import axios from "axios";
// import { MessageSquare, Send, X, Loader2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", parts: [{ text: input }] };
//     setMessages((prev) => [...prev, { text: input, isUser: true }]);
//     setInput("");
//     setLoading(true);

//     try {
//       // Gọi đến Backend NestJS của bạn
//       const res = await axios.post("http://localhost:3000/api/chat/ask", {
//         message: input,
//         history: messages.map((m) => ({
//           role: m.isUser ? "user" : "model",
//           parts: [{ text: m.text }],
//         })),
//       });

//       setMessages((prev) => [...prev, { text: res.data.text, isUser: false }]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Lỗi kết nối server!", isUser: false },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-5 right-5 z-50">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-80 h-96 bg-white shadow-2xl rounded-t-2xl flex flex-col border"
//           >
//             <div className="p-4 bg-blue-600 text-white flex justify-between rounded-t-2xl">
//               <span className="font-bold">AI Assistant</span>
//               <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-2">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`p-2 rounded-lg text-sm ${m.isUser ? "bg-blue-100 ml-auto" : "bg-gray-100 mr-auto"}`}
//                 >
//                   {m.text}
//                 </div>
//               ))}
//               {loading && (
//                 <Loader2 className="animate-spin text-blue-600 mx-auto" />
//               )}
//             </div>

//             <div className="p-2 border-t flex gap-2">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSend()}
//                 className="flex-1 border rounded px-2 py-1 text-sm outline-none"
//                 placeholder="Hỏi gì đó..."
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-blue-600 text-white p-2 rounded"
//               >
//                 <Send size={16} />
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
//       >
//         <MessageSquare />
//       </button>
//     </div>
//   );
// };

// export default Chatbot;
