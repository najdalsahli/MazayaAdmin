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
deleteBanners();
     


function deleteBanners(){
  //check the bannres stautes
  firebase.database().ref('Banners').once('value').then(function(snapshot) {
   snapshot.forEach(function(snapshot1) {
     if(snapshot1.child('type').val()!='other'){          
       var curday = function(sp){
         today = new Date();
         var dd = today.getDate();
         var mm = today.getMonth()+1; //As January is 0.
         var yyyy = today.getFullYear();
         
         if(dd<10) dd='0'+dd;
         if(mm<10) mm='0'+mm;
         return (mm+sp+dd+sp+yyyy);
         };
         var dateToday=curday('-');//was var
  
     var offerEnd=snapshot1.child("endDate").val();
     var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
     var diffDays = Math.round((compareDateBanner(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));



     if(diffDays<=0){
         console.log(diffDays);
         console.log(snapshot1.child('title').val());
         console.log(snapshot1.key);
         firebase.database().ref('Banners/'+snapshot1.key).remove();
     }
   }
 });
//after_theLoop();
});

}
//---4
function compareDate(str1){
 // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
 var dt1   = parseInt(str1.substring(0,2));
 var mon1  = parseInt(str1.substring(3,5));
 var yr1   = parseInt(str1.substring(6,10));
 var date1 = new Date(yr1, mon1-1, dt1);
 return date1;
 }

var usersCount =0; 
firebase.database().ref('Users').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {

        usersCount++;   

    });
//after_theLoop();
console.log('Num of users is: '+usersCount);
document.getElementById('useresNum').innerHTML = usersCount;
   });


var femaleCount =0; 
var maleCount=0;
firebase.database().ref('Users').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {

        //console.log('value'+snapshot1.child("gender").val());
        var gender= snapshot1.child("gender").val();
        var female="أنثى";
        var compareResult= female.localeCompare(gender);
       // console.log('compare Result= : '+compareResult);

        if(compareResult==0){
            femaleCount++; }else{ maleCount++;}

    });
//after_theLoop();
console.log('Num of female users is: '+femaleCount);
console.log('Num of male users is: '+maleCount);
document.getElementById('femaleCount').innerHTML = femaleCount;
document.getElementById('maleCount').innerHTML = maleCount;
   });



var viewsCount =0; 
firebase.database().ref('Trademarks').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {

        viewsCount+=snapshot1.child("views").val();   

    });
//after_theLoop();
console.log('Num of views is: '+viewsCount);
document.getElementById('views').innerHTML = viewsCount;
   });



//----------------------------------------------------------------------------------------------------THE RATINGS SECTION

   var tmNamesArray=[];
   //var tmNamesArray = new Array(30);
   var avgRateArray=[];
   //var avgRateArray = new Array(30);

   //console.log('tmNamesArray: '+tmNamesArray);
   //console.log('avgRateArray: '+avgRateArray);

firebase.database().ref('Ratings').once('value').then(function(snapshot) {
    var tmID;
    var userID;
    var userComment;
    var userRate;

    var totalUsers;
    var rateCount;


    snapshot.forEach(function(snapshot1) {

        totalUsers=0;
        rateCount=0;
        tmID=snapshot1.key;//-need to take the tm name
        //----
        //var ref=firebase.database().ref('Trademarks/'+tmID);
       // ref.once("value", function(snapshot) {
        //console.log('---tm name: '+snapshot.child("trademarkName").val());
       // });

        //---
        console.log('tm key: '+tmID);
        //seconed loop -var userKey
        snapshot1.forEach(function(snapshot2) {
        userID=snapshot2.key;
        
      
    
        totalUsers++;
        userComment=snapshot2.child('comment').val();
        userRate=snapshot2.child('rate').val();
        rateCount+=userRate;
        console.log('user Comment: '+userComment+' user Rate: '+userRate);
    
        });
        var avgRate=rateCount/totalUsers;
        //if(avgRateArray.length < 30){}
        avgRateArray.push(avgRate);
        console.log('*avgRateArray:* '+avgRateArray);
        console.log('avg '+ avgRate);

        var ref=firebase.database().ref('Trademarks/'+tmID);
    ref.once("value", function(snapshot) {
    var tmName=snapshot.child("trademarkName").val()
    //if(tmNamesArray.length < 30){}
    tmNamesArray.push(tmName);
    //chart.update();
    console.log('*tmNamesArray:* '+tmNamesArray);
    //document.getElementById("RubaTest").innerHTML=" hello"+tmNamesArray;//delete this
    console.log('---tm name: '+tmName);
});
   });
        

    });


    
    

