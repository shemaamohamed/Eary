const { admin, authorized } = require('../middleware/authorizations');

const { fs, query, global_get, global_insert, global_delete, global_update } = require('../Global_imports/Global');

const { user_get_search, user_get, user_put_model } = require('../Models/userModel');


let status = 400, message = "the operation was not successful";
const get_user = async (req, res) => {
    admin(req, res, async () => {
        status = 400;
        const currentuser = res.locals.user;
        const data = req.body;
        const users = await user_get_search(data.name);
        if (!data.name && !users[0]) {
            status = 204;
            message = "no content";
        }
        else if (!users[0]) {
            status = 404;
            message = "Not Found";
        }
        else if (users.length == 1 && users[0].name == currentuser.name) {
            message = "you can not get your account throw this request";
        }
        else {
            const currentuserindex = await users.findIndex((user) => user.name == currentuser.name);
            if (currentuserindex  >= 0)
                users.splice(currentuserindex, 1);
            status = 200;
            message = users;
        }
        res.status(status).send(message);
    });
};

const post_user = (req, res) => {
    admin(req, res, async () => {
        return res.sendStatus(404);
    });
};

const put_user = (req, res) => {
    admin(req, res, async (err) => {
        status = 400;
        const data = req.body;
        const currentuser = res.locals.user;
        const user = await global_get("users", "Name", data.name);
        if (err) {
            message = err.message;
        }
        else if (!user[0]) {
            status = 404;
            message = "Not Found";
        }
        else if (user[0].name == currentuser.name) {
            message = "you can not modify your account throw this request";
        }
        else {
            const data_sql = user_put_model(data, user);
            const update_user = await global_update("users", data_sql, "Name", data.name);
            if (!update_user) {
                message = "could not update user";
            }
            else {
                status = 200;
                message = "user updated";
            }
        }
        res.status(status).send(message);
    });
};

const delete_user = (req, res) => {
    admin(req, res, async () => {
        status = 400;
        const currentuser = res.locals.user;
        const data = req.body;
        if (!data.name) {
            status = 404;
            message = "Not Found";
        }
        else {
            const userByName = await user_get(data.name);
            if (!userByName[0]) {
                status = 404;
                message = "Not Found";
            }
            else if (userByName[0].name == currentuser.name) {
                message = "you can not delete your account throw this request";
            }
            else {
                const del = await global_delete("users", "Name", data.name);
                if (del) {
                    fs.unlink(userByName[0].image, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                    status = 200;
                    message = "user deleted";
                }
                else {
                    message = "could not delete";
                }

            }
        }
        res.status(status).send(message);
    });
};

module.exports = { get_user, post_user, put_user, delete_user };