
const bcrypt = require('bcrypt');
const OtpModel = require('../../models/user/OtpModel')


const ResetPassword = async (request, dataModel) => {
    try {
        let email = request.body.email
        let otp = request.body.otp
        let updateOtpStatus = 1
        let newPassword = request.body.password

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let otpVerifyCheck = await OtpModel.aggregate([
            { $match: { email: email, otp: otp, status: updateOtpStatus } },
            { $count: "count" }
        ])

        if (otpVerifyCheck.length > 0) {
           let passwordUpdate = await dataModel.updateOne({ email: email }, { password: hashedPassword })

           return { status: "success", data: "password changed successfully" }
        }

        else {
            return { status: "failed", data: "user not found" }
        }

    } catch (error) {
        return { status: "failed", data: error.message }
    }
}

module.exports = ResetPassword


