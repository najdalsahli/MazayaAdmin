//const { service } = require("firebase-functions/lib/providers/analytics");


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
  var previoseCat,Full_link;
  const auth=firebase.auth();
  var tmID= localStorage.getItem("tradmarkID_E");
  //localStorage.setItem("tradmarkID_E",'');
var flag=false;
function s(){

 
  console.log(tmID);
    var ref=firebase.database().ref('Trademarks/'+tmID);
    ref.once("value", function(snapshot) {
      flag=true;
    document.getElementById("name").value=snapshot.child("trademarkName").val();
    document.getElementById("description").value=snapshot.child("description").val();
    document.getElementById("contactnum").value=snapshot.child("contactNum").val();
    document.getElementById("mail").value=snapshot.child("email").val();
    document.getElementById("inst").value=snapshot.child("instagram").val();
    document.getElementById("twi").value=snapshot.child("twitter").val();
    document.getElementById("snap").value=snapshot.child("snapchat").val();
    document.getElementById("maillink").value=snapshot.child("website").val();

 

  //id trademarkType 
  var textType=snapshot.child("serviceType").val();
  if (textType=="أون لاين" || textType=="أونلاين")
  document.getElementById("trademarkType").value="13";
  if (textType=="محلي")
  document.getElementById("trademarkType").value='14';
  if (textType=="الكل")
  document.getElementById("trademarkType").value='15';

  /*
                                                  <option value="13" >مطاعم</option>
                                                <option value="14" >مقاهي</option>
                                                <option value="15">حلويات</option>
                                                <option value="16">أغذية صحية</option>
                                                <option value="17">تسوق</option>
                                                <option value="18">خدمات</option>
                                                <option value="19">تعليم</option>
                                                <option value="20">صحة ولياقة</option>
                                                <option value="21">سفر وسياحة</option>
                                                <option value="22">جمال وسبا</option>
                                                <option value="23">ترفيه</option>
                                                <option value="24">إلكترونيات</option>
                                                <option value="25">سيارات</option>
                                                */
  //id categoryType 
  var textCatogory=snapshot.child("category").val();
if(textCatogory=="مطاعم")
document.getElementById("categoryType").value="13";
if(textCatogory=="مقاهي")
document.getElementById("categoryType").value="14";
if(textCatogory=="حلويات")
document.getElementById("categoryType").value="15";
if(textCatogory=="أغذية صحية")
document.getElementById("categoryType").value="16";
if(textCatogory=="تسوق")
document.getElementById("categoryType").value="17";
if(textCatogory=="خدمات")
document.getElementById("categoryType").value="18";
if(textCatogory=="تعليم")
document.getElementById("categoryType").value="19";
if(textCatogory=="صحة ولياقة")
document.getElementById("categoryType").value="20";
if(textCatogory=="سفر وسياحة")
document.getElementById("categoryType").value="21";
if(textCatogory=="جمال وسبا")
document.getElementById("categoryType").value="22";
if(textCatogory=="ترفيه")
document.getElementById("categoryType").value="23";
if(textCatogory=="إلكترونيات")
document.getElementById("categoryType").value="24";
if(textCatogory=="سيارات")
document.getElementById("categoryType").value="25";

//delete to rewrite 
previoseCat=textCatogory;
console.log(textCatogory);



  //id isFeatured
  var isـFeatured=snapshot.child("isFeatured").val();
  if(isـFeatured==true)
  document.getElementById("isFeatured").checked=true;
  else
  document.getElementById("isFeatured").checked=false;

//images
$("#open").on("click",function(event){
document.getElementById('img').src=snapshot.child("imgURL").val();
  $("#popup").hide().fadeIn(1000);

  $("#close").on("click",function(event){
    event.preventDefault();

      $("#popup").fadeOut(1000);
});
});


$("#open2").on("click",function(event){
document.getElementById('img').src=snapshot.child("backgroundImg").val();

  $("#popup").hide().fadeIn(500);

$("#close").on("click",function(event){
    event.preventDefault();
      $("#popup").fadeOut(500);
});
});




});//end call firebase ref

 //div hide and show with js
 var x = document.getElementById("myDIV");
 var editTM=document.getElementById("editTM");
 editTM.onclick= function (){   
   if (x.style.display == 'none') {
  x.style.display = 'block';
} else {
  x.style.display = 'none';
}
 }; 

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
//-------

}

