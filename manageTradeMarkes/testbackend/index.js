

const express = require('express')
const app = express();
const port = 3000
const path = require('path');

app.use(express.static(__dirname + '/static'));


app.engine("html", require("ejs").renderFile);

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//admin 
var admin = require('firebase-admin');
admin.initializeApp({
         projectId: "mc-mazaya",
         credential: admin.credential.applicationDefault(),
          databaseURL: 'https://<mc-mazaya>.firebaseio.com',
  });




app.get("/printData", function (req, res) {
 
   var email='amutairi@mc.gov.sa';
       admin
       .auth()
       .getUserByEmail(email)
       .then((userRecord) => {
         // See the UserRecord reference doc for the contents of userRecord.
         console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
         res.send(userRecord.toJSON())
       })
       .catch((error) => {
         console.log('Error fetching user data:', error);
         res.send('Error!')
       });
 });
 

app.get("/DeleteFamily/:uid/:page/:empID", function (req, res) {
 const uid=req.params.uid;
 const page=req.params.page;
 const empID=req.params.empID;
 var arr=[];
 arr = uid.split(',');
 
console.log('lenght is :'+ arr.length);
console.log(arr);
 if(arr.length!=0){
  console.log(arr);
  admin
  .auth()
  .deleteUsers(arr)
  .then((deleteUsersResult) => {
     
    console.log(`Successfully deleted ${deleteUsersResult.successCount} users`);
    console.log(`Failed to delete ${deleteUsersResult.failureCount} users`);
    deleteUsersResult.errors.forEach((err) => {
      console.log(err.error.toJSON());
    });
  })
  .catch((error) => {
    console.log('Error deleting users:', error);
  });
  }
 
  console.log(empID);
  res.redirect('/DeleteUser/'+empID+'/'+page);
 

 });


 app.get("/DeleteUser/:uid/:page", function (req, res) {
  const uid=req.params.uid;
  const page=req.params.page;
  // delete from  auth data .
      admin.auth().deleteUser(uid)
     .then(function() {
       console.log('Successfully deleted user');
       console.log(uid);

     })
     .catch(function(error) {
       console.log('Error deleting user:', error);
     });
     if (page=='FamPage'){
      res.redirect('/manageFamily');
     }else{
      res.redirect('/manageEmployees');
     }
  });
 
 
 

 

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/Login.html'));
});
app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/Login.html'));
});

app.get("/dashboard", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/dashboard.html'));
});

app.get("/manageTradeMarksHome", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/manageTradeMarksHome.html'));
});

app.get("/Suggestion", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/Suggestion.html'));
});

app.get("/manageBannersHome", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/manageBannersHome.html'));
});

app.get("/manageEmployees", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/manageEmployees.html'));
});


app.get("/mangeBanners", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/mangeBanners.html'));
});


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

//const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");



app.get("/Notification", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/Notification.html'));
});
app.get("/manageFamily", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/manageFamily.html'));
});

  app.get("/EditTrademark", function (req, res) {
   res.sendFile(path.join(__dirname + '/views/EditTrademark.html'));
  
  });

  app.get("/ViewTradeMark", function (req, res) {
    res.sendFile(path.join(__dirname + '/views/ViewTradeMark.html'));
   
});

app.get("/tradeMarkInfo", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/tradeMarkInfo.html'));
 });

 app.get("/AddBranch", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/AddBranch.html'));
 });
 app.get("/AddOffers", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/AddOffers.html'));
 });
 app.get("/EditOffers", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/EditOffers.html'));
 });

 app.get("/EditBranch", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/EditBranch.html'));
 });








// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

 //listen
app.listen(port, function(error)  {
if (error){
    console.log(`there is an error`)
}
else{
  console.log(` app listening at http://localhost:${port}`)}
})

