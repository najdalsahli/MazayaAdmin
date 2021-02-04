

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

var flag=false;



function viewTradeMarks(){



 var count=0;
 var newrow;


    firebase.database().ref('Categories').once('value').then(function(snapshot) {
        
        snapshot.forEach(function(snapshot1) {

            snapshot1.child("TradeMarks").forEach(function(snapshot2) {
                if(count == 5){
                    count=0;
                }
                if(count==0){
                     newrow = document.createElement('tr');
                    document.getElementById('table').appendChild(newrow);
                }
              
               
                 var newcell = document.createElement('td');
                var Divforcell = document.createElement('div');
                var image = document.createElement("img");
                var pragraph = document.createElement("p");
               
                Divforcell.className="Dives";
                image.className="images";
                pragraph.className="pragraphs";
                count=count+1;
                image.src=snapshot2.child("BrandImage").val();
                pragraph.textContent=snapshot2.child("BrandName").val();

                newrow.appendChild(newcell);
                newcell.appendChild(Divforcell);
                Divforcell.appendChild(image);
                Divforcell.appendChild(pragraph);
            
            })
        })
    });
 
  }



function showTradeMarkes(categoryName){
 
  document.getElementById("catheader").innerHTML=categoryName;
  document.getElementById("category-container").style.display = "block";
  document.getElementById("loader").style.display = "block";
  document.getElementById("myDiv").style.display = "none";

  var list=document.getElementById('bodyOftable');
  while (list.hasChildNodes()) {  
    list.removeChild(list.firstChild);
  }


 
if(categoryName=='الكل'){
    
var countTM=0;
  firebase.database().ref('Trademarks').once('value').then(function(snapshot) {
    flag=true;
    if(snapshot.numChildren()==0){
      var noResult= document.createElement('td');
      noResult.style.color='#F51B46';
      noResult.style.textAlign='center';
      noResult.style.font='font-family';
      noResult.style.weight='bold';
      noResult.textContent="لا يوجد علامة تجارية";
      var newRow = document.createElement('tr');
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
       newRow.appendChild(noResult);
      document.getElementById("bodyOftable").appendChild(newRow);
        }
      else{
    snapshot.forEach(function(snapshot1) {
      countTM++;
      var numoffers=snapshot1.child('Offers').numChildren()+snapshot1.child('Deals').numChildren()+snapshot1.child('Vouchers').numChildren();
      var numbraches=snapshot1.child('Branches').numChildren();
      var trademarkName=snapshot1.child('trademarkName').val();
      var imgtradesmark=snapshot1.child('imgURL').val();
      var serviceType=snapshot1.child('serviceType').val();


      readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,snapshot1.key,countTM,serviceType);

    })
  }
  });

}