function save(){
  var trademarkName=document.getElementById("name").value;
  var trademarkDescription =document.getElementById("description").value;
  var tradecontactnum=document.getElementById("contactnum").value;
  var trademarkmail=document.getElementById("mail").value;
  var trademarkmaillink=document.getElementById("maillink").value;
  var accountinst=document.getElementById("inst").value.toLowerCase();
  var accounttwi=document.getElementById("twi").value;
  var accountsnap=document.getElementById("snap").value;
  var trademark_Type=document.getElementById("trademarkType").value;
  var category_Type=document.getElementById("categoryType").value;

if(validate(trademarkName,trademarkDescription,tradecontactnum,trademarkmail,trademarkmaillink,accountinst,accounttwi,accountsnap,trademark_Type,category_Type))
{

  var  trademark_Type0= document.getElementById("trademarkType");
  var trademark_Type1 = trademark_Type0.options[trademark_Type0.selectedIndex].text;

var  category_Type0= document.getElementById("categoryType");
var category_Type1 = category_Type0.options[category_Type0.selectedIndex].text;

var isـFeatured=document.getElementById("isFeatured").checked;
//Saving 
firebase.database().ref('Trademarks/'+tmID+'/category').set(category_Type1);
firebase.database().ref('Trademarks/'+tmID+'/contactNum').set(tradecontactnum);
firebase.database().ref('Trademarks/'+tmID+'/description').set(trademarkDescription);
firebase.database().ref('Trademarks/'+tmID+'/email').set(trademarkmail);
firebase.database().ref('Trademarks/'+tmID+'/instagram').set(accountinst);
firebase.database().ref('Trademarks/'+tmID+'/isFeatured').set(isـFeatured);
firebase.database().ref('Trademarks/'+tmID+'/serviceType').set(trademark_Type1);
firebase.database().ref('Trademarks/'+tmID+'/snapchat').set(Full_link);
firebase.database().ref('Trademarks/'+tmID+'/trademarkName').set(trademarkName);
firebase.database().ref('Trademarks/'+tmID+'/twitter').set(accounttwi);
firebase.database().ref('Trademarks/'+tmID+'/website').set(trademarkmaillink);
console.log('pre'+previoseCat);
firebase.database().ref('Categories/'+previoseCat+'/Trademarks/'+tmID).remove();
console.log('after'+category_Type1);
firebase.database().ref('Categories/'+category_Type1+'/Trademarks/'+tmID).set(true);

//update img
if( document.getElementById("fileButton").files.length != 0 ){
  var fbBucketName = 'images';
  const file = document.querySelector("#fileButton").files[0];
  const name = +new Date() + "-" + file.name;
  const ref = firebase.storage().ref(`${fbBucketName}/${file.name}`);
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      firebase.database().ref('Trademarks/'+tmID+'/imgURL').set(url);
    })
    .catch(console.error);
}
//update background
if( document.getElementById("fileButton1").files.length != 0 ){
  var fbBucketName = 'images';
  const file = document.querySelector("#fileButton1").files[0];
  const name = +new Date() + "-" + file.name;
  const ref = firebase.storage().ref(`${fbBucketName}/${file.name}`);
  const metadata = {
    contentType: file.type
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      firebase.database().ref('Trademarks/'+tmID+'/backgroundImg').set(url);
    })
    .catch(console.error);
}



