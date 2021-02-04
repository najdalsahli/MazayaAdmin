
var email='amutairi@mc.gov.sa';
//localStorage.getItem("email");

var admin = require('firebase-admin');

const serviceAccount = require("mc-mazaya-firebase-adminsdk-m59kp-a097f1d285.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mc-mazaya.firebaseio.com",

});


var GOOGLE_APPLICATION_CREDENTIALS="MazayaAdmin/manageTradeMarkes/mc-mazaya-firebase-adminsdk-m59kp-a097f1d285.json";
  console.log(email);
  admin
      .auth()
      .getUserByEmail(email)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
    







//   import * as admin from 'firebase-admin';
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//     databaseURL: 'https://<mc-mazaya>.firebaseio.com'
//   });



// var email=localStorage.getItem("email");

//     firebase.auth().onAuthStateChanged(user =>
//        {  if(user) {
//       console.log(user.uid);
//          console.log(user.email);   }
//   });
  
  
//   admin
//     .auth()
//     .getUserByEmail(emaill)
//     .then((userRecord) => {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//     })
//     .catch((error) => {
//       console.log('Error fetching user data:', error);
//     });
  
  // //delete from real data .
  //   firebase.database().ref('Users/'+uid).remove();
    
  // //delete from  auth data .
  //   var admin = require('firebase-admin');
  
  
   
  //   admin.auth().deleteUser(uid)
  //   .then(function() {
  //     console.log('Successfully deleted user');
  //   })
  //   .catch(function(error) {
  //     console.log('Error deleting user:', error);
  //   });
  
  //   while (list.hasChildNodes()) {  
  //     list.removeChild(list.firstChild);
  //   }
  //   alert("تم حذف الموظف بنجاح");
  //   window.location.reload();     
  
  