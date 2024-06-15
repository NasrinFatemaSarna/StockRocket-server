

const OtpVerifyService = async (request, dataModel) => {
    try {
        let email = request.params.email
        let otp = request.params.otp
        let otpStatus = 0
        let updateOtpStatus = 1

        let otpCheck = await dataModel.aggregate([
            { $match: { email: email, otp: otp, status: otpStatus } },
            { $count:"count" }

        ])

        if (otpCheck.length > 0) {
          let updateOtp = await dataModel.updateOne({ email: email, otp: otp, status: otpStatus }, {email: email, otp: otp, status: updateOtpStatus})
           return { status: "success", data: "otp verified successfully" }

        }

       else {
            return { status: "failed", data: "user not found" }

        }
    } catch (error) {
        return { status: "failed", data: error };
    }
    }
    module.exports = OtpVerifyService

