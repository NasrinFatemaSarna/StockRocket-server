

const SendEmailUtility = require("../../utility/SendEmail")
const otpModel = require('../../models/user/OtpModel')

const EmailVerifyService = async (request, dataModel) => {
    try {
        let email = request.params.email
        let otp = Math.floor(100000 + Math.random() * 90000);

        let userCheck = await dataModel.aggregate([
            { $match: { email: email } },
            { $count:"count" }

        ])


        if (userCheck.length > 0) {
          await otpModel.create({ email: email, otp: otp })
          let sendEmail = await SendEmailUtility(email, "Stock Rocket password verification", `Your OTP is ${otp}`)

          return { status: "success", data: "otp sent successfully" }
        }

        else {
            return { status: "failed", data: "user not found" }

        }

 } catch (error) {
        return { status: "failed", data: error };
    }
}


module.exports = EmailVerifyService



