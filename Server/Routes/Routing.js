const router_template = (router, get_req, post_req, put_req, delete_req) => {
    router.get('/', get_req);

    router.post('/', post_req);

    router.put('/', put_req);

    router.delete('/', delete_req);
};

module.exports = { router_template };