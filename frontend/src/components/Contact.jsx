import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import axios from "axios";
import io from "socket.io-client";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./SvgIcons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// EmailJS config — fill these from emailjs.com dashboard
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    try {
      const newSocket = io(BACKEND_URL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 3,
        timeout: 10000,
      });
      setSocket(newSocket);
      return () => newSocket.close();
    } catch (e) {
      console.warn("Socket connection failed:", e.message);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("typing-status", (data) => {
        if (data.email !== form.email) setIsTyping(data.isTyping);
      });
    }
  }, [socket, form.email]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (socket) socket.emit("typing", { email: form.email, isTyping: value.length > 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Send via EmailJS directly from browser — no backend needed
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          message:      form.message,
          to_email:     "vinayakhosur85@gmail.com",
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      // Also save to backend DB in background (non-blocking)
      axios.post(`${BACKEND_URL}/contact`, form, { timeout: 10000 }).catch(() => {});

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const contactInfo = [
    { icon: "📧", label: "Email", value: "vinayakhosur85@gmail.com" },
    { icon: "📱", label: "Phone", value: "+91 9483065328" },
    { icon: "📍", label: "Location", value: "Bengaluru, India" }
  ];

  return (
    <section id="contact" ref={ref} className="py-32 px-6 lg:px-20 relative min-h-screen overflow-hidden">
      
      {/* Background grid effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--accent-secondary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[800px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-accent-secondary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
          <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Talk</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-text-muted max-w-[600px] mx-auto font-light">
            Have a project in mind? Let's work together to create something amazing. I'm always open to discussing new projects and creative ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="group flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center text-3xl bg-background rounded-xl border border-white/10 group-hover:border-accent/50 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  {info.icon}
                </div>
                <div>
                  <div className="text-sm text-text-muted uppercase tracking-wider font-semibold mb-1">{info.label}</div>
                  <div className="text-foreground font-medium group-hover:text-accent-secondary transition-colors">{info.value}</div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8"
            >
              {[
                { href: "https://github.com/Vinayak123V", icon: <GithubIcon /> },
                { href: "https://linkedin.com", icon: <LinkedinIcon /> },
                { href: "https://twitter.com", icon: <TwitterIcon /> }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-14 h-14 flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-xl text-accent-secondary hover:bg-accent hover:text-foreground hover:border-accent hover:-translate-y-2 transition-all duration-300 shadow-lg"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {social.icon}
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent rounded-3xl border border-white/10 backdrop-blur-xl -z-10" />
            
            <form onSubmit={handleSubmit} className="p-8 lg:p-12 flex flex-col gap-8 rounded-3xl overflow-hidden">
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 text-accent-secondary text-sm font-medium"
                  >
                    <span className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-accent-secondary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-accent-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-accent-secondary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    Someone is typing...
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-background/50 border-b-2 border-white/20 px-4 py-4 text-foreground outline-none focus:border-accent-secondary transition-colors peer"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || form.name ? '-top-3 text-xs text-accent-secondary font-bold tracking-widest uppercase' : 'top-4 text-text-muted text-base'}`}>
                  Your Name
                </label>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-secondary transition-all duration-500 ${focusedField === 'name' ? 'w-full shadow-[0_0_10px_rgba(162,155,254,0.8)]' : 'w-0'}`} />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-background/50 border-b-2 border-white/20 px-4 py-4 text-foreground outline-none focus:border-accent-secondary transition-colors peer"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || form.email ? '-top-3 text-xs text-accent-secondary font-bold tracking-widest uppercase' : 'top-4 text-text-muted text-base'}`}>
                  Email Address
                </label>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-secondary transition-all duration-500 ${focusedField === 'email' ? 'w-full shadow-[0_0_10px_rgba(162,155,254,0.8)]' : 'w-0'}`} />
              </div>

              <div className="relative group mt-4">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-background/50 border-b-2 border-white/20 px-4 py-4 text-foreground outline-none focus:border-accent-secondary transition-colors resize-none peer"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || form.message ? '-top-3 text-xs text-accent-secondary font-bold tracking-widest uppercase' : 'top-4 text-text-muted text-base'}`}>
                  Message
                </label>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-secondary transition-all duration-500 ${focusedField === 'message' ? 'w-full shadow-[0_0_10px_rgba(162,155,254,0.8)]' : 'w-0'}`} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`relative w-full py-5 rounded-xl font-bold tracking-wider uppercase overflow-hidden transition-all duration-300 ${status === "sending" ? "cursor-wait" : ""}`}
              >
                <div className={`absolute inset-0 transition-opacity duration-300 ${status === 'success' ? 'opacity-100 bg-green-500' : status === 'error' ? 'opacity-100 bg-red-500' : 'opacity-0'}`} />
                <div className={`absolute inset-0 bg-gradient-to-r from-accent to-accent-secondary transition-opacity duration-300 ${status === '' || status === 'sending' ? 'opacity-100' : 'opacity-0'}`} />
                {status === '' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />}
                <span className="relative z-10 text-foreground flex items-center justify-center gap-2">
                  {status === "sending" && (
                    <svg className="animate-spin h-5 w-5 text-foreground" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {status === "success" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                  {status === "error" && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                  {status === "sending" ? "Sending..." : status === "success" ? "Transmission Successful" : status === "error" ? "Transmission Failed" : "Initialize Contact"}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Futuristic Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-40 border-t border-white/10 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold font-display text-foreground mb-2">Vinayak Hosur</h2>
          <p className="text-text-muted text-sm max-w-md">Crafting cinematic digital experiences bridging the gap between premium design and complex engineering.</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} - All rights reserved.</p>
          <p className="flex items-center gap-2">Built with <span className="text-accent animate-pulse">❤️</span> & Code</p>
        </div>
      </motion.footer>
    </section>
  );
}
