const db = require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async function sendEmail(recepient, title, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.HOST_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
    },
  });
  console.log(process.env.HOST_EMAIL);
  const mailOptions = {
    from: process.env.HOST_EMAIL, // sender address
    to: recepient, // list of receivers
    subject: `Reminder for ${title}`, // Subject line
    text: message, // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
