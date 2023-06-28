const express = require('express'); //I imported the express framwework and saved it on a varibale. same to the other modules below
const mysql = require('mysql'); //I imported mysql database driver
const nodemailer = require('nodemailer'); //I imported the nodemailer module for sending confirmation emails
const bcypt = require('bcrypt'); //I imported the bcrypt module for hashing the passwordss

//I have to setup the express app

const app = express();
const port = 3000;  //The port 3000 is used as the default listening sound for the https servers. The default port used by Express is 3000, the same default port used by ReactJS development server.



//CREATING MYSQL CONNECTION POOL


// I WONT BE PUTTING ANY ADDITIONAL COMMENTS, RATHER I DECIDED TO KEEP THEM IN A SEPARATE MSWORD FILE.

const pool = mysql.createPool({
host: 'localhost',
user: 'BensoliDev',
password: 'Wambua123#',
database: USER-CREDENTIALS
});


//CREATING an API endpoint for user registration:
app.post('/regisster', (req, res) => {
  const { email, password } = req.body;


  // HASHING the password using bcrypt
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if  (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
    return;
  }

  //SAVING USER TO BATABASE
  const user = { email, password: hashedPassword };

  pool.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    //SENDING CONFIRMATION EMAIL
    res.status(200).json({ message: 'Registration successful'});
  });
 });
});

