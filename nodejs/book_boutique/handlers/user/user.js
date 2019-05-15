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
/login - Login a user.
Query parameters : 
    - username : the user username.
    - password : the user password.
Example of requests : 
    ".../login?userename=pippo&password=pippo
*/
exports.login = async (event) => {
    let username, password;
    if ((parameter = param.getQueryParameter(event, "username")) != null) {
        username = parameter;
    } else {
        return resp.stringify(null);
    }
    if ((parameter = param.getQueryParameter(event, "password")) != null) {
        password = parameter;
    } else {
        return resp.stringify(null);
    }
    let params = {
        TableName: 'bb_user',
        FilterExpression: "#username = :username AND #password = :password",
        ExpressionAttributeNames: {
            "#username": "username",
            "#password": "password"
        },
        ExpressionAttributeValues: {
            ":username": username,
            ":password": password
        }
    };
    let result = await db.scan(params);
    if(result.Count >= 1) {
        return {
            statusCode: 200,
            headers: { },
            body: '{"username": "' + username + '"}',
            headers: {
                'Set-Cookie': 'session='+ result.Items[0].username + ';domain=https://suhqk95c5h.execute-api.eu-west-1.amazonaws.com;path=/;Max-Age=100000',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        };
    } else {
        return resp.stringify(400, "Username or password are wrong")
    }
    
};

/*
/register - Register a user.
Body parameters : 
    - username : the user username.
    - password : the user password.
    - name : the user name.
    - surname : the user surname.
*/
exports.register = async (event) => {
    let username, password, name, surname;
    if ((parameter = param.getBodyParameter(event, "username")) != null) {
        username = parameter;
    } else {
        return resp.stringify(400, "username parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "password")) != null) {
        password = parameter;
    } else {
        return resp.stringify(400, "password parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "name")) != null) {
        name = parameter;
    } else {
        return resp.stringify(400, "name parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "surname")) != null) {
        surname = parameter;
    } else {
        return resp.stringify(400, "surname parameter not found");
    }

    let params = {
        TableName: 'bb_user',
        KeyConditionExpression: "#username = :username",
        ExpressionAttributeNames: {
            "#username": "username"
        },
        ExpressionAttributeValues: {
            ":username": username
        }
    };

    let result = await db.query(params);

    if(result.Count == 0) {
        params = {
            TableName: 'bb_user',
            Item: {
                "username" : {
                    S: username
                },
                "password" : {
                    S: password
                },
                "name" : {
                    S: name
                },
                "surname" : {
                    S: surname
                },
            }
        }
        
        await db.put(params);
        
        return resp.stringify(200, username + " created");
    } else {
        return resp.stringify(400, username + " already registered");
    }

}