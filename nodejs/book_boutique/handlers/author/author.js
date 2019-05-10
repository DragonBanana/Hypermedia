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
    let page = 1, pageSize = 10;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_author',
        Limit: pageSize,
    };
    return resp.stringify(200, await db.scan(params, page));
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
            Limit: 1,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        return resp.stringify(200, await db.query(params, 1));
    } else {
        return resp.stringify(null);
    }
};