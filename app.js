// npm init
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser"); //include garnai parchha middleware post request handle ko laagi
const port = 3000;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/contactDance");
}

//Define mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model("Contact", contactSchema);

// Express specific stuffs
app.use("/public", express.static("public")); //for serving public files
app.use(express.urlencoded());

// Pug specific stuffs
app.set("view engine", "pug"); //set the template engine as pug
app.set("views", path.join(__dirname, "views")); //Set the views directory

// Endpoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});
//npm install body-parser //for getting post data yo install garnuparchha
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
//   res.status(200).render("contact.pug");
});

// Start the server
app.listen(port, () => {
  console.log("The application started successfully on the port" + port);
});
