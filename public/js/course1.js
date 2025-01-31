let selectedCourses = new Set(); 

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

    const assignButton = document.getElementById("assignButton");
    assignButton.style.display = selectedCourses.size > 0 ? "block" : "none";
}

function searchCourses(query) {
    query = query.toLowerCase();
    const courses = document.querySelectorAll('.course-item');

    courses.forEach(course => {
        const courseInfo = course.getAttribute('data-course-info');
        course.style.display = courseInfo.includes(query) ? 'block' : 'none';
    });
}

document.getElementById("assignForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const courseCount = selectedCourses.size;
    
    if (courseCount > 0) {
        alert(courseCount === 1 ? "Course assigned!" : "Courses assigned!");
        
        selectedCourses.clear();
        document.querySelectorAll('.course-item.selected').forEach(course => {
            course.classList.remove("selected");
        });

        document.getElementById("assignButton").style.display = "none";
        document.getElementById("selectedCourses").value = "";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("assignButton").style.display = "none";
});