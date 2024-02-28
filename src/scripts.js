// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { getData } from './apiCalls';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/loc1.jpg'
import './images/loc2.jpg'
import './images/loc3.jpg'

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

function sortTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
  return sortedTrips
}


getData()

export {
  sortTrips
}