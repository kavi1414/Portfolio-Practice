require("dotenv").config();
const dns = require("dns").promises;
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// Railway's containers have no working outbound IPv6 route, but Nodemailer's
// internal DNS keeps resolving smtp.gmail.com to its IPv6 (AAAA) address and
// then fails with ENETUNREACH. Resolve the host to an IPv4 (A) address here
// and hand Nodemailer the literal IP, keeping `servername` so Gmail's TLS
// certificate still validates. Resolved once and reused.
let transporterPromise = null;
async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });
      return nodemailer.createTransport({
        host: address,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          servername: "smtp.gmail.com",
        },
      });
    })();
  }
  return transporterPromise;
}

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = await getTransporter();
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
