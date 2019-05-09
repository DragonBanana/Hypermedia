//Importing the amazon sdk.
const AWS = require('aws-sdk');
//Creating the DynamoDB client.
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

/*
Exporting query and scan functions.
Since DynamoDB does not support pagination by default we had to implement a custom version of pagination.
Query is needed when we are looking up in table using the primary key.
Scan is needed when we are looking up in the table without the primary key.
*/
module.exports = {
    query: async function (params, page) {
        return await dynamoQuery(params, 0, page);
    },
    scan: async function (params, page) {
        return await dynamoScan(params, 0, page);
    },
    put: async function (params) {
        return await dynamoPutItem(params);
    }
};

async function dynamoScan(params, currPage, page) {
    try{
        const data = await dynamoDb.scan(params).promise()
        currPage++;
        if(currPage == page) {
            return data;
        } else {
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            return dynamoScan(params, currPage, page);
        }
    }catch(err) {
        console.log(err);
        return err;
    }
}

async function dynamoQuery(params, currPage, page) {
    try{
        const data = await dynamoDb.query(params).promise();
        currPage++;
        if(currPage == page) {
            return data;
        } else {
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            return dynamoQuery(params, currPage, page);
        }
    }catch(err) {
        console.log(err);
        return err;
    }
}

async function dynamoPutItem(params) {
    try{
        const data = (new AWS.DynamoDB).putItem(params).promise();
        return data;
    }catch(err) {
        console.log(err);
        return err;
    }
}