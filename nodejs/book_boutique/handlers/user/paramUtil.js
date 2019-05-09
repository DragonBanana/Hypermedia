//Exporting utility tools for parameters extraction.
module.exports = {
    //Returns a path parameter if it exists. Otherwise null.
    getPathParameter: function (event, paramName) {
        if (event && event.pathParameters && paramName in event.pathParameters) {
            return event.pathParameters[paramName];
        } else {
            return null;
        }
    },
    //Returns a path parameter if it exists. Otherwise null.
    getQueryParameter: function (event, paramName) {
        if (event && event.queryStringParameters && paramName in event.queryStringParameters) {
            return event.queryStringParameters[paramName];
        } else {
            return null;
        }
    },
    //Returns a body parameter if it exists. Otherwise null.
    getBodyParameter: function (event, paramName) {
        if (event && event.body) {
            let body = JSON.parse(event.body);
            if (paramName in body) {
                return body[paramName];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
};