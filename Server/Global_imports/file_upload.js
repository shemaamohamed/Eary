const { fs, multer } = require('./Global');

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
            return cb(new Error("Only mp3 files are  allowed"));
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
    return false;

};
module.exports = { upload, unlinkfile, sizeMB, Maxfilesize };