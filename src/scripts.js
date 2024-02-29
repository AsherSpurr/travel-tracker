// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { getData } from './apiCalls';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// import './css/index.scss'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/loc1.jpg'
import './images/loc2.jpg'
import './images/loc3.jpg'

/*<><><><><><><><><><><><><><><> DOM UPDATES <><><><><><><>><><><><><><><><> */
const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')
// const modalPast = document.querySelector('#modal-past')

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('click', () => {
    removeModal(img.id) 
  })
})

function removeModal(imgValue) {
  if (imgValue === 'img-past') {
    modalPast.classList.remove('hidden')
  } 
  if (imgValue === 'img-current') {
    modalCurrent.classList.remove('hidden')
  }
  console.log('trip image value', imgValue)
}

/* <><><><><><><><><><><><><><><> Javascript <><><><><><><><><><><><><><> */
function userTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
  sortTrips(sortedTrips)
  return sortedTrips
}

// function sortPastTrips(trips) {
//   return trips.filter((trip) => {
//     return trip.status === 'approved'
//   })
// }

// function sortCurrentTrips(trips) {
//   return trips.filter((trip) => {
//     return trip.status === 'pending'
//   })
// }

function sortTrips(trips) {
  let pastTrips = trips.filter((trip) => {
    return trip.status === 'approved'
  })
  let currentTrips = trips.filter((trip) => {
    return trip.status === 'pending'
  })
  console.log(pastTrips)
  console.log(currentTrips)
}

getData()

export {
  userTrips
}