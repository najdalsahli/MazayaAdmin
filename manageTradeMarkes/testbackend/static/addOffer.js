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
  firebase.initializeApp(firebaseConfig);
  const auth=firebase.auth();
  var tid=localStorage.getItem("tradmarkID_offer");
  tmID=tid;
  var flagOnline=localStorage.getItem("flagOnline");
  var selectValue=0;
    function nextOffersAndDeals(msg){
    var nameOfOffer = document.getElementById("offerName").value;
    var DescOfOffer = document.getElementById("Desc").value;
    var  code= document.getElementById("code").value;
    var  startDate= document.getElementById("srartDate").value;
    var  endDate= document.getElementById("endDate").value;
    var  selectOffer= document.getElementById("offer");
    var userType;
    var useageType;  
    var ServiceType;
 
    if (flagOnline=='false')
    selectValue=checkB();
    else 
    selectValue=0;//online
 


    if(valditeFialdes(nameOfOffer,DescOfOffer,code,selectValue,startDate,endDate,msg)){
     userType=validiteRdUserType(msg); 
    if(userType)
     useageType=validiteRdUseageType(msg);  
      if(useageType)
     ServiceType=validiteRdServiceType(msg); 
      if(ServiceType) {
        if(selectOffer.value=="10"){
      savingOffer(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectValue,msg);}
         else if(selectOffer.value=="13"){
            savingDeals(code,endDate,DescOfOffer,nameOfOffer,ServiceType,startDate,useageType,userType,selectValue,msg);}
            return true;
               }//servise type
            }//big valdite
           return false;
}//end  




function uploadPage(){
  //  fill frist branch
    // var  selectBranch= document.getElementById("branch");
    // var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    // ref.once('value',function(snapshot) {
    //     snapshot.forEach(function(snapshot1) {
    //     var option = document.createElement( 'option' );
    //      option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
    //      selectBranch.add( option );

    //     });
    // });
    var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
var checkList = document.getElementById('branch');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
var ul=document.getElementById('list1');
var inp=document.createElement("input");
inp.type='checkbox';
var li=document.createElement("li");
var t = document.createTextNode(snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val());
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
     });
    });



    //fill seconed branch
    branchMenu2();
    //hide and show divs
    div();


    // //button otherPage for offer and deal
    //       var ontherpage=document.getElementById("addOntherOffer");
    //       ontherpage.onclick=function(){
    //    addOntherOffer();
    //   }
    //   //button otherPage for vouchers
    //   var ontherpage2=document.getElementById("addOntherV");
    //   ontherpage2.onclick=function(){
    //     addOntherVouchres();
//   }
       
        
       
}



