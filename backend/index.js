const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authVerify = require('./middleware/authVerify');
const app = express();
const port = 3000;


app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    credentials: true,
}
));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads/'));

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));



app.get('/',  (req, res) => {
    res.send('Backend Server working!');
});



app.listen(port, async () => {
    console.log(`Server listening at http://localhost:${port}`);
    await connectDB();
});