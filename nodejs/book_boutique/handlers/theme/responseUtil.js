module.exports = {
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: '{"error": "Resource not found."}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': "application/json"
                }
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify(data.Items),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': "application/json"
                }
            };
        }
    },
    //Returns a path parameter if it exists. Otherwise null.
    stringify: function (code, data) {
        if (data === null || data.Count === 0) {
            return {
                statusCode: 400,
                body: '{"error": "Resource not found."}',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': "application/json"
                }
            };
        } else {
                if(code === 400) {
                    return {
                        statusCode: code,
                        body: JSON.stringify('{"error": "' + data + '"}'),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                            'Content-Type': "application/json"
                        }
                    };
                }else{
                    return {
                        statusCode: code,
                        body: JSON.stringify(data),
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                            'Content-Type': "application/json"
                        }
                    };
                }
        }
    }
}