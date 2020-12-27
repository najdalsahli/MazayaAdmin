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
  var tid=localStorage.getItem( "tradmarkID_offer");
  localStorage.setItem("tradmarkID_offer",'');

  function nextOffersAndDeals(msg){
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
    if(valditeFialdes(nameOfOffer,DescOfOffer,code,selectBranch.value,startDate,endDate,msg)){
     userType=validiteRdUserType(msg); 
    if(userType)
     useageType=validiteRdUseageType(msg);  
      if(useageType)
     ServiceType=validiteRdServiceType(msg); 
      if(ServiceType) {
        if(selectOffer.value=="10"){
      savingOffer(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch,msg);}
         else if(selectOffer.value=="13"){
            savingDeals(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch,msg);}
            return true;
               }//servise type
            }//big valdite
           return false;
}//end  




function uploadPage(){
    //fill frist branch
    var  selectBranch= document.getElementById("branch");
    var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    ref.once('value',function(snapshot) {
        snapshot.forEach(function(snapshot1) {
        var option = document.createElement( 'option' );
         option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
         selectBranch.add( option );

        });
    });
    //fill seconed branch
    branchMenu2();
    //hide and show divs
    div();
    //button otherPage for offer and deal
          var ontherpage=document.getElementById("addOntherOffer");
          ontherpage.onclick=function(){
       addOntherOffer();
      }
      //button otherPage for vouchers
      var ontherpage2=document.getElementById("addOntherV");
      ontherpage2.onclick=function(){
        addOntherVouchres();
  }
       
        
       
}



function branchMenu2(){
    var  selectBranch= document.getElementById("branch2");
    var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    ref.once('value',function(snapshot) {
        snapshot.forEach(function(snapshot1) {
        var option = document.createElement( 'option' );
         option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
         selectBranch.add( option );

        });
    });
}
function valditeFialdes(nameOfOffer,DescOfOffer,code,selectBranch,start,end,msg){
    if(nameOfOffer==''){
        alert(" الرجاء ادخال اسم العرض "+msg);
        return false;
        }
if(DescOfOffer==''){
                            alert("الرجاء ادخال وصف للعرض "+msg);
                            return false;
                        }
if(code=='')
                        {
                       alert("الرجاء اختيار كود الخصم "+msg);      
                      return false;
                         }  
if(selectBranch=="10")
                        {
                       alert("الرجاء اختيار الفرع "+msg);      
                      return false;
                         }  
                         if(start=='')
                        {
                       alert("الرجاء اختيار تاريخ البدء "+msg);      
                      return false;
                         }  if(end=='')
                         {
                        alert("الرجاء اختيار تاريخ الانتهاء "+msg);      
                       return false;
                          }  

        return true;

}

function validiteRdUserType(msg){
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
        alert("الرجاء اختيار أحقية الاستخدام"+msg);
    return false;
    }

}

function validiteRdUseageType(msg){
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
        alert("الرجاء اختيار طريقة استخدام العرض"+msg);
    return false;
    }

}

function validiteRdServiceType(msg){
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
        alert("الرجاء اختيار نوع الخدمة"+msg);
    return false;
    }

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


