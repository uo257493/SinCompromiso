class MongoDao {

    constructor(app, mongo) {
        this.mongo = mongo;
        this.app = app;
    }
   addUser(userID, funcionCallback){
        this.mongo.MongoClient.connect(this.app.get('db'), function(err, db) {
            if (err) {
                funcionCallback(null);
            } else {
                var ti = {userId : userID };
                console.log(ti);
                var collection = db.collection('usuarios');
                collection.insert(ti, function(err, result) {
                    if (err) {
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    }

}

module.exports = MongoDao;