


// const express = require('express')
// const app = express()
// const port = 3000

// var admin = require('firebase-admin');
// app.engine("html", require("ejs").renderFile);

// app.use(bodyParser.json());
// app.use(csrfMiddleware);

// //var serviceAccount = require("./mc-mazaya-firebase-adminsdk-m59knop-a097f1d285.json");

// admin.initializeApp({
//          projectId: "mc-mazaya",
//          credential: admin.credential.applicationDefault(),
//           databaseURL: 'https://<mc-mazaya>.firebaseio.com',
//   });

// app.get('/', (req, res) => {
//     var email='amutairi@mc.gov.sa';
//     admin
//     .auth()
//     .getUserByEmail(email)
//     .then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//       res.send(userRecord.toJSON())
//     //  res.send('hi! and bye')

//     })
//     .catch((error) => {
//       console.log('Error fetching user data:', error);
//       res.send('Error!')
//     });

    
// })

// app.get('/Disable/:Email', (req, res) => {
   
//       res.send('your Email is'+req.params['Email'])
    
// })

// app.get('/push-notifications', (req, res) => {
//     // Logic
//     admin.messaging().sendToTopic();
// });

// app.get("/login", function (req, res) {
//   res.render("login.html");
// });

// app.get("/signup", function (req, res) {
//   res.render("signup.html");
// });

// app.get("/profile", function (req, res) {
// });


// app.post("/sessionLogin", (req, res) => {
//   res.send('fff');
// });

// app.get("/sessionLogout", (req, res) => {
//   res.redirect("/login");
// });


// app.post('/submit-student-data', function (req, res) {
//     var name = req.body.firstName + ' ' + req.body.lastName;
    
//     res.send(name + ' Submitted Successfully!');
// });

// app.listen(port, function(error)  {
// if (error){
//     console.log(`there is an error`)
// }
// else{
//   console.log(`Example app listening at http://localhost:${port}`)}
// })
////////////////////////////////////////



// const express = require('express')
// const app = express();
// const port = 3000

// var admin = require('firebase-admin');
// app.engine("html", require("ejs").renderFile);

// app.use(bodyParser.json());
// app.use(csrfMiddleware);


// admin.initializeApp({
//          projectId: "mc-mazaya",
//          credential: admin.credential.applicationDefault(),
//           databaseURL: 'https://<mc-mazaya>.firebaseio.com',
//   });



// app.get("/login", function (req, res) {
//   res.render("login.html");
// });

// app.get("/signup", function (req, res) {
//   res.render("signup.html");
// });

// app.get("/profile", function (req, res) {
//  // const sessionCookie = req.cookies.session || "";

//   var email='amutairi@mc.gov.sa';
//       admin
//       .auth()
//       .getUserByEmail(email)
//       .then((userRecord) => {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//         res.send(userRecord.toJSON())
//       //  res.send('hi! and bye')
  
//       })
//       .catch((error) => {
//         console.log('Error fetching user data:', error);
//         res.send('Error!')
//       });
// });

// app.get("/", function (req, res) {
//   res.redirect("/Users/raghad/Documents/GitHub/MazayaAdmin/manageTradeMarkes/manageTradeMarksHome.html");
// });

// app.post("/sessionLogin", (req, res) => {
// res.send('hiii')
// });

// app.get("/sessionLogout", (req, res) => {
//   res.redirect("/Login");
// });


// app.post('/submit-student-data', function (req, res) {
//     var name = req.body.firstName + ' ' + req.body.lastName;
    
//     res.send(name + ' Submitted Successfully!');
// });



// app.listen(port, function(error)  {
// if (error){
//     console.log(`there is an error`)
// }
// else{
//   console.log(`Example app listening at http://localhost:${port}`)}
// })

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");









// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});