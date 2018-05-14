const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const path         = require('path');
const fetch        = require('node-fetch');
const dotenv       = require('dotenv');
const faveRouter   = require('./routes/router.js');
const controller   = require('./controllers/controller');
const authRouter   = require('./routes/authRouter');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(controller.receiveToken, controller.getUserFromToken);
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/faves', faveRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