//after_theLoop();
//console.log('tm key: '+tmKey);
//--console.log('Total num of users: '+totalUsers);
//--console.log('Total rate: '+rateCount);
/*var ref=firebase.database().ref('Trademarks/'+tmID);
ref.once("value", function(snapshot) {
console.log('---tm name: '+snapshot.child("trademarkName").val());
});
   });*/

/*firebase.database().ref('Trademarks').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {

        var trademarkName=snapshot1.child("trademarkName").val();
        var trademarkViews=snapshot1.child("views").val();

        console.log('after-trademark name: '+trademarkName+' trademark views: '+trademarkViews);

    });
//after_theLoop();
//console.log('after-trademark name: '+trademarkName+' trademark views: '+trademarkViews);
//document.getElementById('views').innerHTML = viewsCount;
   });*/
/*
//------------------------------------------------------------------------------------------------------------
var tmKey;
var tmName;

firebase.database().ref('Ratings').once('value').then(function(snapshot) {
    snapshot.forEach(function(snapshot1) {

        tmKey=snapshot1.key;
        getTMName(tmKey);

       //var Userscount=0;
        //var totalRating=0;
        //snapshot1.forEach(function(snapshot2) {
         //the users loop 
        //});


        function getTMName(tmKey){

        console.log('tm key- out: '+tmKey); 
        firebase.database().ref('Trademarks/'+tmKey).once('value').then(function(snapshot) {
        tmName=snapshot.child("trademarkName").val();
        //console.log(snapshot.child("email").val());
        console.log('tm key: '+tmKey);
        console.log('tm name: '+tmName);
        
        });}

        //also null
        //var ref=firebase.database().ref('Trademarks/'+tmKey);
        //ref.once("value", function(snapshot) {
        //console.log('tm name: '+snapshot.child("trademarkName").val());
        //});



    

        //console.log('tm name: '+tmName);
        //getTMName();
        //console.log('tm key: '+tmKey);
        




    });
//after_theLoop();
//console.log('Num of views is: '+viewsCount);
//document.getElementById('views').innerHTML = viewsCount;
   });
//--------------------------------------------------------------------------------------------*/


//--the rating chart---
let myChart = document.getElementById('myChart').getContext('2d');

// Global Options
//Chart.defaults.global.defaultFontFamily = 'Lato';
//Chart.defaults.global.defaultFontSize = 18;
//Chart.defaults.global.defaultFontColor = '#777';

//console.log('befeor chart ***');
let barChart = new Chart(myChart,{
    type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
labels: //tmNamesArray,
['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],//labels= tm names
datasets:[{
  label:'متوسط التقييمات ',
  data: //avgRateArray,//data = avg rate avgRateArray
  [617594,181045,153060,106519,105162,95072],
  //backgroundColor:'green',
  backgroundColor:[
    /*'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)'*/

    'rgb(216,51,74, 0.8)',
    'rgb(237,85,101, 0.8)',
    'rgb(252,110,81, 0.8)',
    'rgb(255,206,84, 0.8)',
    'rgb(232,206,77, 0.8)',

    'rgb(160,212,104, 0.8)',
    'rgb(72,207,173, 0.8)',
    'rgb(160,206,203, 0.8)',
    'rgb(79,193,233, 0.8)',
    'rgb(93,156,236, 0.8)',

    'rgb(128,103,183, 0.8)',
    'rgb(172,146,236, 0.8)',
    'rgb(236,135,192, 0.8)',
    'rgb(245,247,250, 0.8)',
    'rgb(204,209,217, 0.8)',


    'rgb(216,51,74, 0.8)',
    'rgb(237,85,101, 0.8)',
    'rgb(252,110,81, 0.8)',
    'rgb(255,206,84, 0.8)',
    'rgb(232,206,77, 0.8)',

    'rgb(160,212,104, 0.8)',
    'rgb(72,207,173, 0.8)',
    'rgb(160,206,203, 0.8)',
    'rgb(79,193,233, 0.8)',
    'rgb(93,156,236, 0.8)',

    'rgb(128,103,183, 0.8)',
    'rgb(172,146,236, 0.8)',
    'rgb(236,135,192, 0.8)',
    'rgb(245,247,250, 0.8)',
    'rgb(204,209,217, 0.8)'//30 color 30 trademark chosen
  ],
  borderWidth:1,
  borderColor:'#777',
  hoverBorderWidth:3,
  hoverBorderColor:'#000'
}]
},
options:{
title:{
  display:true,
  text:' تقييمات العلامات التجارية ',
  fontSize:25
},
legend:{
  display:false,
  position:'right',
  labels:{
    fontColor:'#000'
  }
},}

});
//console.log('after chart ***');




