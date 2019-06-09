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
    - author : the author of the books.
Example of requests : 
    ".../book"
    ".../book?page=2"
    ".../book?pageSize=5"
    ".../book?page=1&pageSize=3"
    ".../book?page=3&pageSize=10&theme=solitude&genre=narrative"
*/
exports.findAll = async (event) => {
    let theme, genre, author, page = 1, pageSize = 1000;
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
    if ((parameter = param.getQueryParameter(event, "author")) != null) {
        author = parameter;
    }
    let params = {
        TableName: 'bb_book',
        ScanIndexForward: true
    };
    if (param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #genreId = :genreId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#genreId": "genreId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":genreId": genre,
            ":authorId": author
        }
    } else if (!param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#genreId = :genreId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#genreId": "genreId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":genreId": genre,
            ":authorId": author
        }
    } else if (param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":authorId": author
        }
    } else if (param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":genreId": genre
        }
    } else if (!param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":genreId": genre
        }
    } else if (param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme
        }
    }
    else if (!param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":authorId": author
        }
    }
    let dbResult = await db.scan(params);
    return resp.stringify(200, dbResult.Items.slice((page - 1) * pageSize, page * pageSize));
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
            KeyConditionExpression: "#isbn = :isbn",
            ExpressionAttributeNames: {
                "#isbn": "isbn"
            },
            ExpressionAttributeValues: {
                ":isbn": isbn
            }
        };
        let dbResult = await db.query(params);
        return resp.stringify(200, dbResult.Items);
    } else {
        return resp.stringify(null);
    }
};

/*
/book/similar/{isbn} - Find all similar books.
This method support pagination.
Query paramers : 
    - page : the page number. By default its value is 1.
    - pageSize : the number of element in each page. By default its value is 10.
Example of request: ".../book/similar/9788447394567?page=3&pageSize=10"
*/
exports.findSimilar = async (event) => {
    if ((parameter = param.getPathParameter(event, "isbn")) != null) {
        let isbn = parameter;
        let params = {
            TableName: 'bb_book',
            KeyConditionExpression: "#isbn = :isbn",
            ExpressionAttributeNames: {
                "#isbn": "isbn"
            },
            ExpressionAttributeValues: {
                ":isbn": isbn
            },
            ScanIndexForward: true
        };
        let dbResult = await db.query(params);
        let theme = dbResult.Items[0].themeId;
        let genre = dbResult.Items[0].genreId;
        let author = dbResult.Items[0].authorId;
        let page = 1, pageSize = 100;
        if ((parameter = param.getQueryParameter(event, "page")) != null) {
            page = parameter;
        }
        if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
            pageSize = parameter;
        }
        params = {
            TableName: 'bb_book',
            FilterExpression: "(#themeId = :themeId) OR (#genreId = :genreId) OR (#authorId = :authorId)",
            ExpressionAttributeNames: {
                "#themeId": "themeId",
                "#genreId": "genreId",
                "#authorId": "authorId"
            },
            ExpressionAttributeValues: {
                ":themeId": theme,
                ":genreId": genre,
                ":authorId": author
            }
        };
        dbResult = await db.scan(params);
        return resp.stringify(200, dbResult.Items.slice((page - 1) * pageSize, page * pageSize));
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
    let page = 1, pageSize = 100;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_book',
        FilterExpression: "#favourite = :favourite",
        ExpressionAttributeNames: {
            "#favourite": "favourite"
        },
        ExpressionAttributeValues: {
            ":favourite": "true"
        },
        ScanIndexForward: true
    };
    let dbResult = await db.scan(params);
    return resp.stringify(200, dbResult.Items.slice((page - 1) * pageSize, page * pageSize));
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
    let page = 1, pageSize = 100;
    if ((parameter = param.getQueryParameter(event, "page")) != null) {
        page = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
        pageSize = parameter;
    }
    let params = {
        TableName: 'bb_book',
        FilterExpression: "#bestSellers = :bestSellers",
        ExpressionAttributeNames: {
            "#bestSellers": "bestSellers"
        },
        ExpressionAttributeValues: {
            ":bestSellers": "true"
        },
        ScanIndexForward: true
    };
    let dbResult = await db.scan(params);
    return resp.stringify(200, dbResult.Items.slice((page - 1) * pageSize, page * pageSize));
};