alert("تم تعديل العلامة التجارية بنجاح");
document.getElementById("myDIV").style.display='none';
}

}


// //*updating images */
// var fbBucketName = 'images';

// //alert(" code 1 ");
// // get elements
// var uploader = document.getElementById('uploader');
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

//       // A full list of error codes is available at
//       // https://firebase.google.com/docs/storage/web/handle-errors
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
//         firebase.database().ref('Trademarks/'+tmID+'/imgURL').set(url);
  
//         console.log('imgURL', imgURL);
//       });
      
//     });

//     });
    



//     //---------- file2

//     var fbBucketName1 = 'images';

// // get elements
// var uploader1 = document.getElementById('uploader1');
// var fileButton1 = document.getElementById('fileButton1');

// // listen for file selection
// fileButton1.addEventListener('change', function (e) {

//   // what happened
//   console.log('file upload event', e);

//   // get file
//   var file1 = e.target.files[0];

//   // create a storage ref
//   var storageRef1 = firebase.storage().ref(`${fbBucketName1}/${file1.name}`);

//   // upload file
//   var uploadTask1 = storageRef1.put(file1);

//   // The part below is largely copy-pasted from the 'Full Example' section from
//   // https://firebase.google.com/docs/storage/web/upload-files

//   // update progress bar
//   uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//     function (snapshot) {
//       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       uploader1.value = progress;
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

//       // A full list of error codes is available at
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
 
//       const backgroundImg_url = uploadTask1.snapshot.ref.getDownloadURL().then(function(url){
//         backgroundImg = url;
//         firebase.database().ref('Trademarks/'+tmID+'/backgroundImg').set(url);
//         //return url;
//         console.log('backgroundImg url', backgroundImg);
//       });
//     });

// });

function validate(trademarkName,trademarkDescription,tradecontactnum,trademarkmail,trademarkmaillink,accountinst,accounttwi,accountsnap,trademark_Type,category_Type){
  if(trademarkName==''){
    alert("الرجاء ادخال اسم العلامة التجارية");
    return false;
  }

  if(trademarkDescription=='')
  {
alert("الرجاء ادخال وصف للعلامة التجارية");
return false;
  }
  

  
  if(tradecontactnum=='')
  {
    alert("الرجاء ادخال رقم التواصل الخاص  بالعلامة التجارية");
    return false;
  }
  
  var re = /\S+@\S+\.\S+/;
  //id mail 
  if(trademarkmail!='' && !re.test(trademarkmail))
  {
alert("الرجاء ادخال البريد الالكتروني الخاص  بالعلامة التجارية بالطريقة الصحيحة");
return false;
  }

  var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;  
  if(trademarkmaillink!=''&&!pattern.test(trademarkmaillink))
  {
alert(" الرجاء ادخال رابط الموقع الالكتروني الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
return false;
  }

  // id inst
  var isMatch = accountinst.substr(0, 8) == 'https://' || accountinst.substr(0, 7) == 'http://';
  if(accountinst!=''&&!isMatch)
  {
    alert(" الرجاء ادخال رابط الانستقرام الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
    return false;
  }
  //id twi
  var isMatch = accounttwi.substr(0, 8) == 'https://' || accounttwi.substr(0, 7) == 'http://';
  if(accounttwi!=''&&!isMatch)
  {
    alert(" الرجاء ادخال رابط تويتر الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
    return false;
  }
  //id snap 
  var isMatch = accountsnap.substr(0, 8) == 'https://' || accountsnap.substr(0, 7) == 'http://';
  if(isMatch){
    Full_link=accountsnap;
  }
  else{
    Full_link="https://www.snapchat.com/add/"+ accountsnap;
  }

if(trademark_Type=="12")
{
  alert(" الرجاء اختيار نوع نشاط العلامه التجارية");
  return false;
}



if(category_Type=="12")
{
  alert(" الرجاء اختيار الفئه");
  return false ;
}
return true;
}