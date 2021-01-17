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
  var tmID= localStorage.getItem("tradmarkID_E_O");
  var flagOnline=false;
   function load(){
    console.log(tmID);

    tm=tmID;
    
    firebase.database().ref('Trademarks/'+tmID+'/Offers').once('value').then(function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            retrive('Offers',snapshot1.key,'عرض');
        });
    });

    firebase.database().ref('Trademarks/'+tmID+'/Deals').once('value').then(function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            retrive('Deals',snapshot1.key,'صفقة');
        });
    });

    firebase.database().ref('Trademarks/'+tmID+'/Vouchers').once('value').then(function(snapshot) {
        snapshot.forEach(function(snapshot1) {
            retrive('Vouchers',snapshot1.key,'قسيمة');
        });
    });

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

  var editTM=document.getElementById("editTM");
  editTM.onclick=function(){
    setTimeout(function() {
      change_page();
    }, 1000);
  function change_page(){
  localStorage.setItem("tradmarkID_E",tmID);
  window.location.href = "EditTrademark.html";
   };
  }

}

function retrive(type,key,msg){
    firebase.database().ref(type+'/'+key).once('value').then(function(snapshot3) {

        var newrow = document.createElement('tr');

        //delete sugg
        var deletecel = document.createElement('td');
        deletecel.className='delcell';
        var deletebtn = document.createElement('button');
        deletebtn.className='btnDelete';
        deletebtn.textContent='حذف';
        var deleteIcon = document.createElement('i');
        deleteIcon.className='far fa-trash-alt deleteIcon';
        deletebtn.appendChild(deleteIcon);
        deletecel.appendChild(deletebtn);
            deletebtn.onclick=function(){
                deleteThisOffer(snapshot3.key,msg);
            };

        //edit
            var editcel = document.createElement('td');
            editcel.className='editcell';
            var  editbtn= document.createElement('button');
             editbtn.className='btnEdit';
             var editIcon= document.createElement('i');
             editIcon.className='ion-android-create editIcon';
             editbtn.textContent='تعديل';
             editbtn.appendChild(editIcon);
             editcel.appendChild(editbtn);
        editbtn.onclick=function(){
            editThisOffer(msg,snapshot3.key,type);
        };
       
        var enddate = document.createElement('td');
        enddate.className='Branchcells';
        enddate.textContent=snapshot3.child("endDate").val();
        
        var startdate = document.createElement('td');
        startdate.className='Branchcells';
        startdate.textContent=snapshot3.child("startDate").val();
       
        var des = document.createElement('td');
        des.className='Branchcells';
        des.textContent=snapshot3.child("offerDetails").val();
        
        var name = document.createElement('td');
        name.className='Branchcells';
        name.textContent=snapshot3.child("offerTitle").val();

        var type = document.createElement('td');
        type.className='Branchcells';
        type.textContent=msg;
newrow.appendChild(deletecel);    
newrow.appendChild(editcel);
newrow.appendChild(enddate);
newrow.appendChild(startdate);
newrow.appendChild(des);
newrow.appendChild(name);
newrow.appendChild(type);

document.getElementById('tableBody').appendChild(newrow);

    });
  
//document.getElementById("dataTable").deleteRow(1);

}

