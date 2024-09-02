const transporter = require("./email");

const sendResetPasswordMail = async (to, restUrl) => {
  const mailOption = {
    from: process.env.EMAIL,
    to,
    subject: "Password Reset",
    text: `you request a password reset . please click the link below to reset your password :\n\n${restUrl}\n\nIF you did not request this.Please ignore this mail`,
  };

  try {
    await transporter.sendMail(mailOption)
  } catch (error) {
    console.log("Email service error (change the servive provider)", error);

    throw new Error("Error sending reset password link");
  }
};

module.exports = sendResetPasswordMail;