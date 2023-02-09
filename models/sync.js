/**
 * Web Atelier 2020  Exercise 6 - Persistent Web Applications with MongoDB
 *
 * Student: Carlo Bettelini
 *
 * Task 2
 *
 */

const fs_extra = require('fs-extra');

const functions = require('../public/js/utilities.js');
const thumbnails_creator = functions.thumbnails_creator;


/**
* @param {number[]} a - The first array of numbers.
* @param {number[]} b - The second array of numbers.
* @return {number[]} An array with the elements found both in `a` and `b`.
*/
function array_intersect(a, b) {
    if (!Array.isArray(a) || (!Array.isArray(b))) return undefined;
    if (a == b) return a;
    var result = [];

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] == b[j]) result.push(a[i]);
        }
    }

    return result;
}

/**
 * @param {number[]} a - The first array of numbers.
 * @param {number[]} b - The second array of numbers.
 * @return {number[]} An array with the elements found in `a` but not in `b`.
 */
function array_difference(a, b) {
    if (!Array.isArray(a) || (!Array.isArray(b))) return undefined;
    if (b.length == 0 && a.length > 0) return a;

    function isDifferent(value) {
        return (!b.includes(value));
    }

    var result = a.filter(isDifferent);

    return result;
}


module.exports.check = function (db_pictures, folder) {
    // tutto quanto all'interno della funzione è la closure di check
    // Pertanto le variabili definite all'esterno della promessa, 
    // possono essere usate anche all'esterno della promessa.
    let filenames = [];
    let images;

    return new Promise((resolve, reject) => {
        
        db_pictures.find({}).toArray().then((found) => {
            found.forEach((file) => {
                filenames.push(file.filename);
            });

            try {

                images = fs_extra.readdirSync(__dirname + folder);
                thumbnails = fs_extra.readdirSync(__dirname + "/../public/thumbnails");

            } catch (err) {
                reject(err);
            }

            /**
            * The missing_object array lists the ids of the newly created picture objects
            * The missing_file array lists the ids of the objects flagged with missing_file: true
            * The object_file_ok array lists the ids of all other objects. 
            */
            let missing_object = array_difference(images, filenames);
            let missing_file = array_difference(filenames, images);
            let object_file_ok = array_intersect(images, filenames);
            let missing_thumbnails = array_difference(images, thumbnails);

            missing_object.forEach((id) => {
                let extension = id.split(".")[1];
                if (extension == 'jpeg' || extension == 'jpg' || extension == 'png') {
                    // Creates new image object.
                    const new_pic = {
                        title: id,
                        filename: id,
                        src: "/public/images/" + id,
                        src_thumb: "/public/thumbnails/" + id
                    };

                    //store the object in the collection
                    db_pictures.insertOne(new_pic).then(result => {

                        try {
                            // Creates thumbnail, with path and destination.
                            thumbnails_creator("/../images/" + id, "/../thumbnails/" + id);
                        } catch (err) {
                            reject(err);
                        }

                    });
                }
            });

            missing_thumbnails.forEach((thumbnail) => {

                try {
                    // Creates thumbnail, with path and destination.
                    thumbnails_creator("/../images/" + thumbnail, "/../thumbnails/" + thumbnail);
                } catch (err) {
                    reject(err);
                }

            });

            missing_file.forEach((id) => {
                found.forEach((object) => {
                    if (id == object.filename)
                        object.missing_file = true;
                });
            });

            object_file_ok.forEach((id) => {
                found.forEach((object) => {
                    if (id == object.filename) {
                        if (object.missing_file)
                            object.missing_file = false;
                    }
                });
            });

            let result = {
                missing_thumbnails: missing_thumbnails,
                missing_object: missing_object,
                missing_file: missing_file,
                object_file_ok: object_file_ok
            }

            resolve(result);
        });
    });
}
