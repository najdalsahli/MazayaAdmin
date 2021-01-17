
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

  var lat='';
  var lng='';
  //localStorage.setItem("tradmarkID_branch",'-MPcZEvUiI61k8GwbrLM');

  var tmBranchID=localStorage.getItem("tradmarkID_branch");

  function nextTradeMarkInfoOffer(msg){
    //alert(tmBranchID);
    var nameOfBranch = document.getElementById("branchName").value;
    var DescOfBranch = document.getElementById("Desc").value;
    var  selectRegion= document.getElementById("region");
    saveDBbranch(nameOfBranch,DescOfBranch,selectRegion,msg);
}//END FUNCTION


 function saveDBbranch(nameOfBranch,DescOfBranch,selectRegion,msg){
      var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
      if(Validation(nameOfBranch,DescOfBranch,selectRegion.value,msg)){
          // trademark + branch tabel.
          try{
      firebase.database().ref('Trademarks/'+tmBranchID+'/Branches').push(
                  {
                      branchName:nameOfBranch,
                      description:DescOfBranch,
                      latitude:lat.toString(),
                      longitude:lng.toString(),
                      region:selectRegionText
                  });
                      // region tabel
     firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/'+tmBranchID).set("true");
      alert('تم إضافة الفرع بنجاح');
      document.getElementById('next').style.display='none'
      document.getElementById('offerpage').style.display='block'
      
        
        }//try
          catch{
            alert("عذرا حدث خطأ !")
          } 
  }//IF VALDITE
    }


  //   function change_page(){
  //  //   localStorage.setItem("tradmarkID_branch",'');
  //     localStorage.setItem("tradmarkID_offer",tmBranchID);
  //    window.location.href = "AddOffers.html";
  //   }
        


// function change_page2(){
// localStorage.setItem("tradmarkID_branch",tmBranchID);
//    window.location.href = "AddBranch.html";
// }


function Validation(nameOfBranch,DescOfBranch,selectRegionValue,msg){
    if(nameOfBranch==''){
                    alert("الرجاء ادخال اسم الفرع"+msg);
                    return false;
                    }
     if(DescOfBranch==''){
            alert("الرجاء ادخال وصف للفرع "+msg);
                     return false;
                                    }
      if(lat==''&&lng=='')
                                    {
              alert("الرجاء اختيار موقع الفرع من الخريطة "+msg);      
                  return false;
                                     }  
   if(selectRegionValue=="12")
                                    {
             alert("الرجاء اختيار منطقة "+msg);      
                    return false;
                                     }  
         
                    return true;
    
}


      function initMap() {
      
       // alert("map"+tmBranchID);
      //     //button otherPage
      //     var ontherpage=document.getElementById("addOntherBranch");
      //     ontherpage.onclick=function(){
      //  addOntherBranch();
      // }
        const myLatlng = { lat: 24.078270707663386, lng: 47.06658913675267};
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: myLatlng
        });
        var content='<div style="color: #38a089;font-family: Frutiger LT Arabic;font-size: 14px;">'+
        '<p> انقر لتحديد الموقع'+'</p></div>';
        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
          content: content,
          position: myLatlng,
        });
        infoWindow.open(map);
        //marker
      
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();
          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });
                 //     JSON.stringify("mapsMouseEvent.latLng.toJSON(), null, 2")
          lat=mapsMouseEvent.latLng.toJSON().lat;
          lng=mapsMouseEvent.latLng.toJSON().lng;
          infoWindow.setContent('<div style="color: #38a089;font-family: Frutiger LT Arabic;font-size: 14px;">'+
          '<p> تم التحديد بنجاح'+'</p></div>'
          );
  
          lat=mapsMouseEvent.latLng.toJSON().lat;
          lng=mapsMouseEvent.latLng.toJSON().lng
         infoWindow.open(map);
         // marker.setMap(map);

        });
      }
      function goOffer(){
        setTimeout(function() {
          console.log('iam here');
          localStorage.setItem("tradmarkID_offer",tmBranchID);
          window.location.href = "AddOffers.html";    }, 2000);

      }

//       function addBranch(){
//        alert("سيتم حفظ الفرع الحالي ");
      
//            //save
//     var nameOfBranch = document.getElementById("branchName").value;
//     var DescOfBranch = document.getElementById("Desc").value;
//     var  selectRegion= document.getElementById("region");
//    saveDBbranch2(nameOfBranch,DescOfBranch,selectRegion," الحالي أولا ");
                  
//        }  


//  function saveDBbranch2(nameOfBranch,DescOfBranch,selectRegion,msg){
//   var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
//   if(Validation(nameOfBranch,DescOfBranch,selectRegion.value,msg)){
//       // trademark + branch tabel.
//       try{
//   firebase.database().ref('Trademarks/'+tmBranchID+'/Branches').push(
//               {
//                   branchName:nameOfBranch,
//                   description:DescOfBranch,
//                   latitude:lat.toString(),
//                   longitude:lng.toString(),
//                   region:selectRegionText
//               });
//                   // region tabel
//  firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/'+tmBranchID).set("true");
//   alert('تم إضافة الفرع بنجاح');

// setTimeout(function() {
// change_page2();
// }, 1000);
      

  
    
//     }//try
//       catch{
//         alert("عذرا حدث خطأ !")
//       } 
// }//IF VALDITE
// }
