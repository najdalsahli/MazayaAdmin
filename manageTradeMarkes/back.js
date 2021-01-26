

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





function viewTradeMarks(){



 var count=0;
 var newrow;


    firebase.database().ref('Categories').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snapshot1) {

            snapshot1.child("TradeMarks").forEach(function(snapshot2) {
                if(count == 5){
                    count=0;
                }
                if(count==0){
                     newrow = document.createElement('tr');
                    document.getElementById('table').appendChild(newrow);
                }
              
               
                 var newcell = document.createElement('td');
                var Divforcell = document.createElement('div');
                var image = document.createElement("img");
                var pragraph = document.createElement("p");
               
                Divforcell.className="Dives";
                image.className="images";ß
                pragraph.className="pragraphs";
                count=count+1;
                image.src=snapshot2.child("BrandImage").val();
                pragraph.textContent=snapshot2.child("BrandName").val();

                newrow.appendChild(newcell);
                newcell.appendChild(Divforcell);
                Divforcell.appendChild(image);
                Divforcell.appendChild(pragraph);
            
            })
        })
    });
 
  }


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
       
      var newrow = document.createElement('tr');
     
      var  deletecel = document.createElement('td');
        deletecel.className='deletecel';
       var deletebtn = document.createElement('button');
        deletebtn.className='buttons btn btn-primary';
        deletebtn.textContent="تعطيل";
        deletebtn.onclick=function(){
          deleteEmp(snapshot1.key);
        };
    
    
      var addcel = document.createElement('td');
        addcel.className='deletecel';
        var addbtn = document.createElement('button');
        addbtn.className='buttons btn btn-primary';
        addbtn.textContent="إضافة"
        addbtn.onclick=function(){
          addtion(snapshot1.key);
        };
    
       var noPointcel = document.createElement('td');
        noPointcel.className='cells';
        noPointcel.textContent=snapshot1.child("points").val();
    
    
       var gendercel = document.createElement('td');
        gendercel.className='cells';
        gendercel.textContent=snapshot1.child("gender").val();
       var phonecel = document.createElement('td');
        phonecel.className='cells';
        phonecel.textContent=snapshot1.child("email").val();
       var namecel = document.createElement('td');
        namecel.className='cells';
        namecel.textContent=snapshot1.child("name").val();
    
       
    
    
        
        
        deletecel.appendChild(deletebtn);
        newrow.appendChild(deletecel);
    
        addcel.appendChild(addbtn);
        newrow.appendChild(addcel);
    
        newrow.appendChild(noPointcel);
        newrow.appendChild(gendercel);
        newrow.appendChild(phonecel);
        newrow.appendChild(namecel);
        document.getElementById('tableBody').appendChild(newrow);
        
    
    
       
        
 
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
  var oldPoints = snapshot.child("points").val();
  var sumOfPoints=parseInt(person+"")+parseInt(oldPoints+"");
  console.log(sumOfPoints);
  firebase.database().ref('/Users/' + uid).child("points").set(sumOfPoints);
  // ...
});

  


  }
 
}

function deleteEmp(uid){
  //var admin = require('firebase-admin');

/*
 
  admin.auth().deleteUser(uid)
  .then(function() {
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });


  /*firebase.database().ref("Users").child(uid).remove();
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }
  displayusers();
  alert("تم حذف الموظف بنجاح");
*/
}
function showTradeMarkes(categoryName){
 
  document.getElementById("catheader").innerHTML=categoryName;
  document.getElementById("category-container").style.display = "block";
  var list=document.getElementById('bodyOftable');
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }

