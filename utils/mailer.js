const nodemailer = require('nodemailer');
const { PASS } = require('../config');
const { USER } = require('./roles');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    await transporter.sendMail({
      from: USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('email sent sucessfully');
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
};

module.exports = sendEmail;
