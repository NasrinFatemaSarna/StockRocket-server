
const CreateToken = require("../../utility/CreateToken");
const bcrypt = require('bcrypt');


const UserLoginService = async (request , dataModel) => {
    try {
       const {email, password} = request.body;

       const data = await dataModel.aggregate([
        {$match: {email: email} },
        {$project: { _id: 1,email: 1, password: 1 } }
       ])

       if(data.length === 0){
        return { status: "failed", data: "user not found" };
       }
       else{
        const validPassword = await bcrypt.compare(password, data[0].password);
        if(!validPassword){
            return { status: "failed", data: "Invalid password" };
        }
        else{
            const token = await CreateToken(email);
            const userData = await dataModel.aggregate([
                {$match: {email: email} },
                {$project: { _id: 0, createdDate: 0, password: 0 } }
            ])

            return { status: "success", data: userData[0], token: token };
        
        }
       }

    } catch (error) {
        return { status: "failed", message: error.message };
    }
};


module.exports = UserLoginService;

