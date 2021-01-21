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
//var GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"

firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();


  const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(function(){
    console.log('Have permission');
    return messaging.getToken();//The method getToken()
  }).then(function(token){
    console.log(token);
  })
  .catch(function(err){
    console.log('Error occured');
  })