//test myChart2

/*var labelsArray = [];
var dataArray = [];

db.collection('Items').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var item = doc.data();

        var price = item.price;
        dataArray.push(price);

        var date = item.date;
        labelsArray.push(date);
    });
});*/

/*var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: tmNamesArray,
    datasets: [{
        label: 'Items',
        data: avgRateArray ,  
    }]
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    // Container for pan options
    pan: {
        // Boolean to enable panning
        enabled: true,

        // Panning directions. 
        mode: 'x',

        speed: 1
    },

    // Container for zoom options
    zoom: {
        // enable zooming
        enabled: true,                      
        // Zooming directions. 
        mode: 'x',
        }
    }
});*/


//
   







//--------------------------------------------------------------------------------------------------------------------NEW SECTION, Ending_soon_offers


function Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount){

	var tmName;
	var tmImg;
	//var tmCount=0;
  // document.getElementById("loader").style.display = "block";
  // document.getElementById("myDiv").style.display = "none";

	var ref=firebase.database().ref('Trademarks/'+tmID);
	ref.once("value", function(snapshot) {

		tmName=snapshot.child("trademarkName").val();
		tmImg=snapshot.child("imgURL").val();
		//tmCount++;
  

	var diffDays0= document.createElement('td');
	diffDays0.className='infocel';
	diffDays0.textContent=diffDays;

	var offerEnd0= document.createElement('td');
	offerEnd0.className='infocel';
	offerEnd0.textContent=offerEnd;

	var offerDetails0= document.createElement('td');
	offerDetails0.className='infocel';
	offerDetails0.textContent=offerDetails;

	var offerName0= document.createElement('td');
	offerName0.className='infocel';
	offerName0.textContent=offerName;

	var type0= document.createElement('td');
	type0.className='infocel';
	type0.textContent=type;

	var tmName0= document.createElement('td');
	tmName0.className='infocel';
	tmName0.textContent=tmName;
  
	var tmImg0= document.createElement('img');
	tmImg0.className='rounded-circle mr-2 imageTrade z-depth-2';//'rounded-circle z-depth-2 imageTrade';
	tmImg0.style.marginTop='10px';
	tmImg0.src=tmImg;

	var tmCount0= document.createElement('td');
	tmCount0.className='infocel';
	tmCount0.textContent=tmCount;



	var newRow = document.createElement('tr');
	
	newRow.appendChild(diffDays0);// how many days left
	newRow.appendChild(offerEnd0);//end date
	newRow.appendChild(offerDetails0);//offer details
	newRow.appendChild(offerName0);//offer title
	newRow.appendChild(type0);//type


	newRow.appendChild(tmName0);//trademark name
	newRow.appendChild(tmImg0);//trademark img
	newRow.appendChild(tmCount0);// trademark counter


  
  
  
  
	document.getElementById("bodyOftable").appendChild(newRow);
	
	  
 
	 
	console.log('*diffDays '+diffDays);
	console.log('*offerEnd '+offerEnd);
	console.log('*offerDetails '+offerDetails);
	console.log('*offerName '+offerName);
	console.log('*type '+type);

	console.log('*tmID '+tmID);
	console.log('*tmName '+tmName);
	console.log('*tmImg '+tmImg);
	console.log('*tmCount '+tmCount);

	console.log('offers - tm name: '+tmName);
			});
  
//setTimeout(wait,6000);

}



//---the date -Offers nearing completion---

var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };
    var dateToday=curday('-');//was var
    console.log(dateToday);


//______Offers table
   firebase.database().ref('Offers').once('value').then(function(snapshot) {
	var NumOfOffers=0;
	var tmCount=0;
    snapshot.forEach(function(snapshot1) {

        NumOfOffers++;
        var offerEnd=snapshot1.child("endDate").val();
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));



        console.log('****************************************** diffDays'+diffDays);
        if(diffDays<=30){
            //هنا العروض قريبة الانتهاء 
			var tmID=snapshot1.child("trademarkID").val();
			tmCount++;
			var offerName=snapshot1.child("offerTitle").val(); ;
			var offerDetails=snapshot1.child("offerDetails").val(); ;
			var type='عرض';

      console.log(' *********************inside the <30 ');
			Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount);
        }

    });
