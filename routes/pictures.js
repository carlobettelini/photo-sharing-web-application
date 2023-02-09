/**
 * Web Atelier 2020  Exercise 7 - Single-Page Web Applications with Fetch and Client-side Views
 *
 * Student: Carlo Bettelini
 *
 * /pictures router
 *
 */

const express = require('express');

const router = express.Router();
module.exports = router;

const fs = require('fs');

const models = require('../models').model;
const ObjectId = require('mongodb').ObjectId;

const eventBus = require('../ws').eventBus;

const { thumbnails_creator, duplicate } = require('../public/js/utilities.js');

let Filters = {
    "filter: blur(,px)": 0,
    "filter: brightness(,)": 1,
    "filter: grayscale(,%)": 2,
    "filter: contrast(,%)": 3
};


router.get('/', function(req, res) {

    // Filter objects:
    let filter = {};

    if (req.query.search) {
        filter = {
            $or: [
                { "title": { $regex: req.query.search } },
                { "description": { $regex: req.query.search } }
            ]
        };
    }

    models.pictures.find(filter).toArray().then((found) => {
        if (req.accepts("html")) {
            let output = {
                title: "Gallery",
                search: "",
                list: found
            };

            res.render("pictures", output);
        } else if (req.accepts("json")) {
            res.status(200);
            res.json(found);
        } else {
            res.status(406).end();
        }
    });

});


router.get("/slideshow", function(req, res) {

    let index, current_image;
    index = req.query.index;
    console.log("index:", index);
    models.pictures.find({}).toArray().then((array) => {

        if (index >= array.length) index = 0;
        current_image = array[index];

        index++;

        let model = {
            title: "Slideshow",
            current_image: current_image,
            message: "",
            index: index
        };

        if (req.accepts("html")) {
            res.render("slideshow", model);
        } else if (req.accepts("json")) {
            res.status(200);
            res.json(model);
        } else {
            res.status(406).end(); // not acceptable
        }
    });

})

router.get("/upload", function(req, res) {
    if (req.accepts("html")) {
        res.render("upload", {});
    } else {
        res.status(406).end(); // not acceptable
    }
});

router.get('/:id/download', function(req, res) {

    filter = { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then((result) => {

        if (result === null) {
            //not found
            res.status(404).end();
        } else {
            let path = "." + result.src;
            console.log("Path: ", path);
            res.download(path, result.filename);
        }

    });
});


router.post('/', async function(req, res) {

    if (!req.body.duplicate && (!req.files || Object.keys(req.files).length === 0)) {
        return res.status(400).send("missing files");
    }

    let file_name, file_datas, favourite, filter, title, temp;

    title = req.body.title;

    //select which file form field to work with
    if (req.files) {

        file_datas = req.files.file;
        file_datas.mv("./public/images/" + file_datas.name);

        file_name = file_datas.name;

    } else {
        try {
            let res = await duplicate(req.body, title);

            file_name = res.file_name;
            title = res.title;
        } catch (err) { console.error(err) }
    }
    console.log("values:", file_name, title);
    favourite = req.body.favourite ? true : false;
    filter = req.body.filter ? req.body.filter : "none";

    // create new object by parsing the POST body vars
    const new_pic = {

        author: req.body.email,
        description: req.body.description,
        favourite: favourite,
        filename: file_name,
        filter: filter,
        quality: req.body.range,
        src: "/public/images/" + file_name,
        src_thumb: "/public/thumbnails/" + file_name,
        title: title

    };

    // console.log("new pic", new_pic);

    // store the object in the collection
    models.pictures.insertOne(new_pic).then(async function(result) {

        // Creates thumbnail, with path and destination.
        try {
            let thumbnail = await thumbnails_creator("/../images/" + file_name, "/../thumbnails/" + file_name);
            console.log("Thumbnail promise:", thumbnail);
            //tell client object has been created
            res.status("201");

            if (req.accepts("html"))
                res.redirect("/pictures");
            else if (req.accepts("json"))
                res.json(new_pic);
            else res.status(406).end();

            //tell connected browsers that there is a new picture
            eventBus.emit('picture.created', new_pic);

        } catch (err) {
            res.status("500").end();
        }
    });
});


router.get('/:id/slideshow', function(req, res) {

    let id, index, found = false,
        stop;

    id = req.params.id;

    stop = (req.query.stop == 'true');

    models.pictures.find({}).toArray().then((array) => {
        array.forEach(image => {
            if (image._id == id) {
                current_image = image;
                found = true;
                index = array.indexOf(image);
            }
        });

        if (!found)
            res.status(404).end();

        else {
            res.status(200);

            if (stop)
                eventBus.emit('slideshow', index);
            else index++;

            if (req.accepts("json")) {
                res.json(index).end();
            } else {
                res.status(406).end();
            }
        }
    });
});

router.get('/:id/edit', function(req, res) {

    filter = { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then((result) => {
        console.log("result:", result);
        if (result === null) {
            //not found
            res.status(404).end();
        } else {
            let filter_image = req.query.filter;
            if (!filter_image) {
                filter_image = "none";
            }

            if (req.accepts("html")) {
                res.render("editor", {
                    current_filter: filter_image,
                    current_image: result
                });
            } else {
                res.status(406).end(); // not acceptable
            }
        }
    });

});

router.get('/:id/filters', function(req, res) {

    filter = { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then((result) => {

        if (result === null) {
            //not found
            res.status(404).end();
        } else {
            let filter_image = req.query.filter;
            if (!filter_image) {
                filter_image = "none";
            }

            if (req.accepts("html")) {
                res.render("filters", {
                    filters: Filters,
                    current_filter: filter_image,
                    current_image: result
                });
            } else {
                res.status(406).end(); // not acceptable
            }
        }
    });

});

router.put('/:id', function(req, res) {
    filter = { _id: new ObjectId(req.params.id) };
    models.pictures.findOne(filter).then((result) => {

        let favourite = false;
        if (req.body.favourite) {
            favourite = true;
        }

        const edit_pic = {
            _id: new ObjectId(req.params.id),
            title: req.body.title,
            description: req.body.description,
            favourite: favourite,
            filename: result.filename,
            src: result.src,
            src_thumb: result.src_thumb,
            filter: req.body.filter,
            author: result.author,
            quality: result.quality
        };

        console.log("edit", edit_pic);

        models.pictures.replaceOne(filter, edit_pic, { upsert: true })
            .then(result => {

                let found = (result.upsertedCount == 0);

                res.status(found ? 200 : 201);
                if (req.accepts("html")) {
                    res.redirect("/pictures");
                } else res.json(edit_pic);

                eventBus.emit('picture.updated', edit_pic);
            });
    });
});


router.delete('/:id', function(req, res) {
    filter = { _id: new ObjectId(req.params.id) };
    models.pictures.findOneAndDelete({ _id: new ObjectId(req.params.id) })
        .then(result => {

            // Problem with this, is that it's difficult to handle duplicates
            if (!result.value.duplicate) {

                // Delete file and thumbnail from folders
                const pathToFile = result.value.src;
                const pathToThumbnail = result.value.src_thumb;

                try {
                    fs.unlinkSync(__dirname + "/.." + pathToFile);
                    fs.unlinkSync(__dirname + "/.." + pathToThumbnail);
                    console.log("Successfully deleted the file.");
                } catch (err) {
                    throw err;
                }
            }

            if (result.value === null) {
                res.status(404).end();
            } else {
                if (req.accepts("html"))
                    res.redirect("/pictures");
                else if (req.accepts("json"))
                    res.json(result);
                else res.status(204).end();
            }

            eventBus.emit('picture.deleted', result.value);
        });
});