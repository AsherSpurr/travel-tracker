/* eslint-disable max-len */
import { createTrip, estimateCost, allDests, getUserLogin, userId } from "./scripts"
import { getData } from "./apiCalls"

const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')
const totalSpent = document.querySelector('.total-spent')
const buttonSubmit = document.querySelector('.button-form')
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
const errorPlan = document.querySelector('#error-plan')
const errorMain = document.querySelector('#error-main')
const mainPage = document.querySelector('main')
const header = document.querySelector('header')
const loginPage = document.querySelector('.login-page')
const buttonLogin = document.querySelector('#button-login')
const buttonLogOut = document.querySelector('#button-logout')
const errorLogin = document.querySelector('#error-login')

window.addEventListener('load', () => {
  if (sessionStorage.getItem('user')) {
    let user = sessionStorage.getItem('user')
    getData(user)
  }
})

buttonLogOut.addEventListener('click', logout)

buttonLogin.addEventListener('click', (e) => {
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

buttonSubmit.addEventListener('click', () => {
  // e.preventDefault()
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
  totalSpent.innerText = total
}

function renderPastTrips(trips, dests) {
  const modalContent = document.querySelector('#modal-content-past')
  trips.forEach((trip) => {
    dests.find((dest) => {
      modalContent.innerHTML += `
 <figure>
   <p>${trip.date}</P>
   <img src="${dest.image}" alt="${dest.alt}" height="100px" width="100px"/>
   <figcaption>${dest.destination}</figcaption>
 </figure>`
    })
  })
}

function renderCurrentTrips(trips, dests) {
  const modalContentCurrent = document.querySelector('#modal-content-current')
  trips.forEach((trip) => {
    dests.find((dest) => {
      modalContentCurrent.innerHTML += `
 <figure>
   <p>${trip.date}</P>
   <img src="${dest.image}" alt="${dest.alt}" height="100px" width="100px"/>
   <figcaption>${dest.destination}</figcaption>
 </figure>`
    })
  })
}

// function renderPOSTtrips(trips, dests) {
//   const modalContentCurrent = document.querySelector('#modal-content-current')
//   let destsProper = dests.destinations
//   trips.forEach((trip) => {
//     destsProper.find((dest) => {
//       modalContentCurrent.innerHTML += `
// <figure>
//  <p>${trip.date}</P>
//  <img src="${dest.image}" alt="${dest.alt}" height="100px" width="100px"/>
//  <figcaption>${dest.destination}</figcaption>
// </figure>`
//     })
//   })
// }

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

function renderEstimatedCost(num) {
  estimatedCost.classList.remove('hidden')
  estimatedCost.innerText = num
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

function renderPlanError(err) {
  errorPlan.innerText = `Sorry an unexpected error has occured. ${err}`
}

function renderMainError(err) {
  errorMain.innerText = `Sorry an unexpected error has occured. ${err}`
}

export {
  renderTotalSpent,
  renderPastTrips,
  renderCurrentTrips,
  renderTripSelect,
  renderEstimatedCost,
  renderPlanError,
  renderMainError,
  login,
  loginError,

}