function editThisOffer(msg,key){
    console.log(msg);
    branchMenu2();
    branchMenu();
    var div1=document.getElementById('div1');
    var div2=document.getElementById('div2');
if (msg=='قسيمة'){
    div2.style.display='block';
    div1.style.display='none';
    //fill failds
   
firebase.database().ref('Vouchers/'+key).once('value').then(function(snapshot) {
document.getElementById("titleV").value=snapshot.child('offerTitle').val();
document.getElementById("DescV").value=snapshot.child('offerDetails').val();
document.getElementById("code2").value=snapshot.child('voucherCode').val();
document.getElementById("pointNum").value=snapshot.child('numberOfPoints').val();
document.getElementById("vourchesNum").value=snapshot.child('numberOfCoupons').val();
document.getElementById("startV").value=snapshot.child('startDate').val();
document.getElementById("endV").value=snapshot.child('endDate').val();

var serviceType=snapshot.child("serviceType").val();
  if(serviceType== 'أونلاين'){
  document.getElementById("onlineV").checked=true;
document.getElementById('branch2').style.display='none';
document.getElementById('br').innerHTML =''
}
  if(serviceType=='الكل')
  document.getElementById("locV").checked=true;
  
  if(serviceType=='محلي')
  document.getElementById("allV").checked=true;
});

}//end if
else{
    div2.style.display='none';
    div1.style.display='block';

    //fildes
if(msg='عرض'){
    firebase.database().ref('Offers/'+key).once('value').then(function(snapshot) {
        document.getElementById("offerName").value=snapshot.child('offerTitle').val();
        document.getElementById("Desc").value=snapshot.child('offerDetails').val();
        document.getElementById("code").value=snapshot.child('discountCode').val();
        document.getElementById("srartDate").value=snapshot.child('startDate').val();
        document.getElementById("endDate").value=snapshot.child('endDate').val();
        //service type
        var serviceType=snapshot.child("serviceType").val();
          if(serviceType== 'أونلاين'){
          document.getElementById("onlineRB").checked=true;
        document.getElementById('branch').style.display='none';
        document.getElementById('brLabel').innerHTML =' '
        }
          if(serviceType=='الكل')
          document.getElementById("locRB").checked=true;
          if(serviceType=='محلي')
          document.getElementById("allStRB").checked=true;

//usage type
          var usageType=snapshot.child("usageType").val();
          if(usageType== 'بطاقة عمل')
          document.getElementById("crad").checked=true;
          if(usageType=='المسح الضوئي')
          document.getElementById("QR").checked=true;
          if(usageType=='البريد الإلكتروني')
          document.getElementById("EMRB").checked=true;
          if(usageType=='كود الخصم')
          document.getElementById("codeRB").checked=true;

          //user type
    var userType=snapshot.child("userType").val();
          if(userType== 'موظف')
          document.getElementById("empRB").checked=true;
          if(userType=='عائلة')
          document.getElementById("famRB").checked=true;
          if(userType=='الكل')
          document.getElementById("allRB").checked=true;
        });
}//if offer
else{
    firebase.database().ref('Deals/'+key).once('value').then(function(snapshot) {
        document.getElementById("offerName").value=snapshot.child('offerTitle').val();
        document.getElementById("Desc").value=snapshot.child('offerDetails').val();
        document.getElementById("code").value=snapshot.child('discountCode').val();
        document.getElementById("srartDate").value=snapshot.child('startDate').val();
        document.getElementById("endDate").value=snapshot.child('endDate').val();
        //service type
        var serviceType=snapshot.child("serviceType").val();
          if(serviceType== 'أونلاين'){
          document.getElementById("onlineRB").checked=true;
        document.getElementById('branch').style.display='none';
        document.getElementById('brLabel').innerHTML =' '
        }
          if(serviceType=='الكل')
          document.getElementById("locRB").checked=true;
          if(serviceType=='محلي')
          document.getElementById("allStRB").checked=true;

//usage type
          var usageType=snapshot.child("usageType").val();
          if(usageType== 'بطاقة عمل')
          document.getElementById("crad").checked=true;
          if(usageType=='المسح الضوئي')
          document.getElementById("QR").checked=true;
          if(usageType=='البريد الإلكتروني')
          document.getElementById("EMRB").checked=true;
          if(usageType=='كود الخصم')
          document.getElementById("codeRB").checked=true;

          //user type
    var userType=snapshot.child("userType").val();
          if(userType== 'موظف')
          document.getElementById("empRB").checked=true;
          if(userType=='عائلة')
          document.getElementById("famRB").checked=true;
          if(userType=='الكل')
          document.getElementById("allRB").checked=true;
        });

}//if deals

}//else offers or deals

var update=document.getElementById('nextV');
update.onclick=function(){
updateV(key,msg);
}


var updateO=document.getElementById('next');
updateO.onclick=function(){
updateV(key,msg);
}
}