if(categoryName=='الكل'){

var countTM=0;
  firebase.database().ref('Trademarks').once('value').then(function(snapshot) {
        
    snapshot.forEach(function(snapshot1) {
      countTM++;
      var numoffers=snapshot1.child('Offers').numChildren();
      var numbraches=snapshot1.child('Branches').numChildren();
      var trademarkName=snapshot1.child('trademarkName').val();
      var imgtradesmark=snapshot1.child('imgURL').val();
 

      readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,snapshot1.key,countTM);

    })
  });
}



  firebase.database().ref('Categories').child(categoryName).child("Trademarks").once('value').then(function(snapshot) {
        
    snapshot.forEach(function(snapshot) {

      
      firebase.database().ref("Trademarks").orderByKey().equalTo(snapshot.key).on("child_added",function(snapshot1) {
     
        var numoffers=snapshot1.child('Offers').numChildren();
        var numbraches=snapshot1.child('Branches').numChildren();
        var trademarkName=snapshot1.child('trademarkName').val();
        var imgtradesmark=snapshot1.child('imgURL').val();
   
  
        readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,snapshot1.key,countTM);
})
})
});
}
  function readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,uid,countTM){
    
    var deletecel = document.createElement('td');
    deletecel.className='btncel';
  
    var deletebtn = document.createElement('button');
    deletebtn.className='btn deletebtn';
    deletebtn.textContent='حذف';
  
    var deleteIcon = document.createElement('i');
    deleteIcon.className='far fa-trash-alt deleteIcon';
    deletebtn.appendChild(deleteIcon);
    deletecel.appendChild(deletebtn);
    deletebtn.onclick= function ()
    { 
      deleteTM(uid);
    }
    
    
  
  // for editting 
   var editcel = document.createElement('td');
   editcel.className='btncel';
  
   var  editbtn= document.createElement('button');
    editbtn.className='btn editbtn';
  
    var editIcon= document.createElement('i');
    editIcon.className='ion-android-create editIcon';
    editbtn.textContent='تعديل';
    editbtn.appendChild(editIcon);
    editcel.appendChild(editbtn);
    editbtn.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  localStorage.setItem("tradmarkID_E",uid);
window.location.href = "EditTrademark.html";
     };
    }
    //for viewing 
  
    var showcel= document.createElement('td');
    showcel.className='btncel';
  
    var showbtn=document.createElement('button');
    var showIcon= document.createElement('i');
    showIcon.className='viewIcon icon ion-ios-eye';
    
    showbtn.textContent='عرض';

    showbtn.className='btn viewbtn ';
    showbtn.appendChild(showIcon);
    showcel.appendChild(showbtn);
    showbtn.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  localStorage.setItem("tradmarkID",uid);
   window.location.href = "ViewTradeMark.html";
     };
    }

    //add
    var addTM=document.getElementById("add");
    addTM.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  window.location.href = "tradeMarkInfo.html";
};
    };
  
    //var showIcon= document.createElement('i');
    //showIcon.className='';
  
    var offerscel= document.createElement('td');
    offerscel.className='infocel';
    offerscel.textContent=numoffers
    var brachescel= document.createElement('td');
    brachescel.className='infocel';
    brachescel.textContent=numbraches;
  
  
  
    var tradecel= document.createElement('td');
    tradecel.className='infocel';
    tradecel.textContent=trademarkName;
  
    var imgtrade= document.createElement('img');
    imgtrade.className='rounded-circle mr-2 imageTrade';
    imgtrade.style.marginTop='10px';
    imgtrade.src=imgtradesmark;


    var countcel= document.createElement('td');
    countcel.className='infocel';
    countcel.textContent=countTM;

    //tradecel.appendChild(imgtrade);
  
  
  
  
    var newRow = document.createElement('tr');
  
    newRow.appendChild(deletecel);
    newRow.appendChild(editcel);
    newRow.appendChild(showcel);
    newRow.appendChild(offerscel);
    newRow.appendChild(brachescel);
    newRow.appendChild(tradecel);
    newRow.appendChild(imgtrade);
    newRow.appendChild(countcel);


  
  
  
  
    document.getElementById("bodyOftable").appendChild(newRow);

    

  }  
     
  function deleteTM(uid){
    var region;
      var conf =confirm("هل أنت متأكد من حذف العلامة التجاية بملحقاتها؟");
      if (conf==true){//true
        //delete region 
        var ref=firebase.database().ref('Trademarks/'+uid+'/Branches');
        ref.on("value",function(snapshot){
          snapshot.forEach(function(snapshot1){
           region =snapshot1.child('region').val(); 
           alert(region);      
  firebase.database().ref('Regions/'+region+'/Trademarks/'+uid).remove();
      });
    });
    //delete vouchres
var ref3=firebase.database().ref('Vouchers');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Vouchers/'+data.key).remove();
  });
});
//delete deals
var ref3=firebase.database().ref('Deals');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Deals/'+data.key).remove();
  });
});

