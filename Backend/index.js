const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Email credentials
const EMAIL_USER =  process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Contact route
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: "Portfolio Contact Form Message",
    text: `From: ${name} (${email})\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send("Email error");
    res.send("✅ Message sent!");
  });
});

// Use Render's provided port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
