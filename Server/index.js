const { express, fs, cors, multer } = require('./Global_imports/Global');

const app = express();


const quistionsRoute = require('./Routes/quistionRoute');
const examsRoute = require('./Routes/examRoute');
const userRouter = require('./Routes/userRoute.js');
const webRouter = require('./Routes/webRoute.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/api', userRouter);
app.use('/', webRouter);
app.use('/quistions', quistionsRoute);
app.use('/exams', examsRoute);



app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});


const PORT = "4000";
const HOST = "localhost";







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