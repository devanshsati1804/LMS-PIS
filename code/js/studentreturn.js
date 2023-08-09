//firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    collection,
    getDoc,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCION4gldRlEgISWgJBst3RszWUfpSUaUw",
  authDomain: "lmspis.firebaseapp.com",
  projectId: "lmspis",
  storageBucket: "lmspis.appspot.com",
  messagingSenderId: "674585430385",
  appId: "1:674585430385:web:4fef7a2c7081db88214ed0",
  measurementId: "G-636PSZ5R5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//login credientials
var sub, user, pass, mainContent, loggedIn;
var loggedIn = document.querySelector(".logged-in");
//const analytics = getAnalytics(app);
const db = getFirestore(app);

// authenticating user
const email = sessionStorage.getItem("Email");
const password = sessionStorage.getItem("Password");

var pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
var result = pattern.test(email);

if (result == true && password.length >= 6) {
    let obj = {
        email: email,
        password: password,
    };

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (_success) { })
        .catch(function (err) {
            swal({
                title: "Opps !",
                text: "Something Went Wrong Please Try Again",
                icon: "error",
                button: "OK",
            });
        });
} else {
    window.location = "../../index.html";
}

const admNoInput = document.getElementById('admNoInput');
const returnDetailsSection = document.getElementById('returnDetails');
const bookTitle = document.getElementById('bookTitle');
const issueDate = document.getElementById('issueDate');
const returnDate = document.getElementById('returnDate');
const penalty = document.getElementById('penalty');
const returnBookBtn = document.getElementById('returnBookBtn');

// Function to fetch issuing details
function fetchIssuingDetails() {
  const admNo = admNoInput.value;
  const studentRef = firestore.collection('Student Data').doc(admNo);

  studentRef.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      const issueId = data['Issued Book'];
      const issueDateValue = data['Issue Date'];
      const returnDateValue = data['Return Date'];
      const penaltyValue = data.Penalty || 'None';

      // Fetch book title from bookDetails collection
      if (issueId) {
        const bookRef = firestore.collection('bookDetails').doc(issueId);
        bookRef.get().then(bookDoc => {
          if (bookDoc.exists) {
            const bookData = bookDoc.data();
            const bookTitleValue = bookData.Title;

            // Populate the UI with issuing details
            bookTitle.textContent = bookTitleValue;
            issueDate.textContent = issueDateValue;
            returnDate.textContent = returnDateValue;
            penalty.textContent = penaltyValue;

            returnDetailsSection.style.display = 'block';
          } else {
            alert('Book not found for the given issue ID');
          }
        });
      } else {
        alert('No book issued for the student');
      }
    } else {
      alert('Student not found!');
    }
  }).catch(error => {
    console.error('Error fetching issuing details:', error);
  });
}

// Function to return a book
function returnBook() {
  const admNo = admNoInput.value;
  const studentRef = firestore.collection('Student Data').doc(admNo);

  studentRef.update({
    'Issued Book': null,
    'Issue Date': null,
    'Return Date': null,
    'Penalty': null
  }).then(() => {
    alert('Book returned successfully!');
    clearReturnDetails();
  }).catch(error => {
    console.error('Error returning book:', error);
  });
}

// Function to clear the return details section
function clearReturnDetails() {
  bookTitle.textContent = '';
  issueDate.textContent = '';
  returnDate.textContent = '';
  penalty.textContent = '';
  returnDetailsSection.style.display = 'none';
}
