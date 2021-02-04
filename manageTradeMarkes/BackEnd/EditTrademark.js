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
console.log(textCatogory);
firebase.database().ref('Categories/'+textCatogory+'/Trademarks/'+tmID).remove();



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

//save changes
var save=document.getElementById("Save");
save.onclick=function(){
  //#1
//valdiate feilds
  var trademarkName=document.getElementById("name").value;
  if(trademarkName==''){
    alert("الرجاء ادخال اسم العلامة التجارية");
    return;
  }


  //  id  description;
  var trademarkDescription =document.getElementById("description").value;
  if(trademarkDescription=='')
  {
alert("الرجاء ادخال وصف للعلامة التجارية");
return;
  }
  

  
  //id contactnum
  var tradecontactnum=document.getElementById("contactnum").value;
  if(tradecontactnum=='')
  {
    alert("الرجاء ادخال رقم التواصل الخاص  بالعلامة التجارية");
    return;
  }
  
  var re = /\S+@\S+\.\S+/;
  //id mail 
  var trademarkmail=document.getElementById("mail").value;
  if(trademarkmail!='' && !re.test(trademarkmail))
  {
alert("الرجاء ادخال البريد الالكتروني الخاص  بالعلامة التجارية بالطريقة الصحيحة");
return;
  }

  //id maillink
  var trademarkmaillink=document.getElementById("maillink").value;
  var pattern = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; 

 
  if(trademarkmaillink!=''&&!pattern.test(trademarkmaillink))
  {
alert(" الرجاء ادخال رابط الموقع الالكتروني الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
return;
  }

  // id inst
  var accountinst=document.getElementById("inst").value.toLowerCase();
  var isMatch = accountinst.substr(0, 8) == 'https://' || accountinst.substr(0, 7) == 'http://';
  if(accountinst!=''&&!isMatch)
  {
    alert(" الرجاء ادخال رابط الانستقرام الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
    return;
      }
  //id twi
  var accounttwi=document.getElementById("twi").value;
  var isMatch = accounttwi.substr(0, 8) == 'https://' || accounttwi.substr(0, 7) == 'http://';
  if(accounttwi!=''&&!isMatch)
  {
    alert(" الرجاء ادخال رابط تويتر الخاص  بالعلامة التجارية بالطريقة الصحيحة ")
    return;
      }
  //id snap 
  var accountsnap=document.getElementById("snap").value;
  var isMatch = accountsnap.substr(0, 8) == 'https://' || accountsnap.substr(0, 7) == 'http://';
  var Full_link;
  if(isMatch){
    Full_link=accountsnap;
  }
  else{
    Full_link="https://www.snapchat.com/add/"+ accountsnap;

  }

//id trademarkType 
var trademark_Type=document.getElementById("trademarkType").value;

var  trademark_Type0= document.getElementById("trademarkType");
var trademark_Type1 = trademark_Type0.options[trademark_Type0.selectedIndex].text;

if(trademark_Type=="12")//trademark_Type.options[trademark_Type.selectedIndex].text
{
  alert(" الرجاء اختيار نوع نشاط العلامه التجارية");
  return;
}


//id categoryType 
var category_Type=document.getElementById("categoryType").value;

var  category_Type0= document.getElementById("categoryType");
var category_Type1 = category_Type0.options[category_Type0.selectedIndex].text;

if(category_Type=="12")//trademark_Type.options[trademark_Type.selectedIndex].text
{
  alert(" الرجاء اختيار الفئه");
  return;
}

//id isFeatured
var isـFeatured=document.getElementById("isFeatured").checked;
//#2
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

firebase.database().ref('Categories/'+category_Type1+'/Trademarks/'+tmID).set(true);

alert("تم تعديل العلامة التجارية بنجاح");
x.style.display='none';

}
}


//*updating images */
var fbBucketName = 'images';

//alert(" code 1 ");
// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

// listen for file selection
fileButton.addEventListener('change', function (e) {

  // what happened
  console.log('file upload event', e);

  // get file
  var file = e.target.files[0];

  // create a storage ref
  var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

  // upload file
  var uploadTask = storageRef.put(file);


  // update progress bar
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = progress;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function () {

      const img_url = uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        imgURL = url;
        firebase.database().ref('Trademarks/'+tmID+'/imgURL').set(url);
  
        console.log('imgURL', imgURL);
      });
      
    });

    });
    



    //---------- file2

    var fbBucketName1 = 'images';

// get elements
var uploader1 = document.getElementById('uploader1');
var fileButton1 = document.getElementById('fileButton1');

// listen for file selection
fileButton1.addEventListener('change', function (e) {

  // what happened
  console.log('file upload event', e);

  // get file
  var file1 = e.target.files[0];

  // create a storage ref
  var storageRef1 = firebase.storage().ref(`${fbBucketName1}/${file1.name}`);

  // upload file
  var uploadTask1 = storageRef1.put(file1);

  // The part below is largely copy-pasted from the 'Full Example' section from
  // https://firebase.google.com/docs/storage/web/upload-files

  // update progress bar
  uploadTask1.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function (snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader1.value = progress;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {

      // A full list of error codes is available at
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function () {
 
      const backgroundImg_url = uploadTask1.snapshot.ref.getDownloadURL().then(function(url){
        backgroundImg = url;
        firebase.database().ref('Trademarks/'+tmID+'/backgroundImg').set(url);
        //return url;
        console.log('backgroundImg url', backgroundImg);
      });
    });

});

