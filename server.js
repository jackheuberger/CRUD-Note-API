const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

console.log(dbConfig.url)

//Connect to Mongoose
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() =>{
    console.log('Connected to database')
}).catch(() =>{
    console.log('Couldn\'t connect. Exiting...')
    process.exit()
})

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Notes app!"});
});

require('./app/routes/note.routes')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});