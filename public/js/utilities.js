const fs_extra = require('fs-extra');
const fs = require('fs');

// For resizing the images.
const sharp = require('sharp');

const max_dim = 256;

function calculateAspectRatioFit(srcWidth, srcHeight, maxDim) {
    var ratio = Math.min(maxDim / srcWidth, maxDim / srcHeight);
    return [srcWidth * ratio, srcHeight * ratio];
}

function thumbnails_creator(path, destination) {
    return new Promise((res, rej) => {
        let extension = path.split('.').pop();
        //if (extension == ("jpg" || "jpeg" || "png" || "gif")) {

        fs_extra.readFile(__dirname + path, function (err, data) {
            if (err) {
                console.error(err);
                rej(err);
            } else {
                let image = sharp(data);
                image.metadata().then(function (metadata) {
                    let dimensions = calculateAspectRatioFit(metadata.width, metadata.height, max_dim);
                    image.resize(parseInt(dimensions[0]), parseInt(dimensions[1])).toFile(__dirname + destination, (err, info) => { 
                        if (err) {
                            console.error(err);
                            rej(err);
                        } else res("Thumbnail created");
                    });
                });
            }
        });
        //}
    });
}


function duplicate(body, title) {

    return new Promise((res, rej) => {
        let src, destination, file_name, orig_name, extension, copy_number = 0, temp, temp_2, is_already_copied = false;

        file_name = body.filename;
        extension = file_name.split(".").pop();

        temp = file_name.split(".")[0].split("-");
        temp_2 = temp[temp.length - 1];

        if (temp_2.includes("copy"))
            temp.splice(-1, 1);

        orig_name = temp.join("-");

        // Cercare cartella per sapere se ci sono altri nomi del file uguali con -copy.
        // struttura del nome del file in una copia: (filename)-copy_(numero).estensione
        let filenames = fs.readdirSync(__dirname + "/../images");
        filenames.forEach((name) => {
            let this_name = name.split(".")[0].split("-");
            temp_2 = this_name[this_name.length - 1];

            if (temp_2.includes("copy")) {
                this_name.splice(-1, 1);

                temp = this_name.join("-") == orig_name ? temp_2.split("_")[1] : undefined;

                if (temp)
                    if (temp >= copy_number)
                        copy_number = temp; is_already_copied = true;
            }
        });
        copy_number = is_already_copied ? parseInt(copy_number) + 1 : 0;

        // struttura del titolo in una copia: (title)-copy_(numero)
        temp_2 = title.split("-").pop();

        if (temp_2 && temp_2.includes("copy")) {
            temp = title.split("-");
            temp.splice(-1, 1);
            title = temp.join("-") + "-copy_" + copy_number;
        } else title += "-copy_" + copy_number;

        // costruire file_name
        temp_2 = file_name.split(".")[0].split("-").pop();

        if (temp_2 && temp_2.includes("copy")) {
            temp = file_name.split(".")[0].split("-");
            temp.splice(-1, 1);
            file_name = temp.join("-") + "-copy_" + copy_number + "." + extension;
        } else
            file_name = file_name.split(".")[0] + "-copy_" + copy_number + "." + extension;

        console.log("filename", file_name);
        console.log("title", title);

        src = __dirname + "/../images/" + body.filename;
        destination = __dirname + "/../images/" + file_name;

        fs_extra.copy(src, destination, function (err) {
            if (err) {
                console.error(err);
                rej(err);
            } else {

                let result = {
                    file_name: file_name,
                    title: title
                }

                res(result);
            }
        });
    });
}

module.exports.thumbnails_creator = thumbnails_creator;
module.exports.duplicate = duplicate;