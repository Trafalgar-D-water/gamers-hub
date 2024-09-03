const transporter = require("./email");

const sendVerificationEmail = async (to, verificationUrl) => {
  const mailOption = {
    from: 'patnauakpanku@gmail.com',
    to,
    subject: "Email Verification",
    text: `You have successfully registered. Please verify your email by clicking the link below:\n\n${verificationUrl}\n\nIf you did not request this, please ignore this email.`,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

module.exports = sendVerificationEmail;
