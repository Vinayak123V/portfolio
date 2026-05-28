require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const nodemailer = require("nodemailer");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Health check — used by frontend to wake the server on cold start
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vinayakhosur85@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

mongoose.connect("mongodb+srv://system:Vinu%40123@cluster0.qpnmqit.mongodb.net/portfolio_website")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.warn("MongoDB connection failed (emails will still work):", err.message));

const Message = mongoose.model("Message", {
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Visitor = mongoose.model("Visitor", {
  count: Number
});

let onlineUsers = 0;

io.on("connection", async (socket) => {
  console.log("User connected:", socket.id);
  onlineUsers++;

  const q = socket.handshake.query;
  const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const browser = q.browser || "Unknown";
  const os = q.os || "Unknown";
  const language = q.language || "Unknown";
  const screenSize = q.screenSize || "Unknown";
  const timezone = q.timezone || "Unknown";
  const referrer = q.referrer || "Direct";
  const city = q.city || "Unknown";
  const country = q.country || "Unknown";

  try {
    console.log("Sending visitor email...");
    await transporter.sendMail({
      from: `"Portfolio Visitor Alert" <vinayakhosur85@gmail.com>`,
      to: "vinayakhosur85@gmail.com",
      subject: `👀 New Visitor on vinayakhosur.com`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10);">
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 36px 32px 28px; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 10px;">👀</div>
            <h1 style="color: #00ff88; font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: 1px;">Vinayak Portfolio Visitor</h1>
            <p style="color: #aaa; font-size: 0.9rem; margin: 8px 0 0;">Someone just visited your portfolio</p>
          </div>
          <div style="padding: 28px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; width:130px; border-bottom:1px solid #f0f0f0;">🕐 Time</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${time} IST</td></tr>
              <tr style="background:#fafafa;"><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">🌐 IP Address</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0; font-family:monospace;">${ip}</td></tr>
              <tr><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">📍 Location</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${city}, ${country}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">🖥️ Browser</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${browser}</td></tr>
              <tr><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">💻 OS</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${os}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">🌍 Language</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${language}</td></tr>
              <tr><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">📐 Screen</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${screenSize}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">🕰️ Timezone</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${timezone}</td></tr>
              <tr><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase; border-bottom:1px solid #f0f0f0;">🔗 Referrer</td><td style="padding:12px 14px; color:#222; font-size:0.93rem; border-bottom:1px solid #f0f0f0;">${referrer}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:12px 14px; font-weight:600; color:#555; font-size:0.82rem; text-transform:uppercase;">🟢 Online Now</td><td style="padding:12px 14px;"><span style="background:#e6fff4; color:#00aa55; padding:4px 12px; border-radius:20px; font-weight:600; font-size:0.88rem;">${onlineUsers} user(s) online</span></td></tr>
            </table>
          </div>
          <div style="background:#f7f7f7; padding:16px 32px; text-align:center; border-top:1px solid #eee;">
            <p style="margin:0; font-size:0.82rem; color:#aaa;">Sent automatically from <a href="https://vinayakhosur.com" style="color:#00aa55; text-decoration:none; font-weight:600;">vinayakhosur.com</a></p>
          </div>
        </div>
      `
    });
    console.log("Visitor email sent successfully!");
  } catch (err) {
    console.warn("Visitor email failed:", err.message);
  }

  // Update visitor count (skip if MongoDB unavailable)
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count++;
      await visitor.save();
    }
    io.emit("visitor-count", visitor.count);
  } catch (err) {
    console.warn("Visitor count skipped:", err.message);
  }

  io.emit("online-users", onlineUsers);

  // Handle typing indicator
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing-status", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    onlineUsers--;
    io.emit("online-users", onlineUsers);
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  // Respond to user immediately — don't make them wait for email/DB
  res.json({ success: true });

  // Save to DB in background
  try {
    await Message.create({ name, email, message });
  } catch (dbErr) {
    console.warn("DB save skipped:", dbErr.message);
  }

  // Send email in background
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <vinayakhosur85@gmail.com>`,
      to: "vinayakhosur85@gmail.com",
      subject: `New Message from ${name} - Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #00cc66; border-bottom: 2px solid #00cc66; padding-bottom: 10px;">Vinayak Portfolio Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 10px; color: #555;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 10px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 10px; color: #555;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #333; vertical-align: top;">Message:</td>
              <td style="padding: 10px; color: #555; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.85rem; color: #999;">Sent from your portfolio website at vinayakhosur.com</p>
        </div>
      `
    });
    console.log(`Contact email sent from ${email}`);
  } catch (err) {
    console.error("Email send failed:", err.message);
  }
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
