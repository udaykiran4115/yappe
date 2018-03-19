var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yappe');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/beers')

    // create a beer (accessed at POST http://localhost:8080/api/beers)
    .post(function(req, res) {

        var beer = new Beer();      // create a new instance of the beer model
        beer.name = req.body.name;  // set the beers name (comes from the request)

        // save the beer and check for errors
        beer.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'beer created!' });
        });

    });

    .get(function(req, res) {
        Beer.find(function(err, beers) {
            if (err)
                res.send(err);

            res.json(beers);
        });
    });


router.route('/beers/:beer_id')

    // get the beer with that id (accessed at GET http://localhost:8080/api/beers/:beer_id)
    .get(function(req, res) {
        Beer.findById(req.params.beer_id, function(err, beer) {
            if (err)
                res.send(err);
            res.json(beer);
        });
    });

    .put(function(req, res) {

        // use our beer model to find the beer we want
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
console.log('Magic happens on port ' + port);
