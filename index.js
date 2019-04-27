const express = require('express');
const parser = require('body-parser');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(parser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));
app.set(parser.json());
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/SubmittedData', (req, res) => {
  // var obj = [
  //   {
  //     blogpost: [
  //       {
  //         Title: req.body.Title,
  //         Description: req.body.Description,
  //         Author: req.body.Author,
  //         Body: req.body.Body
  //       }
  //     ]
  //   }
  // ];
  fs.readFile('./blogs.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); // now its an object
      obj.push({
        blogpost: {
          //Array structure
          Title: req.body.Title,
          Description: req.body.Description,
          Author: req.body.Author,
          Body: req.body.Body
        }
      }); //add some data
      json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('./blogs.json', json, 'utf8', err => {
        if (err) throw err;
        res.render('data', { obj: obj });
      }); //write it back
    }
  });
});

// listen method for localhost
const user = process.env.USER;
const port = 8000;
app.listen(port, () => {
  console.log(`Hello ${user}, your app is live on ${port}`);
});
