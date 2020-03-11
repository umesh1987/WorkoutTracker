//***************************************** */
// require dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

//declear the PORT
const PORT = process.env.PORT || 3000;

//connect to the mongo_db
mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json);
app.use(express.static("public"));

//set up routes
app.use(require("./routes/route"));
app.use(require("./routes/view"));




//start the server
app.listen(PORT, () => {
    console.log("Server run no: http://localhost:" + PORT);
});