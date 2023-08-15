require('dotenv').config()
const exp = require('constants');
const express = require('express');
const app = express();

const raceRoutes = require('./routes/races');
const resultRoutes = require('./routes/results');
const driverStandingsRoutes = require('./routes/driverStandings')
const userRoutes = require('./routes/user')
const { default: mongoose } = require('mongoose');

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use('/races', raceRoutes);
app.use('/results', resultRoutes);
app.use('/standings/drivers', driverStandingsRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        //serve the index file
        const path = require('path');
        app.use(express.static(path.resolve(__dirname, "./frontend/build")));
        app.get("*", function(req, res) {
            res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
        });
        app.listen(process.env.PORT, (req,res) => {
        console.log('Listening on PORT');
        })
    })
    .catch((err) => console.log(err));