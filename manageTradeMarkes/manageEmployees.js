

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
 

function displayusers(){

    firebase.database().ref('Users').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snapshot1) {
  
           
     var newrow = document.createElement('tr');
     var addcel = document.createElement('td');
     var noPointcel = document.createElement('td');

     if (snapshot1.child("userType").val()=='موظف'){
        addcel.className='deletecel';
        var addbtn = document.createElement('button');
        addbtn.className='buttons btn btn-primary';
        addbtn.textContent="إضافة";
        addbtn.style.backgroundColor='#2B8D7B'

        addbtn.onclick=function(){
          addtion(snapshot1.key);
        };
    
        noPointcel.className='cells';
        noPointcel.textContent=snapshot1.child("points").val();
    }
    else{
        addcel.className='deletecel';
        var addbtn = document.createElement('button');
        addbtn.className='buttons btn btn-primary';
        addbtn.textContent="إضافة";
        addbtn.style.backgroundColor='#BFC2C2'
        noPointcel.className='cells';
        noPointcel.textContent='-';   

    }



    var  deletecel = document.createElement('td');
      deletecel.className='deletecel';
     var deletebtn = document.createElement('button');
      deletebtn.className='buttons btn btn-primary';
      deletebtn.textContent="تعطيل";
      deletebtn.onclick=function(){
        localStorage.setItem("email",snapshot1.child("email").val());
        window.location.href = "DeleteUser.html";

      };
  
  
   
  
     var gendercel = document.createElement('td');
      gendercel.className='cells';
      gendercel.textContent=snapshot1.child("gender").val();
     var phonecel = document.createElement('td');
      phonecel.className='cells';
      phonecel.textContent=snapshot1.child("email").val();
     var namecel = document.createElement('td');
      namecel.className='cells';
      namecel.textContent=snapshot1.child("name").val();
  
      var typecel = document.createElement('td');
      typecel.className='cells';
      typecel.textContent=snapshot1.child("userType").val();
  
  
      
      
      deletecel.appendChild(deletebtn);
      newrow.appendChild(deletecel);
  
      addcel.appendChild(addbtn);
      newrow.appendChild(addcel);
  
      newrow.appendChild(noPointcel);
      newrow.appendChild(gendercel);
      newrow.appendChild(phonecel);
      newrow.appendChild(namecel);
      newrow.appendChild(typecel);
  
      document.getElementById('bodytable').appendChild(newrow);

   

   });
  
});

  
  }
  var flagEmp=false;
  var flagFam=false;

  function search(searchtxt){
    var list = document.getElementById("bodytable");
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    // As long as <ul> has a child node, remove it
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }

    var database = firebase.database().ref("Users");   
     database.orderByChild("email").equalTo(searchtxt).on("child_added",function(snapshot1) {
       flag=true;
       
       var newrow = document.createElement('tr');
       var addcel = document.createElement('td');
       var noPointcel = document.createElement('td');
  
       if (snapshot1.child("userType").val()=='موظف'){
          addcel.className='deletecel';
          var addbtn = document.createElement('button');
          addbtn.className='buttons btn btn-primary';
          addbtn.textContent="إضافة";
          addbtn.onclick=function(){
            addtion(snapshot1.key);
          };
      
          noPointcel.className='cells';
          noPointcel.textContent=snapshot1.child("points").val();
      }
      else{
          addcel.className='deletecel';
          var addbtn = document.createElement('button');
          addbtn.className='buttons btn btn-primary';
          addbtn.textContent="إضافة";
          addbtn.style.backgroundColor='#4b4c4d'
          
          noPointcel.className='cells';
          noPointcel.textContent='-';   
  
      }
     
      var  deletecel = document.createElement('td');
        deletecel.className='deletecel';
       var deletebtn = document.createElement('button');
        deletebtn.className='buttons btn btn-primary';
        deletebtn.textContent="تعطيل";
        deletebtn.onclick=function(){
          deleteEmp(snapshot1.key);
        };
    
     
       var gendercel = document.createElement('td');
        gendercel.className='cells';
        gendercel.textContent=snapshot1.child("gender").val();
       var phonecel = document.createElement('td');
        phonecel.className='cells';
        phonecel.textContent=snapshot1.child("email").val();
       var namecel = document.createElement('td');
        namecel.className='cells';
        namecel.textContent=snapshot1.child("name").val();
    
        var typecel = document.createElement('td');
        typecel.className='cells';
        typecel.textContent=snapshot1.child("userType").val();
    
    
    
        
        
        deletecel.appendChild(deletebtn);
        newrow.appendChild(deletecel);
    
        addcel.appendChild(addbtn);
        newrow.appendChild(addcel);
    
        newrow.appendChild(noPointcel);
        newrow.appendChild(gendercel);
        newrow.appendChild(phonecel);
        newrow.appendChild(namecel);
        newrow.appendChild(typecel);

        document.getElementById('bodytable').appendChild(newrow);
      
    });
    setTimeout(wait,3000);
    

  
  }
function wait(){
  
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  if(!flag){
    alert("لايوجد مستخدم بنفس البريد الالكتروني");
    displayusers();
    
 }else{
  flag=false;
 }
}

function addtion(uid){
  
  var txt;
  var person = prompt("ادخل عدد النقاط المضافة");
  if (person == null || person == "") {
   
  } 
    
  
  if(isNaN(person)){
      
    alert("ادخل عدد صحيح");
  } else{
    var addingPoints= person+2;
   
   
 firebase.database().ref('/Users/' + uid).once('value').then(function(snapshot) {
     if (snapshot.child)
  var oldPoints = snapshot.child("points").val();
  var sumOfPoints=parseInt(person+"")+parseInt(oldPoints+"");
  console.log(sumOfPoints);
  firebase.database().ref('/Users/' + uid).child("points").set(sumOfPoints);
    window.location.reload();     
});

  


  }
 
}

