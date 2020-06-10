const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

const setMovieData = (index, price) => {
    localStorage.setItem('selectedMovie', index);
    localStorage.setItem('selectedMoviePrice', price);
};

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectMovieIndex = localStorage.getItem('selectedMovie');

    if (selectedSeats && selectedSeats.length > 0) {
        seats.forEach((s, i) => {
            if (selectedSeats.indexOf(i) > -1) {
                s.classList.toggle('selected');
            };
        })
    }

    if(selectMovieIndex) {
        movieSelect.selectedIndex = +selectMovieIndex;
        ticketPrice = +movieSelect.value;
    }
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

updateSelectedCount();

