

const ListTwoService = async (Request, DataModel,Array,JoinOneStage,JoinTwoStage) => {
    try {
        let pageNumber = Number(Request.params.pageNumber)
        let perPage = Number(Request.params.perPage)
        let searchText = Request.params.searchText
        let userEmail = Request.headers.email

        let skip = (pageNumber - 1) * perPage  
        let data;

        if(searchText !== "null") {
            let query = {$or: Array}

            data = await DataModel.aggregate([
                {$match: {userEmail: userEmail}},
                
                JoinOneStage,
                JoinTwoStage,
                {$match:query},
                {$match: query},
                {
                    $facet: {
                        total: [ {$count: "count"}],
                        data: [{$skip: skip }, { $limit: perPage} ]
                    }
                }
                
            ])

        } else {
            data = await DataModel.aggregate([
                {$match: {userEmail: userEmail}},
                JoinOneStage,
                JoinTwoStage,
                
                {
                    $facet: {
                        total: [ {$count: "count"}],
                        data: [{$skip: skip }, { $limit: perPage} ]
                    }
                }
                
            ])
        }

        return { status: "success", data: data }
    } catch (error) {
        return { status: "failed", data: error }
    }
}

module.exports = ListTwoService