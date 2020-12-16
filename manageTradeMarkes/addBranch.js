
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
    var lat='';
  var lng='';
  const auth=firebase.auth();
  
  function nextTradeMarkInfoOffer(){
    var nameOfBranch = document.getElementById("branchName").value;
    var DescOfBranch = document.getElementById("Desc").value;
    var  selectRegion= document.getElementById("region");
    
    var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
    if(Validation(nameOfBranch,DescOfBranch,selectRegion.value)){
        //id of key of the trademark.
    firebase.database().ref('Trademarks/-MHFk6d50tMb_wYSXVnx/Branches').push(
                {
                    branchName:nameOfBranch,
                    description:DescOfBranch,
                    latitude:lat.toString(),
                    longitude:lng.toString(),
                    region:selectRegionText
                });
    alert(nameOfBranch+DescOfBranch+selectRegionText+lat+lng);
  //id of key of the trademark.
    firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/-MHFk6d50tMb_wYSXVnx').set("true");
      alert("hi");

}//IF VALDITE
}//END FUNCTION


function Validation(nameOfBranch,DescOfBranch,selectRegionValue){
    if(nameOfBranch==''){
                    alert("الرجاء ادخال اسم الفرع");
                    return false;
                    }
     if(DescOfBranch==''){
                                        alert("الرجاء ادخال وصف للفرع ");
                                        return false;
                                    }
      if(lat==''&&lng=='')
                                    {
                                   alert("الرجاء اختيار موقع الفرع من الخريطة ");      
                                  return false;
                                     }  
   if(selectRegionValue=="12")
                                    {
                                   alert("الرجاء اختيار منطقة ");      
                                  return false;
                                     }  
         
                    return true;
    
}

function Validation2(nameOfBranch,DescOfBranch,selectRegionValue){
    if(nameOfBranch==''){
                    alert(" الرجاء ادخال اسم الفرع الحالي أولا ");
                    return false;
                    }
     if(DescOfBranch==''){
                                        alert(" الرجاء ادخال وصف للفرع الحالي أولا ");
                                        return false;
                                    }
      if(lat==''&&lng=='')
                                    {
                                   alert("الرجاء اختيار موقع الفرع من الخريطة للفرع الحالي أولا ");      
                                  return false;
                                     }  
   if(selectRegionValue=="12")
                                    {
                                   alert("الرجاء اختيار منطقة للفرع الحالي أولا ");      
                                  return false;
                                     }  
         
                    return true;
    
}

    
      function initMap() {
          //button otherPage
          var ontherpage=document.getElementById("addOntherBranch");
          ontherpage.onclick=function(){
       addOntherBranch();
      }
        const myLatlng = { lat: 24.078270707663386, lng: 47.06658913675267};
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: myLatlng
        });
        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
          content: "انقر لتحديد الموقع ",
          position: myLatlng,
        });
        infoWindow.open(map);
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();
          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });
          lat=mapsMouseEvent.latLng.toJSON().lat;
          lng=mapsMouseEvent.latLng.toJSON().lng;
          infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          );
          lat=mapsMouseEvent.latLng.toJSON().lat;
          lng=mapsMouseEvent.latLng.toJSON().lng
          infoWindow.open(map);
        });
      }

      function addOntherBranch(){

       var conf= confirm("سيتم حفظ الفرع الحالي ،هل تريد إضافة فرع آخر ؟");
       if (conf==true){
           //save
    var nameOfBranch = document.getElementById("branchName").value;
    var DescOfBranch = document.getElementById("Desc").value;
    var  selectRegion= document.getElementById("region");
    
    var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
    if(Validation2(nameOfBranch,DescOfBranch,selectRegion.value)){
        //id of key of the trademark.
    firebase.database().ref('Trademarks/-MHFk6d50tMb_wYSXVnx/Branches').push(
                {
                    branchName:nameOfBranch,
                    description:DescOfBranch,
                    latitude:lat.toString(),
                    longitude:lng.toString(),
                    region:selectRegionText
                });
    alert(nameOfBranch+DescOfBranch+selectRegionText+lat+lng);}
      clear();   
       }  
    }
    function clear (){
        document.getElementById('branchName').value = ''
        document.getElementById('Desc').value = ''
        document.getElementById('region').value = "12";
        lat = ''
        lag = ''

    }
