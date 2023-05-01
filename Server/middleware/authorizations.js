const { query } = require('../Global_imports/Global');

const admin = async (req, res, next) => {
    const { token } = req.headers;
    const admin = await query("select * from users where token = ? AND is_admin=?", [token, 1]);
    if (admin[0]) {
        res.locals.user = admin[0];
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
    if (user[0] && user[0].is_accepted) {
        res.locals.user = user[0];
        next();
    }
    else {
        res.status(403).json({
            msg: !user[0] ? "you are not authorized to access this route !" : "the admin did not accept your account yet",
        });
    }
};

module.exports = { admin, authorized };