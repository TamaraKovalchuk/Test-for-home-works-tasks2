let MongoClient = require("mongodb").MongoClient;
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017/", function(err, client){

    if(err){
        return console.log(err);
    }
    const db = client.db("teamlist");
    const collection = db.collection('teammates');
    let idStudent = collection.find({id: {$eq: 3}}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs[0].firstName);
        console.log(docs[0].lastName);
      });

    // GET ALL
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs);
      });

    // INSERT/EDD
    collection.insertMany([
        {id: 10, firstName: 'Viktoria', lastName: 'Alla'}
      ], function(err, result) {
        console.log("Inserted document into the collection");
      });
    // EDIT
    collection.updateOne({ id : 10 }
        , { $set: { lastName : 'Koala' } }, function(err, result) {
        console.log("Updated document");
      });
    // DELETE
    collection.deleteOne({ id : 4 }, function(err, result) {
        console.log("Removed document");
    });
    client.close();
});