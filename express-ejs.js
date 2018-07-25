let mongoDBFunctions = require("./mongo-DB-functions.js");
const mongoClient = require("mongodb").MongoClient;
const urlDB = "mongodb://localhost:27017/";
const path = require("path");
const express = require("express");
const app = express();
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// setup body parsers
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'react-static')));

app.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname, 'react-static', 'index.html'));
});

let saveData;
let freeId = 9;

const router = express.Router();
/* GET users listing. */
router.get("/users", function(req, res, next) {
    console.log('Getting todos');
    mongoDBFunctions.getTeam(urlDB, mongoClient, res, (res, data) => {
        res.send({"teammates": data});
    });
});

//request:delete
router.delete("/delete/:id", (req, res) => {
    mongoDBFunctions.deleteSomeStudent(urlDB, mongoClient, res, parseInt(req.params.id), (res) => {
        res.send();
    });

});
//add
router.post("/", (req, res) => {
    console.log(req.body);
    let newStudent = {
        id: freeId++,
        nameStudent: req.body.nameStudent
    };
    mongoDBFunctions.insertNewStudent(urlDB, mongoClient, res, newStudent, (res, Student) => {
        res.send(Student);
    });

});
//edit
router.post("/edit/:id", (req, res) => {
     let student = {
        nameStudent: req.body.nameStudent
    };
    mongoDBFunctions.editStudent(urlDB, mongoClient, res,
     parseInt(req.params.id), student, (res, student) => {
        res.send(student);
    });
});

let port = 4000;
app.use("/", router);
app.set("port", port);
const http = require("http");
let server = http.createServer(app);
server.listen(port);
