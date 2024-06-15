



const mongoose = require("mongoose");

const CreateParentChildService = async (request, parentModel, childModel, jointParentName) => {
    // create transaction session
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        // first process create parent data
        const parentPostBody = request.body.parent;
        parentPostBody.userEmail = request.headers.email;
        let parentDataCreation = await parentModel.create([parentPostBody], { session: session }); // parentCreation

        // second process create child data
        const childPostBody = request.body.child;
        childPostBody.forEach((element) => {
            element.userEmail = request.headers.email;
            element[jointParentName] = parentDataCreation[0]._id;
        });
        let childDataCreation = await childModel.create(childPostBody, { session: session }); // childCreation

        // commit transaction
        await session.commitTransaction();
        session.endSession();

        // return parent and child data
        return { status: "success", parentData: parentDataCreation, childData: childDataCreation };
    } catch (error) {
        // rollback transaction
        await session.abortTransaction();
        session.endSession();
        return { status: "failed", data: error.message };
    }
};

module.exports = CreateParentChildService;
