const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// middleware1;
app.use(function (req, res, next) {
  req.myName = "Arpan";
  console.log("middleware 1 called");
  next();
});
// middleware2;
app.use(function (req, res, next) {
  console.log("My Name from MW2", req.myName);
  console.log("middleware 2 called");
  next();
});

var contactList = [
  {
    name: "Shubham",
    phone: "8847611119",
  },
  {
    name: "harshit",
    phone: "1234567890",
  },
  {
    name: "priya",
    phone: "9876587412",
  },
];

app.get("/", function (req, res) {
  return res.render("home", {
    title: "My Contact",
    heading: "My Contact List",
    contact_list: contactList,
  });
  //res.send("<h1>Cool , it is running</h1>");
});

app.post("/create-contact", function (req, res) {
  contactList.push(req.body);
  return res.redirect("/");
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("My express app is on the port", port);
});
