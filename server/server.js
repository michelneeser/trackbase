const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('<strong>Hello!</strong>');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`uStats server started on port ${port}`));