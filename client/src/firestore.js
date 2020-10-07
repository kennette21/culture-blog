const admin = require('firebase-admin');

const serviceAccount = require('./secrets/culture-blog-284a4cae14ee.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export default db