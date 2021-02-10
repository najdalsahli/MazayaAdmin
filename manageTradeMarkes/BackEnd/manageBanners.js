

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

var tid=localStorage.getItem('tradmarkID');
var type='';

console.log("tm id"+tid) ;
console.log("type 1"+type) ;
var savedBannersID='';
var flag=false;
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  
    // document.getElementById("loader").style.display = "block";
    //  document.getElementById("myDiv").style.display = "none";

function fillOffers(){
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    console.log("type id"+type) ;

    if(type=='pinned'){
      var  selectOffer= document.getElementById("pinned");
    var ref=firebase.database().ref('Trademarks/'+tid+'/Offers');
      ref.once('value',function(snapshot) {
          snapshot.forEach(function(snapshot1) {
            firebase.database().ref('Offers/'+snapshot1.key).once('value',function(snapshot2) {
              console.log('pinned'+snapshot2.key);
              flag=true;

          var option = document.createElement( 'option' );
            option.value=snapshot2.key;
            option.text = snapshot2.child("offerTitle").val()+'/'+snapshot2.child("offerDetails").val();
           selectOffer.add( option );
            });
          });
      });
    }
    else{

    var ref=firebase.database().ref('Trademarks/'+tid+'/Offers');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
        firebase.database().ref('Offers/'+snapshot1.key).once('value',function(snapshot2) {
    flag=true;
    console.log('seasonal'+snapshot1.key);
var checkList = document.getElementById('seasnoal');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
var ul=document.getElementById('list');
var inp=document.createElement("input");
inp.type='checkbox';
var li=document.createElement("li");
var t = document.createTextNode(snapshot2.child("offerTitle").val()+'/'+snapshot2.child("offerDetails").val());
inp.id=snapshot2.key;
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
     });
    });
    });
    }
    setTimeout(wait, 5000);

}

// var fbBucketName = 'images';

// //alert(" code 1 ");
// // get elements
// var fileButton = document.getElementById('fileButton');

// // listen for file selection
// fileButton.addEventListener('change', function (e) {

//   // what happened
//   console.log('file upload event', e);

//   // get file
//   var file = e.target.files[0];

//   // create a storage ref
//   var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

//   // upload file
//   var uploadTask = storageRef.put(file);


//   // update progress bar
//   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//     function (snapshot) {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       uploader.value = progress;
//       console.log('Upload is ' + progress + '% done');
//       switch (snapshot.state) {
//         case firebase.storage.TaskState.PAUSED: // or 'paused'
//           console.log('Upload is paused');
//           break;
//         case firebase.storage.TaskState.RUNNING: // or 'running'
//           console.log('Upload is running');
//           break;
//       }
//     }, function (error) {

//       switch (error.code) {
//         case 'storage/unauthorized':
//           // User doesn't have permission to access the object
//           break;

//         case 'storage/canceled':
//           // User canceled the upload
//           break;

//         case 'storage/unknown':
//           // Unknown error occurred, inspect error.serverResponse
//           break;
//       }
//     }, function () {

//       const img_url = uploadTask.snapshot.ref.getDownloadURL().then(function(url){
//         imgURL = url;
//       firebase.database().ref('Banners/'+savedBannersID+'/imgURL').set(url);
 
//         //return url;
//         console.log('imgURL', imgURL);
//       });

//     });

//     });
    
  
function wait(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";

    if(!flag){
      
   }else{
    flag=false;
   }
}

