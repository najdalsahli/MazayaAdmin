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





  var fbBucketName = 'images';

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
					var downloadURL = uploadTask.snapshot.downloadURL;
					console.log('downloadURL', downloadURL);
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
					var downloadURL1 = uploadTask1.snapshot.downloadURL;
					console.log('downloadURL', downloadURL1);
				});

		});



















//--------------------------------------------------------------------------------------------------------------------NEW TEST


function Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount){

	var tmName;
	var tmImg;
	//var tmCount=0;

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
	tmImg0.className='rounded-circle mr-2 imageTrade';//'rounded-circle z-depth-2 imageTrade';
	tmImg0.style.marginTop='20px';
	//tmImg0.style.marginBottom='0px';
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
  


}



/*function Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID){

  
  
	console.log('*diffDays '+diffDays);
	console.log('*offerEnd '+offerEnd);
	console.log('*offerDetails '+offerDetails);
	console.log('*offerName '+offerName);
	console.log('*type '+type);

	console.log('*tmID '+tmID);
	console.log('*tmName '+tmName);
	console.log('*tmImg '+tmImg);
	console.log('*tmCount '+tmCount);
	var tmName;
	var tmImg;
	var tmCount=0;

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



	var ref=firebase.database().ref('Trademarks/'+tmID);
            ref.once("value", function(snapshot) {
				tmName=snapshot.child("trademarkName").val();
				tmImg=snapshot.child("imgURL").val();
				tmCount++;
				
                //tmNamesArray.push(tmName);
            console.log('offers - tm name: '+tmName);
			});



	var tmName0= document.createElement('td');
	tmName0.className='infocel';
	tmName0.textContent=tmName;
  
	var tmImg0= document.createElement('img');
	tmImg0.className='rounded-circle mr-2 imageTrade';
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


	//newRow.appendChild(tradecel);
	//newRow.appendChild(imgtrade);
	//newRow.appendChild(countcel);


  
  
  
  
	document.getElementById("bodyOftable").appendChild(newRow);
	  
 
	
  


}*/




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



        if(diffDays<=30){
            //هنا العروض قريبة الانتهاء 
			var tmID=snapshot1.child("trademarkID").val();
			tmCount++;
			var offerName=snapshot1.child("offerTitle").val(); ;
			var offerDetails=snapshot1.child("offerDetails").val(); ;
			var type='عرض';

			Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount);
        }

    });
//after_theLoop();
console.log('Number of offers= '+NumOfOffers); //1)Offers tabel +2)Vouchers table +3)Deals table
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

			Ending_soon_offers(diffDays,offerEnd,offerDetails,offerName,type,tmID,tmCount);
        }

    });
//after_theLoop();
console.log('Number of Vouchers= '+NumOfVouchers); //1)Offers tabel +2)Vouchers table +3)Deals table
   });




//---4
function compareDate(str1){
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1   = parseInt(str1.substring(0,2));
    var mon1  = parseInt(str1.substring(3,5));
    var yr1   = parseInt(str1.substring(6,10));
    var date1 = new Date(yr1, mon1-1, dt1);
    return date1;
    }
