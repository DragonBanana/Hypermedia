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
/cart/{username} - Find cart items by user's username.
Example of request: ".../cart/Giacomo"
*/
exports.findCartItemsByUsername = async (event) => {
    if ((parameter = param.getPathParameter(event, "username")) != null) {
        let username = parameter;
        let params = {
            TableName: 'bb_cart',
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: {
                "#username": "username"
            },
            ExpressionAttributeValues: {
                ":username": username
            }
        };
        let dbResult = await db.scan(params);
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
/cart/{username} - Delete cart item by user's username.
Example of request: ".../cart/Giacomo?isbn=9788447398747"
*/
exports.deleteCartItemByUsername = async (event) => {
    if ((parameter = param.getPathParameter(event, "username")) != null) {
        let isbn;
        let username = parameter;
        if ((parameter = param.getQueryParameter(event, "isbn")) != null) {
            isbn = parameter;
            let params = {
                TableName: 'bb_cart',
                Key: {
                    "user_book": username + "_" + isbn
                }
            };
            await db.delete(params);
            return resp.stringify(200, "item deleted");
        } else {
            return resp.stringify(null);
        }
    } else {
        return resp.stringify(null);
    }
};

/*
/cart - Create cart item.
Body parameters : 
    - username : the user username.
    - isbn : the book isbn.
    - quantity : the quantity of the book.
    - price : the price of the book.
*/
exports.createCartItem = async (event) => {
    let username, isbn, quantity, price;
    if ((parameter = param.getBodyParameter(event, "username")) != null) {
        username = parameter;
    } else {
        return resp.stringify(400, "username parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "isbn")) != null) {
        isbn = parameter;
    } else {
        return resp.stringify(400, "isbn parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "quantity")) != null) {
        quantity = parameter;
    } else {
        return resp.stringify(400, "quantity parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "price")) != null) {
        price = parameter;
    } else {
        return resp.stringify(400, "price parameter not found");
    }

    let params = {
        TableName: 'bb_cart',
        FilterExpression: "#username = :username and #isbn = :isbn",
        ExpressionAttributeNames: {
            "#username": "username",
            "#isbn": "isbn"
        },
        ExpressionAttributeValues: {
            ":username": username,
            ":isbn": isbn,
        }
    };

    let result = await db.scan(params);

    if (result.Count == 0) {
        params = {
            TableName: 'bb_cart',
            Item: {
                "user_book": {
                    S: (username + "_" + isbn)
                },
                "username": {
                    S: username
                },
                "isbn": {
                    S: isbn
                },
                "quantity": {
                    S: quantity
                },
                "price": {
                    S: price
                },
            }
        }

        await db.put(params);

        return resp.stringify(200, username + "'s cart item " + isbn + " created");
    } else {
        return resp.stringify(400, username + "'s cart item " + isbn + " already existent");
    }

}

/*
/cart - Update cart item.
Body parameters : 
    - username : the user username.
    - isbn : the book isbn.
    - quantity : the quantity of the book.
    - price : the price of the book.
*/
exports.updateCartItem = async (event) => {
    let username, isbn, quantity, price;
    if ((parameter = param.getBodyParameter(event, "username")) != null) {
        username = parameter;
    } else {
        return resp.stringify(400, "username parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "isbn")) != null) {
        isbn = parameter;
    } else {
        return resp.stringify(400, "isbn parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "quantity")) != null) {
        quantity = parameter;
    } else {
        return resp.stringify(400, "quantity parameter not found");
    }
    if ((parameter = param.getBodyParameter(event, "price")) != null) {
        price = parameter;
    } else {
        return resp.stringify(400, "price parameter not found");
    }

    let params = {
        TableName: 'bb_cart',
        FilterExpression: "#username = :username and #isbn = :isbn",
        ExpressionAttributeNames: {
            "#username": "username",
            "#isbn": "isbn"
        },
        ExpressionAttributeValues: {
            ":username": username,
            ":isbn": isbn,
        }
    };

    let result = await db.scan(params);

    if (result.Count > 0) {
        params = {
            TableName: 'bb_cart',
            Item: {
                "user_book": {
                    S: (username + "_" + isbn)
                },
                "username": {
                    S: username
                },
                "isbn": {
                    S: isbn
                },
                "quantity": {
                    S: quantity
                },
                "price": {
                    S: price
                },
            }
        }

        await db.put(params);

        return resp.stringify(200, username + "'s cart item " + isbn + " updated");
    } else {
        return resp.stringify(400, username + "'s cart item " + isbn + " not found");
    }

}