const express = require('express');
const app = express();
const config = require('config')
const host = config.get('app.host')
const port = config.get('app.port')

app.get('/', (req, res) => {
  res.send('Welcome to AICheckup!');
});

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`);
});