

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
  var startFlag=false;


function displayusers(){
  var list = document.getElementById("bodytable");
  document.getElementById("loader").style.display = "block";
  document.getElementById("myDiv").style.display = "none";
  // As long as <ul> has a child node, remove it
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }
    firebase.database().ref('Users').once('value').then(function(snapshot) {
      var num=1;
      startFlag=true;

        snapshot.forEach(function(snapshot1) {
          if (snapshot1.child("userType").val()=='موظف'){

     var newrow = document.createElement('tr');
     var noPointcel = document.createElement('td');

     var editcel = document.createElement('td');
     var  editbtn= document.createElement('button');
     var editIcon= document.createElement('i');

      editcel.className='editcell';
       editbtn.className='btnEdit';
       editIcon.className='ion-android-create editIcon';
       editbtn.textContent='إضافة';
       editbtn.appendChild(editIcon);
       editcel.appendChild(editbtn);

       editbtn.onclick=function(){
          addtion(snapshot1.key);
        };
    
        noPointcel.className='cells';
        noPointcel.textContent=snapshot1.child("points").val();
    



    var deletecel = document.createElement('td');
    deletecel.className='delcell';
    var deletebtn = document.createElement('button');
    deletebtn.className='btnDelete';
    deletebtn.textContent='تعطيل';
    var deleteIcon = document.createElement('i');
    deleteIcon.className='far fa-trash-alt deleteIcon';
    deletebtn.appendChild(deleteIcon);
    deletecel.appendChild(deletebtn);

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

        var fam = document.createElement('td');
      fam.className='cells';
      fam.style.color='#009BDA';
      fam.textContent=snapshot1.child("FamilyMembers").numChildren();
      fam.style.cursor = 'pointer';

     

      fam.onclick=function(){
        localStorage.setItem("famNum",snapshot1.child("FamilyMembers").numChildren());
        localStorage.setItem("uid",snapshot1.key);
        window.location.href = "manageFamily.html";
      
      }
      var numcell= document.createElement('td');
      numcell.className='cells';
      numcell.textContent=num;

  
      
      
      deletecel.appendChild(deletebtn);
      newrow.appendChild(deletecel);
  
      newrow.appendChild(editcel);

      newrow.appendChild(noPointcel);
      newrow.appendChild(fam);

      newrow.appendChild(gendercel);

      newrow.appendChild(phonecel);
      newrow.appendChild(namecel);
     newrow.appendChild(numcell);
        num++;
      document.getElementById('bodytable').appendChild(newrow);
    }
   

   });
  
});
setTimeout(StartWait,3000);

  
  }



  var flagEmp=false;
  var flagFam=false;
  var flag=false;

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
       var num=1;
       if (snapshot1.child("userType").val()=='موظف'){

        var newrow = document.createElement('tr');
        var noPointcel = document.createElement('td');
   
        var editcel = document.createElement('td');
        var  editbtn= document.createElement('button');
        var editIcon= document.createElement('i');
   
         editcel.className='editcell';
          editbtn.className='btnEdit';
          editIcon.className='ion-android-create editIcon';
          editbtn.textContent='إضافة';
          editbtn.appendChild(editIcon);
          editcel.appendChild(editbtn);
   
          editbtn.onclick=function(){
             addtion(snapshot1.key);
           };
       
           noPointcel.className='cells';
           noPointcel.textContent=snapshot1.child("points").val();
       
   
   
   
       var deletecel = document.createElement('td');
       deletecel.className='delcell';
       var deletebtn = document.createElement('button');
       deletebtn.className='btnDelete';
       deletebtn.textContent='تعطيل';
       var deleteIcon = document.createElement('i');
       deleteIcon.className='far fa-trash-alt deleteIcon';
       deletebtn.appendChild(deleteIcon);
       deletecel.appendChild(deletebtn);
   
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
   
         var fam = document.createElement('td');
         fam.className='cells';
         fam.style.color='#009BDA';
         fam.textContent=snapshot1.child("FamilyMembers").numChildren();
         fam.style.cursor = 'pointer';
   
        
   
         fam.onclick=function(){
          localStorage.setItem("famNum",snapshot1.child("FamilyMembers").numChildren());
           localStorage.setItem("uid",snapshot1.key);
           window.location.href = "manageFamily.html";
         
         }
   
         var numcell= document.createElement('td');
         numcell.className='cells';
         numcell.textContent=num;
     
         
         
         deletecel.appendChild(deletebtn);
         newrow.appendChild(deletecel);
     
         newrow.appendChild(editcel);
   
         newrow.appendChild(noPointcel);
         newrow.appendChild(fam);
   
         newrow.appendChild(gendercel);
   
         newrow.appendChild(phonecel);
         newrow.appendChild(namecel);
        newrow.appendChild(numcell);
           num++;
         document.getElementById('bodytable').appendChild(newrow);   
        }
     
    });
    setTimeout(wait,3000);
    

  
  }
function wait(){
  
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  if(!flag){
    alert("لايوجد موظف بنفس البريد الالكتروني");
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
  setTimeout(function() {
         window.location.href = "manageEmployees.html";    }, 1000);
});

  


  }
 
}

function StartWait(){
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  if(!startFlag){
    
 }else{
  startFlag=false;
 }
}