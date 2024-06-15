
const UserUpdateService = async (request,dataModel) => {

    try {
        let data = await dataModel.updateOne({email: request.headers.email}, request.body)

        return { status: "success", data: data }

} catch (error) {
        return { status: "failed", data: error };
    }
}

module.exports = UserUpdateService