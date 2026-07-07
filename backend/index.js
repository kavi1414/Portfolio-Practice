require("dotenv").config();
const dns = require("dns");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Railway's containers have no outbound IPv6 route; prefer IPv4 for all
// DNS lookups so the SMTP connection to Gmail doesn't try IPv6 and hang.
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Nodemailer error:", err.message, err.code, err.response);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
