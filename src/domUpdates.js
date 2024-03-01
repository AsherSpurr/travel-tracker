
const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')
const totalSpent = document.querySelector('.total-spent')


document.querySelectorAll('.button-modal').forEach((button) => {
  button.addEventListener('click', () => {
    hideModal(button.id)
  })
})

// const modalPast = document.querySelector('#modal-past')

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('click', () => {
    renderModal(img.id) 
  })
})

function renderModal(imgValue) {
  if (imgValue === 'img-past') {
    modalPast.classList.remove('hidden')
  } 
  if (imgValue === 'img-current') {
    modalCurrent.classList.remove('hidden')
  }
}

function hideModal(buttonValue) {
  console.log('button value', buttonValue)
  if (buttonValue === 'modal-button-past') {
    modalPast.classList.add('hidden')
  }
  if (buttonValue === 'modal-button-current') {
    modalCurrent.classList.add('hidden')
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

function renderTripSelect(dests) {
  const tripSelect = document.querySelector('.trip-select')
  let allDests = dests.destinations
  allDests.forEach((dest) => {
    tripSelect.innerHTML += `
    <option class="${dest.id}">${dest.destination}</option>
    `
  })
}

export {
  renderTotalSpent,
  renderPastTrips,
  renderCurrentTrips,
  renderTripSelect
}