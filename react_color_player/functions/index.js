const admin = require('firebase-admin');
const functions = require('firebase-functions');
const FieldValue = require('firebase-admin').firestore.FieldValue;

admin.initializeApp();


exports.incrementCounterNewUser = functions.auth.user().onCreate(user => {
    // for background triggers you must return a value/promise
    return admin.firestore().collection('counters').doc("userCounter").update({ count: FieldValue.increment(1) });
  });

  exports.userDeletedDecrementCounter = functions.auth.user().onDelete(user => {
    return admin.firestore().collection('counters').doc("userCounter").update({ count: FieldValue.increment(-1) });
  });
