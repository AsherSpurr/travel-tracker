// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { getData, postTrip, deleteTrip } from './apiCalls';

// eslint-disable-next-line max-len
import { renderTotalSpent, renderPastTrips, renderCurrentTrips, renderTripSelect } from './domUpdates';
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// import './css/index.scss'
import './domUpdates'

import './images/turing-logo.png'
import './images/loc1.jpg'
import './images/loc2.jpg'
import './images/loc3.jpg'

let userId;
let allTrips;
let pastTrips;
let currentTrips;
/* <><><><><><><><><><><><><><><> Javascript <><><><><><><><><><><><><><> */
function handleAllData(userData, tripsData, destData) {
  userTrips(userData, tripsData)
  sortPastDests(pastTrips, destData)
  sortCurrentDests(currentTrips, destData)
  renderTripSelect(destData)
  allTrips = tripsData;
}

getUserLogin('traveler30', 'travel') //make dynamic after login

function getUserLogin(userName, password) {
  let userID = userName.replace('traveler', '')
  userId = userID 
  if (userName !== 'traveler' + userID || password !== 'travel') {
    console.log('no') //insert error handling
  } else {
    getData(userID)
    console.log('yes')
  }
}

function userTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
  sortPastTrips(sortedTrips)
  sortCurrentTrips(sortedTrips)
  return sortedTrips
}

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
  yearlyCost(pastTrips, pastDests)
  renderPastTrips(pastTrips, pastDests)
  return pastDests
}

function sortCurrentDests(currentTrips, dests) {
  let allDests = dests.destinations
  let tripIDs = currentTrips.map((trip) => {
    return trip.destinationID
  })
  let currentDests = allDests.filter((dest) => {
    return tripIDs.includes(dest.id)
  })
  renderCurrentTrips(currentTrips, currentDests)
  return currentDests
}

function yearlyCost(trips, dests) {
  let targetTrips = trips.filter((trip) => {
    return trip.date.includes('2022')
  })
  let totalCost = 0
  targetTrips.forEach((trip) => {
    let targetDest = dests.find((dest) => {
      return dest.id === trip.destinationID
    })
    if (targetDest) {
      let flightCost = targetDest.estimatedFlightCostPerPerson * trip.travelers
      let lodgingCost = targetDest.estimatedLodgingCostPerDay * trip.duration
      let agencyFee = (flightCost + lodgingCost) * .10
      totalCost += flightCost + lodgingCost + agencyFee
    }
  })
  renderTotalSpent(totalCost)
  return totalCost
}

function createTrip(dateValue, durationValue, travelersValue, destIDValue) {
  let durationNum = Number(durationValue)
  let travelerNum = Number(travelersValue)
  let destIDNum = Number(destIDValue)
  let userIdNum = Number(userId)
  let targetIndex = allTrips.trips.length + 1
  let formatDate = dateValue.replaceAll('-', '/')

  let trip = {
    id: targetIndex,
    userID: userIdNum,
    destinationID: destIDNum,
    travelers: travelerNum,
    date: formatDate,
    duration: durationNum,
    status: 'pending',
    suggestedActivities: ['none'],
  }
  postTrip(trip)
}

// function estimateCost(formInput) {

// }
// deleteTrip(204)

// getData()

export {
  userTrips,
  sortPastTrips,
  sortCurrentTrips,
  sortPastDests,
  sortCurrentDests,
  handleAllData,
  createTrip
}