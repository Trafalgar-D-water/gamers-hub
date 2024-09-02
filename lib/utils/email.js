"use strict";

const nodemailer = require("nodemailer");
require('dotenv').config()
//create a transporter Object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});


module.exports = transporter ;