function branchMenu(){

    var  selectBranch= document.getElementById("branch");
    var ref=firebase.database().ref('Trademarks/'+tmID+'/Branches');
    ref.once('value',function(snapshot) {
        snapshot.forEach(function(snapshot1) {
        var option = document.createElement( 'option' );
         option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
         selectBranch.add( option );

        });
    });
}

function branchMenu2(){
    var  selectBranch= document.getElementById("branch2");
    var ref=firebase.database().ref('Trademarks/'+tmID+'/Branches');
    ref.once('value',function(snapshot) {
        snapshot.forEach(function(snapshot1) {
        var option = document.createElement( 'option' );
         option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
         selectBranch.add( option );

        });
    });
}

function updateV(key,msg){
    if(msg=='قسيمة'){
    var name=document.getElementById("titleV").value;
    var des=document.getElementById("DescV").value;
    var code2=document.getElementById("code2").value;
    var point=document.getElementById("pointNum").value;
    var Vnum=document.getElementById("vourchesNum").value;
    var sDate= document.getElementById("startV").value;
    var eDate=document.getElementById("endV").value
    var  selectBranch= document.getElementById("branch2");
    var selectRegionText = selectBranch.options[selectBranch.selectedIndex].text;
    var sType;
    var selectValue;
    firebase.database().ref('Trademarks/'+tmID).once("value",function(snapshot){
        if(snapshot.child('serviceType').val()=='أونلاين'){
            console.log(snapshot.child('serviceType').val());
        flagOnline=true;
        console.log(flagOnline);
       selectValue="27";//to pass the validate 
    }
    else
    selectValue=selectBranch.value;
});

if(valditeFialdesVourches(name,des,point,Vnum,sDate,eDate,selectValue,code2)){
     sType=vType();
        if(sType){
            firebase.database().ref('Vouchers/'+key+'/offerTitle').set(name);
            firebase.database().ref('Vouchers/'+key+'/offerDetails').set(des);
            firebase.database().ref('Vouchers/'+key+'/serviceType').set(sType);
            firebase.database().ref('Vouchers/'+key+'/numberOfPoints').set(point);
            firebase.database().ref('Vouchers/'+key+'/numberOfCoupons').set(Vnum);
            firebase.database().ref('Vouchers/'+key+'/endDate').set(eDate);
            firebase.database().ref('Vouchers/'+key+'/startDate').set(sDate);
            firebase.database().ref('Vouchers/'+key+'/voucherCode').set(code2);

       
        //saving branch
   var n = selectRegionText.search("/");
   var s=Number(n);
   var res = selectRegionText.slice(0, s);
   var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
   var refOffer=firebase.database().ref('Vouchers');
   refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
          });  
      }); 

      refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
                if(!flagOnline){
                    firebase.database().ref('Vouchers/'+data.key+'/Branches/'+savingBranch).remove();
           firebase.database().ref('Vouchers/'+data.key+'/Branches/'+savingBranch).set(true);}
       
              });
          });
        }//if s type
    alert('تم تعديل القسيمة بنجاح');
    window.location.href = "EditOffers.html";
    return true;
}
return false;}
else{
    var nameOfOffer = document.getElementById("offerName").value;
    var DescOfOffer = document.getElementById("Desc").value;
    var  code= document.getElementById("code").value;
    var  selectBranch= document.getElementById("branch");
    var  startDate= document.getElementById("srartDate").value;
    var  endDate= document.getElementById("endDate").value;
    var userType;
    var useageType;  
    var ServiceType;
    var selectValue;
    var  selectBranch= document.getElementById("branch");
    var selectRegionText = selectBranch.options[selectBranch.selectedIndex].text;

    firebase.database().ref('Trademarks/'+tm).once("value",function(snapshot){
        if(snapshot.child('serviceType').val()=='أونلاين'){
            console.log(snapshot.child('serviceType').val());
        flagOnline=true;
        console.log(flagOnline);
       selectValue="27";//to pass the validate 
    }
    else
    selectValue=selectBranch.value;
});
console.log(selectValue);

    if(valditeFialdes(nameOfOffer,DescOfOffer,code,selectValue,startDate,endDate)){
     userType=validiteRdUserType(); 
    if(userType)
     useageType=validiteRdUseageType();  
      if(useageType)
     ServiceType=validiteRdServiceType(); 
      if(ServiceType) {
        if(msg=="عرض"){
            firebase.database().ref('Offers/'+key+'/offerTitle').set(nameOfOffer);
            firebase.database().ref('Offers/'+key+'/offerDetails').set(DescOfOffer);
            firebase.database().ref('Offers/'+key+'/serviceType').set(ServiceType);
            firebase.database().ref('Offers/'+key+'/discountCode').set(code);
            firebase.database().ref('Offers/'+key+'/endDate').set(endDate);
            firebase.database().ref('Offers/'+key+'/startDate').set(startDate);
            firebase.database().ref('Offers/'+key+'/useageType').set(useageType);
            firebase.database().ref('Offers/'+key+'/userType').set(userType);

       
        //saving branch
   var n = selectRegionText.search("/");
   var s=Number(n);
   var res = selectRegionText.slice(0, s);
   var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
   var refOffer=firebase.database().ref('Offers');
   refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
          });  
      }); 

      refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
                if(!flagOnline){
         firebase.database().ref('Offers/'+data.key+'/Branches/'+savingBranch).remove();
           firebase.database().ref('Offers/'+data.key+'/Branches/'+savingBranch).set(true);}
       
              });
          });
        
    alert('تم تعديل العرض بنجاح');
    window.location.href = "EditOffers.html";
}

      else if(msg=="صفقة"){
        firebase.database().ref('Deals/'+key+'/offerTitle').set(nameOfOffer);
        firebase.database().ref('Deals/'+key+'/offerDetails').set(DescOfOffer);
        firebase.database().ref('Deals/'+key+'/serviceType').set(ServiceType);
        firebase.database().ref('Deals/'+key+'/discountCode').set(code);
        firebase.database().ref('Deals/'+key+'/endDate').set(endDate);
        firebase.database().ref('Deals/'+key+'/startDate').set(startDate);
        firebase.database().ref('Deals/'+key+'/useageType').set(useageType);
        firebase.database().ref('Deals/'+key+'/userType').set(userType);

   
    //saving branch
var n = selectRegionText.search("/");
var s=Number(n);
var res = selectRegionText.slice(0, s);
var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
var refOffer=firebase.database().ref('Deals');
refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
   snapshot.forEach(function(data) {
       savingBranch= data.key;
      });  
  }); 

  refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
          snapshot1.forEach(function(data) {
            if(!flagOnline){
     firebase.database().ref('Deals/'+data.key+'/Branches/'+savingBranch).remove();
       firebase.database().ref('Deals/'+data.key+'/Branches/'+savingBranch).set(true);}
   
          });
      });
                  alert('تم تعديل الصفقة بنجاح');
    window.location.href = "EditOffers.html";
}
                }//servise type
                            return true;

               }//valdite
            }//offer or deals
           return false;
}//end  