function branchMenu2(){
    // var  selectBranch= document.getElementById("branch2");
    // var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    // ref.once('value',function(snapshot) {
    //     snapshot.forEach(function(snapshot1) {
    //     var option = document.createElement( 'option' );
    //      option.value = option.text = snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val();
    //      selectBranch.add( option );

    //     });
    // });
    var ref=firebase.database().ref('Trademarks/'+tid+'/Branches');
    ref.once('value',function(snapshot) {
     snapshot.forEach(function(snapshot1) {
var checkList = document.getElementById('branch2');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
var ul=document.getElementById('list2');
var inp=document.createElement("input");
inp.type='checkbox';
var li=document.createElement("li");
var t = document.createTextNode(snapshot1.child("branchName").val() +'/' + snapshot1.child("description").val());
li.appendChild(t);
inp.value=t;
li.appendChild(inp);
ul.appendChild(li);
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
                         if(selectBranch==0&&flagOnline=='false')//no choice and not online
                         {
    alert("الرجاء اختيار الفرع");

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
   var lnx = document.querySelectorAll("#list1 li input");
   var lnx2 = document.querySelectorAll("#list1 li");
   var array=[];
   var arraySavingBranchKey=[];
   var savingBranch='';

       for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
   var selectBranchText = lnx2[i].textContent;//,,,,,/,,,,,
   var n = selectBranchText.search("/");
   var s=Number(n);
   var res = selectBranchText.slice(0, s);
   array.push(res);
        }}

   var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
   var refOffer=firebase.database().ref('Offers');

   for (var i = 0; i < array.length; i++) {
   refBranches.orderByChild('branchName').equalTo(array[i]).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
           arraySavingBranchKey.push(data.key);
          });  
      }); 
        }//for array
      refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
                if(flagOnline=='false'){        
                    for (var i = 0; i < arraySavingBranchKey.length; i++) {
                        console.log(arraySavingBranchKey[i]);
                        firebase.database().ref('Offers/'+data.key+'/Branches/'+arraySavingBranchKey[i]).set(true);
                 } }
              //add in tradeMarks
                  if(data.child("offerDetails").val()==DescOfOffer){
                    if(data.child("offerTitle").val()==nameOfOffer){
                        if(data.child("discountCode").val()==code){
                 firebase.database().ref('Trademarks/'+tid+'/Offers/'+data.key).set(true);
                //             ref.once("value")
                //         .then(function(sc) {
                //     if(!sc.exists())//to dont duplicate with voucher tm id
                //   firebase.database().ref('Trademarks/'+tid+'/Offers/'+data.key).set(true);
                //         });
                }}}
                     });
                 });
                 console.log(selectValue);
                 if (flagOnline=='true'){//online then add in all region 
                   firebase.database().ref('Regions').once("value", function(snapshot) {
                   snapshot.forEach(function(data) {
               firebase.database().ref('Regions/'+data.key+'/Trademarks/'+tmID).set("true");
                   });
               });
           }
 alert('تم إضافة العرض بنجاح');
 document.getElementById('next').style.display='none'
 document.getElementById('final').style.display='block'

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
   var lnx = document.querySelectorAll("#list1 li input");
   var lnx2 = document.querySelectorAll("#list1 li");
   var array=[];
   var arraySavingBranchKey=[];
   var savingBranch='';

       for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
   var selectBranchText = lnx2[i].textContent;//,,,,,/,,,,,
   var n = selectBranchText.search("/");
   var s=Number(n);
   var res = selectBranchText.slice(0, s);
   array.push(res);
        }}

   var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
   var refOffer=firebase.database().ref('Deals');

   for (var i = 0; i < array.length; i++) {
   refBranches.orderByChild('branchName').equalTo(array[i]).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
           arraySavingBranchKey.push(data.key);
          });  
      }); 
        }//for array
      refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
                if(flagOnline=='false'){        
                    for (var i = 0; i < arraySavingBranchKey.length; i++) {
                        console.log(arraySavingBranchKey[i]);
                        firebase.database().ref('Deals/'+data.key+'/Branches/'+arraySavingBranchKey[i]).set(true);
                 } }
              //add in tradeMarks
                  if(data.child("offerDetails").val()==DescOfOffer){
                    if(data.child("offerTitle").val()==nameOfOffer){
                    var ref = firebase.database().ref('Trademarks/'+tid+'/Deals/'+data.key);
                    ref.once("value")
                        .then(function(sc) {
                    if(!sc.exists())//to dont duplicate with voucher tm id
                  firebase.database().ref('Trademarks/'+tid+'/Deals/'+data.key).set(true);
                        });
                }}
                     });
                 });
                 console.log(selectValue);
          if (flagOnline=='true'){//online then add in all region 
            firebase.database().ref('Regions').once("value", function(snapshot) {
            snapshot.forEach(function(data) {
        firebase.database().ref('Regions/'+data.key+'/Trademarks/'+tmID).set("true");
            });
        });
    } 

  alert('تم إضافة الصفقة بنجاح');
  document.getElementById('next').style.display='none'
 document.getElementById('final').style.display='block'
 
 }
 function savingVourches(endDate,numberOfCoupons,numberOfPoints,offerDetails,offerTitle,serviceType,startDate,voucherCode,selectBranch2,msg){
    //saving vouchres
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
   var lnx = document.querySelectorAll("#list2 li input");
   var lnx2 = document.querySelectorAll("#list2 li");
   var array=[];
   var arraySavingBranchKey=[];
   var savingBranch='';

       for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
   var selectBranchText = lnx2[i].textContent;//,,,,,/,,,,,
   var n = selectBranchText.search("/");
   var s=Number(n);
   var res = selectBranchText.slice(0, s);
   array.push(res);
        }}

   var refBranches=firebase.database().ref('Trademarks/'+tid+'/Branches');
   var refOffer=firebase.database().ref('Vouchers');

   for (var i = 0; i < array.length; i++) {
   refBranches.orderByChild('branchName').equalTo(array[i]).on("value", function(snapshot) {
       snapshot.forEach(function(data) {
           savingBranch= data.key;
           arraySavingBranchKey.push(data.key);
          });  
      }); 
        }//for array
      refOffer.orderByChild('trademarkID').equalTo(tid).on("value", function(snapshot1) {
              snapshot1.forEach(function(data) {
                if(flagOnline=='false'){ //not online so add branch in voucher       
                    for (var i = 0; i < arraySavingBranchKey.length; i++) {
                        console.log(arraySavingBranchKey[i]);
                        firebase.database().ref('Vouchers/'+data.key+'/Branches/'+arraySavingBranchKey[i]).set(true);
                 } }

          //add in tradeMarks
           if(data.child("offerDetails").val()==offerDetails){
           if(data.child("offerTitle").val()==offerTitle)
            if(data.child("voucherCode").val()==voucherCode)
            var ref = firebase.database().ref('Trademarks/'+tid+'/Vouchers/'+data.key);
            ref.once("value")
                .then(function(sc) {
            if(!sc.exists())//to dont duplicate with voucher tm id
           firebase.database().ref('Trademarks/'+tid+'/Vouchers/'+data.key).set(true);

        });
    }
              });
              
          });
          console.log(selectValue);
          if (flagOnline=='true'){//online then add in all region 
            firebase.database().ref('Regions').once("value", function(snapshot) {
            snapshot.forEach(function(data) {
        firebase.database().ref('Regions/'+data.key+'/Trademarks/'+tmID).set("true");
            });
        });
    }

    alert('تم إضافة القسيمة بنجاح');
    
    document.getElementById('nextV').style.display='none'
 document.getElementById('final2').style.display='block'
     
 }

 function nextVouchers(msg){
   var nameOfV = document.getElementById("titleV").value;
    var DescV = document.getElementById("DescV").value;
    var voucherCode = document.getElementById("code2").value;
    var  pointNum= document.getElementById("pointNum").value;
    var  vNum= document.getElementById("vourchesNum").value;
    var  startDate= document.getElementById("startV").value;
    var  endDate= document.getElementById("endV").value;
    var VType;
  
   
 if (flagOnline=='false')
    selectValue=checkB2();
    else 
    selectValue=0;//online
 
    if(valditeFialdesVourches(nameOfV,DescV,pointNum,vNum,startDate,endDate,selectValue,voucherCode,msg)){
        VType=dealsType(msg);  
        if(VType){
            savingVourches(endDate,vNum,pointNum,DescV,nameOfV,VType,startDate,voucherCode,selectValue,msg);
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

                        if(selectBranch==0&&flagOnline=='false')//no choice and not online
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

//  function addOntherOffer(){
//     var conf= confirm("سيتم حفظ الفرع الحالي ،هل تريد إضافة عرض آخر ؟");
//     if (conf==true){
//         //save
//     if(nextOffersAndDeals(' الحالي '))
//    clear();   
//     }  
//  }

//  function addOntherVouchres(){
//     var conf= confirm("سيتم حفظ الفرع الحالي ،هل تريد إضافة قسيمة أخرى ؟");
//     if (conf==true){
//         //save
//     if( nextVouchers(' الحالي '))
//         clear();   
//     }  
//  }
//  function clear (){
//     document.getElementById("offerName").value='';
//     document.getElementById("Desc").value='';
//    document.getElementById("code").value='';
//     document.getElementById("branch").value='10';
//     document.getElementById("srartDate").value='';
//     document.getElementById("endDate").value='';
//     //vouchres
//     document.getElementById("titleV").value='';
//     document.getElementById("DescV").value='';
//    document.getElementById("code2").value='';
//     document.getElementById("pointNum").value='';
//     document.getElementById("vourchesNum").value='';
//     document.getElementById("branch2").value='10';
//     document.getElementById("startV").value='';
//      document.getElementById("endV").value='';

//  }

 function goHome(){

    setTimeout(function() {
        console.log('iam offer');
   //     localStorage.setItem("tradmarkID_offer",'');
   
   document.getElementById('link').val='link';
   document.getElementById('link').href='/manageTradeMarksHome';
  document.getElementById('link').click();    }, 2000);

 }

 function goHome2(){
 
    setTimeout(function() {
        console.log('iam vouchres');
   //     localStorage.setItem("tradmarkID_offer",'');
   document.getElementById('link').val='link';
   document.getElementById('link').href='/manageTradeMarksHome';
  document.getElementById('link').click();   }, 2000);

 }


 function checkB(){
    var lnx = document.querySelectorAll("#list1 li input");
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
 function checkB2(){
    var lnx = document.querySelectorAll("#list2 li input");
    var num=0;

    /* The .length property applies to any jQuery Object
    || Using let to define the increment variable is safe
    */
    for (let i = 0; i < lnx.length; i++) {
        if( lnx[i].checked==true){
         num= num+1;}
        }
        console.log(num);
        return num;      
 }

 function hi (){
    var lnx = document.querySelectorAll("#list2 li input");
    var lnx2 = document.querySelectorAll("#list2 li");
 
    
        for (let i = 0; i < lnx.length; i++) {
         if( lnx[i].checked==true){
          
    var selectBranchText = lnx2[i].textContent;//,,,,,/,,,,,
    var n = selectBranchText.search("/");
    var s=Number(n);
    var res = selectBranchText.slice(0, s);
    var array=[];
    array.push(res);
    for(var j of array){
    console.log(j);
    if (array.length==j+1)
    console.log(finish);

    }
         }}
    var ref = firebase.database().ref('Trademarks/'+tid+'/Offers/'+'-MROR5Xozi5KvAaCLyN1');
    ref.once("value")
        .then(function(sc) {
    if(!sc.exists())
    console.log(sc.exists());
    else
    console.log('norhing')
        });
 }