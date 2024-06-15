
const bcrypt = require('bcrypt');

const UserCreateService = async (request , dataModel) => {
    try {
        const userData = request.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Replace password with hashed password
        userData.password = hashedPassword;

        // Create user
        const user = await dataModel.create(userData);
        
        return { status: "success", data: user };
    }
    catch (error) {
        return { status: "failed", message: error.message };
    }
};

module.exports = UserCreateService;