function save(){
    var title=document.getElementById('title').value;
    var startDate=document.getElementById('startDate').value
    var endDate=document.getElementById('endDate').value

    if(type=='pinned'){
      var selectOffer=document.getElementById('pinned').value;
    if(valditePinned(title,selectOffer,startDate,endDate)){
      console.log(selectOffer);

      let storageRef = firebase.storage().ref('images')
      let fileUpload = document.getElementById("fileButton")
    
      fileUpload.addEventListener('change', function(evt) {
          let firstFile = evt.target.files[0] // upload the first file only
          let uploadTask = storageRef.put(firstFile)
      })
      firebase.database().ref('Banners').push({
        endDate:endDate,
        imgURL:'',
        offerID:selectOffer,
        startDate:startDate,
       title:title,
        type:'pinned'
      });
goHome();
    }//if valdite
  }

  else{
    var selectOffer=checkOffers();
    if(valditeSeasonal(title,selectOffer,startDate,endDate)){
      firebase.database().ref('Banners').push({
        endDate:endDate,
        imgURL:'',
        startDate:startDate,
        title:title,
        type:'seasonal'
      });
    

   var refBanners=firebase.database().ref('Banners');
   refBanners.orderByChild('title').equalTo(title).on("value", function(snapshot) {
          snapshot.forEach(function(data) {
            if(data.child('type').val()=='seasonal'){
              console.log('saved trademark key',data.key);
  //saving Offer
   var lnx = document.querySelectorAll("#list li input");
       for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
          console.log(lnx[i].id);
          firebase.database().ref('Banners/'+data.key+'/Offers/'+lnx[i].id).set(true);
        }}
            }
             });  

         }); 
         goHome();

    }//if valdite 
  }//else

    //ile(savedBannersID);


}//end function

function checkOffers(){

    var lnx = document.querySelectorAll("#list li input");
    var num=0;

    /* The .length property applies to any jQuery Object
    || Using let to define the increment variable is safe
    */
    for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
         num= num+1;}
        }
        return num;
       
    
 }


 function valditePinned(title,selectOffer,startDate,endDate){
if(title==''){
  alert(" الرجاء ادخال عنوان للشريط الإعلاني ");
  return false;

}

if(document.getElementById("fileButton").files.length == 0 ){
  console.log("no files selected- img");
  alert(" الرجاء اختيار صورة للشريط الإعلاني ");
  return false;
}



if (selectOffer=='10'){
  alert(" الرجاء اختيار عرض ");
  return false;
}
if (startDate==''){
  alert(" الرجاء اختيار تاريخ البدء ");
  return false;
}

if (endDate==''){
  alert(" الرجاء اختيار تاريخ النهاية ");
  return false;
}
 return true;

 }

 function valditeSeasonal(title,selectOffer,startDate,endDate){
  if(title==''){
    alert(" الرجاء ادخال عنوان للشريط الإعلاني ");
    return false;
  
  }
  
  if(document.getElementById("fileButton").files.length == 0 ){
    console.log("no files selected- img");
    alert(" الرجاء اختيار صورة للشريط الإعلاني ");
    return false;
  }
  
  
  
  if (selectOffer== 0){
    alert(" الرجاء اختيار عرض واحد على الأقل");
    return false;
  }
  if (startDate==''){
    alert(" الرجاء اختيار تاريخ البدء ");
    return false;
  }
  
  if (endDate==''){
    alert(" الرجاء اختيار تاريخ النهاية ");
    return false;
  }
   return true;
  
   }
  

 function sesonal(){
   type='sesonal';
  document.getElementById('header').innerHTML='الشريط الإعلاني-الموسمية';
 // document.getElementById('Info').style.display='none';
  document.getElementById('divMain').style.display='block';
  document.getElementById('pinned').style.display='none';
   document.getElementById('seasnoal').style.display='block';
fillOffers();
 }


 function pinned(){
  type='pinned';
  document.getElementById('header').innerHTML='الشريط الإعلاني-المثبتة';
 // document.getElementById('Info').style.display='none';
  document.getElementById('divMain').style.display='block';
  document.getElementById('pinned').style.display='block';
  document.getElementById('seasnoal').style.display='none';
fillOffers();
}

function hi(){
  var lnx = document.querySelectorAll("#list li input");
  var lnx2 = document.querySelectorAll("#list li");
  var array=[];
  var arraySavingBranchKey=[];
 

      for (let i = 0; i < lnx.length; i++) {
       if( lnx[i].checked==true){
         console.log(lnx[i].id);
       }}
}

function goHome(){
  setTimeout(function(){
    window.location.href = "manageBannersHome.html";    }, 2000);

  
}