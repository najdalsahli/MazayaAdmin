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




   //---The Rating---

   var tmNamesArray=[];
   var avgRateArray=[];

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
        avgRateArray.push(avgRate);
        console.log('*avgRateArray:* '+avgRateArray);
        console.log('avg '+ avgRate);

        var ref=firebase.database().ref('Trademarks/'+tmID);
ref.once("value", function(snapshot) {
    var tmName=snapshot.child("trademarkName").val()
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
labels: tmNamesArray,
//['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],//labels= tm names
datasets:[{
  label:'متوسط التقييمات ',
  data: avgRateArray,//data = avg rate avgRateArray
  //[617594,181045,153060,106519,105162,95072],
  //backgroundColor:'green',
  backgroundColor:[
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)'
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
   // console.log(curday('-'));


   //______Offers table
   firebase.database().ref('Offers').once('value').then(function(snapshot) {
    var NumOfOffers=0;
    snapshot.forEach(function(snapshot1) {

        NumOfOffers++;
        var offerEnd=snapshot1.child("endDate").val();
        //var reversedOfferEndDate=offerEnd.split("-").reverse().join("-");
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        //console.log('CurrDate -date 1: '+dateToday);
        //console.log('EndDate -date 2: '+reversedOfferEndDate+' test'+reversedOfferEndDate1);

        //1) date1 = dateToday
        //2) date2 = reversedOfferEndDate
        //console.log('date 1: '+Date.parse(dateToday));
        //console.log('date 2: '+compareDate(reversedOfferEndDate1));

        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));
        //console.log(diffDays+' Days');


        if(diffDays<=30){
            //هنا العروض قريبة الانتهاء 
            var tmName;
            var tmID=snapshot1.child("trademarkID").val();
            var ref=firebase.database().ref('Trademarks/'+tmID);
            ref.once("value", function(snapshot) {
                tmName=snapshot.child("trademarkName").val()
                //tmNamesArray.push(tmName);
            console.log('offers - tm name: '+tmName);
            });
            //write the trademark name code here...
            var offerName=snapshot1.child("offerTitle").val(); ;
            console.log(' عرض قريب الانتهاء - '+offerName+' || '); 
        }

    });
//after_theLoop();
console.log('Number of offers= '+NumOfOffers); //1)Offers tabel +2)Vouchers table +3)Deals table
   });



   //______Deals table
   firebase.database().ref('Deals').once('value').then(function(snapshot) {
    var NumOfDeals=0;
    snapshot.forEach(function(snapshot1) {

        NumOfDeals++;
        var offerEnd=snapshot1.child("endDate").val();
        //var reversedOfferEndDate=offerEnd.split("-").reverse().join("-");
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        //console.log('CurrDate -date 1: '+dateToday);
        //console.log('EndDate -date 2: '+reversedOfferEndDate+' test'+reversedOfferEndDate1);

        //1) date1 = dateToday
        //2) date2 = reversedOfferEndDate
        //console.log('date 1: '+Date.parse(dateToday));
        //console.log('date 2: '+compareDate(reversedOfferEndDate1));

        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));
        //console.log(diffDays+' Days');


        if(diffDays<=30){
            //هنا الصفقات قريبة الانتهاء 
            var tmName;
            var tmID=snapshot1.child("trademarkID").val();
            var ref=firebase.database().ref('Trademarks/'+tmID);
            ref.once("value", function(snapshot) {
                tmName=snapshot.child("trademarkName").val()
                //tmNamesArray.push(tmName);
            console.log('deals - tm name: '+tmName);
            });
            //write the trademark name code here...
            var offerName=snapshot1.child("offerTitle").val(); ;
            console.log(' صفقة قريب الانتهاء - '+offerName +' || '); 
        }

    });
//after_theLoop();
console.log('Number of Deals= '+NumOfDeals); //1)Offers tabel +2)Vouchers table +3)Deals table
   });

   //______Vouchers table
   firebase.database().ref('Vouchers').once('value').then(function(snapshot) {
    var NumOfVouchers=0;
    snapshot.forEach(function(snapshot1) {

        NumOfVouchers++;
        var offerEnd=snapshot1.child("endDate").val();
        //var reversedOfferEndDate=offerEnd.split("-").reverse().join("-");
        var reversedOfferEndDate1=offerEnd.split("-").reverse().join("/");
        //console.log('CurrDate -date 1: '+dateToday);
        //console.log('EndDate -date 2: '+reversedOfferEndDate+' test'+reversedOfferEndDate1);

        //1) date1 = dateToday
        //2) date2 = reversedOfferEndDate
        //console.log('date 1: '+Date.parse(dateToday));
        //console.log('date 2: '+compareDate(reversedOfferEndDate1));

        var diffDays = Math.round((compareDate(reversedOfferEndDate1)-Date.parse(dateToday))/(1000*60*60*24));
        //console.log(diffDays+' Days');


        if(diffDays<=30){
            //هنا الصفقات قريبة الانتهاء 
            var tmName;
            var tmID=snapshot1.child("trademarkID").val();
            var ref=firebase.database().ref('Trademarks/'+tmID);
            ref.once("value", function(snapshot) {
                tmName=snapshot.child("trademarkName").val()
                //tmNamesArray.push(tmName);
            console.log('Vouchers - tm name: '+tmName);
            });
            //write the trademark name code here...
            var offerName=snapshot1.child("offerTitle").val(); ;
            console.log(' قسيمة قريبة الإنتهاء قريب الانتهاء - '+offerName+' || '); 
        }

    });
//after_theLoop();
console.log('Number of Vouchers= '+NumOfVouchers); //1)Offers tabel +2)Vouchers table +3)Deals table
   });








/*firebase.database().ref('Offers').once('value').then(function(snapshot) {
    var NumOfOffers=0;
    snapshot.forEach(function(snapshot1) {

        NumOfOffers++;
        var offerEnd=snapshot1.child("endDate").val();// const not working
        //offerEnd = offerEnd.split("-").reverse().join("-");
        var newDate=offerEnd.split("-").reverse().join("-");
        var newNew=new Date(newDate);
        //const endOfferReversed=reverseString(offerEnd);


        //var date = "2016-10-15";
        //date = date.split("-").reverse().join("-");
        //console.log(date);
        
        //Subtract date todat - offer end date !
var date1 = dateToday;
console.log('date1 '+date1);
var date2 = new Date(newDate);//new Date('12-15-2010');
console.log('date2 '+date2);


var diffTime = Math.abs(date2 - date1);
var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //if days <= 30 --if the diffrence is less that or equal to 30 "month" then it's عروض قريبة الإنتهاء
//console.log(diffTime + " milliseconds");
console.log(diffDays + " days");




        //console.log('The offers end date: '+offerEnd); 
        console.log('offerEnd= '+offerEnd);
        console.log('endOfferReversed= '+newDate);
        console.log('dateToday= '+dateToday);
        var diffTime = Math.abs(newNew - dateToday);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        if(diffDays<=30){
            //هنا العروض قريبة الانتهاء 
            var tmName;
            var offerName=snapshot1.child("endDate").val(); ;
            console.log(' عرض قريب الانتهاء - '+offerTitle);
        }

    });
//after_theLoop();
//console.log('The offers end date: '+offerEnd);
console.log('Number of offers= '+NumOfOffers);
   });*/




















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

//---4
function compareDate(str1){
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    return date1;
    }



        
        

