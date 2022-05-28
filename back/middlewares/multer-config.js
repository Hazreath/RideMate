const multer = require("multer");
const Settings = require("../settings");
const AVATARS_FOLDER = "public/avatars";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, Settings.AVATARS_FOLDER);
    },
    filename: (req, file, callback) => {
        // TODO : filename = userId
        console.log("-------------- MULTERRRR ----------");
        let authorizationHeader = req.headers.authorization.split(" ");
        if (authorizationHeader.length <= 2) {
            // Error : userId missing in header
        } else {
            let userId = authorizationHeader[2];

            const extension = Settings.AVATAR_MIME_TYPES[file.mimetype];
            if (extension) {
                const filename = userId + "." + extension;
                console.log("created file " + filename);
                callback(null, filename);
            } else {
                callback(new Error("Bad mime type"));
            }
        }

        console.log("-----------------------------");
    },
});

module.exports = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log("UPLOADING SOMETHING");
        console.log(file);
    },
});
