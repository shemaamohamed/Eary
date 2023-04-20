const { fs, multer, randomstring } = require('./Global');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Audios');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.Name} ${randomstring.generate()}.mp3`);
    }
});

const sizeMB = 20;

const filesize = sizeMB * 1024 * 1024;

const upload = multer({
    storage: storage, limits: { fileSize: filesize }, fileFilter: (req, file, cb) => {
        if (file.mimetype == "audio/mpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only mp3 files are allowed'));
        }
    }
}).single("Audio");

const unlinkfile = (file, error) => {
    if (file) {
        fs.unlink(file.path, (error) => {
            if (error) {
                console.error(error);
                return;
            }
        });
    }
    return;

};
module.exports = { upload, unlinkfile };