function vType(){
    var all = document.getElementById("allV");
    var online = document.getElementById("onlineV");
    var loc = document.getElementById("locV");
    if (all.checked||online.checked||loc.checked){
       if(all.checked){
        document.getElementById('branch2').style.display='block';
        document.getElementById('br').innerHTML ='الفرع'
        return all.value; }
        else if(online.checked){
            document.getElementById('branch2').style.display='none';
            document.getElementById('br').innerHTML =''
        return online.value;}
        else{
        document.getElementById('branch2').style.display='block';
        document.getElementById('br').innerHTML ='الفرع'
        return loc.value;}
    }
    else{
        alert("الرجاء اختيار نوع العرض");
    return false;
    }

}



function valditeFialdesVourches(nameOfOffer,DescOfOffer,code,selectBranch,start,end){

    if(nameOfOffer==''){
        alert(" الرجاء ادخال اسم العرض ");
        return false;
        }
if(DescOfOffer==''){
                            alert("الرجاء ادخال وصف للعرض ");
                            return false;
                        }
if(code=='')
                        {
                       alert("الرجاء اختيار كود الخصم ");      
                      return false;
                         }  
if(selectBranch=="10")
                        {
                       alert("الرجاء اختيار الفرع ");      
                      return false;
                         }  
                         if(start=='')
                        {
                       alert("الرجاء اختيار تاريخ البدء ");      
                      return false;
                         }  if(end=='')
                         {
                        alert("الرجاء اختيار تاريخ الانتهاء ");      
                       return false;
                          }  

        return true;

}
function valditeFialdes(nameOfOffer,DescOfOffer,code,selectBranch,start,end){

    if(nameOfOffer==''){
        alert(" الرجاء ادخال اسم العرض ");
        return false;
        }
if(DescOfOffer==''){
                            alert("الرجاء ادخال وصف للعرض ");
                            return false;
                        }
if(code=='')
                        {
                       alert("الرجاء اختيار كود الخصم ");      
                      return false;
                         }  
if(selectBranch=="10")
                        {
                       alert("الرجاء اختيار الفرع ");      
                      return false;
                         }  
                         if(start=='')
                        {
                       alert("الرجاء اختيار تاريخ البدء ");      
                      return false;
                         }  if(end=='')
                         {
                        alert("الرجاء اختيار تاريخ الانتهاء ");      
                       return false;
                          }  

        return true;

}

