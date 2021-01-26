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


var savedtrademark='';
  function nextTradeMarkInfo(){

    var trademarkName=document.getElementById("name").value;
    if(trademarkName==''){
      alert("الرجاء ادخال اسم العلامة التجارية");
      return;
    }
    console.log(trademarkName);
  
  
    //  id  description;
    var trademarkDescription =document.getElementById("description").value;
    if(trademarkDescription=='')
    {
  alert("الرجاء ادخال وصف للعلامة التجارية");
  return;
    }
    console.log(trademarkDescription);
    
  
    
    //id contactnum
    var tradecontactnum=document.getElementById("contactnum").value;
    if(tradecontactnum=='')
    {
      alert("الرجاء ادخال رقم التواصل الخاص  بالعلامة التجارية");
      return;
    }
    
    console.log(tradecontactnum);
  
    //id mail 
    var trademarkmail=document.getElementById("mail").value;
    if(trademarkmail=='')
    {
  alert("الرجاء ادخال البريد الالكتروني الخاص  بالعلامة التجارية");
  return;
    }
    console.log(trademarkmail);
  
  
    //id maillink
    var trademarkmaillink=document.getElementById("maillink").value;
    if(trademarkmaillink=='')
    {
  alert("الرجاء ادخال رابط الموقع الالكتروني الخاص  بالعلامة التجارية")
  return;
    }
    console.log(trademarkmaillink);
  
  
    // id inst
    var accountinst=document.getElementById("inst").value;

    console.log(accountinst);
  
    //id twi
    var accounttwi=document.getElementById("twi").value;
  
    console.log(accounttwi);
  
    //id snap 
    var accountsnap=document.getElementById("snap").value;

    
    console.log(accountsnap);
  
  
  //id trademarkType 
  var trademark_Type=document.getElementById("trademarkType").value;

  var  trademark_Type0= document.getElementById("trademarkType");
  var trademark_Type1 = trademark_Type0.options[trademark_Type0.selectedIndex].text;

  if(trademark_Type=="12")//trademark_Type.options[trademark_Type.selectedIndex].text
  {
    alert(" الرجاء اختيار نوع نشاط العلامه التجارية");
    return;
  }
  console.log(trademark_Type);
  
  
  //id categoryType 
  var category_Type=document.getElementById("categoryType").value;

  var  category_Type0= document.getElementById("categoryType");
  var category_Type1 = category_Type0.options[category_Type0.selectedIndex].text;

  if(category_Type=="12")//trademark_Type.options[trademark_Type.selectedIndex].text
  {
    alert(" الرجاء اختيار الفئه");
    return;
  }
  console.log(category_Type);
  
  //id isFeatured
  var isـFeatured=document.getElementById("isFeatured").checked;
  console.log(isـFeatured); 


  //---for the images
  //id fileButton
  //var file_Button = document.getElementById("fileButton").required;
  
  if( document.getElementById("fileButton").files.length == 0 ){
    console.log("no files selected- img");
    alert(" الرجاء اختيار صورة للعلامة التجارية");
    return;
}
  //id fileButton1
  //var file_Button1 = document.getElementById("fileButton").required;

  if( document.getElementById("fileButton1").files.length == 0 ){
    console.log("no files selected- background");
    alert("الرجاء اختيار خلفية للعلامة التجارية ");
    return;
}

  



  try{


       var flag=false;


       firebase.database().ref('Trademarks').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snapshot1) {

        var existTrademarkName= snapshot1.child("trademarkName").val();
        console.log('trademark Name: '+existTrademarkName);
        var compareResult= trademarkName.localeCompare(existTrademarkName);
        console.log('compare Result= : '+compareResult);
        
        

        if(compareResult==0){
          flag=true;
          //alert("Trademark name already exist");
          console.log('inside the if');
          //return;

        }

        });


        console.log('flag = '+flag);
        //Empty_insert();
        after_theLoop();
       });


  
