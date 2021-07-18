var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.promise = global.promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConfig = require("./config/database.config");

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successflly connected to the db"))
  .catch(() => console.log("Could not conntected to the db "));

require("./app/routes/note.routes")(app);

app.listen(3000, () => {
  console.log("listing at port at num 3000");
});
