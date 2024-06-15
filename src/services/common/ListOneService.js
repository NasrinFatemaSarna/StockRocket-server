

const mongoose = require("mongoose");

const ListOneService = async (Request, DataModel, searchArray, JoinOneStage) => {
    try {
        let pageNumber = Number(Request.params.pageNumber) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchText = Request.params.searchText;
        let userEmail = Request.headers.email;

        let skip = (pageNumber - 1) * perPage ;
        let data;

        if (searchText !== "null") {
            let query = { $or: searchArray };
             data = await DataModel.aggregate([
                { $match: { userEmail: userEmail } },
                JoinOneStage,
                { $match: query },
                
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        data: [{ $skip: skip }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await DataModel.aggregate([
                { $match: { userEmail: userEmail } },
                JoinOneStage,
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        data: [{ $skip: skip }, { $limit: perPage }]
                    }
                }
            ]);
        }

        return { status: "success", data: data[0] }; // Ensure to return the first element which contains 'total' and 'data'
    } catch (error) {
        return { status: "failed", data: error.message };
    }
};

module.exports = ListOneService;

