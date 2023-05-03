const { query } = require("../Global_imports/Global");

const user_get_search = async (value) => {
    try {
        return await query(`SELECT name,email,phone,image,is_admin,is_verified,is_accepted,last_login,created_at,updated_at FROM users WHERE Name LIKE '%${value || ""}%'`);
    } catch (err) {
        return false;
    }
};

const user_get = async (value) => {
    try {
        return await query(`SELECT name,email,phone,image,is_admin,is_verified,is_accepted,last_login,created_at,updated_at FROM users WHERE Name = '${value}'`);
    } catch (err) {
        return false;
    }
};


const user_put_model = (data, user) => {
    return {
        "name": data.newname || data.name,
        "email": data.email || user[0].email,
        "phone": data.phone || user[0].phone,
        "is_accepted": data.is_accepted || user[0].is_accepted
    };
};
module.exports = { user_get_search, user_get, user_put_model };