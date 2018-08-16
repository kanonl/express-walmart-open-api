const express = require('express'),
    router = express.Router(),
    request = require('request'),
    { URL, URLSearchParams } = require('url');

router.get('/:id', (req, res) => {
    let url = new URL(req.config.walmartlabsUrl);
    url.pathname = '/v1/nbp';
    url.search = new URLSearchParams({
        apiKey: req.config.apiKey,
        itemId: req.params.id
    });

    request(url.toString(), (err, response, body) => {
        if (err) throw new err;
        let { statusCode } = response;
        if (statusCode === 200) {
            let data = JSON.parse(body);
            res.send(data);
        } else {
            res.sendStatus(statusCode);
        }
    });
});

module.exports = router;