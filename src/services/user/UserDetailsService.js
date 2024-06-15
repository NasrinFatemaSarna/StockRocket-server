
const UserDetailsService = async (request, dataModel) => {
    try {
        let data = await dataModel.aggregate([
            { $match: { email: request.headers.email } },
            { $project: { password: 0 } }
            
        ])

        return { status: "success", data: data };
    } catch (error) {
        return { status: "failed", data: error };
    }
};

module.exports = UserDetailsService