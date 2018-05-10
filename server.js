const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const fetch        = require('node-fetch');
const dotenv       = require('dotenv');
const router       = require('./routes/router.js');
const controller   = require('./controllers/controller');
const methodOver   = require('method-override');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(controller.receiveToken);
app.use(methodOver('_method'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
