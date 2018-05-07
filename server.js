const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const fetch        = require('node-fetch');
const quotesRouter = require('./routes/quotes');
const dotenv       = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/', (req, res) => {
    console.log(res)
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
