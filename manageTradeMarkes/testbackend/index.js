

const express = require('express')
const app = express()
const port = 3000

var admin = require('firebase-admin');


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<mc-mazaya>.firebaseio.com'
  });

app.get('/', (req, res) => {
    var email='amutairi@mc.gov.sa';
    admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      res.send(userRecord.toJSON())
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
      res.send('Error!')
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})