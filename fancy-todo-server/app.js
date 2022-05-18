if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler')

app.use('/', router);
app.use('/', errorHandler)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
