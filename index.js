// const inquirer = require("inquirer");
// const Fs = require('fs')  
// const Path = require('path')  
// const Util = require('util')  
// const Puppeteer = require('puppeteer')   
// const ReadFile = Util.promisify(Fs.readFile)


// var callback = function (pdf) {
//     // do something with the PDF like send it as the response
//     res.setHeader("Content-Type", "application/pdf");
//     res.send(pdf);
// }

// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync('./index.html', 'utf8');
// var options = { format: 'Letter' };
 
// pdf.create(html, options).toFile('./profile.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });



// var fs = require('fs'),
//     convertFactory = require('electron-html-to');
 
// var conversion = convertFactory({
//   converterPath: convertFactory.converters.PDF
// });


// const inquirer = require("inquirer");
// const util = require("util");
// const writeFileAsync = util.promisify(fs.writeFile);
// require("dotnv").config();
// var open = require("open");
// var path = require("path");



// const convertHTMLToPDF = require("pdf-puppeteer");
 
// var callback = function (pdf) {
//     // do something with the PDF like send it as the response
//     res.setHeader("Content-Type", "application/pdf");
//     res.send(pdf);
// }
// var fs = require('fs');
// var htmlPdf = require("html-pdf");
// var html = fs.readFileSync('./index.html', 'utf8');
// var options = { format: 'Letter' };

// pdf.create(html, options).toFile('profile.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
// });

const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// const axios = require("axios");
const convertHTMLToPDF = require("pdf-puppeteer");

const writeFileAsync = util.promisify(fs.writeFile);



function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?",
    },
    {
      type: "input",
      name: "bio",
      message: "Enter a short bio about yourself."
    },
    {
      type: "input",
      message: "What is your favorite color?",
      name: "favcolor"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    },
    {
      type: "input",
      name: "blog",
      message: "Enter your blog URL."
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username."
    },
    {
      type: "input",
      name: "photo",
      message: "Enter a link to your profile picture."
    },
    {
      type: "input",
      name: "repositories",
      message: "How many public GitHub repositories do you have?"
    },
    {
      type: "input",
      name: "stars",
      message: "How many stars do you have on GitHub?"
    },
    {
      type: "input",
      name: "following",
      message: "How many users are you following on Github?"
    },
    {
      type: "input",
      name: "followers",
      message: "How many followers do you have on GitHub?"
    }
  ]);
}
function generateHTML(answers) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
    <style>
  body {
  background-color: ${answers.favcolor};
  text-align: center;
  width: 800px;
  margin: 0px auto;
  align-content: center;
  font-family: "Palatino Linotype", "Book Antiqua", "Palatino", serif;
  
  }

  .profilepic {
    width: 300px;
    height: 300px;
    margin-bottom: 10px;
  }
  
  </style>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${answers.name}.</h1>
      <p class="lead">I am from ${answers.location}.</p>
      <img src='${answers.photo}' class="profilepic" />
      <h3>About Me</h3>
      <p>${answers.bio}</p>
      <ul class="list-group">
        <li class="list-group-item"><strong>LinkedIn:</strong> ${answers.linkedin}</li>
        <li class="list-group-item"><strong>Blog:</strong> ${answers.blog}</li>
        <li class="list-group-item"><strong>GitHub username:</strong> ${answers.github}</li>
        <li class="list-group-item"><strong>Number of repositories:</strong> ${answers.repositories}</li>
        <li class="list-group-item"><strong>Number of GitHub Stars:</strong> ${answers.stars}</li>
        <li class="list-group-item"><strong>Following:</strong> ${answers.following} users</li>
        <li class="list-group-item"><strong>Followers:</strong> ${answers.followers} users</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`
};

promptUser()
  .then(function (answers) {
    const html = generateHTML(answers);
    const options = {
      path: "profile.pdf",
      printBackground: true
    };

    return writeFileAsync("index.html", html);
  })
  .then(function () {
    console.log("Successfully wrote to index.html");
  })
  .catch(function (err) {
    console.log(err);
});
