var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yappe');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//var jwt = require('jsonwebtoken');
//var bcrypt = require('bcryptjs');

var port = 8000;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });
});

var Beer     = require('./app/user');

router.route('/beers')
    .post(function(req, res) {
        // create a new instance of the beer model
        var beer = new Beer();
        // set the beers name (comes from the request)
        beer.name = req.body.name;

        // save the beer and check for errors
        beer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'beer created!' });
        });

    });

router.route('/beers')
    .get(function(req, res) {
        Beer.find(function(err, beers) {
            if (err)
                res.send(err);

            res.json(beers);
        });
    });


router.route('/beers/:beer_id')
    .get(function(req, res) {
        Beer.findById(req.params.beer_id, function(err, beer) {
            if (err)
                res.send(err);
            res.json(beer);
        });
    });

router.route('/beers/:beer_id')
    .put(function(req, res) {
        Beer.findById(req.params.beer_id, function(err, beer) {
            if (err)
                res.send(err);
            beer.name = req.body.name;  // update the beers info

            // save the beer
            beer.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Beer updated!' });
            });

        });
    });

router.route('/beers/:beer_id')
    .delete(function(req, res) {
            Beer.remove({
                _id: req.params.beer_id
            }, function(err, beer) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });


app.use('/api', router);

app.listen(port);
console.log('listening to port ' + port);
