"use strict";

const nodemailer = require("nodemailer");
require('dotenv').config()
//create a transporter Object using SMTP transport

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'patnayakpanku@gmail.com',
    pass: "vsvfkoijloknqotp",
  },
});


module.exports = transporter ;