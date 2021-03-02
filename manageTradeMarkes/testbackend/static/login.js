const firebaseConfig = {
    apiKey: "AIzaSyBDUVxL_S0b9AxSRjBsQ6ri80mhO0kZ03c",
    authDomain: "mc-mazaya.firebaseapp.com",
    databaseURL: "https://mc-mazaya.firebaseio.com",
    projectId: "mc-mazaya",
    storageBucket: "mc-mazaya.appspot.com",
    messagingSenderId: "1043747982646",
    appId: "1:1043747982646:web:eb8806eb17fa88668fb797",
    measurementId: "G-5VCPWL0HQL"
  };

firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    if(userEmail==''){
      alert("الرجاء ادخال البريد الالكتروني");
      return;
      
    }else if(userPass==''){
      alert("الرجاء ادخال الرقم السري");
      return;
    }else {
  
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((user) => {
      // Signed in 
      //updateBanners
   
    //  window.location.href="dashboard.html";
    setTimeout( document.getElementById('go').click(), 1000);
  
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("البريد الالكتروني أو الرقم السري خاطئ");
    });
  
    }
  
  
  
  } //end of the function
  


  