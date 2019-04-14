console.log('bookboutique_GET');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

exports.handler = function (event, context, callback) {
    console.log('processing event: %j', event);
    var requestPath = event.pathParameters.proxy.split("/");
    console.log('path parameters: ' + requestPath);

    /*
    .../book
    */
    if (requestPath.length === 1
        && requestPath[0] === "book") {

        let params = {
            TableName: 'bb_book',
            Limit: 100 //maximum result of 100 items
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../book/{isbn}
        */
    } else if (requestPath.length === 2
        && requestPath[0] === "book"
        && requestPath[0].length === 13
        && /^\d+$/.test(requestPath[0])) {

        const isbn = requestPath[1];
        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            KeyConditionExpression: "#isbn = :isbn",
            ExpressionAttributeNames: {
                "#isbn": "isbn"
            },
            ExpressionAttributeValues: {
                ":isbn": isbn
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../book/theme/{themeId}
        */
    } else if (requestPath.length === 3
        && requestPath[0] === "book"
        && requestPath[1] === "theme") {

        const themeId = requestPath[2];
        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            FilterExpression: "#themeId = :themeId",
            ExpressionAttributeNames: {
                "#themeId": "themeId"
            },
            ExpressionAttributeValues: {
                ":themeId": themeId
            }
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../book/genre/{genreId}
        */
    } else if (requestPath.length === 3
        && requestPath[0] === "book"
        && requestPath[1] === "genre") {


        const genreId = requestPath[2];
        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            FilterExpression: "#genreId = :genreId",
            ExpressionAttributeNames: {
                "#genreId": "genreId"
            },
            ExpressionAttributeValues: {
                ":genreId": genreId
            }
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../book/bestselling
        */
    } else if (requestPath.length === 2
        && requestPath[0] === "book"
        && requestPath[1] === "bestselling") {

        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            FilterExpression: "#bestSellers = :bestSellers",
            ExpressionAttributeNames: {
                "#bestSellers": "bestSellers"
            },
            ExpressionAttributeValues: {
                ":bestSellers": "true"
            }
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../book/favourite
        */
    } else if (requestPath.length === 2
        && requestPath[0] === "book"
        && requestPath[1] === "favourite") {

        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            FilterExpression: "#favourite = :favourite",
            ExpressionAttributeNames: {
                "#favourite": "favourite"
            },
            ExpressionAttributeValues: {
                ":favourite": "true"
            }
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../author
        */
    } else if (requestPath.length === 1
        && requestPath[0] === "author") {

        let params = {
            TableName: 'bb_author',
            Limit: 100 //maximum result of 100 items
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../author/{authorId}
        */
    } else if (requestPath.length === 2
        && requestPath[0] === "author") {

        const authorId = requestPath[1];
        let params = {
            TableName: 'bb_author',
            Limit: 100, //maximum result of 100 items
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": authorId
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../theme
        */
    } else if (requestPath.length === 1
        && requestPath[0] === "theme") {

        let params = {
            TableName: 'bb_theme',
            Limit: 100 //maximum result of 100 items
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../genre
        */
    } else if (requestPath.length === 1
        && requestPath[0] === "genre") {

        let params = {
            TableName: 'bb_genre',
            Limit: 100 //maximum result of 100 items
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../event
        */
    } else if (requestPath.length === 1
        && requestPath[0] === "event") {

        let params = {
            TableName: 'bb_event',
            Limit: 100 //maximum result of 100 items
        };
        docClient.scan(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });

        /*
        .../event/{eventId}
        */
    } else if (requestPath.length === 2
        && requestPath[0] === "event") {

        const eventId = requestPath[1];
        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": eventId
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });
        returnObject(callback, "find all events by eventId " + eventId);

    } else if (requestPath.length === 4
        && requestPath[0] === "event"
        && requestPath[1] === "time") {

        const startingTime = requestPath[2];
        const endingTime = requestPath[3];
        findEventsByTime(startingTime, endingTime);
        returnObject(callback, "find all events by time, starting from " + startingTime + " to " + endingTime);

        /*
        .../event/book/{bookId}
        */
    } else if (requestPath.length === 3
        && requestPath[0] === "event"
        && requestPath[1] === "book") {

        const bookId = requestPath[2];
        let params = {
            TableName: 'bb_book',
            Limit: 100, //maximum result of 100 items
            FilterExpression: "#bookId = :bookId",
            ExpressionAttributeNames: {
                "#bookId": "bookId"
            },
            ExpressionAttributeValues: {
                ":bookId": bookId
            }
        };
        docClient.query(params, function (err, data) {
            if (err) {
                callback(null, {
                    "statusCode": 400,
                    "body": JSON.stringify(err)
                });
            } else {
                console.log(data.items);
                callback(null, {
                    "statusCode": 200,
                    "body": JSON.stringify(data.Items)
                });
            }
        });
    } else {
        returnError(callback, "error");
    }



    var response;

    /*
    //In dynamoDB scan looks through your entire table and fetches all data
    docClient.scan(scanningParameters, function(err,data){
        if(err){
            callback(null, {
                "statusCode": 400,
                "body": JSON.stringify(err)
            });
        }else{
            console.log(data);
            callback(null, {
                "statusCode": 200,
                "body": JSON.stringify(data)
            });
        }
    });
    */
}

function returnError(callback, message) {
    callback(null, {
        "statusCode": 400,
        "body": JSON.stringify(message)
    });
}

function returnObject(callback, object) {
    callback(null, {
        "statusCode": 200,
        "body": JSON.stringify(object)
    });
}
