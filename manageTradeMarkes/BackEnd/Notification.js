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
/*---
curl -i -H 'Content-type: application/json' -H 'Authorization: key=<AIzaSyBDUVxL_S0b9AxSRjBsQ6ri80mhO0kZ03c>' -XPOST https://fcm.googleapis.com/fcm/send -d '{
  "registration_ids":["registration_ids", "of the", "target", "devices as array"],
  "notification": {
      "title":"Title of your notification -Ruba Test",
      "body":"content of your notification- Test Test"
  },
  "data": {
    "key1" : "value1",
    "key2" : "value2",
    "key3" : 23.56565,
    "key4" : true
  }
}'

curl --header "Content-Type: application/json" \ --header "Authorization: key="AAAA8wQ6TTY:APA91bE6UQsP1kDeLqnBMvqQsQTQOkRwS9rLdDlZU-TwiDvnJPmVOKqxlz1QeHaIiKkKOs5baMsC-2sNNTvXJ3xFfgUfYwcdOPLFa8MU-S1fKd_iUWuiIyNe_Cy7R6ndufy222LvN5nF" https://fcm.googleapis.com/fcm/send \ -d '{"data": {"title": "The Title","body": "Hellof!", "sound": "default"}, "priority": "high", "to": "FMC push token"}'
//---*/

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


  //for the web notification
  messaging.onMessage(function(payload){
    console.log('onMessage: '+ payload);
  });


  function send(){
  var title=document.getElementById('title').value;
  var text=document.getElementById('textArea').value;
  
  }