const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const dotenv = require('dotenv');
dotenv.config();
const myOAuth2Client = new OAuth2(process.env.GCID, process.env.GCSECRET, "https://developers.google.com/oauthplayground");

const sendEmail = (to, sub, htmlContent) => {

    myOAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
    const myAccessToken = myOAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "noreply-recruitment@iiitu.ac.in", //your gmail account you used to set the project up in google cloud console"
            clientId: process.env.GCID,
            clientSecret: process.env.GCSECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: myAccessToken //access token variable 
        }
    });

    const mailOptions = {
        from: 'noreply-recruitment@iiitu.ac.in', // sender
        to: to, // receiver
        subject: sub, // Subject
        html: htmlContent // html body
    }

    transport.sendMail(mailOptions, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            transport.close();
            console.log(result);
        }
    });

}
module.exports = { sendEmail };