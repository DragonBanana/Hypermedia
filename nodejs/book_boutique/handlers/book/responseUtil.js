module.exports = {
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: "Resource not found.",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            };
        }
    },
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (code, data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: "Resource not found.",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            };
        } else {
            return {
                statusCode: code,
                body: JSON.stringify(data),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true
                }
            };
        }
    }
}