//delete offers
var ref3=firebase.database().ref('Offers');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Offers/'+data.key).remove();
  });
});



  //delete trademark 
 firebase.database().ref('Trademarks/'+uid).remove();

      alert('تم حذف العلامة التجارية');
        reload_page();
     
      }//if
}//end
        
    
     


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
    // ...
    window.location.href="manageTradeMarksHome.html";

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("البريد الالكترروني أو الرقم السري خاطئ");
  });

  }



} //end of the function

function logout(){
    
  auth.signOut().then(function() {
    window.location.href="Login.html";
    }).catch(function(error) {
      alert(error);
    });

}        





function suggestion ()
{
  var trademarkCategory=document.getElementById("Category").value;
  var trademarkEmail=document.getElementById("Email").value;
  var trademarkContactNum=document.getElementById("ContactNum").value;
  var trademarkName=document.getElementById("TrademarkNmae").value;

    firebase.database().ref('Suggestion').once('value').then(function(snapshot) {
        
      snapshot.forEach(function(snapshot1) {

         
   var newrow = document.createElement('tr');
//delete sugg
  var  deletecel = document.createElement('td');
    deletecel.className='deletecel';
   var deletebtn = document.createElement('button');
    deletebtn.className='btn btn-danger';
    deletebtn.textContent="حذف";
    deletebtn.onclick=function(){
      deleteSugg(snapshot1.key);
    };


//view sugg
var  viewcel = document.createElement('td');
viewcel.className='viewcel';
var viewbtn = document.createElement('button');
viewbtn.className='buttons btn btn-primary';
viewbtn.textContent="عرض ";
viewbtn.onclick=function(){
 viewSugg(snapshot1.child("employeeNotes").val());
};


   var trademarkCategory = document.createElement('td');
   trademarkCategory.className='cells';
   trademarkCategory.textContent=snapshot1.child("categoryName").val();

   var trademarkEmail = document.createElement('td');
   trademarkEmail.className='cells';
   trademarkEmail.textContent=snapshot1.child("contactEmailAddress").val();
   trademarkEmail.onclick=function(){
     contactSugg(snapshot1.child("contactEmailAddress").val());
   }

   var trademarkContactNum = document.createElement('td');
   trademarkContactNum.className='cells';
   trademarkContactNum.textContent=snapshot1.child("contactNumber").val();

   var trademarkName = document.createElement('td');
   trademarkName.className='cells';
   trademarkName.textContent=snapshot1.child("trademarkName").val();


    
    deletecel.appendChild(deletebtn);
    newrow.appendChild(deletecel);
    
    viewcel.appendChild(viewbtn);
    newrow.appendChild(viewcel);

    newrow.appendChild(trademarkEmail);
    newrow.appendChild(trademarkContactNum);
    newrow.appendChild(trademarkCategory);
    newrow.appendChild(trademarkName);

    document.getElementById('tableBody').appendChild(newrow);

   });
  
});
document.getElementById("dataTable").deleteRow(1);

  
  }//end sugg

  function deleteSugg(uid){
    var conf =confirm("هل أنت متأكد من حذف الاقتراح؟");
    if (conf==true){//true
     firebase.database().ref('Suggestion/'+uid).remove();
      alert('تم حذف الاقتراح');
      reload_page();
      }
      
     
    }

    function reload_page() { 
      window.location.reload();     
      }
  function contactSugg(email){
    window.location.href='mailto:'+email;
    
  }

  function viewSugg(uid){
    if (uid=="")
   alert("لا يوجد تفاصيل");
   else
   alert(uid);
  }




  




