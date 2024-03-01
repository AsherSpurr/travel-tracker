/* eslint-disable max-len */
import { createTrip } from "./scripts"

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

buttonHome.addEventListener('click', () => {
  unhideMainPage()
  hideForm()
})

buttonPlan.addEventListener('click', () => {
  hideMainPage()
  unhideForm()
})

options.addEventListener('change', checkIfSelected)

buttonSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  let date;
  let duration;
  let travelers;
  let destinationID = checkIfSelected()
  inputs.forEach((input) => {
    // console.log('value', input.value)
    // console.log('id', input.id)
    if (input.id === 'date') {
      date = input.value
      // console.log('date val', date)
    }
    if (input.id === 'duration') {
      duration = input.value
      // console.log('duration val', duration)
    }
    if (input.id === 'travelers') {
      travelers = input.value
      // console.log('travelers val', travelers)
    }
    if (input.id === 'undefined') {
      console.log('no')
    }
  })
  createTrip(date, duration, travelers, destinationID)
})

function checkIfSelected() {
  let x = document.querySelector('.trip-select').value
  return x
}

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

// let allDests;
function renderTripSelect(dests) {
  const tripSelect = document.querySelector('.trip-select')
  let allDests = dests.destinations
  allDests.forEach((dest) => {
    tripSelect.innerHTML += `
    <option class="dest" id="destination" value="${dest.id}">${dest.destination}</option>
    `
  })
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

export {
  renderTotalSpent,
  renderPastTrips,
  renderCurrentTrips,
  renderTripSelect
}