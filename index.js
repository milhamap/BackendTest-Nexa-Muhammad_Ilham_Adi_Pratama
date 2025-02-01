const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const userRouter = require('./src/routes/users');
const employeeRouter = require('./src/routes/employees');

const app = express();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(cors());
app.use(morgan('dev'));
app.use(multer({ fileFilter: fileFilter}).fields([{ name: 'photo', maxCount: 1 }, { name: 'photos', maxCount: 8 }]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/employees', employeeRouter);
app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})

module.exports = app;