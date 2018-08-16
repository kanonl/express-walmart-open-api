const express = require('express'),
    helmet = require('helmet'),
    compression = require('compression'),
    path = require('path'),
    fs = require('fs'),
    indexRouter = require('./routes/index'),
    productRouter = require('./routes/product'),
    categoryRouter = require('./routes/category'),
    nbpRouter = require('./routes/nbp'),
    reviewsRouter = require('./routes/reviews'),
    searchRouter = require('./routes/search'),
    app = express();

const config = (req, res, next) => {
    try {
        req.config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
    } catch (err) {
        req.config = {
            apiKey: process.env.API_KEY,
            walmartlabsUrl: process.env.WALMARTLABS_URL
        };
    }
    finally { next(); }
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', config, indexRouter);
app.use('/p', config, productRouter);
app.use('/c', config, categoryRouter);
app.use('/nbp', config, nbpRouter);
app.use('/reviews', config, reviewsRouter);
app.use('/search', config, searchRouter);

fs.readFile(path.join(__dirname, 'taxonomy.json'), 'utf8', (err, data) => {
    if (err) throw new Error(err.message);
    let taxonomy = JSON.parse(data);
    app.locals.categories = taxonomy.categories;
});

app.listen(process.env.PORT || 5000);
