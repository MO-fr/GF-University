document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const eventForm = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');

    let currentDate = new Date();
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    function saveEvents() {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        currentMonthDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        calendarGrid.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            
            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayElement.dataset.date = fullDate;

            dayElement.classList.add(
                'p-2', 'border', 'text-center', 
                'cursor-pointer', 'hover:bg-blue-100', 'rounded'
            );

            // Highlight days with events
            const dayEvents = events.filter(event => event.date === fullDate);
            if (dayEvents.length > 0) {
                dayElement.classList.add('bg-green-200');
                dayEvents.forEach(() => {
                    const eventMarker = document.createElement('div');
                    eventMarker.classList.add('h-1', 'w-1', 'bg-red-500', 'rounded-full', 'mx-auto', 'mt-1');
                    dayElement.appendChild(eventMarker);
                });
            }

            dayElement.addEventListener('click', () => {
                document.getElementById('eventDate').value = fullDate;
                eventForm.scrollIntoView({ behavior: 'smooth' });
            });

            calendarGrid.appendChild(dayElement);
        }

        renderEventList();
    }

    function renderEventList() {
        const upcomingEvents = events
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        eventList.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h3>
            ${upcomingEvents.length ? 
                upcomingEvents.map(event => `
                    <div class="border-b py-2">
                        <strong>${event.title}</strong>
                        <p>${event.date} - ${event.type}</p>
                        <p>${event.description || ''}</p>
                    </div>
                `).join('') : 
                '<p>No upcoming events</p>'
            }
        `;
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEvent = {
            id: Date.now(),
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            type: document.getElementById('eventType').value,
            description: document.getElementById('eventDescription').value
        };

        events.push(newEvent);
        saveEvents();
        
        eventForm.reset();
        renderCalendar(currentDate);
    });

    // Initial render
    renderCalendar(currentDate);
});