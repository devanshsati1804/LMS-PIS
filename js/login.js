function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    if (username === "admin" && password === "password") {
      // Display success message
      document.getElementById("message").innerHTML = "Login successful!";
      document.getElementById("message").style.color = "green";
    } else {
      // Display error message
      document.getElementById("message").innerHTML = "Invalid username or password!";
      document.getElementById("message").style.color = "red";
    }
  }
  