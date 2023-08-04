function toggleSection(sectionId) {
    // Get all section elements
    const sections = document.querySelectorAll('.section');
  
    // Loop through sections and hide them all
    sections.forEach(section => section.style.display = 'none');
  
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
  }
  
  function submitForm() {
    // Get form data
    const formData = new FormData(document.getElementById('entry'));
    const data = {};
  
    // Convert formData to a simple key-value object
    formData.forEach((value, key) => {
      data[key] = value;
    })};