function validiteRdUserType(){
    //true or false
    var emp = document.getElementById("empRB");
    var fam = document.getElementById("famRB");
    var all = document.getElementById("allRB");
    if (emp.checked||fam.checked||all.checked){
       if(emp.checked)
        return emp.value; 
        else if(fam.checked)
        return fam.value;
        else
        return all.value;
    }
    else{
        alert("الرجاء اختيار أحقية الاستخدام");
    return false;
    }

}

function validiteRdUseageType(){
    //true or false
    var crad = document.getElementById("crad");
    var QR = document.getElementById("QR");
    var email = document.getElementById("EMRB");
    var code = document.getElementById("codeRB");

    if (crad.checked||QR.checked||email.checked||code.checked){
       if(crad.checked)
        return crad.value; 
        if(QR.checked)
        return QR.value;
        if (email.checked)
        return "البريد الالكتروني";
        if(code.checked)
        return code.value;
    }
    else{
        alert("الرجاء اختيار طريقة استخدام العرض");
    return false;
    }

}

function validiteRdServiceType(){
    //true or false
    var loc = document.getElementById("locRB");
    var online = document.getElementById("onlineRB");
    var all = document.getElementById("allStRB");

    if (loc.checked||online.checked||all.checked){
       if(loc.checked)
        return loc.value; 
        if(online.checked)
        return online.value;
        if(all.checked)
        return all.value;
    }
    else{
        alert("الرجاء اختيار نوع الخدمة");
    return false;
    }
}




function addOntherOffer(){

  document.getElementById('div1').style.display='block';
  document.getElementById('div2').style.display='none';
  document.getElementById('type').style.display='block';
  branchMenu2();
  branchMenu();

    div();
var addV=document.getElementById('nextV');
addV.onclick=function (){
    nextV();
}
var addV=document.getElementById('next');
addV.onclick=function (){
    nextOD();
}
}

function nextOD(){
    var nameOfOffer = document.getElementById("offerName").value;
    var DescOfOffer = document.getElementById("Desc").value;
    var  code= document.getElementById("code").value;
    var  selectBranch= document.getElementById("branch");
    var  startDate= document.getElementById("srartDate").value;
    var  endDate= document.getElementById("endDate").value;
    var  selectOffer= document.getElementById("offer");
    var userType;
    var useageType;  
    var ServiceType;
    var selectValue;
    firebase.database().ref('Trademarks/'+tmID).once("value",function(snapshot){
        if(snapshot.child('serviceType').val()=='أونلاين'){
            console.log(snapshot.child('serviceType').val());
        flagOnline=true;
        console.log(flagOnline);
       selectValue="27";//to pass the validate 
    }
    else
    selectValue=selectBranch.value;
});
console.log(selectValue);

    if(valditeFialdes(nameOfOffer,DescOfOffer,code,selectValue,startDate,endDate)){
     userType=validiteRdUserType(); 
    if(userType)
     useageType=validiteRdUseageType();  
      if(useageType)
     ServiceType=validiteRdServiceType(); 
      if(ServiceType) {
        if(selectOffer.value=="10"){
      savingOffer(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch);}
         else if(selectOffer.value=="13"){
            savingDeals(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch);}
            return true;
               }//servise type
            }//big valdite
           return false;
}

