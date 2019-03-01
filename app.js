var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var expressHbs = require('express-handlebars');

var app = express();
var bodyParser = require("body-parser");

// all environments
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// view engine setup
app.engine('.handlebars', expressHbs({
    extname: '.handlebars'
}));

// first page that opens up
//var login_page = require ("./routes/login");
var login = require ("./routes/login");
var homepage = require("./routes/homepage")
var trackers = require ("./routes/trackers")
//var postdata = require("./routes/trackers")
var faq = require("./routes/faq")
var register = require ("./routes/register")
var edit = require("./routes/edit")
var index2 = require("./routes/index2")

app.get("/", login.view);
app.get("/homepage", homepage.view);
app.get("/faq", faq.view);
app.get("/trackers", trackers.view);
app.post("/trackers",trackers.post);

app.get("/index2", index2.view);
app.post("/index2", index2.post);

app.get("/trackerdata", trackers.getData);
app.post("/trackerdelete", trackers.trackerDelete);
app.post("/editSave",trackers.trackerSaveEdited)
app.post("/trackeredit/", trackers.trackerEdit);
app.get("/edit", edit.view);
app.get("/register", register.view)

app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
