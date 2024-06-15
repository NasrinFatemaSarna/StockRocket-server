
const CreateService = async (request, dataModel) => {
    try {
       let body = request.body;
       body.userEmail = request.headers.email
       let data = await dataModel.create(body); 

       return { status: "success", data: data };
    
    } catch (error) {
        return { status: "failed", data: error.message };
    }
};
module.exports = CreateService