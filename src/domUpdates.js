/* eslint-disable max-len */
import { createTrip, estimateCost, allDests, getUserLogin } from "./scripts"
import { getData } from "./apiCalls"

const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')
const totalSpent = document.querySelector('.total-spent')
const inputs = document.querySelectorAll('input')
const options = document.querySelector('.trip-select')
const buttonPlan = document.querySelector('#button-plan')
const formContainer = document.querySelector('.plan-trip-cont')
const mainTop = document.querySelector('.section-main-top')
const mainBottom = document.querySelector('.section-main-bottom')
const buttonHome = document.querySelector('#button-home')
const overlay = document.querySelector('.overlay')

const estimatedCost = document.querySelector('#estimated-cost')
const buttonEstimate = document.querySelector('.estimate-cost')
const flightCost = document.querySelector('#estimated-flight')
const lodgingCost = document.querySelector('#estimated-lodging')

const mainPage = document.querySelector('main')
const header = document.querySelector('header')
const loginPage = document.querySelector('.login-page')
const buttonLogOut = document.querySelector('#button-logout')
const errorLogin = document.querySelector('#error-login')
const bodySelect = document.querySelector('body')
const buttonDyslexic = document.querySelector('#button-dyslexia')
const buttons = document.querySelectorAll('button')
const feedbackMessage = document.querySelector('.success')
const tripForm = document.querySelector('.trip-form')
const loginForm = document.querySelector('.form-login')


window.addEventListener('load', () => {
  if (sessionStorage.getItem('user')) {
    let user = sessionStorage.getItem('user')
    console.log('dom user', user)
    getData(user)
  }
})

buttonLogOut.addEventListener('click', logout)

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  grabLogin()
})

buttonEstimate.addEventListener('click', renderEstimate)

buttonHome.addEventListener('click', () => {
  unhideMainPage()
  hideForm()
})

buttonPlan.addEventListener('click', () => {
  hideMainPage()
  unhideForm()
})

options.addEventListener('change', checkIfSelected)

tripForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let date;
  let duration;
  let travelers;
  let destinationID = checkIfSelected()
  inputs.forEach((input) => {
    if (input.id === 'date') {
      date = input.value
    }
    if (input.id === 'duration') {
      duration = input.value
    }
    if (input.id === 'travelers') {
      travelers = input.value
    }
    if (input.id === 'undefined') {
      console.log('no')
    } else {
      feedbackMessage.innerText = "Please fill out all parts of the form"
    }
  })
  createTrip(date, duration, travelers, destinationID)
})

document.querySelectorAll('.button-modal').forEach((button) => {
  button.addEventListener('click', () => {
    hideModal(button.id)
  })
})

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('click', () => {
    renderModal(img.id)
  })
  img.addEventListener('keypress', (e) => {
    console.log('key:', e.key)
    if (e.key === 'Enter' || e.key === ' ') {
      renderModal(img.id)
    }
  })
})

buttonDyslexic.addEventListener('click', () => {
  bodySelect.classList.toggle('dyslexia-font')
  buttons.forEach((button) => {
    button.classList.toggle('dyslexia-font')
  })
})

function checkIfSelected() {
  let x = document.querySelector('.trip-select').value
  return x
}

function grabLogin() {
  let userName;
  let password;
  inputs.forEach((input) => {
    if (input.id === 'userName') {
      userName = input.value
    }
    if (input.id === 'password') {
      password = input.value
    }
  })
  getUserLogin(userName, password)
}

function login() {
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
  loginPage.classList.add('hidden')
}

function loginError() {
  errorLogin.innerText = 'Username or Password incorrect'
  setTimeout(removeError, 3000)
}

function removeError() {
  errorLogin.innerText = ''
}

function logout() {
  document.querySelector('.form-login').reset()
  sessionStorage.clear('user')
  location.reload()
}

function renderModal(imgValue) {
  if (imgValue === 'img-past') {
    modalPast.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }
  if (imgValue === 'img-current') {
    modalCurrent.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }
}

function hideModal(buttonValue) {
  console.log('button value', buttonValue)
  if (buttonValue === 'modal-button-past') {
    modalPast.classList.add('hidden')
    overlay.classList.add('hidden')
  }
  if (buttonValue === 'modal-button-current') {
    modalCurrent.classList.add('hidden')
    overlay.classList.add('hidden')
  }
}

