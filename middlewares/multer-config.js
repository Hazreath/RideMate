const multer = require("multer");
const Settings = require("../settings");
const AVATARS_FOLDER = "public/avatars";

/**
 * ======== MULTER MIDDLEWARE ==========
 * Handles file upload such as new avatars.
 */
const storage = multer.diskStorage({
    /**
     * Saves current avatar file in AVATARS_FOLDER
     * @param {*} req
     * @param {*} file
     * @param {*} callback
     */
    destination: (req, file, callback) => {
        callback(null, Settings.AVATARS_FOLDER);
    },

    /**
     * AVATAR UPLOAD:
     * Rename avatar file with userId if user_id is correct,
     * and file MIME TYPE is contained in AVATAR_MIMES_TYPES
     * @param {*} req
     * @param {*} file
     * @param {*} callback
     */
    filename: (req, file, callback) => {
        // TODO : filename = userId
        // console.log("-------------- MULTERRRR ----------");
        let authorizationHeader = req.headers.authorization.split(" ");
        if (authorizationHeader.length <= 2) {
            // Error : userId missing in header
            callback(new Error("Missing user_id"));
        } else {
            let userId = authorizationHeader[2];

            const extension = Settings.AVATAR_MIME_TYPES[file.mimetype];
            if (extension) {
                const filename = userId + "." + extension;
                // console.log("created file " + filename);
                callback(null, filename);
            } else {
                callback(new Error("Bad mime type"));
            }
        }

        // console.log("-----------------------------");
    },
});

module.exports = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        // console.log("UPLOADING SOMETHING");
        // console.log(file);
    },
});
