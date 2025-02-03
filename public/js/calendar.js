// Wait until the web page is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get important elements from the webpage
    const calendarGrid = document.getElementById('calendarGrid'); // The calendar layout
    const currentMonthDisplay = document.getElementById('currentMonth'); // Shows the current month and year
    const prevMonthBtn = document.getElementById('prevMonth'); // Button to go to the previous month
    const nextMonthBtn = document.getElementById('nextMonth'); // Button to go to the next month
    const eventForm = document.getElementById('eventForm'); // Form where users add new events
    const eventList = document.getElementById('eventList'); // List of upcoming events

    let currentDate = new Date(); // Get today's date
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || []; // Load saved events from the browser storage

    // Function to save events in local storage (so they don't disappear when the page refreshes)
    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    // Function to display the calendar
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Show the current month and year on the page
        currentMonthDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        // Clear the calendar before drawing the new one
        calendarGrid.innerHTML = '';

        const firstDay = new Date(year, month, 1); // First day of the month
        const lastDay = new Date(year, month + 1, 0); // Last day of the month

        // Add empty spaces for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // Loop through all days of the month and display them
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day; // Show the day number

            // Format the date to YYYY-MM-DD
            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayElement.dataset.date = fullDate;

            // Add some styling to each day
            dayElement.classList.add(
                'p-2', 'border', 'text-center', 
                'cursor-pointer', 'hover:bg-blue-100', 'rounded'
            );

            // Highlight days that have events
            const dayEvents = events.filter(event => event.date === fullDate);
            if (dayEvents.length > 0) {
                dayElement.classList.add('bg-green-200'); // Change background color
                dayEvents.forEach(() => {
                    const eventMarker = document.createElement('div');
                    eventMarker.classList.add('h-1', 'w-1', 'bg-red-500', 'rounded-full', 'mx-auto', 'mt-1');
                    dayElement.appendChild(eventMarker); // Add a small red dot to show an event
                });
            }

            // When a user clicks a day, it fills in the event form with the selected date
            dayElement.addEventListener('click', () => {
                document.getElementById('eventDate').value = fullDate;
                eventForm.scrollIntoView({ behavior: 'smooth' }); // Scroll down smoothly to the form
            });

            calendarGrid.appendChild(dayElement);
        }

        // Also update the event list
        renderEventList();
    }

    // Function to display a list of upcoming events
    function renderEventList() {
        const upcomingEvents = events
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort events by date
            .slice(0, 5);  // Show only the first 5 upcoming events

        // Create the HTML for the event list
        eventList.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h3>
            ${upcomingEvents.length ? 
                upcomingEvents.map(event => `
                    <div class="event-item border-b py-2 flex justify-between items-center">
                        <div>
                            <strong>${event.title}</strong>
                            <p>${event.date} - ${event.type}</p>
                            <p>${event.description || ''}</p>
                        </div>
                        <button 
                            class="delete-event text-red-600 hover:text-red-800" 
                            data-id="${event.id}">
                            Delete
                        </button>
                    </div>
                `).join('') : 
                '<p>No upcoming events</p>'
            }
        `;

        // Add event listener to each delete button
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = e.target.dataset.id;
                deleteEvent(eventId);
            });
        });
    }

    // Function to delete an event
    function deleteEvent(eventId) {
        events = events.filter(event => event.id !== parseInt(eventId)); // Remove the event from the list
        saveEvents(); // Save the updated list
        renderCalendar(currentDate); // Re-render the calendar and event list
    }

    // Go to the previous month when the button is clicked
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    // Go to the next month when the button is clicked
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // When a new event is submitted through the form
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the page from reloading
        const newEvent = {
            id: Date.now(), // Give the event a unique ID
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDescription').value
        };

        events.push(newEvent); // Add the event to the list
        saveEvents(); // Save the event in local storage
        
        eventForm.reset(); // Clear the form fields
        renderCalendar(currentDate); // Update the calendar
    });

    // Initial setup: Render the calendar for the current month
    renderCalendar(currentDate);
});