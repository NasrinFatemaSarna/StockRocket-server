
const DeleteService = async (Request, DataModel) => {
    try {
        let id = Request.params.id
        let email = Request.headers.email
        let query = { _id: id, userEmail: email }
        let data = await DataModel.deleteOne(query)
        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error.message }
    }
}


module.exports = DeleteService