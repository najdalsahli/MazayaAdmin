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