function renderTotalSpent(total) {
  totalSpent.innerText = `$${total}`
}

function renderPastTrips(trips, dests) {
  const modalContent = document.querySelector('#modal-content-past')
  let counter = 0;
  trips.forEach((trip) => {
    counter++
    let date = trip.date
    let dateRev = date.split('/').reverse().join('/')
    let targetDest = dests.find((dest) => {
      return dest.id === trip.destinationID
    })
    let lodging = targetDest.estimatedLodgingCostPerDay * trip.duration
    let flightCost = targetDest.estimatedFlightCostPerPerson * trip.travelers
    modalContent.innerHTML += `
    <div class="card-cont" >
      <div class="card-inner">
        <div class="card-front">
          <img class="modal-img" id="${counter}" src="${targetDest.image}" alt="${targetDest.alt}" height="250px" width="250px"/>
          <figcaption>${targetDest.destination}</figcaption>
        </div>
        <div class="card-back">
          <p class="modal-date">${dateRev}</P>
          <p>Length of stay: ${trip.duration} days</p>
          <p>Lodging costs: $${lodging}</p>
          <p>Flight costs: $${flightCost}</p>
        </div>
      </div>
    </div>
 `
  })
}

function renderCurrentTrips(trips, dests) {
  const modalContentCurrent = document.querySelector('#modal-content-current')
  trips.forEach((trip) => {
    let date = trip.date
    let dateRev = date.split('/').reverse().join('/')
    let targetDest = dests.find((dest) => {
      return dest.id === trip.destinationID
    })
    modalContentCurrent.innerHTML += `
    <figure>
      <p class="modal-date">${dateRev}</P>
      <img class="modal-img" src="${targetDest.image}" alt="${targetDest.alt}" height="200px" width="200px"/>
      <figcaption>${targetDest.destination}</figcaption>
    </figure>`
  })
}

function renderTripSelect(dests) {
  const tripSelect = document.querySelector('.trip-select')
  let allDests = dests.destinations
  allDests.forEach((dest) => {
    tripSelect.innerHTML += `
   <option class="dest" id="destination" value="${dest.id}">${dest.destination}</option>
   `
  })
}

function renderEstimate() {
  let duration;
  let travelers;
  let destinationID = checkIfSelected()
  inputs.forEach((input) => {
    if (input.id === 'duration') {
      duration = input.value
    }
    if (input.id === 'travelers') {
      travelers = input.value
    }
    if (input.id === 'undefined') {
      console.log('no')
    }
  })
  estimateCost(duration, travelers, destinationID, allDests)
}

function renderSuccessMessage() {
  feedbackMessage.innerText = "Trip added successfully"
  // document.querySelectorAll('input').forEach((input) => {
  //   input.value = ""
  // })
  setTimeout(removeSuccessMessage, 6000)
}

function removeSuccessMessage() {
  feedbackMessage.innerText = ""
}

function renderEstimatedCost(num) {
  // estimatedCost.classList.remove('hidden')
  estimatedCost.innerText = `$${num}`
}

function renderFlightCost(num) {
  flightCost.innerText = `$${num}`
}

function renderLodgingCost(num) {
  lodgingCost.innerText = `$${num}`
}

function hideForm() {
  formContainer.classList.add('hidden')
}

function hideMainPage() {
  mainTop.classList.add('hidden')
  mainBottom.classList.add('hidden')
}

function unhideForm() {
  formContainer.classList.remove('hidden')
}

function unhideMainPage() {
  mainTop.classList.remove('hidden')
  mainBottom.classList.remove('hidden')
}

function renderPlanError() {
  feedbackMessage.innerText = `Sorry an unexpected error has occured.`
}

function renderFetchError() {
  errorLogin.innerText = 'Sorry an unexpected issue has occured fetching the web information.'
}


export {
  renderTotalSpent,
  renderPastTrips,
  renderCurrentTrips,
  renderTripSelect,
  renderEstimatedCost,
  login,
  loginError,
  renderSuccessMessage,
  renderPlanError,
  renderFetchError,
  renderFlightCost,
  renderLodgingCost
}
