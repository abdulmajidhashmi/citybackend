const admin = require('firebase-admin');
const dotenv =require('dotenv');
dotenv.config(); // Load environment variables
const serviceAccount = require('./nanded-app-firebase-adminsdk-fbsvc-de7919b4fa.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports= admin;
