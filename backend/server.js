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
    origin: ["http://localhost:3000", "https://vinayakhosur.com", process.env.FRONTEND_URL].filter(Boolean),
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: ["http://localhost:3000", "https://vinayakhosur.com", process.env.FRONTEND_URL].filter(Boolean)
}));
app.use(express.json());

// Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vinayakhosur85@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD
  }
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

  // Send visitor notification email
  const ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  try {
    console.log("Sending visitor email to vinayakhosur85@gmail.com...");
    await transporter.sendMail({
      from: `"Portfolio Visitor Alert" <vinayakhosur85@gmail.com>`,
      to: "vinayakhosur85@gmail.com",
      subject: `👀 New Visitor on vinayakhosur.com`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); padding: 36px 32px 28px; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 10px;">👀</div>
            <h1 style="color: #00ff88; font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing: 1px;">Vinayak Portfolio Visitor</h1>
            <p style="color: #aaa; font-size: 0.9rem; margin: 8px 0 0;">Someone just visited your portfolio</p>
          </div>
          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 14px 16px; font-weight: 600; color: #555; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; width: 130px; border-bottom: 1px solid #f0f0f0;">🕐 Time</td>
                <td style="padding: 14px 16px; color: #222; font-size: 0.95rem; border-bottom: 1px solid #f0f0f0;">${time} IST</td>
              </tr>
              <tr style="background: #fafafa;">
                <td style="padding: 14px 16px; font-weight: 600; color: #555; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f0f0f0;">🌐 IP Address</td>
                <td style="padding: 14px 16px; color: #222; font-size: 0.95rem; border-bottom: 1px solid #f0f0f0; font-family: monospace;">${ip}</td>
              </tr>
              <tr>
                <td style="padding: 14px 16px; font-weight: 600; color: #555; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">🟢 Online Now</td>
                <td style="padding: 14px 16px; color: #222; font-size: 0.95rem;">
                  <span style="background: #e6fff4; color: #00aa55; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem;">${onlineUsers} user(s) online</span>
                </td>
              </tr>
            </table>
          </div>
          <!-- Footer -->
          <div style="background: #f7f7f7; padding: 18px 32px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 0.82rem; color: #aaa;">Sent automatically from <a href="https://vinayakhosur.com" style="color: #00aa55; text-decoration: none; font-weight: 600;">vinayakhosur.com</a></p>
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

  try {
    // Save to DB (optional - won't crash if MongoDB is unavailable)
    try {
      await Message.create(req.body);
    } catch (dbErr) {
      console.warn("DB save skipped:", dbErr.message);
    }

    // Send email to Vinayak
    await transporter.sendMail({
      from: `"Portfolio Contact" <vinayakhosur85@gmail.com>`,
      to: "vinayakhosur85@gmail.com",
      subject: `New Message from ${name} - Portfolio Contact`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #00cc66; border-bottom: 2px solid #00cc66; padding-bottom: 10px;">New Portfolio Contact Message</h2>
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

    res.send({ success: true });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).send({ success: false, error: err.message });
  }
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
