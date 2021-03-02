

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



  function visit_twitter(){
   // var tmID= localStorage.getItem("tradmarkID");
    console.log("tmID");
    firebase.database().ref('Trademarks/'+tmID).once('value').then(function(snapshot){
      var trademarkTwi=snapshot.child("twitter").val();
      //var Full_link="https://twitter.com/"+ trademarkTwi;
      //window.location=trademarkTwi;
      //location.href=trademarkTwi;
      console.log('twitter acc '+snapshot.child("twitter").val());
      console.log('twitter acc var'+snapshot.child("trademarkTwi").val());
    });

  }

  function visit_snapchat(){
    var tmID= localStorage.getItem("tradmarkID");
    firebase.database().ref('Trademarks/'+tmID).once('value').then(function(snapshot){
      var trademarkSnap = snapshot.child("snapchat").val();
      window.location=trademarkSnap;
      console.log('snapchat acc '+snapshot.child("snapchat").val());
    });

  }

  function visit_instagram(){
    var tmID= localStorage.getItem("tradmarkID");
    firebase.database().ref('Trademarks/'+tmID).once('value').then(function(snapshot){
      var trademarkInst = snapshot.child("instagram").val();
      window.location=trademarkInst;
      console.log('instagram acc '+snapshot.child("instagram").val());
    });

  }





var flagWait=false;

function load(){
  document.getElementById("loader").style.display = "block";
  document.getElementById("myDiv").style.display = "none";

  var tmID= localStorage.getItem("tradmarkID");
    //alert(tmID);
    //Write your code here darling 
    //firebase.database().ref('Trademarks/'+savedtrademark+'/description').set(trademarkDescription);

    firebase.database().ref('Trademarks/'+tmID).once('value').then(function(snapshot){
      flagWait=true;


      //#1
      document.getElementById("imgSrc").src=snapshot.child("imgURL").val();
      console.log('img url '+snapshot.child("imgURL").val());

      //#2-trademark_Name
      document.getElementById('trademark_Name').innerHTML = snapshot.child("trademarkName").val();
      console.log('trademark name '+snapshot.child("trademarkName").val());


      //#3
      var trademarkTwi=snapshot.child("twitter").val();
      console.log('twitter acc '+snapshot.child("twitter").val());
  
      document.getElementById("twitterbtn").addEventListener("click", function(){ 

        if(trademarkTwi!=''){
        if(trademarkTwi.startsWith("https")||trademarkTwi.startsWith("http")){
          location.href=trademarkTwi;

        }else{
        //https://twitter.com/Ruba_AlSmail
        var Full_link="https://twitter.com/"+ trademarkTwi;
        location.href=Full_link; }}
      });



      //#4
      var trademarkSnap = snapshot.child("snapchat").val();
      console.log('snapchat acc '+snapshot.child("snapchat").val());

      document.getElementById("snapchatbtn").addEventListener("click", function(){ 


        if(trademarkSnap!=''){
          var isMatch = trademarkSnap.substr(0, 8) == 'https://' || trademarkSnap.substr(0, 7) == 'http://';
          var Full_link;
          if(isMatch){
            Full_link=trademarkSnap;
          }
          else{
            Full_link="https://www.snapchat.com/add/"+ trademarkSnap;
          }}
      });
      

      //#5
      var trademarkInst = snapshot.child("instagram").val();
      console.log('instagram acc '+snapshot.child("instagram").val());

      document.getElementById("instagrambtn").addEventListener("click", function(){ 

        if(trademarkInst!=''){
        if(trademarkInst.startsWith("https")||trademarkInst.startsWith("https")){
          location.href=trademarkInst; 

        }else{
        //https://www.instagram.com/saudi.weddings/
        var Full_link="https://www.instagram.com/"+ trademarkInst+"/";
        location.href=Full_link; }}

      });

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


//Offer
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
    
    
    
          var typeOfOffer = document.createElement('td');
          typeOfOffer.className='cells';
          typeOfOffer.textContent='عرض';
 
    
    
          
      
          newrow.appendChild(endDate);
          newrow.appendChild(startDate);
          newrow.appendChild(serviceType);
          //
          //
          //branchTable();
          newrow.appendChild(offerTitle);
          newrow.appendChild(typeOfOffer);

          
          
      
          document.getElementById('dataTable').appendChild(newrow);
    
    
          
          });


   }); 
   //Deals
   var refOffer=firebase.database().ref('Deals');
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
       
       
             var typeOfOffer = document.createElement('td');
             typeOfOffer.className='cells';
             typeOfOffer.textContent='صفقة';
    
       
       
             
         
             newrow.appendChild(endDate);
             newrow.appendChild(startDate);
             newrow.appendChild(serviceType);
             //
             //
             //branchTable();
             newrow.appendChild(offerTitle);
             newrow.appendChild(typeOfOffer);

             
             
         
             document.getElementById('dataTable').appendChild(newrow);
       
       
             
             });
   
      }); 

      var refOffer=firebase.database().ref('Vouchers');
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


         var typeOfOffer = document.createElement('td');
         typeOfOffer.className='cells';
         typeOfOffer.textContent='قسيمة';

    
    
    
          
      
          newrow.appendChild(endDate);
          newrow.appendChild(startDate);
          newrow.appendChild(serviceType);
          //
          //
          //branchTable();
          newrow.appendChild(offerTitle);
          newrow.appendChild(typeOfOffer);

          
      
          document.getElementById('dataTable').appendChild(newrow);
    
    
          
          });

   }); 
   branchTable();

function branchTable(){

   firebase.database().ref('Trademarks/'+tmID+'/Branches/').once('value').then(function(snapshot){
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
    


    localStorage.setItem("tradmarkID",'');
    setTimeout(wait, 5000);
}

function wait(){
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  if(!flagWait){
    
 }else{
  flagWait=false;
 }
}