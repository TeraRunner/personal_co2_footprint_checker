const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
const parser = require("body-parser");
const createRouter = require("./helpers/create_router.js");

const publicPath = path.join(__dirname, "../client/public");
app.use(express.static(publicPath));
app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
  .then( (client) => {
    const db = client.db('co2footprint');

    const userFootprintsCollection = db.collection('userFootprints');
    const countryFootprintsCollection = db.collection('countryFootprints');

    const userFootprintsRouter = createRouter(userFootprintsCollection);
    const countryFootprintsRouter = createRouter(countryFootprintsCollection);

    app.use('/api/userfootprint', userFootprintsRouter);
    app.use('/api/countryfootprint', countryFootprintsRouter)
  })
  .catch(console.error);

app.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
});
