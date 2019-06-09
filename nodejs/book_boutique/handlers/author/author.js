//Importing some libraries.
//DB is for db connection.
//param is for parameters extraction.
//resp if for response management.
const db = require('db');
const param = require('paramUtil');
const resp = require('responseUtil');

//Global variables.
let parameter;

/*
/author - Find all authors.
This method support pagination.
Query paramers : 
    - page : the page number. By default its value is 1.
    - pageSize : the number of element in each page. By default its value is 10.
Example of request: ".../author?page=3&pageSize=10"
*/
exports.findAll = async (event) => {
    let page = 1, pageSize = 1000;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_author'
    };
    let dbResult = await db.scan(params);
    let totalPage = parseInt(dbResult.Count / pageSize);
    let count = pageSize;
    if (page > totalPage) {
        count = dbResult.Count - totalPage * pageSize;
    }
    let response = {
        "Elements": dbResult.Count,
        "Count": count,
        "Items": dbResult.Items.slice((page - 1) * pageSize, page * pageSize)
    }
    return resp.stringify(200, response);
};

/*
/author/{id} - Find authors by id.
Example of request: ".../author/PaoloGiordano"
*/
exports.findById = async (event) => {
    if ((parameter = param.getPathParameter(event, "id")) != null) {
        let id = parameter;
        let params = {
            TableName: 'bb_author',
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        let dbResult = await db.query(params);
        let response = {
            "Elements": dbResult.Count,
            "Count": dbResult.Count,
            "Items": dbResult.Items
        }
        return resp.stringify(200, response);
    } else {
        return resp.stringify(null);
    }
};

/*
/count/author - Count all authors.
Example of request: ".../count/author"
*/
exports.countFindAll = async (event) => {
    let params = {
        TableName: 'bb_author'
    };
    let dbResult = await db.scan(params);
    let response = {
        "Elements": dbResult.Count
    }
    return resp.stringify(200, response);
};