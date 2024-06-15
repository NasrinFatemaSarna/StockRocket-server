const mongoose = require("mongoose");

const DeleteParentChildService = async (request, parentModel, childModel, jointParentName) => {
    // create transaction session
    const session = await mongoose.startSession();
    
    
    try {
        await session.startTransaction();
        // first process delete parent data

        let deletedId = request.params.id;
        let userEmail = request.headers.email;

        let childQuery = {};

         childQuery["jointParentName"] = deletedId
         childQuery["userEmail"] = userEmail


         let parentQuery = {};

         parentQuery["_id"] = deletedId
         parentQuery["userEmail"] = userEmail

         let childDelete = await childModel.deleteMany(childQuery).session(session);
         let parentDelete = await parentModel.deleteOne(parentQuery).session(session);

         await session.commitTransaction();
         session.endSession();
         
         return { status: "success", parentData: parentDelete, childData: childDelete };

    } catch (error) {
        // rollback transaction
        await session.abortTransaction();
        session.endSession();
        return { status: "failed", data: error.message };
    }
};

module.exports = DeleteParentChildService;
