var mongoose     = require('mongoose');
var BeerSchema       = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Beer', BeerSchema);
