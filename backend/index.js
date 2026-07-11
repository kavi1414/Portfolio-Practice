require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// Railway blocks outbound SMTP, so Gmail/Nodemailer times out there. Send via
// Resend's HTTPS API instead, which Railway allows. No custom domain is needed:
// mail is sent from Resend's shared sender to the site owner's own inbox.
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res
        .status(500)
        .json({ error: "Failed to send email. Please try again." });
    }

    res.json({ success: true, message: "Email sent successfully." });
  } catch (err) {
    console.error("Resend error:", err.message);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
