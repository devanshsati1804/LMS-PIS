// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDGykzF6vSpRizZAo03P-HgqHjnSLsS9v4",
  authDomain: "lms-pis.firebaseapp.com",
  projectId: "lms-pis",
  storageBucket: "lms-pis.appspot.com",
  messagingSenderId: "353317907548",
  appId: "1:353317907548:web:9f583e2760b7c219dfca99",
  measurementId: "G-9TGSJQ0KFS"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get references to DOM elements
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  // Handle form submission
  loginForm.addEventListener('login', (e) => {
    e.preventDefault(); // Prevent form submission
  
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    // Use Firebase Auth to sign in with email and password
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Successful login, do something (e.g., redirect to a dashboard page)
        alert('Login successful!');
      })
      .catch((error) => {
        // Handle login error (e.g., display an error message)
        alert('Login failed. Please check your credentials and try again.');
      });
  });
  