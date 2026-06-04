// Time zones data with abbreviations and details
const timeZoneData = {
    'UTC': { name: 'UTC', abbr: 'UTC', offset: 0 },
    'America/New_York': { name: 'Eastern Time (US)', abbr: 'EST/EDT', offset: -5 },
    'America/Chicago': { name: 'Central Time (US)', abbr: 'CST/CDT', offset: -6 },
    'America/Denver': { name: 'Mountain Time (US)', abbr: 'MST/MDT', offset: -7 },
    'America/Los_Angeles': { name: 'Pacific Time (US)', abbr: 'PST/PDT', offset: -8 },
    'America/Anchorage': { name: 'Alaska Time', abbr: 'AKST/AKDT', offset: -9 },
    'Pacific/Honolulu': { name: 'Hawaii Time', abbr: 'HST', offset: -10 },
    'Europe/London': { name: 'Greenwich Mean Time', abbr: 'GMT/BST', offset: 0 },
    'Europe/Paris': { name: 'Central European Time', abbr: 'CET/CEST', offset: 1 },
    'Europe/Moscow': { name: 'Moscow Standard Time', abbr: 'MSK', offset: 3 },
    'Asia/Dubai': { name: 'Gulf Standard Time', abbr: 'GST', offset: 4 },
    'Asia/Kolkata': { name: 'Indian Standard Time', abbr: 'IST', offset: 5.5 },
    'Asia/Bangkok': { name: 'Indochina Time', abbr: 'ICT', offset: 7 },
    'Asia/Shanghai': { name: 'China Standard Time', abbr: 'CST', offset: 8 },
    'Asia/Tokyo': { name: 'Japan Standard Time', abbr: 'JST', offset: 9 },
    'Asia/Seoul': { name: 'Korea Standard Time', abbr: 'KST', offset: 9 },
    'Asia/Hong_Kong': { name: 'Hong Kong Time', abbr: 'HKT', offset: 8 },
    'Australia/Sydney': { name: 'Australian Eastern Time', abbr: 'AEDT/AEST', offset: 10 },
    'Australia/Melbourne': { name: 'Australian Eastern Time', abbr: 'AEDT/AEST', offset: 10 },
    'New_Zealand': { name: 'New Zealand Daylight Time', abbr: 'NZDT/NZST', offset: 12 }
};

// Selected time zones
let selectedTimeZones = [];
let timeFormat = '12'; // Default to 12-hour format

// Update main clock
function updateMainClock() {
    const now = new Date();
    const timeDisplay = document.getElementById('main-time');
    const dateDisplay = document.getElementById('main-date');

    if (timeFormat === '12') {
        const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    } else {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);
}

// Format time for a specific timezone
function getTimeInTimeZone(timezone, format) {
    const now = new Date();
    
    try {
        const timeString = now.toLocaleString('en-US', {
            timeZone: timezone,
            hour12: format === '12',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const [datePart, timePart] = timeString.split(', ');
        return { time: timePart, date: datePart };
    } catch (e) {
        return { time: 'Invalid', date: 'Timezone' };
    }
}

// Calculate offset from UTC
function getUTCOffset(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);
    
    const sign = offset >= 0 ? '+' : '';
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.round((Math.abs(offset) % 1) * 60);
    
    return `UTC ${sign}${hours}${minutes > 0 ? ':' + String(minutes).padStart(2, '0') : ''}`;
}

// Render timezone clocks
function renderTimezoneClock(timezone) {
    const { time, date } = getTimeInTimeZone(timezone, timeFormat);
    const offset = getUTCOffset(timezone);
    const data = timeZoneData[timezone];
    
    return `
        <div class="timezone-card">
            <div class="timezone-name">${data.name}</div>
            <div class="timezone-abbr">${data.abbr}</div>
            <div class="timezone-time">${time}</div>
            <div class="timezone-date">${date}</div>
            <div class="timezone-offset">${offset}</div>
            <button class="remove-btn" onclick="removeTimeZone('${timezone}')">Remove</button>
        </div>
    `;
}

// Update all timezone clocks
function updateTimezoneClocksDisplay() {
    const container = document.getElementById('timezone-clocks');
    const noZonesMessage = document.getElementById('no-zones-message');
    
    if (selectedTimeZones.length === 0) {
        container.innerHTML = '';
        noZonesMessage.style.display = 'block';
        return;
    }
    
    noZonesMessage.style.display = 'none';
    container.innerHTML = selectedTimeZones.map(tz => renderTimezoneClock(tz)).join('');
}

// Add time zone
function addTimeZone() {
    const select = document.getElementById('timezone-select');
    const timezone = select.value;
    
    if (!timezone) {
        alert('Please select a time zone');
        return;
    }
    
    if (selectedTimeZones.includes(timezone)) {
        alert('This time zone is already added');
        return;
    }
    
    selectedTimeZones.push(timezone);
    select.value = '';
    updateTimezoneClocksDisplay();
    saveTimeZonesToLocalStorage();
}

// Remove time zone
function removeTimeZone(timezone) {
    selectedTimeZones = selectedTimeZones.filter(tz => tz !== timezone);
    updateTimezoneClocksDisplay();
    saveTimeZonesToLocalStorage();
}

// Save to localStorage
function saveTimeZonesToLocalStorage() {
    localStorage.setItem('selectedTimeZones', JSON.stringify(selectedTimeZones));
}

// Load from localStorage
function loadTimeZonesFromLocalStorage() {
    const saved = localStorage.getItem('selectedTimeZones');
    if (saved) {
        selectedTimeZones = JSON.parse(saved);
        updateTimezoneClocksDisplay();
    }
}

// Handle format change
function handleFormatChange(format) {
    timeFormat = format;
    updateMainClock();
    updateTimezoneClocksDisplay();
    localStorage.setItem('clockFormat', format);
}

// Load saved format
function loadSavedFormat() {
    const saved = localStorage.getItem('clockFormat');
    if (saved) {
        timeFormat = saved;
        const radios = document.querySelectorAll('input[name="format"]');
        radios.forEach(radio => {
            radio.checked = radio.value === timeFormat;
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Load saved preferences
    loadSavedFormat();
    loadTimeZonesFromLocalStorage();
    
    // Initial updates
    updateMainClock();
    updateTimezoneClocksDisplay();
    
    // Update every second
    setInterval(() => {
        updateMainClock();
        updateTimezoneClocksDisplay();
    }, 1000);
    
    // Add event listeners
    document.getElementById('add-timezone-btn').addEventListener('click', addTimeZone);
    
    // Allow Enter key to add timezone
    document.getElementById('timezone-select').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTimeZone();
        }
    });
    
    // Format radio buttons
    document.querySelectorAll('input[name="format"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleFormatChange(this.value);
        });
    });
});