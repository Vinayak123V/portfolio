import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Vinayak's AI assistant. Want to play some ambient coding music or explore the portfolio?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
    setMessages(prev => [...prev, { text: isPlaying ? "Paused music." : "Playing ambient focus music.", isBot: true }]);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = { text: inputText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");

    setTimeout(() => {
      let botResponse = "I am a simple AI assistant. You can check out the Projects section or contact Vinayak!";
      const lower = inputText.toLowerCase();
      if (lower.includes("project")) {
        botResponse = "Vinayak has worked on some cool projects! Check out the 'Projects' section in the portfolio.";
      } else if (lower.includes("skill") || lower.includes("tech")) {
        botResponse = "He's skilled in React, Node.js, Express, MongoDB, and more!";
      } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email")) {
        botResponse = "You can reach Vinayak through the Contact form or email him at vinayakhosur85@gmail.com.";
      } else if (lower.includes("music") || lower.includes("play")) {
        botResponse = "You can toggle the ambient focus music using the button below!";
      }
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-[30px] left-[30px] z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 w-80 bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-accent/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </div>
                <span className="text-foreground font-semibold text-sm">V.AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Chat Area */}
            <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3 text-sm scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`max-w-[85%] p-3 rounded-2xl ${msg.isBot ? 'bg-white/5 text-text-primary rounded-tl-none self-start' : 'bg-accent text-foreground rounded-tr-none self-end'}`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 pb-2 pt-0 flex gap-2">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-accent hover:bg-accent-light text-foreground rounded-xl transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>

            {/* Actions */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <button
                onClick={toggleMusic}
                className="flex-1 py-2 px-3 bg-white/5 hover:bg-white/10 text-foreground rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/5"
              >
                {isPlaying ? (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></>  
                ) : (
                  <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg></>
                )}
                {isPlaying ? "Pause Audio" : "Play Ambient"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-accent text-foreground flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.6)] border border-white/20 relative"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-secondary"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
