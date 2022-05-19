const express = require('express');
require('dotenv').config();
const res = require('express/lib/response');
var genuuid = require('uuid').v4;
const session = require('express-session');


const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const api = require('./server/api');
const db = require('./server/db');

const MongoStore = require('connect-mongo');


db.connect({
    host: "cluster0.viwun.mongodb.net",
    username: "ankita",
    password: "shreya",
    database: "giphy"
}).then(() => {
    app.use('/api', session({
        genid() {
            return genuuid()
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: "qwertyuiop",
        resave: false,
        saveUninitialized: true,
    }), api);

    if ( process.env.NODE_ENV == "production"){

        app.use(express.static("client/build"));
    
        const path = require("path");
    
        app.get("*", (req, res) => {
    
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    
        })
    
    }

    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});
