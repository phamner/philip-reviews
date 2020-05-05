const mysql = require('mysql');
const mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);
connection.connect((error) => {
  if (error) {
    console.log (error);
  } else {
    console.log ('mySQL is connected!');
  }
});


const allReviews = function (callback) {
  connection.query('SELECT reviews.id, reviews.stars, DATE_FORMAT(reviews.uploadDate, "%c/%e/%Y") "uploadDate", reviews.restaurantVisit, reviews.content, reviews.emojiUseful, reviews.emojiFunny, reviews.emojiCool, reviews.reply, users.userName, restaurants.restaurantName FROM reviews INNER JOIN users ON users.id = reviews.userID INNER JOIN restaurants ON restaurants.id = reviews.restaurantID', (error, results) => {
    if (error) {
      console.log('unable to get reviews from db');
    } else {
      console.log('successfully got reviews from db');
      callback(results);
    }
  });
};

const allPics = (callback) => {
  connection.query('SELECT * FROM pictures', (error, results) => {
    if (error) {
      console.log('Failed to get pictures from DB');
    } else {
      let resultString = JSON.stringify(results);
      let parseResult = JSON.parse(resultString);
      console.log('Successfully got pictures from DB');
      callback(parseResult);
    }
  });
};

module.exports.allReviews = allReviews;
module.exports.allPics = allPics;