//after_theLoop();
console.log('------------------Number of offers= '+NumOfOffers); //1)Offers tabel +2)Vouchers table +3)Deals table
   });




//______Deals table
   firebase.database().ref('Deals').once('value').then(function(snapshot) {
	var NumOfDeals=0;
	var tmCount=0;
    snapshot.forEach(function(snapshot1) {

        NumOfDeals++;
        var offerEnd=snapshot1.child("endDate").val();
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));



        if(diffDays<=30){
            //هنا الصفقات قريبة الانتهاء 
			var tmID=snapshot1.child("trademarkID").val();
			tmCount++;
			var offerName=snapshot1.child("offerTitle").val(); ;
			var offerDetails=snapshot1.child("offerDetails").val(); ;
			var type='صفقة';

      console.log(' inside the <30 ');
			Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount);
        }

    });
//after_theLoop();
console.log('Number of Deals= '+NumOfDeals); //1)Offers tabel +2)Vouchers table +3)Deals table
   });



//______Vouchers table
   firebase.database().ref('Vouchers').once('value').then(function(snapshot) {
	var NumOfVouchers=0;
	var tmCount=0;
    snapshot.forEach(function(snapshot1) {

        NumOfVouchers++;
        var offerEnd=snapshot1.child("endDate").val();
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));



        if(diffDays<=30){
            //هنا القسائم قريبة الانتهاء 
			var tmID=snapshot1.child("trademarkID").val();
			tmCount++;
			var offerName=snapshot1.child("offerTitle").val(); ;
			var offerDetails=snapshot1.child("offerDetails").val(); ;
			var type='قسيمة';

      console.log(' inside the <30 ');
			Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount);
        }

    });
//after_theLoop();
console.log('Number of Vouchers= '+NumOfVouchers); //1)Offers tabel +2)Vouchers table +3)Deals table
   });











//----------------------------------------------------------------------------------------------------THE REGIONS SECTION


//function REGIONS(){
     //var RegionsArray=[];
     var RegionsArray=["الكل","الحدود الشمالية","المنطقة الشرقية","منطقة الباحة","منطقة الجوف","منطقة الرياض","منطقة القصيم","منطقة المدينة المنورة","منطقة تبوك","منطقة جازان","منطقة حائل","منطقة عسير","منطقة مكة المكرمة","منطقة نجران"];
     var NumOfUsersArray=[];

//console.log('tmNamesArray: '+tmNamesArray);
//console.log('avgRateArray: '+avgRateArray);

firebase.database().ref('Users').once('value').then(function(snapshot) {
 var userCount=0;

 var AllCount=0;
 var NorthernCount=0;
 var EasternCount=0;
 var AlBahah=0;
 var AlJouf=0;
 var Riyadh=0;
 var Alqassim=0;
 var Almadina=0;
 var Tabuk=0;
 var Jazan=0;
 var Hail=0;
 var Assir=0;
 var Makkah=0;
 var Najran=0;



 snapshot.forEach(function(snapshot1) {

     //totalUsers=0;
     //rateCount=0;
     userCount++;
     var userKey=snapshot1.key;
     var userRegion=snapshot1.child("region").val(); ;
     console.log('user Counter: '+userCount+' user Region: '+userRegion);

     switch (userRegion) {
        case "الكل":
            AllCount++;
          break;
        case  "الحدود الشمالية":
            NorthernCount++;
          break;
        case "المنطقة الشرقية":
            EasternCount++;
          break;
        case "منطقة الباحة":
            AlBahah++;
          break;
        case "منطقة الجوف":
            AlJouf++;
          break;
        case "منطقة الرياض":
            Riyadh++;
          break;
        case "منطقة القصيم":
            Alqassim++;
          break;

          case  "منطقة المدينة المنورة":
            Almadina++;
            break;

          case "منطقة تبوك":
            Tabuk++;
            break;

          case "منطقة جازان":
            Jazan++;
            break;

          case "منطقة حائل":
            Hail++;
            break;

          case "منطقة عسير":
            Assir++;
            break;

          case "منطقة مكة المكرمة":
            Makkah++;
            break;

          case "منطقة نجران":
            Najran++;
            break;

      }


});
console.log('AllCount: '+AllCount+'\n NorthernCount: '+NorthernCount+'\n EasternCount: '+EasternCount+'\n AlBahah: '+AlBahah+'\n AlJouf: '+AlJouf+'\n Riyadh: '+Riyadh+'\n Alqassim: '+Alqassim+'\n Almadina: '+Almadina+'\n Tabuk: '+Tabuk+'\n Jazan: '+Jazan+'\n Hail: '+Hail+'\n Assir: '+Assir+'\n Makkah: '+Makkah+'\n Najran: '+Najran);
//RegionsArray=["الكل","الحدود الشمالية","المنطقة الشرقية","منطقة الباحة","منطقة الجوف","منطقة الرياض","منطقة القصيم","منطقة المدينة المنورة","منطقة تبوك","منطقة جازان","منطقة حائل","منطقة عسير","منطقة مكة المكرمة","منطقة نجران"];
NumOfUsersArray=[AllCount, NorthernCount, EasternCount, AlBahah, AlJouf, Riyadh, Alqassim, Almadina, Tabuk, Jazan, Hail, Assir, Makkah, Najran]; 
console.log('RegionsArray: \n'+RegionsArray);
console.log('NumOfUsersArray: \n'+NumOfUsersArray);    

 });

