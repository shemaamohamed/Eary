const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors');
const env = require("dotenv").config;
// require('./DataBase/dbconnection');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Audios');
    },
    filename: function (req, file, cb) {
        cb(null, `1 ${file.originalname}`);
    }
});
const upload = multer({ storage: storage }).single("audio");

const quistionsRoute = require('./Routes/quistionRoute.js');
// const userRouter = require('./Routes/userRoute.js');
// const webRouter = require('./Routes/webRoute.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

// app.use('/api', userRouter);
// app.use('/', webRouter);
app.use('/quistions', quistionsRoute);

app.post("/audio", (req, res) => {
    data = req.body;
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send("Something went wrong!");
        }
        res.send(data);
    });
});
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});


const PORT = process.env.PORT || "4000";
const HOST = process.env.HOST || "localhost";







app.listen(PORT, HOST, () => {
    console.log(`running...
    http://${HOST}:${PORT}`
    );
});


// const PORT = process.env.PORT || "4000";
// const HOST = process.env.HOST || "localhost";

// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     page = "inde.html";
//     res.setHeader("content-type", "inde.html");
//     fs.readFile(page, (err, data) => {
//         res.end(err ? err : data);
//     });


// });

// server.listen(PORT, HOST, (res) => {
//     console.log(`http://${HOST}:${PORT}`);
// });