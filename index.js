const { MongoClient } = require('mongodb');
const uri = 'mongodb://10.10.2.75:27018';
const client = new MongoClient(uri);

const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json());
const port = 5000;

server.post('/postPurchase', async (req, resp) => {
  let dbConnect = await client.connect();
  myCollection = dbConnect.db('dcc').collection('purchases');
  if (!req.body?.productId) {
    console.log(req);
    resp.status(400).send('No product id');
    return;
  } else {
    let purchase = {
      ...req.body,
      purchaseDate: new Date(),
    };
    result = await myCollection.insertOne(purchase);
    resp.status(200).send(result);
  }
});

server.get('/getPurchases', async (req, resp) => {
  let dbConnect = await client.connect();
  myCollection = dbConnect.db('dcc').collection('purchases');
  result = await myCollection.find().toArray();
  resp.status(200).send(result);
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
