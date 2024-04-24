//Used Co-Pilot and GPT to expedite the writing code

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthElem = document.getElementById('currentMonth');
const daysGrid = document.getElementById('daysGrid');

let currentDate = new Date();

function renderCalendar() {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  currentMonthElem.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  daysGrid.innerHTML = '';

  //create cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day', 'empty');
    daysGrid.appendChild(emptyCell);
  }

  //fill cells
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayElem = document.createElement('div');
    dayElem.textContent = i;
    dayElem.classList.add('day');
    dayElem.addEventListener('click', () => selectDay(dayElem));
    dayElem.addEventListener('mouseover', () => dayElem.classList.add('hover'));
    dayElem.addEventListener('mouseout', () => dayElem.classList.remove('hover'));
    daysGrid.appendChild(dayElem);
  }
}

//highlight day
function selectDay(selectedDay) {
  const allDays = document.querySelectorAll('.day');
  allDays.forEach(day => day.classList.remove('selected'));
  selectedDay.classList.add('selected');
}

//buttons
prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
