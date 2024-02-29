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
function handleAllData(userData, tripsData, destData) {
  userTrips(userData, tripsData)
  sortPastDests(pastTrips, destData)
}

function userTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
//   sortTrips(sortedTrips)
  sortPastTrips(sortedTrips)
  sortCurrentTrips(sortedTrips)
  return sortedTrips
}

let pastTrips;
let currentTrips;

function sortPastTrips(trips) {
  return pastTrips = trips.filter((trip) => {
    return trip.status === 'approved'
  })
}

function sortCurrentTrips(trips) {
  return currentTrips = trips.filter((trip) => {
    return trip.status === 'pending'
  })
}

function sortPastDests(pastTrips, dests) {
  let allDests = dests.destinations
  let tripIDs = pastTrips.map((trip) => {
    return trip.destinationID
  })
  let pastDests = allDests.filter((dest) => {
    return tripIDs.includes(dest.id)
  })
  return pastDests
}

getData()

export {
  userTrips,
  sortPastTrips,
  sortCurrentTrips,
  sortPastDests,
  handleAllData
}