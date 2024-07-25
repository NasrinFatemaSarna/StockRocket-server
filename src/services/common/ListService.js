
// const mongoose = require("mongoose");

// const ListService = async (Request, DataModel, Array = []) => {
//     try {
//         let pageNumber = Number(Request.params.pageNumber) ;
//         let perPage = Number(Request.params.perPage);
//         let searchText = Request.params.searchText;
//         let userEmail = Request.headers.email;

//         let skip = (pageNumber - 1) * perPage ;
//         let data;
//         if (searchText !== "null") {
//             let query = { $or: Array };

//             data = await DataModel.aggregate([
//                 { $match: { userEmail: userEmail } },
//                 { $match: query },
//                 {
//                     $facet: {
//                         total: [{ $count: "count" }],
//                         data: [{$skip:skip}, {$limit:perPage}]
//                     }
//                 }
//             ]);
//         }
//         else{
//             data = await DataModel.aggregate([
//                 { $match: { userEmail: userEmail } },
//                 { $match: query },
//                 {
//                     $facet: {
//                         total: [{ $count: "count" }],
//                         data: [{$skip:skip}, {$limit:perPage}]
//                     }
//                 }

//             ])
//         }

//         return { status: "success", data: data }; // Ensure to return the first element which contains 'total' and 'data'
//     } catch (error) {
//         return { status: "failed", data: error.message };
//     }
// };

// module.exports = ListService;






const mongoose = require("mongoose");

const ListService = async (Request, DataModel, Array = {}) => {
  try {
    let pageNumber = Number(Request.params.pageNumber);
    let perPage = Number(Request.params.perPage);
    let searchText = Request.params.searchText;
    let userEmail = Request.headers.email;

    let skip = (pageNumber - 1) * perPage;
    let data;

    if (searchText !== "null") {
      let query = {
        $or: Array.map(field => ({
          [field]: { $regex: searchText, $options: "i" }
        }))
      };

      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
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
        {
          $facet: {
            total: [{ $count: "count" }],
            data: [{ $skip: skip }, { $limit: perPage }]
          }
        }
      ]);
    }

    return {
      status: "success",
      data: data.length ? data[0] : { total: 0, data: [] }
    };
  } catch (error) {
    return { status: "failed", data: error.message };
  }
};

module.exports = ListService;











