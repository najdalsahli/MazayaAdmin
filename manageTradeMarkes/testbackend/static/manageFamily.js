

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
 var uid=localStorage.getItem('uid');

function displayusers(){
var famNum=localStorage.getItem('famNum');
console.log(famNum+'.....'+uid);

if (famNum==0){
    var noResult= document.createElement('td');
    noResult.style.color='#F51B46';
    noResult.style.textAlign='center';
    noResult.style.font='font-family';
    noResult.style.weight='bold';
    noResult.textContent="لا يوجد أفراد أسرة";
    var newRow = document.createElement('tr');
    newRow.appendChild(document.createElement('td'));
    newRow.appendChild(document.createElement('td'));
    newRow.appendChild(document.createElement('td'));
     newRow.appendChild(noResult);
    document.getElementById("bodytable").appendChild(newRow);
}

else{
var num=1;
var list = document.getElementById("bodytable");
document.getElementById("loader").style.display = "block";
document.getElementById("myDiv").style.display = "none";
// As long as <ul> has a child node, remove it
while (list.hasChildNodes()) {  
  list.removeChild(list.firstChild);
}

  firebase.database().ref('FamilyMembers').once('value').then(function(snapshot2) {
    snapshot2.forEach(function(snapshot) {
        startFlag=true;

        emid=snapshot.child('employeeID').val();
        console.log(emid);
        var sameUID=emid==uid;
        console.log(sameUID);
        var sameStutes=snapshot.child('status').val()=='نشط';
        console.log(sameStutes);
        if (sameUID ){
            if(sameStutes){
                console.log(snapshot.key);

    firebase.database().ref('Users/'+snapshot.child('userID').val()).once('value').then(function(snapshot1) {
        var newrow = document.createElement('tr');
        
      
       var deletecel = document.createElement('td');
       deletecel.className='delcell';
       var deletebtn = document.createElement('button');
       deletebtn.className='btn deletebtn';
       deletebtn.textContent='حذف';
       var deleteIcon = document.createElement('i');
       deleteIcon.className='far fa-trash-alt deleteIcon';
       deletebtn.appendChild(deleteIcon);
       deletecel.appendChild(deletebtn);
       deletebtn.style.cursor='pointer';
         deletebtn.onclick=function(){
           var conf=confirm("هل أنت متأكد من حدف فرد العائلة ؟");
           if (conf==true){
       //delete from real data .
       var keyOfUser=snapshot1.key;
       var keyOfFamily=snapshot.key;
       //user--family member
       firebase.database().ref('Users/'+uid+'/FamilyMembers/'+keyOfFamily).remove();
      //user
       firebase.database().ref('Users/'+keyOfUser).remove();
      //family member
      firebase.database().ref('FamilyMembers/'+keyOfFamily).remove();

   //delete from admin auth
           document.getElementById('fam').val=keyOfUser;
           document.getElementById('fam').href='/DeleteUser/'+keyOfUser+'/FamPage';
           alert('تم الحذف بنجاح');
           setTimeout( document.getElementById('fam').click(), 1000);
           }   
         };
     
     
        var gendercel = document.createElement('td');
         gendercel.className='cells';
         gendercel.textContent=snapshot1.child("gender").val();
   
        var emailcel = document.createElement('td');
        emailcel.className='cells';
        emailcel.textContent=snapshot1.child("email").val();
   
        var namecel = document.createElement('td');
         namecel.className='cells';
         namecel.textContent=snapshot1.child("name").val();
     
         var phonecel = document.createElement('td');
         phonecel.className='cells';
         phonecel.textContent=snapshot1.child("phone").val();
   
       
   
         var numcell= document.createElement('td');
         numcell.className='cells';
         numcell.textContent=num;

         var statutse= document.createElement('td');
         statutse.className='cells';
         statutse.textContent=snapshot.child('status').val();

     
         
         newrow.appendChild(deletecel);
         newrow.appendChild(statutse);
         newrow.appendChild(gendercel);
         newrow.appendChild(phonecel);
         newrow.appendChild(emailcel);
         newrow.appendChild(namecel);
        newrow.appendChild(numcell);
           num++;
         document.getElementById('bodytable').appendChild(newrow);
      
  });
     }//statuse
     else{
        var newrow = document.createElement('tr');
   
       var deletecel = document.createElement('td');
       deletecel.className='delcell';
       var deletebtn = document.createElement('button');
       deletebtn.className='btnDelete';
       deletebtn.textContent='حذف';
       var deleteIcon = document.createElement('i');
       deleteIcon.className='far fa-trash-alt deleteIcon';
       deletebtn.appendChild(deleteIcon);
       deletecel.appendChild(deletebtn);
       deletebtn.id='btnID';
       deletebtn.style.backgroundColor = "#BFC2C2";


    
   
   
       
     
     
      
     
        var gendercel = document.createElement('td');
         gendercel.className='cells';
         gendercel.textContent='-';
   
        var emailcel = document.createElement('td');
        emailcel.className='cells';
        emailcel.textContent='-';
   
        var namecel = document.createElement('td');
         namecel.className='cells';
         namecel.textContent=snapshot.child("name").val();
     
         var phonecel = document.createElement('td');
         phonecel.className='cells';
         phonecel.textContent=snapshot.child("phoneNumber").val();
   
       
   
         var numcell= document.createElement('td');
         numcell.className='cells';
         numcell.textContent=num;

         var statutse= document.createElement('td');
         statutse.className='cells';
         statutse.textContent=snapshot.child('status').val();

     
         
         newrow.appendChild(deletecel);
         newrow.appendChild(statutse);
         newrow.appendChild(gendercel);
         newrow.appendChild(phonecel);
         newrow.appendChild(emailcel);
         newrow.appendChild(namecel);
        newrow.appendChild(numcell);
           num++;
         document.getElementById('bodytable').appendChild(newrow);


     }//else
    }
    });
  });
  setTimeout(StartWait,3000);

}//else big 

  
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
       if (snapshot1.child("userType").val()=='فرد عائلة'){
        var newrow = document.createElement('tr');
        var noPointcel = document.createElement('td');
   
       
           noPointcel.className='cells';
           noPointcel.textContent=snapshot1.child("points").val();
       
   
       var deletecel = document.createElement('td');
       deletecel.className='delcell';
       var deletebtn = document.createElement('button');
       deletebtn.className='btn deletebtn';
       deletebtn.textContent=' حذف ';
       var deleteIcon = document.createElement('i');
       deleteIcon.className='far fa-trash-alt deleteIcon';
       deletebtn.appendChild(deleteIcon);
       deletecel.appendChild(deletebtn);
   
         deletebtn.onclick=function(){
          var conf=confirm("هل أنت متأكد من حدف فرد العائلة ؟");
          if (conf==true){
      //delete from real data .
      var keyOfUser=snapshot1.key;
      firebase.database().ref('FamilyMembers').once('value').then(function(snapshot2) {
        snapshot2.forEach(function(snapshot) {
          console.log(snapshot.child('employeeID').val()+"/"+uid);
          if (snapshot.child('employeeID').val()==uid){
            var keyOfFamily=snapshot.key;

            //user--family member
            firebase.database().ref('Users/'+uid+'/FamilyMembers/'+keyOfFamily).remove();
            //family member
           firebase.database().ref('FamilyMembers/'+keyOfFamily).remove();   
          }
        });
      });  
     //user
      firebase.database().ref('Users/'+keyOfUser).remove();
       //delete from admin auth
          document.getElementById('fam').val=keyOfUser;
          document.getElementById('fam').href='/DeleteUser/'+keyOfUser+'/FamPage';
          alert('تم الحذف بنجاح');
         setTimeout( document.getElementById('fam').click(), 1000);
          }   
                 };
     
     
        var gendercel = document.createElement('td');
         gendercel.className='cells';
         gendercel.textContent=snapshot1.child("gender").val();
   
        var emailcel = document.createElement('td');
        emailcel.className='cells';
        emailcel.textContent=snapshot1.child("email").val();
   
        var namecel = document.createElement('td');
         namecel.className='cells';
         namecel.textContent=snapshot1.child("name").val();
     
         var phonecel = document.createElement('td');
         phonecel.className='cells';
         phonecel.textContent=snapshot1.child("phone").val();
   
       
   
         var numcell= document.createElement('td');
         numcell.className='cells';
         numcell.textContent=num;

         var statutse= document.createElement('td');
         statutse.className='cells';
         statutse.textContent='نشط';
     
         
         newrow.appendChild(deletecel);
         newrow.appendChild(statutse);
         newrow.appendChild(gendercel);
         newrow.appendChild(phonecel);
         newrow.appendChild(emailcel);
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
    alert("لايوجد فرد عائلة نشط بنفس البريد الالكتروني");
    displayusers();
    
 }else{
  flag=false;
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



