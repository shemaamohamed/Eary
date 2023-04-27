const { query } = require('../Global_imports/Global');

const admin = async (req, res, next) => {
    const { token } = req.headers;
    const admin = await query("select * from users where token = ?", [token]);
    if (admin[0] && admin[0].is_admin == 1) {
        next();
    } else {
        return res.status(403).json({
            msg: "you are not authorized to access this route !",
        });
    }
};

const authorized = async (req, res, next) => {
    const { token } = req.headers;
    const user = await query("select * from users where token = ?", [token]);
    if (user[0]) {
        res.locals.user = user[0];
        next();
    } else {
        res.status(403).json({
            msg: "you are not authorized to access this route !",
        });
    }
};

module.exports = { admin, authorized };