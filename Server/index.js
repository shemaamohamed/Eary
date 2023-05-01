const { express, cors } = require('./Global_imports/Global');

const { PORT, HOST } = require('./dotenv');

const app = express();

const questionsRoute = require('./Routes/questionRoute');
const examsRoute = require('./Routes/examRoute');
const historyRoute = require('./Routes/historyRoute');
const userRouter = require('./Routes/userRoute');
const useradminRoute = require('./Routes/useradminRoute');
const webRouter = require('./Routes/webRoute');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.use('/api', userRouter);
app.use('/useradmin', useradminRoute);
app.use('/', webRouter);
app.use('/questions', questionsRoute);
app.use('/exams', examsRoute);
app.use('/history', historyRoute);



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