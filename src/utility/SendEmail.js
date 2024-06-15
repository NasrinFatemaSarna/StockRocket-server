
const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo, emailSubject, emailText) => {

    const transporter  = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sarnamern@gmail.com",
            pass: "fbnn cvhb umhi cydf ",
        }
    })
    let mailOptions = {
        from: 'Stock Rocket <sarnamern@gmail.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    };
    return await transporter.sendMail(mailOptions);
}




module.exports = SendEmailUtility;