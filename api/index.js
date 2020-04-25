const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const run = async () => {
  app.listen(port, () => {
    console.log(`HTTP Server started on ${port} port!`);
  });
};

run().catch(error => {
  console.error(error);
});