//}
//REGIONS();
console.log('NumOfUsersArray: after calling the function \n'+NumOfUsersArray);    
 //--------------------------------------------------------------------------------------------*/


//--the regions chart---
let myChart2 = document.getElementById('myChart2').getContext('2d');

// Global Options
//Chart.defaults.global.defaultFontFamily = 'Lato';
//Chart.defaults.global.defaultFontSize = 18;
//Chart.defaults.global.defaultFontColor = '#777';

//console.log('befeor chart ***');
let barChart2 = new Chart(myChart2,{
    type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data:{
labels: RegionsArray,
//['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],//labels= tm names
datasets:[{
  label:' عدد المستخدمين',
  data: NumOfUsersArray,//data = avg rate avgRateArray
  
  //[617594,181045,153060,106519,105162,95072],
  //backgroundColor:'green',
  backgroundColor:[
    /*'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 99, 132, 0.7)',*/
    //'rgba(85.5,26.7,32.5)' bad as fuck
    //'rgb(216,51,74, 0.7)',
    'rgb(237,85,101, 0.8)',
    'rgb(252,110,81, 0.8)',
    'rgb(255,206,84, 0.8)',
    'rgb(232,206,77, 0.8)',

    'rgb(160,212,104, 0.8)',
    'rgb(72,207,173, 0.8)',
    'rgb(160,206,203, 0.8)',
    'rgb(79,193,233, 0.8)',
    'rgb(93,156,236, 0.8)',

    'rgb(128,103,183, 0.8)',
    'rgb(172,146,236, 0.8)',
    'rgb(236,135,192, 0.8)',
    'rgb(245,247,250, 0.8)',
    'rgb(204,209,217, 0.8)'


  ],
  borderWidth:1,
  borderColor:'#777',
  hoverBorderWidth:3,
  hoverBorderColor:'#000'
}]
},
options:{
title:{
  display:true,
  text:'المناطق الأكثر إستخداما',
  fontSize:25
},
legend:{
  display:true,
  position:'right',
  labels:{
    fontColor:'#000'
  }
},
animation:{
  animateScale: true
}}

});










//end of class --methods to be used 

//---1
//Subtract date todat - offer end date !
var date1 = new Date('7-13-2010');
var date2 = new Date('12-15-2010');
var diffTime = Math.abs(date2 - date1);
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //if days <= 30 --if the diffrence is less that or equal to 30 "month" then it's عروض قريبة الإنتهاء
//console.log(diffTime + " milliseconds");
console.log(diffDays + " days");

//---2
function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

//---3
// new Date("dateString") is browser-dependent and discouraged, so we'll write
// a simple parse function for U.S. date format (which does no error checking)
function parseDate(str) {
    var mdy = str.split('-');//var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
    //return new Date(mdy[2], mdy[1], mdy[0]-1);
}

/*function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}

alert(datediff(parseDate(first.value), parseDate(second.value)));*/

function updateChart(){


  barChart.data.labels=tmNamesArray;
  barChart.data.datasets[0].data=avgRateArray;
  barChart.update();

  barChart2.data.labels=RegionsArray;
  barChart2.data.datasets[0].data=NumOfUsersArray;
  barChart2.update();


  //console.log('RegionsArray: \n'+RegionsArray);
  //console.log('NumOfUsersArray: \n'+NumOfUsersArray); 
  console.log('inside update chart'); 

  //barChart
  //barChart2

}

//---4
function compareDateBanner(str1){
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    return date1;
    }



        
   
 