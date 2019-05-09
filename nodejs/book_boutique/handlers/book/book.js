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
/book - Find all books.
This method support pagination and filtering.
Query paramers : 
    - page : the page number. By default its value is 1.
    - pageSize : the number of element in each page. By default its value is 10.
    - theme : the theme of the books.
    - genre : the genre of the books.
Example of requests : 
    ".../book"
    ".../book?page=2"
    ".../book?pageSize=5"
    ".../book?page=1&pageSize=3"
    ".../book?page=3&pageSize=10&theme=solitude&genre=narrative"
*/
exports.findAll = async (event) => {
    let theme, genre, page = 1, pageSize = 10;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "theme")) != null) {
        theme = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "genre")) != null) {
        genre = parameter;
    }
    let params = {
        TableName: 'bb_book',
        Limit: pageSize
    };
    if (param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre")) {
        params.FilterExpression = "#themeId = :themeId AND #genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":genreId": genre
        }
    } else if (!param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre")) {
        params.FilterExpression = "#genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":genreId": genre
        }
    } if (param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre")) {
        params.FilterExpression = "#themeId = :themeId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme
        }
    }
    return resp.stringify(await db.scan(params, page));
};

/*
/book/{isbn} - Find books by isbn.
Example of request: ".../book/9788447394567"
*/
exports.findByISBN = async (event) => {
    if ((parameter = param.getPathParameter(event, "isbn")) != null) {
        let isbn = parameter;
        let params = {
            TableName: 'bb_book',
            Limit: 1,
            KeyConditionExpression: "#isbn = :isbn",
            ExpressionAttributeNames: {
                "#isbn": "isbn"
            },
            ExpressionAttributeValues: {
                ":isbn": isbn
            }
        };
        return resp.stringify(await db.query(params, 1));
    } else {
        return resp.stringify(null);
    }
};

/*
/book/favourite - Find all favourite books.
This method support pagination.
Query paramers : 
    - page : the page number. By default its value is 1.
    - pageSize : the number of element in each page. By default its value is 10.
Example of request: ".../book/favourite?page=3&pageSize=10"
*/
exports.findFavourites = async (event) => {
    let page = 1, pageSize = 10;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_book',
        Limit: pageSize,
        FilterExpression: "#favourite = :favourite",
        ExpressionAttributeNames: {
            "#favourite": "favourite"
        },
        ExpressionAttributeValues: {
            ":favourite": "true"
        }
    };
    return resp.stringify(await db.scan(params, page));
};

/*
/book/bestseller - Find all best seller books.
This method support pagination.
Query paramers : 
    - page : the page number. By default its value is 1.
    - pageSize : the number of element in each page. By default its value is 10.
Example of request: ".../book/bestseller?page=3&pageSize=10"
*/
exports.findBestSellers = async (event) => {
    let page = 1, pageSize = 10;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_book',
        Limit: pageSize,
        FilterExpression: "#bestSellers = :bestSellers",
        ExpressionAttributeNames: {
            "#bestSellers": "bestSellers"
        },
        ExpressionAttributeValues: {
            ":bestSellers": "true"
        }
    };
    return resp.stringify(await db.scan(params, page));
};