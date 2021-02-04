

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

console.log("tm id"+tid);
var flag=false;
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
  
    // document.getElementById("loader").style.display = "block";
    //  document.getElementById("myDiv").style.display = "none";
    fillOffers();

function fillOffers(){
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";

    var ref=firebase.database().ref('Trademarks/'+tid+'/Offers');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
        firebase.database().ref('Offers/'+snapshot1.key).once('value',function(snapshot2) {
    flag=false;
    console.log(snapshot1.key);
var checkList = document.getElementById('offers');
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
var t = document.createTextNode('عرض' +'/' + snapshot2.child("offerDetails").val());
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
     });
    });
    });
    var ref=firebase.database().ref('Trademarks/'+tid+'/Deals');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
        firebase.database().ref('Deals/'+snapshot1.key).once('value',function(snapshot2) {
            flag=false;

    console.log(snapshot1.key);
var checkList = document.getElementById('offers');
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
var t = document.createTextNode('صفقة' +'/' + snapshot2.child("offerDetails").val());
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
     });
    });
    });
    var ref=firebase.database().ref('Trademarks/'+tid+'/Vouchers');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
        firebase.database().ref('Vouchers/'+snapshot1.key).once('value',function(snapshot2) {
            flag=false;

    console.log(snapshot1.key);
var checkList = document.getElementById('Vouchers');
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
var t = document.createTextNode('قسيمة' +'/' + snapshot2.child("offerTitle").val());
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
     });
    });
    });
    setTimeout(wait, 5000);

}

function file(){
var fbBucketName = 'images';

//alert(" code 1 ");
// get elements
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
     //   firebase.database().ref('Trademarks/'+savedtrademark+'/imgURL').set(url);
 
        //return url;
        console.log('imgURL', imgURL);
      });

    });

    });
    
  }
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
    var  selectBanners= document.getElementById("typeOfBnnaers");
    var selectBannersText = selectBanners.options[selectBanners.selectedIndex].text;
    var selectOffer=checkOffers();
    var startDate=document.getElementById('startDate').value
    var endDate=document.getElementById('endDate').value

    if(valdite(title,selectBanners,selectOffer,startDate,endDate)){
      console.log(selectOffer+selectBannersText);

      if (selectBanners=='13'){
        selectBannersText='seasonal';
      }
      else{
        selectBannersText='pinned';
      }


      var lnx = document.querySelectorAll("#list li input");
      var lnx2 = document.querySelectorAll("#list li");
      var array=[];
   
          for (let i = 0; i < lnx.length; i++) {
           if( lnx[i].checked==true){
      var selectofferText = lnx2[i].textContent;//,,,,,/,,,,,
      var n = selectofferText.search("/");
      var s=Number(n);
      var res = selectofferText.slice(0, s);
      array.push(res);
           }}
      
      


      firebase.database().ref('Banners').push({
        endDate:endDate,
        imgURL:'',
        startDate:startDate,
        title:title,
        type:selectBannersText
      });

   var refTrademarks=firebase.database().ref('Trademarks');
      refTrademarks.orderByChild('trademarkName').equalTo('').on("value", function(snapshot) {
          snapshot.forEach(function(data) {
              savedtrademark= data.key;
              localStorage.setItem("tradmarkID_branch",savedtrademark);
              localStorage.setItem("tradmarkID_offer",savedtrademark);

              console.log('saved trademark key',savedtrademark);

             });  
         }); 
    }


    file(bannerID);


}

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


 function valdite(title,selectBanners,selectOffer,startDate,endDate){
if(title==''){
  alert(" الرجاء ادخال عنوان للشريط الإعلاني ");
  return false;

}

if(document.getElementById("fileButton").files.length == 0 ){
  console.log("no files selected- img");
  alert(" الرجاء اختيار صورة للشريط الإعلاني ");
  return false;
}

if (selectBanners=='12'){
  alert(" الرجاء اختيار نوع الشريط الإعلاني ");
  return false;
}

if (selectOffer==0){
  alert(" الرجاء اختيار عرض واحد على الأقل ");
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