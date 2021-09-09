const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codiel_development', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("**************connected to db successfully*************")
});

module.exports = db;