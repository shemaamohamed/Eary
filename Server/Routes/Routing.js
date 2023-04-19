const { router } = require("../Global_imports/Global");

const router_template = (get_req, post_req, put_req, delete_req) => {
    router.get('/', get_req);

    router.post('/', post_req);

    router.put('/', put_req);

    router.delete('/', delete_req);
};

module.exports = { router, router_template };