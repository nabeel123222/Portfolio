const express = require("express");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 📦 Replace these with your actual credentials
const EMAIL_USER = "nabeelmohamed788@gmail.com";
const EMAIL_PASS = "zgonhraqrpvdqieu";

const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASS = "Nabeel2005";
const DB_NAME = "portfolio";

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nabeel2005",
  database:"portfolio"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

// 📬 POST route to receive contact form data
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Store into MySQL
  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).send("Database error");

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nabeelmohamed788@gmail.com",
        pass: "zgonhraqrpvdqieu"
      }
    });

    const mailOptions = {
      from: email,
      to: "nabeelmohamed788@gmail.com",
      subject: "Portfolio Contact Form Message",
      text: `From: ${name} (${email})\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).send("Email error");
      res.send("✅ Message sent and saved!");
    });
  });
});

// 🚀 Start the server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
