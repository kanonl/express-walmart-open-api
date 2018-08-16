const express = require('express'),
    router = express.Router(),
    request = require('request'),
    { URL, URLSearchParams } = require('url');

router.get('/', (req, res) => {
    let url = new URL(req.config.walmartlabsUrl);
    url.pathname = '/v1/search';
    url.search = new URLSearchParams({
        apiKey: req.config.apiKey,
        query: req.query.q,
        numItems: 20
    });

    request(url.toString(), (err, response, body) => {
        if (err) throw new err;
        let data = JSON.parse(body);
        res.render('category', data);
    });
});

module.exports = router;