function after_theLoop(){

  console.log('after the loop st = '+flag);
      if(flag!=true){
        
      //add in trademark tabel
  firebase.database().ref('Trademarks/'+savedtrademark+'/category').set(category_Type1);
    firebase.database().ref('Trademarks/'+savedtrademark+'/contactNum').set(tradecontactnum);
    firebase.database().ref('Trademarks/'+savedtrademark+'/description').set(trademarkDescription);
    firebase.database().ref('Trademarks/'+savedtrademark+'/email').set(trademarkmail);
    firebase.database().ref('Trademarks/'+savedtrademark+'/instagram').set(accountinst);
    firebase.database().ref('Trademarks/'+savedtrademark+'/isFeatured').set(isـFeatured);
    firebase.database().ref('Trademarks/'+savedtrademark+'/serviceType').set(trademark_Type1);
    firebase.database().ref('Trademarks/'+savedtrademark+'/snapchat').set(accountsnap);
    firebase.database().ref('Trademarks/'+savedtrademark+'/trademarkName').set(trademarkName);
    firebase.database().ref('Trademarks/'+savedtrademark+'/twitter').set(accounttwi);
    firebase.database().ref('Trademarks/'+savedtrademark+'/views').set(0);
    firebase.database().ref('Trademarks/'+savedtrademark+'/website').set(trademarkmaillink);

    //add in catogry tabel
    firebase.database().ref('Categories/'+category_Type1+'/Trademarks/'+savedtrademark).set(true);





          

        alert("تم إضافة العلامة التجارية بنجاح"); 
      
        setTimeout(function() {
          change_page();
      
        }, 1000);
      

      }else{
        //alert("Trademark name already exist");
        alert("الاسم التجاري موجود بالفعل ");
        return;
        
        }
        
      }


  }catch(error){
    console.log('error message '+error.message);
    alert(" something went wrong" );
  } 




  


  
  }// end function 



  function Empty_insert(){

    firebase.database().ref('Trademarks').push(
      {

          backgroundImg:'',
          category:'',
          contactNum:'',
          description:'',
          email:'',
          imgURL:'',
          instagram:'',
          isFeatured:'',
          serviceType:'',
          snapchat:'',
          trademarkName:'',
          twitter:'',
          views:0,
          website:''     

      });


//get the trademark key
      var refTrademarks=firebase.database().ref('Trademarks');
      refTrademarks.orderByChild('trademarkName').equalTo('').on("value", function(snapshot) {
          snapshot.forEach(function(data) {
              savedtrademark= data.key;
              localStorage.setItem("tradmarkID_branch",savedtrademark);
              console.log('saved trademark key',savedtrademark);

             });  
         }); 



  }


  
  
  function change_page(){
    localStorage.setItem("tradmarkID_branch",savedtrademark);
    localStorage.setItem("tradmarkID_offer",savedtrademark);

    var trademark_Type=document.getElementById("trademarkType").value;
    if(trademark_Type=="13"){//online
      window.location.href = "AddOffers.html";

    }else{
      window.location.href = "AddBranch.html";}
  
} 





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

  // The part below is largely copy-pasted from the 'Full Example' section from
  // https://firebase.google.com/docs/storage/web/upload-files

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
      // Upload completed successfully, now we can get the download URL
      // save this link somewhere, e.g. put it in an input field
      //var downloadURL = uploadTask.snapshot.downloadURL;
            //Uri downloadUri = taskSnapshot.getMetadata().getDownloadUrl();
             
      /*---*///var downloadURL = uploadTask.snapshot.ref.getDownloadURL();

      const img_url = uploadTask.snapshot.ref.getDownloadURL().then(function(url){
        imgURL = url;
        firebase.database().ref('Trademarks/'+savedtrademark+'/imgURL').set(url);
      /*  firebase.database().ref('Trademarks/'+savedtrademark).set({
          backgroundImg:'',
          category:category_Type1,
          contactNum:tradecontactnum,
          description:trademarkDescription,
          email:trademarkmail,
          imgURL:url,
          instagram:accountinst,
          isFeatured:isـFeatured,
          serviceType:trademark_Type1,
          snapchat:accountsnap,
          trademarkName:trademarkName,
          twitter:accounttwi,
          views:'',
          website:trademarkmaillink   
        });*/

        //return url;
        console.log('imgURL', imgURL);
      });
      //console.log('imgURL', imgURL);
      //console.log('downloadURL', img_url);

      //generatedFilePath = downloadURL.toString();//.PromiseResult
      /*---*///console.log('downloadURL', downloadURL);//Promise object
      //console.log('downloadURL', imgURL);
      
  /*-----------    const pritIMGurl = async() =>{
        const a = await img_url; 
        console.log('downloadURL', img_url);//Promise object
      };
      pritIMGurl(); -----------*/

 

      //alert(generatedFilePath);
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
      // Upload completed successfully, now we can get the download URL
      // save this link somewhere, e.g. put it in an input field
      //var downloadURL1 = uploadTask1.snapshot.downloadURL;
      //console.log('downloadURL', downloadURL1);
      const backgroundImg_url = uploadTask1.snapshot.ref.getDownloadURL().then(function(url){
        backgroundImg = url;
        firebase.database().ref('Trademarks/'+savedtrademark+'/backgroundImg').set(url);
        //return url;
        console.log('backgroundImg url', backgroundImg);
      });
    });

});




