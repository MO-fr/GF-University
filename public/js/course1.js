// Create a set to store selected course IDs (to keep track of what the user selects)
let selectedCourses = new Set(); 

function toggleCourseSelection(courseElement) {
    // Get the course ID from the clicked element
    const courseId = courseElement.getAttribute("data-course-id");

    // Check if the course is already selected
    if (selectedCourses.has(courseId)) {
        // If it's already selected, remove it from the set (unselect it)
        selectedCourses.delete(courseId);
        courseElement.classList.remove("selected"); // Remove the highlight
    } else {
        // If it's not selected, add it to the set
        selectedCourses.add(courseId);
        courseElement.classList.add("selected"); // Highlight the course
    }

    // Update the hidden input field with the selected course IDs (for form submission)
    document.getElementById("selectedCourses").value = Array.from(selectedCourses).join(",");

    // Show or hide the "Assign Selected Courses" button based on selection
    const assignButton = document.getElementById("assignButton");
    if (selectedCourses.size > 0) {
        assignButton.style.display = "block"; // Show button if at least one course is selected
    } else {
        assignButton.style.display = "none"; // Hide button if nothing is selected
    }
}

function searchCourses(query) {
    // Convert the search query to lowercase so it's not case-sensitive
    query = query.toLowerCase();
    const courses = document.querySelectorAll('.course-item'); // Get all course elements

    // Go through each course and check if it matches the search input
    courses.forEach(course => {
        const courseInfo = course.getAttribute('data-course-info'); // Get the course details
        if (courseInfo.includes(query)) {
            course.style.display = 'block'; // Show the course if it matches the search
        } else {
            course.style.display = 'none'; // Hide it if it doesn't match
        }
    });
}

// Show confirmation message when courses are assigned
document.getElementById("assignForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission for now

    // Get the number of selected courses
    const courseCount = selectedCourses.size;
    
    if (courseCount > 0) {
        // Show an alert message based on the number of courses selected
        alert(courseCount === 1 ? "Course assigned!" : "Courses assigned!");
        
        // Reset selection after assigning
        selectedCourses.clear();
        document.querySelectorAll('.course-item.selected').forEach(course => {
            course.classList.remove("selected");
        });
        
        // Hide the button again
        document.getElementById("assignButton").style.display = "none";
        
        // Clear the hidden input value
        document.getElementById("selectedCourses").value = "";
    }
});

// Make sure the assign button is hidden when the page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("assignButton").style.display = "none";
});
