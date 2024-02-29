// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { getData } from './apiCalls';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// import './css/index.scss'
import './domUpdates'

import './images/turing-logo.png'
import './images/loc1.jpg'
import './images/loc2.jpg'
import './images/loc3.jpg'

/* <><><><><><><><><><><><><><><> Javascript <><><><><><><><><><><><><><> */
function userTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
  console.log('sorted trips', sortedTrips)
  sortTrips(sortedTrips)
  return sortedTrips
}

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
  userTrips,
  sortTrips,
}