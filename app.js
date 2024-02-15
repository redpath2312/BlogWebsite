//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ =  require("lodash");

const homeStartingContent =
	"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
	"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("home.ejs", { homeSC: homeStartingContent, renderedPosts: posts });
});

app.get("/home", (req, res) => {
	res.render("home.ejs", { homeSC: homeStartingContent, renderedPosts: posts });
});

app.get("/about", (req, res) => {
	res.render("about.ejs", { aboutCont: aboutContent });
});

app.get("/contact", (req, res) => {
	res.render("contact.ejs", { contactCont: contactContent });
});

app.get("/compose", (req, res) => {
	res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
	// console.log(req.body["blogTitle"]);
	// console.log(req.body["blogMain"]);
	const composeContent = {
		title: req.body.blogTitle,
		body: req.body.blogMain,
	};
	// console.log(composeContent);
	posts.push(composeContent);
	res.redirect("/");
});

app.get("/clear", (req, res) => {
	posts.length = 0;
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){

  	const storedTitle = _.lowerCase(post.title);
	
  	if (storedTitle === requestedTitle){
	  console.log("Match found");
	  res.render("post.ejs", {renderedPostTitle: post.title, renderedPostBody: post.body});
  	}
	else{
		console.log("No Match");
	}
	});
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});

