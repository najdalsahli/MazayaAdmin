

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
var flag=false;
// function myFunction() {
//     var popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
//   }
  
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
     
       var fbBucketName = 'BannersImages';
       const file = document.querySelector("#fileButton").files[0];
       const ref = firebase.storage().ref(`${fbBucketName}/${file.name}`);
       const name = +new Date() + "-" + file.name;
       const metadata = {
         contentType: file.type
       };
       const task = ref.child(name).put(file, metadata);
       task
         .then(snapshot => snapshot.ref.getDownloadURL())
         .then(url => {
           firebase.database().ref('Banners').push({
            endDate:endDate,
            imgURL:url,
            offerID:selectOffer,
            startDate:startDate,
            title:title,
            type:'pinned'
          });
          
         })
         .catch(console.error);
 
     goHome();
    }//if valdite
  }

  else{
    var selectOffer=checkOffers();
    if(valditeSeasonal(title,selectOffer,startDate,endDate)){
   

      var fbBucketName = 'BannersImages';
      const file = document.querySelector("#fileButton").files[0];
      const ref = firebase.storage().ref(`${fbBucketName}/${file.name}`);
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          firebase.database().ref('Banners').push({
            endDate:endDate,
            imgURL:url,
            startDate:startDate,
            title:title,
            type:'seasonal'
          });    
         
        })
        .catch(console.error);

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
  document.getElementById('Info').style.display='none';
  document.getElementById('divMain').style.display='block';
  document.getElementById('pinned').style.display='none';
   document.getElementById('seasnoal').style.display='block';
fillOffers();
 }


 function pinned(){
  type='pinned';
  document.getElementById('header').innerHTML='الشريط الإعلاني-المثبتة';
  document.getElementById('Info').style.display='none';
  document.getElementById('divMain').style.display='block';
  document.getElementById('pinned').style.display='block';
  document.getElementById('seasnoal').style.display='none';
fillOffers();
}

function goHome(){
  setTimeout(function(){
      alert('تم إضافة الشريط الاعلاني بنجاح');
      document.getElementById('link').val='link';
      document.getElementById('link').href='/manageBannersHome';
      document.getElementById('link').click();
          }, 2000);

  
}