/*
/count/book - Count all books.
Query paramers :
    - theme : the theme of the books.
    - genre : the genre of the books.
    - author : the author of the books.
Example of requests : 
    ".../count/book"
    ".../count/book?theme=solitude&genre=narrative"
*/
exports.countFindAll = async (event) => {
    let theme, genre, author;
    if ((parameter = param.getQueryParameter(event, "theme")) != null) {
        theme = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "genre")) != null) {
        genre = parameter;
    }
    if ((parameter = param.getQueryParameter(event, "author")) != null) {
        author = parameter;
    }
    let params = {
        TableName: 'bb_book',
        ScanIndexForward: true
    };
    if (param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #genreId = :genreId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#genreId": "genreId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":genreId": genre,
            ":authorId": author
        }
    } else if (!param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#genreId = :genreId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#genreId": "genreId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":genreId": genre,
            ":authorId": author
        }
    } else if (param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":authorId": author
        }
    } else if (param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId AND #genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId",
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme,
            ":genreId": genre
        }
    } else if (!param.getQueryParameter(event, "theme") && param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#genreId = :genreId";
        params.ExpressionAttributeNames = {
            "#genreId": "genreId"
        };
        params.ExpressionAttributeValues = {
            ":genreId": genre
        }
    } else if (param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && !param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#themeId = :themeId";
        params.ExpressionAttributeNames = {
            "#themeId": "themeId"
        };
        params.ExpressionAttributeValues = {
            ":themeId": theme
        }
    }
    else if (!param.getQueryParameter(event, "theme") && !param.getQueryParameter(event, "genre") && param.getQueryParameter(event, "author")) {
        params.FilterExpression = "#authorId = :authorId";
        params.ExpressionAttributeNames = {
            "#authorId": "authorId"
        };
        params.ExpressionAttributeValues = {
            ":authorId": author
        }
    }
    let dbResult = await db.scan(params);
    let response = {
        "Elements": dbResult.Count
    }
    return resp.stringify(200, response);
};


/*
/count/book/similar/{isbn} - Count all similar books.
Example of request: ".../count/book/similar/9788447394567"
*/
exports.countFindSimilar = async (event) => {
    if ((parameter = param.getPathParameter(event, "isbn")) != null) {
        let isbn = parameter;
        let params = {
            TableName: 'bb_book',
            KeyConditionExpression: "#isbn = :isbn",
            ExpressionAttributeNames: {
                "#isbn": "isbn"
            },
            ExpressionAttributeValues: {
                ":isbn": isbn
            },
            ScanIndexForward: true
        };
        let dbResult = await db.query(params);
        let theme = dbResult.Items[0].themeId;
        let genre = dbResult.Items[0].genreId;
        let author = dbResult.Items[0].authorId;
        if ((parameter = param.getQueryParameter(event, "page")) != null) {
            page = parameter;
        }
        if ((parameter = param.getQueryParameter(event, "pageSize")) != null) {
            pageSize = parameter;
        }
        params = {
            TableName: 'bb_book',
            FilterExpression: "(#themeId = :themeId) OR (#genreId = :genreId) OR (#authorId = :authorId)",
            ExpressionAttributeNames: {
                "#themeId": "themeId",
                "#genreId": "genreId",
                "#authorId": "authorId"
            },
            ExpressionAttributeValues: {
                ":themeId": theme,
                ":genreId": genre,
                ":authorId": author
            }
        };
        dbResult = await db.scan(params);
        let response = {
            "Elements": dbResult.Count
        }
        return resp.stringify(200, response);
    } else {
        return resp.stringify(null);
    }

};

/*
/count/book/favourite - Count all favourite books.
Example of request: ".../count/book/favourite"
*/
exports.countFindFavourites = async (event) => {
    let params = {
        TableName: 'bb_book',
        FilterExpression: "#favourite = :favourite",
        ExpressionAttributeNames: {
            "#favourite": "favourite"
        },
        ExpressionAttributeValues: {
            ":favourite": "true"
        },
        ScanIndexForward: true
    };
    let dbResult = await db.scan(params);
    let response = {
        "Elements": dbResult.Count
    }
    return resp.stringify(200, response);
};

/*
/count/book/bestseller - Count all best seller books.
Example of request: ".../count/book/bestseller"
*/
exports.countFindBestSellers = async (event) => {
    let params = {
        TableName: 'bb_book',
        FilterExpression: "#bestSellers = :bestSellers",
        ExpressionAttributeNames: {
            "#bestSellers": "bestSellers"
        },
        ExpressionAttributeValues: {
            ":bestSellers": "true"
        },
        ScanIndexForward: true
    };
    let dbResult = await db.scan(params);
    let response = {
        "Elements": dbResult.Count
    }
    return resp.stringify(200, response);
};