
const UserUpdateService = async (request, dataModel) => {
    try {
        let id = request.params.id
        let email = request.headers.email
        let body = request.body
        let data = await dataModel.updateOne({ _id: id, userEmail: email }, body)
        return { status: "success", data: data }

    } catch (error) {
        return { status: "failed", data: error.message }
    }
}

module.exports = UserUpdateService   

      