else{//else 1
var countTM=0;
  firebase.database().ref('Categories').child(categoryName).child("Trademarks").once('value').then(function(snapshot2) {
    flag=true;
    var numkey=snapshot2.numChildren();
    console.log(numkey);
    if(numkey==0){
      var newRow = document.createElement('tr');
      const newDiv = document.createElement("div");
      const newContent = document.createTextNode("لا يوجد علامة تجارية");
      newDiv.appendChild(newContent);
        newDiv.className='table-responsive table mt-2';
      var noResult= document.createElement('td');
      noResult.style.color='#F51B46';
      noResult.style.textAlign='center';
      noResult.style.font='font-family';
      noResult.style.weight='bold';
      noResult.textContent="لا يوجد علامة تجارية";
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
       newRow.appendChild(noResult);
      document.getElementById("bodyOftable").appendChild(newRow);
  
          }
      else{//else 2
    snapshot2.forEach(function(snapshot) {

      firebase.database().ref("Trademarks").orderByKey().equalTo(snapshot.key).on("child_added",function(snapshot1) {
     
        var numoffers=snapshot1.child('Offers').numChildren()+snapshot1.child('Deals').numChildren()+snapshot1.child('Vouchers').numChildren();
        var numbraches=snapshot1.child('Branches').numChildren();
        var trademarkName=snapshot1.child('trademarkName').val();
        var imgtradesmark=snapshot1.child('imgURL').val();
        var serviceType=snapshot1.child('serviceType').val();
   
        countTM++;

        readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,snapshot1.key,countTM,serviceType);
})
})
}//else2
});
}// else 1
setTimeout(wait, 3000);
}//end function 
  function readTradeMarkes(numoffers,numbraches,trademarkName,imgtradesmark,uid,countTM,serviceType){
    
    var deletecel = document.createElement('td');
    deletecel.className='btncel';
  
    var deletebtn = document.createElement('button');
    deletebtn.className='btn deletebtn';
    deletebtn.textContent='حذف';
  
    var deleteIcon = document.createElement('i');
    deleteIcon.className='far fa-trash-alt deleteIcon';
    deletebtn.appendChild(deleteIcon);
    deletecel.appendChild(deletebtn);
    deletebtn.onclick= function ()
    { 
      deleteTM(uid);
    }
    
    
  
  // for editting 
   var editcel = document.createElement('td');
   editcel.className='btncel';
  
   var  editbtn= document.createElement('button');
    editbtn.className='btn editbtn';
  
    var editIcon= document.createElement('i');
    editIcon.className='ion-android-create editIcon';
    editbtn.textContent='تعديل';
    editbtn.appendChild(editIcon);
    editcel.appendChild(editbtn);
    editbtn.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  localStorage.setItem("tradmarkID_E",uid);
  if (serviceType=='أونلاين')
  localStorage.setItem("flagOnlineE",true);
else
localStorage.setItem("flagOnlineE",false);

window.location.href = "EditTrademark.html";
     };
    }
    //for viewing 
  
    var showcel= document.createElement('td');
    showcel.className='btncel';
  
    var showbtn=document.createElement('button');
    var showIcon= document.createElement('i');
    showIcon.className='viewIcon icon ion-ios-eye';

    showbtn.textContent='عرض';

    showbtn.className='btn viewbtn ';
    showbtn.appendChild(showIcon);
    showcel.appendChild(showbtn);
    showbtn.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  localStorage.setItem("tradmarkID",uid);
   window.location.href = "ViewTradeMark.html";
     };
    }

    //add
    var addTM=document.getElementById("add");
    addTM.onclick=function(){
      setTimeout(function() {
        change_page();
      }, 1000);
function change_page(){
  window.location.href = "tradeMarkInfo.html";
};
    };
  
    //var showIcon= document.createElement('i');
    //showIcon.className='';
  
    var offerscel= document.createElement('td');
    offerscel.className='infocel';
    offerscel.textContent=numoffers
    var brachescel= document.createElement('td');
    brachescel.className='infocel';
    brachescel.textContent=numbraches;
  
  
  
    var tradecel= document.createElement('td');
    tradecel.className='infocel';
    tradecel.textContent=trademarkName;
  
    var imgtrade= document.createElement('img');
    imgtrade.className='rounded-circle mr-2 imageTrade';
    imgtrade.style.marginTop='10px';
    imgtrade.src=imgtradesmark;


    var countcel= document.createElement('td');
    countcel.className='infocel';
    countcel.textContent=countTM;

    //tradecel.appendChild(imgtrade);
  
  
  
  
    var newRow = document.createElement('tr');
  
    newRow.appendChild(deletecel);
    newRow.appendChild(editcel);
    newRow.appendChild(showcel);
    newRow.appendChild(offerscel);
    newRow.appendChild(brachescel);
    newRow.appendChild(tradecel);
    newRow.appendChild(imgtrade);
    newRow.appendChild(countcel);


  
  
  
  
    document.getElementById("bodyOftable").appendChild(newRow);

    

  }  
     
  function deleteTM(uid){
    var region;
      var conf =confirm("هل أنت متأكد من حذف العلامة التجاية بملحقاتها؟");
      if (conf==true){//true
        //delete region 
        firebase.database().ref('Regions').once("value", function(snapshot) {
          snapshot.forEach(function(data) {
         console.log(data.key);
      firebase.database().ref('Regions/'+data.key+'/Trademarks/'+tmID).remove();
          });
      });
    //delete vouchres
var ref3=firebase.database().ref('Vouchers');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Vouchers/'+data.key).remove();
  });
});
//delete deals
var ref3=firebase.database().ref('Deals');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Deals/'+data.key).remove();
  });
});

//delete offers
var ref3=firebase.database().ref('Offers');
ref3.orderByChild('trademarkID').equalTo(uid).on("value", function(snapshot1) {
  snapshot1.forEach(function(data) {
    firebase.database().ref('Offers/'+data.key).remove();
  });
});


  //delete category 
  firebase.database().ref('Trademarks/'+uid).once("value",function(snapshot){
firebase.database().ref('Categories/'+snapshot.child('category').val()+'/Trademarks/'+uid).remove();
});


  //delete trademark 
 firebase.database().ref('Trademarks/'+uid).remove();

      alert('تم حذف العلامة التجارية');
        reload_page();
     
      }//if
}//end
        
    
     


function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  if(userEmail==''){
    alert("الرجاء ادخال البريد الالكتروني");
    return;
    
  }else if(userPass==''){
    alert("الرجاء ادخال الرقم السري");
    return;
  }else {

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then((user) => {
    // Signed in 
    // ...
    window.location.href="dashboard.html";

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("البريد الالكترروني أو الرقم السري خاطئ");
  });

  }



} //end of the function

function logout(){
    
  auth.signOut().then(function() {
    window.location.href="Login.html";
    }).catch(function(error) {
      alert(error);
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







  




