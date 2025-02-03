// Use a Set to store selected courses (ensures no duplicates)
let selectedCourses = new Set(); 

// Function to toggle course selection when clicked
function toggleCourseSelection(courseElement) {
    const courseId = courseElement.getAttribute("data-course-id"); // Get course ID

    if (selectedCourses.has(courseId)) {
        // If course is already selected, remove it
        selectedCourses.delete(courseId);
        courseElement.classList.remove("selected");
    } else {
        // If not selected, add it
        selectedCourses.add(courseId);
        courseElement.classList.add("selected");
    }

    // Update the hidden input field with selected courses (for form submission)
    document.getElementById("selectedCourses").value = Array.from(selectedCourses).join(",");

    // Show or hide the "Assign" button based on selections
    const assignButton = document.getElementById("assignButton");
    assignButton.style.display = selectedCourses.size > 0 ? "block" : "none";
}

// Function to filter/search courses based on user input
function searchCourses(query) {
    query = query.toLowerCase(); // Convert query to lowercase for case-insensitive search
    const courses = document.querySelectorAll('.course-item'); // Get all course elements

    courses.forEach(course => {
        const courseInfo = course.getAttribute('data-course-info'); // Get searchable course info
        course.style.display = courseInfo.includes(query) ? 'block' : 'none'; // Show or hide based on query match
    });
}

// Handle course assignment form submission
document.getElementById("assignForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from actually submitting (to handle via JavaScript)

    const courseCount = selectedCourses.size; // Get number of selected courses
    
    if (courseCount > 0) {
        // Show success message based on number of courses selected
        alert(courseCount === 1 ? "Course assigned!" : "Courses assigned!");
        
        // Clear selected courses after assigning
        selectedCourses.clear();
        document.querySelectorAll('.course-item.selected').forEach(course => {
            course.classList.remove("selected");
        });

        // Hide the "Assign" button and reset hidden input field
        document.getElementById("assignButton").style.display = "none";
        document.getElementById("selectedCourses").value = "";
    }
});

// Ensure "Assign" button is hidden when the page loads
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("assignButton").style.display = "none";
});
