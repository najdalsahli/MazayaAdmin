
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
  var tmID= localStorage.getItem("tradmarkID_E_B");
  //localStorage.setItem("tradmarkID_E",'');

  //to make the branch global for lat and lng for map
var latB;
var lngB;
var lat='';
var lng='';
  //flag for map to not take value of lat and lag for frist time;
  var flag=false;
  var regionDB;
  var numOfB=0;
function load(){
  console.log(tmID);

    tm=tmID;
    
//alert(tmID);
    firebase.database().ref('Trademarks/'+tmID+'/Branches').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snapshot1) {
            var newrow = document.createElement('tr');
           numOfB=numOfB+1;

            //delete sugg
            var deletecel = document.createElement('td');
            deletecel.className='delcell';
            var deletebtn = document.createElement('button');
            deletebtn.className='btnDelete';
            deletebtn.textContent='حذف';
            var deleteIcon = document.createElement('i');
            deleteIcon.className='far fa-trash-alt deleteIcon';
            deletebtn.appendChild(deleteIcon);
            deletecel.appendChild(deletebtn);
                deletebtn.onclick=function(){
                    deleteThisBranch(snapshot1.key,snapshot1.child('region').val());
                };

            //edit
                var editcel = document.createElement('td');
                editcel.className='editcell';
                var  editbtn= document.createElement('button');
                 editbtn.className='btnEdit';
                 var editIcon= document.createElement('i');
                 editIcon.className='ion-android-create editIcon';
                 editbtn.textContent='تعديل';
                 editbtn.appendChild(editIcon);
                 editcel.appendChild(editbtn);
            editbtn.onclick=function(){
                editThisBranch(snapshot1.key);
            };
           
            var region = document.createElement('td');
            region.className='Branchcells';
            region.textContent=snapshot1.child("region").val();
             regionDB=snapshot1.child("region").val();
            
            var des = document.createElement('td');
            des.className='Branchcells';
            des.textContent=snapshot1.child("description").val();
           
            var name = document.createElement('td');
            name.className='Branchcells';
            name.textContent=snapshot1.child("branchName").val();
         
    newrow.appendChild(deletecel);    
    newrow.appendChild(editcel);
    newrow.appendChild(region);
    newrow.appendChild(des);
    newrow.appendChild(name);
    document.getElementById('tableBody').appendChild(newrow);
    
   
        });
    });
    document.getElementById("dataTable").deleteRow(1);

//buttons of editing
  var editOffer=document.getElementById("editOffer");
  editOffer.onclick=function(){
    setTimeout(function() {
      change_page();
    }, 1000);
  function change_page(){
  localStorage.setItem("tradmarkID_E_O",tmID);
  window.location.href = "EditOffers.html";
   };}
  
  
  
  var editBranches=document.getElementById("editBranch");
  editBranches.onclick=function(){
    setTimeout(function() {
      change_page();
    }, 1000);
  function change_page(){
  localStorage.setItem("tradmarkID_E_B",tmID);
  window.location.href = "EditBranch.html";
   };
  }

  var editTM=document.getElementById("editTM");
  editTM.onclick=function(){
    setTimeout(function() {
      change_page();
    }, 1000);
  function change_page(){
  localStorage.setItem("tradmarkID_E",tmID);
  window.location.href = "EditTrademark.html";
   };
  }

}

function deleteThisBranch(uid,regionD){
    var numOfRegion=1;
    
    var conf =confirm("هل أنت متأكد من حذف الفرع بملحقاته التابعة لها؟");
    if (conf==true){//true
     //delete OFFER ,DEALS ,VOUCHRES
     firebase.database().ref('Trademarks/'+tmID).once("value",function(snapshot){
      snapshot.child('Vouchers').forEach(function(snapshot1) {
        firebase.database().ref('Vouchers/'+snapshot1.key+'/Branches/'+uid).remove();
  });
  snapshot.child('Offers').forEach(function(snapshot1) {
    firebase.database().ref('Offers/'+snapshot1.key+'/Branches/'+uid).remove();
});
snapshot.child('Deals').forEach(function(snapshot1) {
  firebase.database().ref('Deals/'+snapshot1.key+'/Branches/'+uid).remove();
});

    
      });
     
//delete trademark-branch from region.
firebase.database().ref('Trademarks/'+tmID+'/Branches').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {
        if(snapshot1.child('region').val()==regionD){
            numOfRegion=numOfRegion+1;
            console.log(numOfRegion);

        }
    });});
if (numOfRegion<=1){
firebase.database().ref('Regions/'+regionD+'/Trademarks/'+tmID).remove();   
}

////delete branch from trademark.
    firebase.database().ref('Trademarks/'+tmID+'/Branches').child(uid).remove();
      alert('تم حذف الفرع');
      reload_page();
    }
}

function editThisBranch(bidKey){
    //declare global bid 
bid=bidKey;
var ref= firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bidKey);
     //div hide and show with js
 var x = document.getElementById("myDIV");
   if (x.style.display == 'none') {
  x.style.display = 'block';
} else {
  x.style.display = 'none';
}

