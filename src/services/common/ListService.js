
const mongoose = require("mongoose");

const ListService = async (Request, DataModel, searchArray, JoinOneStage = {}) => {
    try {
        let pageNumber = Number(Request.params.pageNumber) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchText = Request.params.searchText;
        let userEmail = Request.headers.email;

        let skip = perPage * (pageNumber - 1);
        let data;

        const basePipeline = [
            { $match: { userEmail: userEmail } },
            { $skip: skip },
            { $limit: perPage }
        ];

        if (searchText !== "null") {
            let query = { $or: searchArray };

            data = await DataModel.aggregate([
                { $match: { userEmail: userEmail } },
                { $match: query },
                JoinOneStage,
                {
                    $facet: {
                        total: [{ $count: "count" }],
                        data: basePipeline
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
                        data: basePipeline
                    }
                }
            ]);
        }

        return { status: "success", data: data[0] }; // Ensure to return the first element which contains 'total' and 'data'
    } catch (error) {
        return { status: "failed", data: error.message };
    }
};

module.exports = ListService;













// const mongoose = require("mongoose");

// const ListService = async (Request, DataModel, searchArray, JoinOneStage) => {
//     try {
//         let pageNumber = Number(Request.params.pageNumber) || 1;
//         let perPage = Number(Request.params.perPage) || 10;
//         let searchText = Request.params.searchText;
//         let userEmail = Request.headers.email;

//         let skip = perPage * (pageNumber - 1);
//         let data;

//         if (searchText !== "null") {
//             let query = { $or: searchArray };

//             data = await DataModel.aggregate([
//                 { $match: { userEmail: userEmail } },
//                 { $match: query },
//                 JoinOneStage,
//                 {
//                     $facet: {
//                         total: [{ $count: "count" }],
//                         data: [{ $skip: skip }, { $limit: perPage }]
//                     }
//                 }
//             ]);
//         } else {
//             data = await DataModel.aggregate([
//                 { $match: { userEmail: userEmail } },
//                 JoinOneStage,
//                 {
//                     $facet: {
//                         total: [{ $count: "count" }],
//                         data: [{ $skip: skip }, { $limit: perPage }]
//                     }
//                 }
//             ]);
//         }

//         return { status: "success", data: data[0] }; // Ensure to return the first element which contains 'total' and 'data'
//     } catch (error) {
//         return { status: "failed", data: error.message };
//     }
// };

// module.exports = ListService;


