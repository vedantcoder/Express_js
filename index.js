//Creating an express server

const express = require('express');     //importing express
const path = require('path');
const { json } = require('stream/consumers');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./members')

const app = express();          //saving the express service in a variable
const hbs = exphbs.create({});  //handlebars

//middleware
//app.use(logger); //logger

// Handlebars Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// Homepage Route
app.get('/', (req, res) => {
    res.render('index', {
        title: "Member app",
        members
    });
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*app.get('/', (req, res) => {            //creating a route '/', request, response
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
}) //this is not efficient since you need to type down all routes manually
*/

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;  //check for env variable if not available use 5000

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`)); //Starting the server

// Cannot GET / => cannot get '/' route
//we use this so that we dont have to restart the server evertime we make a change, nodemon will do that