const { express, cors } = require('./Global_imports/Global');

const { PORT, HOST } = require('./dotenv');

const app = express();

const quistionsRoute = require('./Routes/quistionRoute');
const examsRoute = require('./Routes/examRoute');
const userRouter = require('./Routes/userRoute');
const webRouter = require('./Routes/webRoute');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/api', userRouter);
app.use('/', webRouter);
app.use('/questions', quistionsRoute);
app.use('/exams', examsRoute);



app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});








app.listen(PORT, HOST, () => {
    console.log(`running...
    http://${HOST}:${PORT}`
    );
});