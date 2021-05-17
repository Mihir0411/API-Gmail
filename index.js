const express = require('express')
const app = express()
require('dotenv').config()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');




// These id's and secrets should come from .env file.
const CLIENT_ID = `${process.env.DB_USER}`;
const CLEINT_SECRET = `${process.env.DB_PASS}`;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04zB5l7GVykjtCgYIARAAGAQSNwF-L9IrG95Kz4cpmnDQkyGC2mqOLHkQrMAhw0_rfD37Dq6iQB3Ra1JFCYr0B5_d8SdhZ3PrfjY';

const port = 3000
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ahmihir11@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'SENDER NAME <ahmihir11@gmail.com>',
      to: 'alm.arham0411@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}




app.get('/gmailAPI', (req, res) => {
  res.send(sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message)))
})

app.listen(port)