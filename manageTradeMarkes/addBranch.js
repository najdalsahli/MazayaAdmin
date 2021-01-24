
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

  var tmBranchID='-MRmmMFJHRq7KgO8Uanw';
  //localStorage.getItem("tradmarkID_branch");
  //localStorage.getItem("tradmarkID_branch");

  function nextTradeMarkInfoOffer(msg){
    //alert(tmBranchID);
    var nameOfBranch = document.getElementById("branchName").value;
    var DescOfBranch = document.getElementById("Desc").value;
    var  selectRegion= document.getElementById("region");
    saveDBbranch(nameOfBranch,DescOfBranch,selectRegion,msg);
}//END FUNCTION


 function saveDBbranch(nameOfBranch,DescOfBranch,selectRegion,msg){
  console.log('before saving');
      var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
      if(Validation(nameOfBranch,DescOfBranch,selectRegion.value,msg)){
          // trademark + branch tabel.
       
      firebase.database().ref('Trademarks/'+tmBranchID+'/Branches').push(
                  {
                      branchName:nameOfBranch,
                      description:DescOfBranch,
                      latitude:lat.toString(),
                      longitude:lng.toString(),
                      region:selectRegionText
                  });
                      // region tabel
                      console.log(selectRegionText);
     firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/'+tmBranchID).set("true");
      alert('تم إضافة الفرع بنجاح');
      document.getElementById('next').style.display='none'
      document.getElementById('offerpage').style.display='block'
      
        
       
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
    

        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: -33.8688, lng: 151.2195 },
          zoom: 13,
        });
        const input = document.getElementById("pac-input");
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);
        // Specify just the place data fields that you need.
        autocomplete.setFields(["place_id", "geometry", "name"]);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
        infowindow.setContent(infowindowContent);
        const marker = new google.maps.Marker({ map: map });
        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
        autocomplete.addListener("place_changed", () => {
          infowindow.close();
          const place = autocomplete.getPlace();
      
          if (!place.geometry) {
            return;
          }
      
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
          // Set the position of the marker using the place ID and location.
          marker.setPlace({
            placeId: place.place_id,
            location: place.geometry.location,
          });
          marker.setVisible(true);
        infowindow.setContent('تم التحديد');
        lng=place.geometry.location.lng();
        lat=place.geometry.location.lat();

          infowindow.open(map, marker);

        });      
      }

      
      function goOffer(){
        setTimeout(function() {
          console.log('iam here');
          localStorage.setItem("tradmarkID_offer",tmBranchID);
          window.location.href = "AddOffers.html";    }, 5000);

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
