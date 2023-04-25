const { fs, multer, randomstring, express } = require('./Global');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Audios');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.Name}_${Date.now()}_${file.originalname}`);
    }
});

const sizeMB = 20;

const Maxfilesize = sizeMB * 1024 * 1024;

const upload = multer({
    storage: storage, limits: { fileSize: Maxfilesize }, fileFilter: (req, file, cb) => {
        if (file.mimetype == "audio/mpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb("Only mp3 files are  allowed");
        }
    }
}).single("Audio");

const unlinkfile = (file) => {
    if (file) {
        fs.unlink(file.path, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
        return true;
    }
    console.log("no file to delete");
    return false;

};
module.exports = { upload, unlinkfile, sizeMB, Maxfilesize };