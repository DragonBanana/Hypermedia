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
    query: async function (params) {
        return await dynamoQuery(params);
    },
    scan: async function (params) {
        return await dynamoScan(params);
    },
    put: async function (params) {
        return await dynamoPutItem(params);
    },
    update: async function (params) {
        return await dynamoUpdateItem(params);
    },
    delete: async function (params) {
        return await dynamoDeleteItem(params);
    }
};

async function dynamoScan(params) {
    try {
        const data = await dynamoDb.scan(params).promise();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function dynamoQuery(params) {
    try {
        const data = await dynamoDb.query(params).promise();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function dynamoPutItem(params) {
    try {
        const data = (new AWS.DynamoDB).putItem(params).promise();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function dynamoUpdateItem(params) {
    try {
        const data = await dynamoDb.update(params).promise();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function dynamoDeleteItem(params) {
    try {
        const data = await dynamoDb.delete(params).promise();
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}