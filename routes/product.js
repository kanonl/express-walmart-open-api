const express = require('express'),
    router = express.Router(),
    request = require('request'),
    { URL, URLSearchParams } = require('url');

router.get('/:id/:name', (req, res) => {
    let url = new URL(req.config.walmartlabsUrl);
    url.pathname = `/v1/items/${req.params.id}`;
    url.search = new URLSearchParams({
        apiKey: req.config.apiKey
    });

    request(url.toString(), (err, response, body) => {
        if (err) throw new err;
        let data = JSON.parse(body);
        res.render('product', data);
    });
});

module.exports = router;