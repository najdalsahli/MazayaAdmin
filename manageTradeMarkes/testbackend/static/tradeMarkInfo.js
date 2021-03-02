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
    var Full_link;

  var savedtrademark='';

  function nextTradeMarkInfo(){

    var trademarkName=document.getElementById("name").value;
    var trademarkDescription =document.getElementById("description").value;
    var trademarkName=document.getElementById("name").value;
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
      firebase.database().ref('Trademarks').push(
        {
  
            backgroundImg:'',
            category:category_Type1,
            contactNum:tradecontactnum,
            description:trademarkDescription,
            email:trademarkmail,
            imgURL:url,
            instagram:accountinst,
            isFeatured:isـFeatured,
            serviceType:trademark_Type1,
            snapchat:Full_link,
            trademarkName:trademarkName,
            twitter:accounttwi,
            views:0,
            website:trademarkmaillink     
  
        });
        saveBackImg_category();

    })
    .catch(console.error);
    
    alert("تم إضافة العلامة التجارية بنجاح"); 
   
    setTimeout(function(){ 
      document.getElementById('next').style.display='none';
       document.getElementById('Branchpage').style.display='block';
  }, 5000);

 
   }//end if
   
  }//function 

  
  
  function change_page(){
    
    
    var trademark_Type=document.getElementById("trademarkType").value;
    if(trademark_Type=="13"){//online 
      localStorage.setItem("flagOnline",true);
      document.getElementById('link').val='link';
      document.getElementById('link').href='/AddOffers';
      setTimeout( document.getElementById('link').click(), 2000);

    
    }else{
      localStorage.setItem("flagOnline",false);
      document.getElementById('link').val='link';
      document.getElementById('link').href='/AddBranch';
      setTimeout( document.getElementById('link').click(), 2000);
        
    }
  
} 

function saveBackImg_category(){
//get the trademark key
var trademarkName=document.getElementById("name").value;
console.log('here');
var refTrademarks=firebase.database().ref('Trademarks');

//save background and in category tabel
var fbBucketName = 'images';
const file2 = document.querySelector("#fileButton1").files[0];
const name2 = +new Date() + "-" + file2.name;
const ref2 = firebase.storage().ref(`${fbBucketName}/${file2.name}`);
const metadata2 = {
  contentType: file2.type
};
const task2 = ref2.child(name2).put(file2, metadata2);
task2
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {

    refTrademarks.orderByChild('trademarkName').equalTo(trademarkName).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          savedtrademark= data.key;
          console.log('saved trademark key',data.key);
  
          localStorage.setItem("tradmarkID_branch",savedtrademark);
          localStorage.setItem("tradmarkID_offer",savedtrademark);
 
    var  category_Type0= document.getElementById("categoryType");
    var category_Type1 = category_Type0.options[category_Type0.selectedIndex].text;
  
    firebase.database().ref('Trademarks/'+data.key+'/backgroundImg').set(url);
    firebase.database().ref('Categories/'+category_Type1+'/Trademarks/'+data.key).set(true);
  });  
}); 
  })
  .catch(console.error);


  
  }



function validate(trademarkName,trademarkDescription,tradecontactnum,trademarkmail,trademarkmaillink,accountinst,accounttwi,accountsnap,trademark_Type,category_Type){
  if(trademarkName==''){
    alert("الرجاء ادخال اسم العلامة التجارية");
    return false;
  }

  count=0;
  var refTrademarks=firebase.database().ref('Trademarks');
  refTrademarks.orderByChild('trademarkName').equalTo(trademarkName).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          count++;
         });  
     }); 
     if (count!=0){
       alert('العلامة التجارية مدخلة مسبقا');
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
  alert(" الرجاء اختيار نوع نشاط العلامة التجارية");
  return false;
}



if(category_Type=="12")
{
  alert(" الرجاء اختيار الفئة                           ");
  return false ;
}
if( document.getElementById("fileButton").files.length == 0 ){
  console.log("no files selected- img");
  alert(" الرجاء اختيار صورة للعلامة التجارية");
  return false;
}

if( document.getElementById("fileButton1").files.length == 0 ){
  console.log("no files selected- background");
  alert("الرجاء اختيار خلفية للعلامة التجارية ");
  return false;
}
return true;
}