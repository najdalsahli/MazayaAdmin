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
    if(accountinst=='')
    {
  //alert("الرجاء ادخال رابط حساب الانستقرام الخاص بالعلامة التجارية");
  return;
    }
    console.log(accountinst);
  
    //id twi
    var accounttwi=document.getElementById("twi").value;
    if(accounttwi=='')
    {
  //alert("الرجاء ادخال رابط حساب التويتر الخاص بالعلامة التجارية");
  return;
    }
    console.log(accounttwi);
  
    //id snap 
    var accountsnap=document.getElementById("snap").value;
    if(accountsnap=='')
    {
      //alert(" الرجاء ادخال رابط حساب السناب تشات الخاص بالعلامة التجارية");
      return;
    }
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
  



  try{

    firebase.database().ref('Trademarks').push(
        {
            /*branchName:nameOfBranch,
            description:DescOfBranch,
            latitude:lat,
            longitude:lng,
            region:selectRegionText*/
            backgroundImg:'',
            category:category_Type1,
            contactNum:tradecontactnum,
            description:trademarkDescription,
            email:trademarkmail,
            imgURL:'',
            instagram:accountinst,
            isFeatured:isـFeatured,
            serviceType:trademark_Type1,
            snapchat:accountsnap,
            trademarkName:trademarkName,
            twitter:accounttwi,
            views:'',
            website:trademarkmaillink     

        });

        alert(" added successfully, yay! ");

  }catch{
    alert(" something went wrong" );
  }
  
  
  
  
  
  }// end function 