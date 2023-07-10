//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Welcome to my DA-2 project! We're excited that you've discovered our website and are taking the time to explore it. Our goal is to provide helpful information on how you can route to different pages on ExpressJS. ExpressJS is a popular web application framework for Node.js that allows you to build powerful, scalable, and flexible web applications. One of the key features of ExpressJS is its routing system, which enables you to define how your application responds to client requests.";
const aboutContent =
  "At DA-2 project, we're passionate about helping developers learn and master ExpressJS routing. Our team is made up of experienced web developers who have worked with ExpressJS extensively and are dedicated to sharing their knowledge and expertise with others. We believe that learning should be accessible, engaging, and fun, and that's why we've created this website. Our goal is to provide high-quality, accurate, and up-to-date information on ExpressJS routing that can help developers of all skill levels improve their skills and build better web applications.";
const contactContent =
  "We'd love to hear from you! Contact us via email at ojasaklechayt@gmail.com, or via social media on Github/Twitter/Linkedin. Thank you for visiting DA-2!";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutcontent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactcontent: contactContent});
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postname", function(req,res){
  const requestedtitle = _.lowerCase(req.params.postname);
  posts.forEach(function(post){
    const storedtitle = _.lowerCase(post.title);

    if(storedtitle === requestedtitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});
 
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