ref.once("value", function(bid) {
  //name
document.getElementById("branchName").value=bid.child("branchName").val();

  //description 
document.getElementById('Desc').value=bid.child('description').val();

  //id region 
  var textRegion=bid.child("region").val();
if(textRegion=="الحدود الشمالية")
document.getElementById("region").value="13";
if(textRegion=="المنطقة الشرقية")
document.getElementById("region").value="14";
if(textRegion=="منطقة الرياض")
document.getElementById("region").value="15";
if(textRegion=="منطقة الجوف")
document.getElementById("region").value="16";
if(textRegion=="منطقة القصيم")
document.getElementById("region").value="17";
if(textRegion=="منطقة المدينة المنورة")
document.getElementById("region").value="18";
if(textRegion=="منطقة تبوك")
document.getElementById("region").value="19";
if(textRegion=="منطقة جازان")
document.getElementById("region").value="20";
if(textRegion=="منطقة حائل")
document.getElementById("region").value="21";
if(textRegion=="منطقة عسير")
document.getElementById("region").value="22";
if(textRegion=="منطقة مكة المكرمة")
document.getElementById("region").value="23";
if(textRegion=="منطقة نجران")
document.getElementById("region").value="24";
if(textRegion=="منطقة الباحة")
document.getElementById("region").value="25";


flag=true;
latB=parseFloat(bid.child("latitude").val());
lngB=parseFloat(bid.child("longitude").val());
initMap(latB,lngB);
});

var update=document.getElementById("update");
update.onclick=function(){
    updateDB(bid,regionDB);
}
}

function initMap() {
 
  const myLatlng = { lat: 24.078270707663386, lng: 47.06658913675267};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng
  });
  var content='<div style="color: #38a089;font-family: Frutiger LT Arabic;font-size: 14px;">'+
  '<p>  الموقع المحدد'+'</p></div>';
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
    '<p> تم تعديل الموقع بنجاح'+'</p></div>'
    );

    latB=mapsMouseEvent.latLng.toJSON().lat;
    lngB=mapsMouseEvent.latLng.toJSON().lng
   infoWindow.open(map);
  });


}

function initMap(latB,lngB){

   // alert(latB+ ",,,,"+ lngB);
    
      const myLatlng = { lat: Number(latB) , lng:Number(lngB) };
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: myLatlng
      });
      var content='<div style="color: #38a089;font-family: Frutiger LT Arabic;font-size: 14px;">'+
      '<p>  الموقع المحدد'+'</p></div>';
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
        '<p> تم تعديل الموقع بنجاح'+'</p></div>'
        );
    
        latB=mapsMouseEvent.latLng.toJSON().lat;
        lngB=mapsMouseEvent.latLng.toJSON().lng
       infoWindow.open(map);
      });
}


function addOntherBranch(){

initMap(24,24);
     //div hide and show with js
 var x = document.getElementById("myDIV");
   if (x.style.display == 'none') {
  x.style.display = 'block';
} else {
  x.style.display = 'none';
}

 var save=document.getElementById('update');
 save.innnerHTML=" حفظ"; 
 save.onclick=function(){
  var nameOfBranch = document.getElementById("branchName").value;
  var DescOfBranch = document.getElementById("Desc").value;
  var  selectRegion= document.getElementById("region");
  var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
  console.log(nameOfBranch);
 if(Validation2(nameOfBranch,DescOfBranch,selectRegion.value)){
     //id of key of the trademark.
 firebase.database().ref('Trademarks/'+tmID+'/Branches').push(
             {
                 branchName:nameOfBranch,
                 description:DescOfBranch,
                 latitude:lat.toString(),
                 longitude:lng.toString(),
                 region:selectRegionText
             });
             console.log(selectRegionText +'---'+tmID);
             firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/'+tmID).set("true");
             alert('تم إضافة الفرع بنجاح');
            clear();
            x.style.display='none';
            }
    } 
   }
 
 function Validation2(nameOfBranch,DescOfBranch,selectRegionValue){
    if(nameOfBranch==''){
                    alert(" الرجاء ادخال اسم الفرع  ");
                    return false;
                    }
     if(DescOfBranch==''){
                                        alert(" الرجاء ادخال وصف للفرع  ");
                                        return false;
                                    }
      if(latB==''&&lngB=='')
                                    {
                                   alert("الرجاء اختيار موقع الفرع من الخريطة ");      
                                  return false;
                                     }  
   if(selectRegionValue=="12")
                                    {
                                   alert("الرجاء اختيار منطقة للفرع  ");      
                                  return false;
                                     }  
         
                    return true;
    
}

function updateDB(bid,regionDB){
var nameOfBranch = document.getElementById("branchName").value;
 var DescOfBranch = document.getElementById("Desc").value;
 var  selectRegion= document.getElementById("region");
 var selectRegionText = selectRegion.options[selectRegion.selectedIndex].text;
 if(Validation2(nameOfBranch,DescOfBranch,selectRegion.value)){
    firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bid+'/branchName').set(nameOfBranch);
    firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bid+'/description').set(DescOfBranch);
    firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bid+'/latitude').set(latB);
    firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bid+'/longitude').set(lngB);
if(selectRegionText!=regionDB){
    firebase.database().ref('Trademarks/'+tmID+'/Branches/'+bid+'/region').set(selectRegionText);
    firebase.database().ref('Regions/'+regionDB+'/Trademarks/'+tmID).remove();
    firebase.database().ref('Regions/'+selectRegionText+'/Trademarks/'+tmID).set("true");
}
alert("تم تعديل الفرع بنجاح")
}
window.location.href = "EditBranch.html";
}

function clear(){
  document.getElementById("branchName").value='';
  document.getElementById("Desc").value='';
  document.getElementById("region").value="12";
  lat='';
  lng='';
}
function reload_page() { 
  window.location.reload();     
  }
