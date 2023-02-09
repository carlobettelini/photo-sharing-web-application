/**
 * Web Atelier 2020  Exercise 6 - Persistent Web Applications with MongoDB
 *
 * Student: Carlo Bettelini
 *
 * Task 1
 *
 */

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongodb_uri = 'mongodb://0.0.0.0:27017/';
const db_name = 'web-atelier-album';

const sync = require('./sync.js');
const check = sync.check;

const model = {};

MongoClient
    .connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log("Connected to ", mongodb_uri);
        model.db = client.db(db_name);
        model.pictures = model.db.collection('pictures');

        check(model.pictures, "/../public/images").then((result) => {
            console.log("Missing files:", result.missing_file);
            console.log("Missing objects:", result.missing_object);
            console.log("Missing thumbnails:", result.missing_thumbnails);
        }).catch(err => console.error(err));
    })
    .catch(err => console.error(err));

exports.model = model;