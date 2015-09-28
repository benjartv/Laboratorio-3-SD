var express = require('express');
var sha1 = require('sha1');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET users listing. */
router.get('/userlist2', function(req, res) {
    var db = req.db2;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/* GET users listing. */
router.get('/userlist3', function(req, res) {
    var db = req.db3;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/searchu1', function(req, res){
	var db = req.db;
    var collection = db.get('Alumnos');

    var institucion = req.body.institucion;

    console.log(req.body.institucion);

    collection.find({institucion : institucion},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/searchu2', function(req, res){
	var db = req.db2;
    var collection = db.get('Alumnos');

    var institucion = req.body.institucion;

    console.log(req.body.institucion);

    collection.find({institucion : institucion},{},function(e,docs){
    	
        res.json(docs);
    });
});

router.post('/searchu3', function(req, res){
	var db = req.db3;
    var collection = db.get('Alumnos');

    var institucion = req.body.institucion;

    console.log(req.body.institucion);

    collection.find({institucion : institucion},{},function(e,docs){
    	
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var db2 = req.db2;
    var db3 = req.db3;

    var collection = db.get('Alumnos');
    var collection2 = db2.get('Alumnos');
    var collection3 = db3.get('Alumnos');

    var hash = (parseInt(sha1(req.body.rut),16) % 3) + 1;
    console.log('sha1: ', sha1(req.body.rut));
    console.log('el hash es', hash);

    if (hash == 1) {
    	collection.insert(req.body, function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
    	});
    };
    if (hash == 2) {
    	collection2.insert(req.body, function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
    	});
    };
    if (hash == 3) {
	    collection3.insert(req.body, function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	    });
    };

});


module.exports = router;
