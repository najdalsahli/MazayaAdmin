

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

function load(){
  var tmID= localStorage.getItem("tradmarkID");
    alert(tmID);
    //Write your code here darling 
    //firebase.database().ref('Trademarks/'+savedtrademark+'/description').set(trademarkDescription);
    firebase.database().ref('Trademarks/'+tmID).once('value').then(function(snapshot){



      //#1
      document.getElementById("imgSrc").src=snapshot.child("imgURL").val();
      console.log('img url '+snapshot.child("imgURL").val());

      //#2-trademark_Name
      document.getElementById('trademark_Name').innerHTML = snapshot.child("trademarkName").val();
      console.log('trademark name '+snapshot.child("trademarkName").val());


   /*   //#3
      var trademarkTwi = document.createElement('td');
      trademarkTwi.className='cells';
      trademarkTwi.textContent=snapshot.child("twitter").val();

      //#4
      var trademarkSnap = document.createElement('td');
      trademarkSnap.className='cells';
      trademarkSnap.textContent=snapshot.child("snapchat").val();

      //#5
      var trademarkInst = document.createElement('td');
      trademarkInst.className='cells';
      trademarkInst.textContent=snapshot.child("instagram").val();*/

      //#6 -trademark_Description
      document.getElementById('trademark_Description').innerHTML = snapshot.child("description").val();
      console.log('trademark Description '+snapshot.child("description").val());

      //#7 -trademark_Website
      document.getElementById('trademark_Website').innerHTML = snapshot.child("website").val();
      console.log('trademark Website '+snapshot.child("website").val());


      //#8 -trademark_ContactNum
      document.getElementById('trademark_ContactNum').innerHTML = snapshot.child("contactNum").val();
      console.log('trademark Contact Num '+snapshot.child("contactNum").val());

      
      //#9 -trademark_Email
      document.getElementById('trademark_Email').innerHTML = snapshot.child("email").val();
      console.log('trademark Email '+snapshot.child("email").val());


    });


//
var refOffer=firebase.database().ref('Offers');
refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot) {

        console.log('saved trademark key',);

        snapshot.forEach(function(snapshot1) {
        
          var newrow = document.createElement('tr');
          var  viewcel = document.createElement('td');
          viewcel.className='viewcel';
    
            //---offers table---
            //offerTitle:
            //serviceType:
            //startDate
            //endDate:
            
            //---Branches table---
            //branch -- branchName:
            //region name --region:
    
           
     
    
          var offerTitle = document.createElement('td');
          offerTitle.className='cells';
          offerTitle.textContent=snapshot1.child("offerTitle").val();
    
          //#4
          var serviceType = document.createElement('td');
          serviceType.className='cells';
          serviceType.textContent=snapshot1.child("serviceType").val();
    
          var startDate = document.createElement('td');
          startDate.className='cells';
          startDate.textContent=snapshot1.child("startDate").val();
       
          var endDate = document.createElement('td');
          endDate.className='cells';
          endDate.textContent=snapshot1.child("endDate").val();
    
    
    
    
          
      
          newrow.appendChild(endDate);
          newrow.appendChild(startDate);
          newrow.appendChild(serviceType);
          //
          //
          //branchTable();
          newrow.appendChild(offerTitle);
          
          
          
      
          document.getElementById('dataTable').appendChild(newrow);
    
    
          
          });

   }); 

   branchTable();

function branchTable(){

   firebase.database().ref('Trademarks/'+tmID+'/Branches').once('value').then(function(snapshot){
    snapshot.forEach(function(snapshot1) {

      console.log('branch table ',);

      var newrow = document.createElement('tr');
      var  viewcel = document.createElement('td');
      viewcel.className='viewcel';

      //---Branches table---
      //branch -- branchName:
      //regionName --region:
      //description

      var branchName = document.createElement('td');
      branchName.className='cells';
      branchName.textContent=snapshot1.child("branchName").val();
       
      var regionName = document.createElement('td');
      regionName.className='cells';
      regionName.textContent=snapshot1.child("region").val();

      var description = document.createElement('td');
      description.className='cells';
      description.textContent=snapshot1.child("description").val();




      newrow.appendChild(description);
      newrow.appendChild(regionName);
      newrow.appendChild(branchName);

      document.getElementById('dataTable1').appendChild(newrow);


    });


   }); }

  
//firebase.database().ref('Offers/'+tmID+'Offers').once('value').then(function(snapshot)
   // firebase.database().ref('Trademarks/'+tmID+'Offers').once('value').then(function(snapshot){

   // });
    
//----
/*
//  var trademarkCategory=document.getElementById("Category").value;
//  var trademarkEmail=document.getElementById("Email").value;
 // var trademarkContactNum=document.getElementById("ContactNum").value;
 // var trademarkName=document.getElementById("TrademarkNmae").value;

    firebase.database().ref('Suggestion').once('value').then(function(snapshot) {
        


         
  var newrow = document.createElement('tr');
//delete sugg
 // var  deletecel = document.createElement('td');
 //   deletecel.className='deletecel';
 //  var deletebtn = document.createElement('button');
 //   deletebtn.className='btn btn-danger';
  //  deletebtn.textContent="حذف";
  //  deletebtn.onclick=function(){
  //    deleteSugg(snapshot1.key);
   // };


//view sugg
var  viewcel = document.createElement('td');
viewcel.className='viewcel';

//var viewbtn = document.createElement('button');
//viewbtn.className='buttons btn btn-primary';
//viewbtn.textContent="عرض ";
//viewbtn.onclick=function(){
 //viewSugg(snapshot1.child("employeeNotes").val());
//};


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

  




*/
//----


    localStorage.setItem("tradmarkID",'');
}
