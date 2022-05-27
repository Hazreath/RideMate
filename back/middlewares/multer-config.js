const multer = require("multer");
const AVATARS_FOLDER = "public/avatars";
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, AVATARS_FOLDER);
    },
    filename: (req, file, callback) => {
        // TODO : filename = userId

        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

module.exports = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log("UPLOADING SOMETHING");
        console.log(file);
    },
});