function  savingOffer(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectBranch,msg){
   //saving offer
   firebase.database().ref('Offers').push(
    {
        discountCode:code,
        endDate:endDate,
        offerDetails:DescOfOffer,
        offerTitle:nameOfOffer,
        serviceType:ServiceType,
        startDate:startDate,
        trademarkID:tid,
        usageType:useageType,
        userType:userType,
    });
         //saving branch
         var selectBranchText = selectBranch.options[selectBranch.selectedIndex].text;
         var n = selectBranchText.search("/");
         var s=Number(n);
         var res = selectBranchText.slice(0, s);
         var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
         var refOffer=firebase.database().ref('Offers');
         refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
             snapshot.forEach(function(data) {
                 savingBranch= data.key;
                });  
            }); 
            refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
                    snapshot1.forEach(function(data) {
                 firebase.database().ref('Offers/'+data.key+'/Branches/'+savingBranch).set(true);
                 //add in tradeMarks
                 if(data.child("offerDetails").val()==DescOfOffer){
                 if(data.child("offerTitle").val()==nameOfOffer){
                  if(data.child("discountCode").val()==code){

                 firebase.database().ref('Trademarks/'+tid+'/Offers/'+data.key).set(true);
                }}}
                    });
                });
            
 alert('تم إضافة العرض بنجاح');
 if (msg==''){
    setTimeout(function() {
        change_page();
      }, 2000);
function change_page(){
window.location.href = "manageTradeMarksHome.html";
}
 }
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
         trademarkID:tid,
         usageType:useageType,
         userType:userType,
     });
          //saving branch
          var selectBranchText = selectBranch.options[selectBranch.selectedIndex].text;
          var n = selectBranchText.search("/");
          var s=Number(n);
          var res = selectBranchText.slice(0, s);
          var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
          var refOffer=firebase.database().ref('Deals');
          refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
              snapshot.forEach(function(data) {
                  savingBranch= data.key;
                 });  
             }); 
             refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
                     snapshot1.forEach(function(data) {
                  firebase.database().ref('Deals/'+data.key+'/Branches/'+savingBranch).set(true);
                  //add in tradeMarks
                  if(data.child("offerDetails").val()==DescOfOffer){
                  if(data.child("offerTitle").val()==nameOfOffer){
                   if(data.child("discountCode").val()==code){
 
                  firebase.database().ref('Trademarks/'+tid+'/Deals/'+data.key).set(true);
                 }}}
                     });
                 });
             
  alert('تم إضافة الصفقة بنجاح');
  if (msg==''){
    setTimeout(function() {
        change_page();
      }, 2000);
function change_page(){
window.location.href = "manageTradeMarksHome.html";
}
 }
 }
 function savingVourches(endDate,numberOfCoupons,numberOfPoints,offerDetails,offerTitle,serviceType,startDate,voucherCode,selectBranch2){
   //saving offer
   firebase.database().ref('Vouchers').push(
    {
        endDate:endDate,
        numberOfCoupons:numberOfCoupons,
        numberOfPoints:numberOfPoints,
        offerDetails:offerDetails,
        offerTitle:offerTitle,
        serviceType:serviceType,
        startDate:startDate,
        trademarkID:tid,
        voucherCode:voucherCode
    });
   //saving branch
   var selectBranchText = selectBranch2.options[selectBranch2.selectedIndex].text;
   var n = selectBranchText.search("/");
   var s=Number(n);
   var res = selectBranchText.slice(0, s);
   var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
   var refOffer=firebase.database().ref('Vouchers');
   refBranches.orderByChild('branchName').equalTo(res).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
          });  
      }); 
      refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
           firebase.database().ref('Vouchers/'+data.key+'/Branches/'+savingBranch).set(true);
           //add in tradeMarks
           if(data.child("offerDetails").val()==offerDetails){
           if(data.child("offerTitle").val()==offerTitle){
            if(data.child("voucherCode").val()==voucherCode){

           firebase.database().ref('Trademarks/'+tid+'/Vouchers/'+data.key).set(true);
          }}}
              });
          });
    alert('تم إضافة القسيمة بنجاح');
    if (msg==''){
        setTimeout(function() {
            change_page();
          }, 2000);
    function change_page(){
    window.location.href = "manageTradeMarksHome.html";
    }
     }
 }

 function nextVouchers(msg){
   var nameOfV = document.getElementById("titleV").value;
    var DescV = document.getElementById("DescV").value;
    var voucherCode = document.getElementById("code2").value;
    var  pointNum= document.getElementById("pointNum").value;
    var  vNum= document.getElementById("vourchesNum").value;
    var  selectBranch= document.getElementById("branch2");
    var  startDate= document.getElementById("startV").value;
    var  endDate= document.getElementById("endV").value;
    var VType;
    if(valditeFialdesVourches(nameOfV,DescV,pointNum,vNum,startDate,endDate,selectBranch.value,voucherCode,msg)){
        VType=dealsType(msg);  
        if(VType){
            savingVourches(endDate,vNum,pointNum,DescV,nameOfV,VType,startDate,voucherCode,selectBranch,msg);
        }
        return true;
    }

return false;
 }
  function valditeFialdesVourches(nameOfDeals,DescOfDeals,pointNum,vNum,startDate,endDate,selectBranch,voucherCode,msg){
    if(nameOfDeals==''){
        alert("الرجاء ادخال عنوان العرض"+msg);
        return false;
        }
        if(pointNum=='')
                        {
                       alert("الرجاء ادخال عدد النقاط "+msg);      
                      return false;
                         }  

    if(vNum=='')
    {
   alert("الرجاء ادخال عدد القسائم "+msg);      
  return false;
     }  
if(DescOfDeals==''){
                            alert("الرجاء ادخال وصف للعرض "+msg);
                            return false;
                        }
                        if(voucherCode==''){
                            alert("الرجاء ادخال كود الخصم  "+msg);
                            return false;
                        }

if(selectBranch=="10")
                        {
                       alert("الرجاء اختيار الفرع "+msg);      
                      return false;
                         }  
                         if(startDate=='')
                        {
                       alert("الرجاء اختيار تاريخ البدء "+msg);      
                      return false;
                         }  if(endDate=='')
                         {
                        alert("الرجاء اختيار تاريخ الانتهاء "+msg);      
                       return false;
                          }  

        return true;

  }
 function dealsType(msg){
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
        alert("الرجاء اختيار نوع العرض"+ msg);
    return false;
    }

 }

 function addOntherOffer(){
    var conf= confirm("سيتم حفظ الفرع الحالي ،هل تريد إضافة عرض آخر ؟");
    if (conf==true){
        //save
    if(nextOffersAndDeals(' الحالي '))
   clear();   
    }  
 }

 function addOntherVouchres(){
    var conf= confirm("سيتم حفظ الفرع الحالي ،هل تريد إضافة قسيمة أخرى ؟");
    if (conf==true){
        //save
    if( nextVouchers(' الحالي '))
        clear();   
    }  
 }
 function clear (){
    document.getElementById("offerName").value='';
    document.getElementById("Desc").value='';
   document.getElementById("code").value='';
    document.getElementById("branch").value='10';
    document.getElementById("srartDate").value='';
    document.getElementById("endDate").value='';
    //vouchres
    document.getElementById("titleV").value='';
    document.getElementById("DescV").value='';
   document.getElementById("code2").value='';
    document.getElementById("pointNum").value='';
    document.getElementById("vourchesNum").value='';
    document.getElementById("branch2").value='10';
    document.getElementById("startV").value='';
     document.getElementById("endV").value='';

 }