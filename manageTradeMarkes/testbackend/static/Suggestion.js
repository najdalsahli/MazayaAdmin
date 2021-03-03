
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

function suggestion ()
{
 
  

    var list = document.getElementById("tableBody");
    document.getElementById("loader").style.display = "block";
    document.getElementById("myDiv").style.display = "none";
    // As long as <ul> has a child node, remove it
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }
    firebase.database().ref('Suggestion').once('value').then(function(snapshot) {
        if(snapshot.numChildren()==0){
          flag=true;

          createElement('td');
      noResult.style.color='#F51B46';
      noResult.style.textAlign='center';
      noResult.style.font='font-family';
      noResult.style.weight='bold';
      noResult.textContent="لا توجد اقتراحات";
      var newRow = document.createElement('tr');
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
      newRow.appendChild(document.createElement('td'));
       newRow.appendChild(noResult);
      document.getElementById("tableBody").appendChild(newRow);
        }
        else{
        
      snapshot.forEach(function(snapshot1) {
      flag=true;
         
   var newrow = document.createElement('tr');
//delete sugg

var deletecel = document.createElement('td');
    deletecel.className='btncel';
  
    var deletebtn = document.createElement('button');
    deletebtn.className='btn deletebtn';
    deletebtn.textContent='حذف';
  
    var deleteIcon = document.createElement('i');
    deleteIcon.className='far fa-trash-alt deleteIcon';
    deletebtn.appendChild(deleteIcon);
    deletecel.appendChild(deletebtn);
    deletebtn.onclick= function (){
  deleteSugg(snapshot1.key);
 };

//view sugg
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
 viewSugg(snapshot1.child("employeeNotes").val());
};


   var trademarkCategory = document.createElement('td');
   trademarkCategory.className='cells';
   trademarkCategory.textContent=snapshot1.child("categoryName").val();

   var trademarkEmail = document.createElement('td');
   trademarkEmail.className='cells';
   trademarkEmail.style.color='#009BDA';
   trademarkEmail.textContent=snapshot1.child("contactEmailAddress").val();
   trademarkEmail.style.cursor='pointer';


   trademarkEmail.onclick=function(){
     if(snapshot1.child("contactEmailAddress").val()!='')
     contactSugg(snapshot1.child("contactEmailAddress").val());
   }

   var trademarkContactNum = document.createElement('td');
   trademarkContactNum.className='cells';
   trademarkContactNum.textContent=snapshot1.child("contactNumber").val();

   var trademarkName = document.createElement('td');
   trademarkName.className='cells';
   trademarkName.textContent=snapshot1.child("trademarkName").val();


    
    newrow.appendChild(deletecel);
    
    newrow.appendChild(showcel);

    newrow.appendChild(trademarkEmail);
    newrow.appendChild(trademarkContactNum);
    newrow.appendChild(trademarkCategory);
    newrow.appendChild(trademarkName);

    document.getElementById('tableBody').appendChild(newrow);

   });
        }
});
document.getElementById("dataTable").deleteRow(1);
    
  setTimeout(wait,5000);
    
  }//end sugg

  function deleteSugg(uid){
    var conf =confirm("هل أنت متأكد من حذف الاقتراح؟");
    if (conf==true){//true
     firebase.database().ref('Suggestion/'+uid).remove();
      alert('تم حذف الاقتراح');
      reload_page();
      }
      
     
    }

    function reload_page() { 
      window.location.reload();     
      }
  function contactSugg(email){
    window.location.href='mailto:'+email;
    
  }

  function viewSugg(uid){
    if (uid=="")
   alert("لا يوجد تفاصيل");
   else
   alert(uid);
  }
function wait(){
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";

    if(!flag){
      
   }else{
    flag=false;
   }
}
