const admin = require('firebase-admin');
var serviceAccount = require('../../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const struct = []
db.collection('config').doc('forms').collection('farm_form').get()
.then(snapshot => {
  snapshot.forEach(doc => {
    struct.push(doc.data());
  });
  console.log('struct', struct)
})
.catch(err => {
  console.log('Error getting documents', err);
});

