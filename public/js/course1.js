let selectedCourses = new Set(); // Store selected course IDs

function toggleCourseSelection(courseElement) {
    const courseId = courseElement.getAttribute("data-course-id");

    if (selectedCourses.has(courseId)) {
        selectedCourses.delete(courseId);
        courseElement.classList.remove("selected");
    } else {
        selectedCourses.add(courseId);
        courseElement.classList.add("selected");
    }

    document.getElementById("selectedCourses").value = Array.from(selectedCourses).join(",");
}
function searchCourses(query) {
    query = query.toLowerCase();
    const courses = document.querySelectorAll('.course-item');
    
    courses.forEach(course => {
        const courseInfo = course.getAttribute('data-course-info');
        if (courseInfo.includes(query)) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}