const admissionNoInput = document.getElementById('admissionNoInput');
const studentDetailsDiv = document.getElementById('studentDetails');

async function fetchStudentDetails() {
  const admissionNo = admissionNoInput.value;

  try {
    const studentDoc = await db.collection('Student Data').doc(admissionNo).get();

    if (studentDoc.exists) {
      const studentData = studentDoc.data();
      const studentDetailsHTML = `
        <p>Name: ${studentData.Name}</p>
        <p>Class: ${studentData.CLASS}</p>
        <p>Date of Birth: ${studentData.DOB}</p>
        <p>Contact No: ${studentData['Contact No']}</p>
      `;
      studentDetailsDiv.innerHTML = studentDetailsHTML;
    } else {
      studentDetailsDiv.innerHTML = '<p>Student not found.</p>';
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
  }
}
