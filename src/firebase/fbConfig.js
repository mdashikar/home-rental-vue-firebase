import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions';

import firebaseConfig from "../config/config";
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebase utils
const db = firebase.firestore()
const functions = firebase.functions();
const auth = firebase.auth()
const currentUser = auth.currentUser


// firebase collections
const usersCollection = db.collection('users')
const rentalsCollection = db.collection('rentals')
const flatsCollection = db.collection('flats')
const monthlyRentCollection = db.collection('monthlyRents')

export {
	db,
	functions,
	auth,
	currentUser,
	usersCollection,
    rentalsCollection,
	flatsCollection,
	monthlyRentCollection
}