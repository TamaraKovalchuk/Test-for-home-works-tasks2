module.exports.getTeam = (url, dbClient, res, callback) => {
    dbClient.connect(url, function(err, client) {
        if (err) {
            return console.log(err);
        }
        const db = client.db("listReact");
        const collection = db.collection("teammates");

        // GET ALL
        collection.find({}).toArray(function(err, docs) {
            console.log("Found the following records");
            console.log(docs);
            callback(res, docs);
        });
        client.close();
    });
};

module.exports.deleteSomeStudent = (url, dbClient, res, studentId, callback) => {
    dbClient.connect(url, function(err, client) {
        if (err) {
            return console.log(err);
        }
        const db = client.db("listReact");
        const collection = db.collection("teammates");

        console.log(studentId);
         // DELETE
        collection.deleteOne({ id : studentId }, function(err, result) {
            console.log("Removed document");
            callback(res);
        });
        client.close();
    });
};

module.exports.insertNewStudent = (url, dbClient, res, student, callback) => {
    dbClient.connect(url, function(err, client) {
        if (err) {
            return console.log(err);
        }
        const db = client.db("listReact");
        const collection = db.collection("teammates");

       // INSERT/EDD
        collection.insertMany([
            student
          ], function(err, result) {
            console.log("Inserted document into the collection");
            callback(res, student);
          });
        client.close();
    });
};

module.exports.editStudent = (url, dbClient, res, studentId, student, callback) => {
    dbClient.connect(url, function(err, client) {
        if (err) {
            return console.log(err);
        }
        const db = client.db("listReact");
        const collection = db.collection("teammates");

       // EDIT
        collection.updateOne({ id : studentId }
            , { $set: { nameStudent : student.nameStudent } }, function(err, result) {
            console.log("Updated document");
            callback(res, student);
          });
        client.close();
    });
};