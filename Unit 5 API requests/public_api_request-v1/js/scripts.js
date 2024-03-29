//Variables
const gallery = document.getElementById('gallery');
const body = document.getElementsByTagName('body');
const searchContainer = document.querySelector('.search-container');
let employeeData;

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(data => data.json())
    .then(data => generateHTML(data))
    .then(data => interactivity(data))
/*
//Generates HTML for each random user pulled
@para Brings in data from API request
Returns HTML formatted data
*/
function generateHTML(data) {
    employeeData = data.results;
    employeeData.forEach(employee => {
        employeePost = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
            </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="card-text">${employee.email}</p>
                    <p class="card-text cap">${employee.location. city}, ${employee.location.state}</p>
                </div>
        </div>`
        gallery.innerHTML += (employeePost);
    });
    addSearchBar();
    search();
    return employeeData;
}

/** 

Generates a modal window for random user selected
@para Brings index value of profile selected
returns Modal window

**/
function generateModal(index) {
    const employeeModal = document.createElement('div');
    employeeModal.setAttribute('id', 'special');
    gallery.appendChild(employeeModal);
    employee = employeeData[index];
    employeeProfile = `
    <div class='modal-container'>
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.phone}</p>
            <p class="modal-text">${employee.location.street.number}, ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state}, ${employee.location.postcode} </p>
            <p class="modal-text">Birthday: ${employee.dob.date}</p>
        </div>
    </div> 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
`
    employeeModal.innerHTML = employeeProfile;
    interactivityButton(index);
}

/**
 * Adds event listeners to the page
 * @para index value of profile selected
 * returns events listners
 */

function interactivity(data) {
    const card = document.querySelectorAll('#gallery .card');
    for (let i = 0; i < card.length; i += 1) {
        card[i].addEventListener('click', function () {
            generateModal(i);
        })
    }
}
/**
 * Adds event listners to modal buttons
 * @para 
 * returns event listeners
 */

function interactivityButton(index) {
    const prev = document.querySelector('#modal-prev');
    const next = document.querySelector('#modal-next');
    const close = document.querySelector('#modal-close-btn');
    const modal = document.querySelector('#special');

    if (index <= 0) {
        prev.style.display = 'none';
    } else {
        prev.style.display = 'block';
    }

    if (index >= 11) {
        next.style.display = 'none';
    } else {
        next.style.display = 'block';
    }

    close.addEventListener('click', function () {
        gallery.removeChild(modal);
    })
    prev.addEventListener('click', function () {
        index = index - 1;
        gallery.removeChild(modal);
        generateModal(index);
    })

    next.addEventListener('click', function () {
        index = index + 1;
        gallery.removeChild(modal);
        generateModal(index);
    })

}
/*
 *Adds search input to page
 */
function addSearchBar(data) {
    const searchDiv = document.createElement('div');
    let search = `
    <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search by Name...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`
    searchDiv.innerHTML = search;
    searchContainer.appendChild(searchDiv);
}

function search() {
    const card = document.querySelectorAll('.card');
    const name = document.querySelectorAll('#name');
    const search = document.querySelector('#search-input');
    const searchSubmit = document.querySelector('#serach-submit');
    const displayDiv = document.createElement('div');
    console.log(searchSubmit);
    displayDiv.innerHTML = `<p>There are no employees by that name. To start over, clear the search bar and press enter.</p>`;
    displayDiv.classList.add('hide');
    gallery.appendChild(displayDiv);

    //Adds activate search
    search.addEventListener('keyup', () => {
        let searchValue = search.value.toLowerCase();
        for (let i = 0; i < card.length; i += 1) {         
            let nameValue = name[i].textContent.toLowerCase();
            if (nameValue.includes(searchValue)) {
                card[i].classList.add('show');
                card[i].classList.remove('hide');
            } else {
                card[i].classList.add('hide');
                card[i].classList.remove('show');

            }
        }
        let displayValue = document.querySelectorAll('.hide');
        if(displayValue.length > card.length){
            displayDiv.classList.add('show');
            displayDiv.classList.remove('hide');
        } else {
            displayDiv.classList.remove('show');
            displayDiv.classList.add('hide');
        }
    })
    //Adds submit search
    searchSubmit.addEventListener('click', ()=> {
        let searchValue = search.value.toLowerCase();
        for (let i = 0; i < card.length; i += 1) {         
            let nameValue = name[i].textContent.toLowerCase();
            if (nameValue.includes(searchValue)) {
                card[i].classList.add('show');
                card[i].classList.remove('hide');
            } else {
                card[i].classList.add('hide');
                card[i].classList.remove('show');

            }
        }
        let displayValue = document.querySelectorAll('.hide');
        if(displayValue.length > card.length){
            displayDiv.classList.add('show');
            displayDiv.classList.remove('hide');
        } else {
            displayDiv.classList.remove('show');
            displayDiv.classList.add('hide');
        }
    })
}