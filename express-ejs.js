let mongoDBFunctions = require("./mongo-DB-functions.js");
const mongoClient = require("mongodb").MongoClient;
const urlDB = "mongodb://localhost:27017/";
const path = require("path");
const express = require("express");
const app = express();

// setup body parsers
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let saveData;
let freeId = 9;

const router = express.Router();
/* GET users listing. */
router.get("/", function(req, res, next) {
    mongoDBFunctions.getTeam(urlDB, mongoClient, res, (res, data) => {
        res.send(data);
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
        firstName: req.body.firstname,
        lastName: req.body.lastname
    };
    mongoDBFunctions.insertNewStudent(urlDB, mongoClient, res, newStudent, (res, Student) => {
        res.send(Student);
    });

});
//edit
router.post("/edit/:id", (req, res) => {
     let student = {
        firstName: req.body.firstname,
        lastName: req.body.lastname
    };
    mongoDBFunctions.editStudent(urlDB, mongoClient, res,
     parseInt(req.params.id), student, (res, student) => {
        res.send(student);
    });
});

let port = 3000;
app.use("/", router);
app.set("port", port);
const http = require("http");
let server = http.createServer(app);
server.listen(port);
