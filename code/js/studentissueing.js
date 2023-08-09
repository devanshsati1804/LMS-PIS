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

const admNoInput = document.getElementById('AdmNo');
const studentDetailsSection = document.getElementById('studentDetails');
const studentName = document.getElementById('studentName');
const studentClass = document.getElementById('studentClass');
const studentDOB = document.getElementById('studentDOB');
const studentContact = document.getElementById('studentContact');
const issuedBook = document.getElementById('issuedBook');
const issueDate = document.getElementById('issueDate');
const returnDate = document.getElementById('returnDate');
const penalty = document.getElementById('penalty');
const issueBookBtn = document.getElementById('issueBook');

// Function to fetch student details
async function fetchStudentDetails() {
  const AdmNo = admNoInput.value;
  const studentRef = getfirestore.collection('Student Data').doc(AdmNo);

  try {
    const doc = await studentRef.get();
    if (doc.exists) {
      const data = doc.data();
      studentName.textContent = data.Name;
      studentClass.textContent = data.CLASS;
      studentDOB.textContent = data.DOB;
      studentContact.textContent = data['Contact No'];

      const book = data['Issued Book'];
      if (book) {
        issuedBook.textContent = book;
        issueDate.textContent = data['Issue Date'];
        returnDate.textContent = data['Return Date'];
        penalty.textContent = data.Penalty || 'No penalty';
        issueBookBtn.style.display = 'none';
      } else {
        issuedBook.textContent = 'None';
        issueDate.textContent = '-';
        returnDate.textContent = '-';
        penalty.textContent = '-';
        issueBookBtn.style.display = 'block';
      }

      studentDetailsSection.style.display = 'block';
    } else {
      studentDetailsSection.style.display = 'none';
      alert('Student not found!');
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
  }
}

// Function to issue a book
async function issueBook() {
  const admNo = admNoInput.value;
  const bookId = 'your-book-id'; // Replace with the book's primary key

  const issuanceData = {
    'Issued Book': bookId,
    'Issue Date': new Date().toLocaleDateString(),
    'Return Date': getReturnDate(),
  };

  try {
    await firestore.collection('Student Data').doc(admNo).update(issuanceData);
    alert('Book issued successfully!');
    fetchStudentDetails();
  } catch (error) {
    console.error('Error issuing book:', error);
  }
}

// Function to calculate the return date
function getReturnDate() {
  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(returnDate.getDate() + 7); // Adding 7 days

  return returnDate.toLocaleDateString();
}