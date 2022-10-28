require("dotenv").config();
const express = require("express");
const cors = require("cors");
const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const EMAIL = process.env.EMAIL;
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: "api", key: API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  //   res.json({ message: "Route ok" });
  try {
    const messageData = {
      from: `${req.body.prenom} ${req.body.nom} <${req.body.email}>`,
      to: EMAIL,
      subject: req.body.sujet,
      text: req.body.message,
    };
    const result = await client.messages.create(DOMAIN, messageData);
    console.log(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
