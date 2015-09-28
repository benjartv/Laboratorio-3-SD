var express = require('express');
var sha1 = require('sha1');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlistall', function(req, res) {
    var db = req.db;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
    	var db2 = req.db2;
	    var collection2 = db2.get('Alumnos');
	    collection2.find({},{},function(e,docs2){
            var db3 = req.db3;
            var collection3 = db3.get('Alumnos');
            collection3.find({},{},function(e,docs3){
                res.render('userlistall', {
                    "userlist" : docs,
                    "userlist2": docs2,
                    "userlist3" : docs3
                });
            });
	    });
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });

});

/* GET Userlist page. */
router.get('/userlist2', function(req, res) {
    var db = req.db2;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.render('userlist2', {
            "userlist2" : docs
        });
    });

});

/* GET Userlist page. */
router.get('/userlist3', function(req, res) {
    var db = req.db3;
    var collection = db.get('Alumnos');
    collection.find({},{},function(e,docs){
        res.render('userlist3', {
            "userlist3" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Agregar Nuevo Alumno' });
});

router.get('/consultarut', function(req, res){
	res.render('consultarut', {title: 'Consulta por Rut'});
});

router.post('/search', function(req, res){
	var db = req.db;
	var db2 = req.db2;
	var db3 = req.db3;

    var rut = req.body.rut;

    var collection = db.get('Alumnos');
    var collection2 = db2.get('Alumnos');
    var collection3 = db3.get('Alumnos');

    collection.find({rut : rut},{},function(e,docs){
        res.json(docs);
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    var db2 = req.db2;
    var db3 = req.db3;

    // Get our form values. These rely on the "name" attributes
    var userRut = req.body.rut;
    var userName = req.body.nombre;
    var userLastname = req.body.apellido;
    var userInstitucion = req.body.institucion;

    // Set our collection
    var collection = db.get('Alumnos');
    var collection2 = db2.get('Alumnos');
    var collection3 = db3.get('Alumnos');

    // Submit to the DB
    var hash = (parseInt(sha1(userRut),16) % 3) + 1;
    console.log('sha1: ', sha1(userRut));
    console.log('el hash es', hash);


    if (hash == 1) {
    	collection.insert({
    	"rut" : userRut,
        "name" : userName,
        "apellido" : userLastname,
        "institucion" : userInstitucion
    	}, function (err, doc) {
	        if (err) {
	            // If it failed, return error
	            res.send("There was a problem adding the information to the database.");
	        }
	        else {
	            // And forward to success page
	            res.redirect("/");
	        }
    	});
    };
    if (hash == 2) {
    	collection2.insert({
    	"rut" : userRut,
        "name" : userName,
        "apellido" : userLastname,
        "institucion" : userInstitucion
    	}, function (err, doc) {
	        if (err) {
	            // If it failed, return error
	            res.send("There was a problem adding the information to the database.");
	        }
	        else {
	            // And forward to success page
	            res.redirect("/");
	        }
    	});
    };
    if (hash == 3) {
    	collection3.insert({
    	"rut" : userRut,
        "name" : userName,
        "apellido" : userLastname,
        "institucion" : userInstitucion
	    }, function (err, doc) {
	        if (err) {
	            // If it failed, return error
	            res.send("There was a problem adding the information to the database.");
	        }
	        else {
	            // And forward to success page
	            res.redirect("/");
	        }
	    });
    };
    
});







