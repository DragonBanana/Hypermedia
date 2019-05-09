module.exports = {
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: "Resource not found."
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items)
            };
        }
    },
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (code, data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: "Resource not found."
            };
        } else {
            return {
                statusCode: code,
                body: JSON.stringify(data)
            };
        }
    }
}