
const UserModel = require("../models/user/UsersModel");
const UserCreateService = require("../services/user/UserRegistrationService");
const UserLoginService = require("../services/user/LoginService");
const EmailVerifyService = require("../services/user/EmailVerifyService");
const OtpVerifyService = require("../services/user/OtpVerifyService");
const OtpModel = require("../models/user/OtpModel");
const ResetPassword = require("../services/user/ResetPassword");
const UserDetailsService = require("../services/user/UserDetailsService");
const UserUpdateService = require("../services/user/UserUpdateService");


exports.Registration = async (req, res) => {
    try {
        const result = await UserCreateService(req, UserModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

    exports.Login = async (req, res) => {
        try {
            const result = await UserLoginService(req, UserModel);
            res.status(200).json(result);
        } catch (error) {
            console.error("Error in user login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
};

exports.EmailVerify = async (req, res) => {
    try {
        const result = await EmailVerifyService(req, UserModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// Other controller methods...

exports.OtpVerify = async (req, res) => {
    try {
        const result = await OtpVerifyService(req, OtpModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in OTP verification:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.ResetPassword = async (req, res) => {
    try {
        const result = await ResetPassword(req, UserModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.UserDetails = async (req, res) => {
    try {
        const result = await UserDetailsService(req, UserModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.UserUpdate = async (req, res) => {
    try {
        const result = await UserUpdateService(req, UserModel);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}