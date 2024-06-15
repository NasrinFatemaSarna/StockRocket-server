

const mongoose = require("mongoose");

const DetailsService = async (request, dataModel) => {
    try {
      let id = request.params.id
      let email = request.headers.email
      const objectId = mongoose.Types.ObjectId


      let query = {}
      query ["_id"] = new objectId(id)
      query ["userEmail"] = email

      let data = await dataModel.aggregate([
        { $match: query },
        ])
      return { status: "success", data: data };
 
      

     
    } catch (error) {
        return { status: "failed", data: error };
    }
};
module.exports = DetailsService   