function div(){
    $(document).ready(function(){
        $('#div2').hide();
        $('#offer').on('change',function () {
        if($(this).val()=="12"){
         $('#div2').show();
        $('#div1').hide();
         } 
         else {
         $('#div2').hide();
         $('#div1').show();
         }
    
        });
    });
    }


    function  savingOffer(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch){
        //saving offer
        firebase.database().ref('Offers').push(
         {
             discountCode:code,
             endDate:endDate,
             offerDetails:DescOfOffer,
             offerTitle:nameOfOffer,
             serviceType:ServiceType,
             startDate:startDate,
             trademarkID:tmID,
             usageType:useageType,
             userType:userType,
         });
     
              //saving branch
              var selectBranchText = selectBranch.options[selectBranch.selectedIndex].text;
              var n = selectBranchText.search("/");
              var s=Number(n);
              var res = selectBranchText.slice(0, s);
              var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
              var refOffer=firebase.database().ref('Offers');
              refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
                  snapshot.forEach(function(data) {
                      savingBranch= data.key;
                     });  
                 }); 
                 refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
                         snapshot1.forEach(function(data) {
                             //saving branch
                             if(!flagOnline){
                      firebase.database().ref('Offers/'+data.key+'/Branches/'+savingBranch).set(true);
                     }
                      //saving the offer key in trademarks
                      if(data.child("offerDetails").val()==DescOfOffer){
                      if(data.child("offerTitle").val()==nameOfOffer){
                       if(data.child("discountCode").val()==code){
     
                      firebase.database().ref('Trademarks/'+tmID+'/Offers/'+data.key).set(true);
                     }}}
                         });
                     });
                  
            
     
      alert('تم إضافة العرض بنجاح');
      document.getElementById('next').style.display='none'
      document.getElementById('final').style.display='block'
      reload_page();

     }
     function  savingDeals(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch){
         //saving offer
         firebase.database().ref('Deals').push(
          {
              discountCode:code,
              endDate:endDate,
              offerDetails:DescOfOffer,
              offerTitle:nameOfOffer,
              serviceType:ServiceType,
              startDate:startDate,
              trademarkID:tmID,
              usageType:useageType,
              userType:userType,
          });
               //saving branch
               var selectBranchText = selectBranch.options[selectBranch.selectedIndex].text;
               var n = selectBranchText.search("/");
               var s=Number(n);
               var res = selectBranchText.slice(0, s);
               var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
               var refOffer=firebase.database().ref('Deals');
               refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
                   snapshot.forEach(function(data) {
                       savingBranch= data.key;
                      });  
                  }); 
                  refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
                          snapshot1.forEach(function(data) {
                             if(!flagOnline){
                       firebase.database().ref('Deals/'+data.key+'/Branches/'+savingBranch).set(true);}
                       //add in tradeMarks
                       if(data.child("offerDetails").val()==DescOfOffer){
                       if(data.child("offerTitle").val()==nameOfOffer){
                        if(data.child("discountCode").val()==code){
      
                       firebase.database().ref('Trademarks/'+tmID+'/Deals/'+data.key).set(true);
                      }}}
                          });
                      });
                  
       alert('تم إضافة الصفقة بنجاح');
       document.getElementById('next').style.display='none'
      document.getElementById('div1').style.display='none'
      reload_page();

      }
      function savingVourches(endDate,numberOfCoupons,numberOfPoints,offerDetails,offerTitle,serviceType,startDate,voucherCode,selectBranch2){
        //saving vouchres
        var savingBranch;
        firebase.database().ref('Vouchers').push(
         {
             endDate:endDate,
             numberOfCoupons:numberOfCoupons,
             numberOfPoints:numberOfPoints,
             offerDetails:offerDetails,
             offerTitle:offerTitle,
             serviceType:serviceType,
             startDate:startDate,
             trademarkID:tmID,
             voucherCode:voucherCode
         });
        //saving branch
        var selectBranchText = selectBranch2.options[selectBranch2.selectedIndex].text;//,,,,,/,,,,,
        var n = selectBranchText.search("/");
        var s=Number(n);
        var res = selectBranchText.slice(0, s);
        var refBranches=firebase.database().ref('Trademarks/'+tmID+'/Branches');
        var refOffer=firebase.database().ref('Vouchers');
        refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                savingBranch= data.key;
               });  
           }); 
           refOffer.orderByChild('trademarkID').equalTo(tmID).on("value", function(snapshot1) {
                   snapshot1.forEach(function(data) {
                     if(!flagOnline){
                firebase.database().ref('Vouchers/'+data.key+'/Branches/'+savingBranch).set(true);}
                //add in tradeMarks
                if(data.child("offerDetails").val()==offerDetails){
                if(data.child("offerTitle").val()==offerTitle){
                 if(data.child("voucherCode").val()==voucherCode){
     
                firebase.database().ref('Trademarks/'+tmID+'/Vouchers/'+data.key).set(true);
               }}}
                   });
               });
         alert('تم إضافة القسيمة بنجاح');
         
       document.getElementById('nextV').style.display='none'
      document.getElementById('div2').style.display='none'
      reload_page();
          
      }
      function nextV(){
        var nameOfV = document.getElementById("titleV").value;
         var DescV = document.getElementById("DescV").value;
         var voucherCode = document.getElementById("code2").value;
         var  pointNum= document.getElementById("pointNum").value;
         var  vNum= document.getElementById("vourchesNum").value;
         var  selectBranch= document.getElementById("branch2");
         var  startDate= document.getElementById("startV").value;
         var  endDate= document.getElementById("endV").value;
         var VType;
         var selectValue;
         firebase.database().ref('Trademarks/'+tmID).once("value",function(snapshot){
             if(snapshot.child('serviceType').val()=='أونلاين'){
                 console.log(snapshot.child('serviceType').val());
             flagOnline=true;
             console.log(flagOnline);
            selectValue="27";//to pass the validate 
         }
         else
         selectValue=selectBranch.value;
     });
     console.log(selectValue);
     
         if(valditeFialdesVourches(nameOfV,DescV,pointNum,vNum,startDate,endDate,selectValue,voucherCode)){
             VType=dealsType();  
             if(VType){
                 savingVourches(endDate,vNum,pointNum,DescV,nameOfV,VType,startDate,voucherCode,selectBranch);
             }
             return true;
         }
     
     return false;
      }

      function dealsType(){
        var all = document.getElementById("allV");
        var online = document.getElementById("onlineV");
        var loc = document.getElementById("locV");
        if (all.checked||online.checked||loc.checked){
           if(all.checked)
            return all.value; 
            else if(online.checked)
            return online.value;
            else
            return loc.value;
        }
        else{
            alert("الرجاء اختيار نوع العرض");
        return false;
        }
    
     }

     function deleteThisOffer(key,msg){
        var conf =confirm("هل أنت متأكد من حذف العرض ؟");
        if (conf==true){//true
        if(msg=='قسيمة'){
            firebase.database().ref('Trademarks/'+tmID+'/Vouchers/'+key).remove();   
            firebase.database().ref('Vouchers/'+key).remove();   
            alert('تم حذف القسيمة');
        }
        if(msg=='عرض'){
            firebase.database().ref('Trademarks/'+tmID+'/Offers/'+key).remove();   
            firebase.database().ref('Offers/'+key).remove(); 
            alert('تم حذف العرض');
        }
        if(msg=='صفقة'){
            firebase.database().ref('Trademarks/'+tmID+'/Deals/'+key).remove();   
            firebase.database().ref('Deals/'+key).remove(); 
            alert('تم حذف الصفقة');
        }
        }//true
        reload_page();

    }

    function reload_page() { 
        window.location.reload();     
        }