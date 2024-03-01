/* eslint-disable max-len */

function userTrips(userSample, tripsSample) {
  let trips = tripsSample.trips
  let sortedTrips = trips.filter((trip) => {
    return userSample.id === trip.userID
  })
  return sortedTrips
}

function sortPastTrips(trips) {
  let pastTrips = trips.filter((trip) => {
    return trip.status === 'approved'
  })
  return pastTrips
}

function sortCurrentTrips(trips) {
  let currentTrips = trips.filter((trip) => {
    return trip.status === 'pending'
  })
  return currentTrips
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

function sortCurrentDests(currentTrips, dests) {
  let allDests = dests.destinations
  let tripIDs = currentTrips.map((trip) => {
    return trip.destinationID
  })
  let currentDests = allDests.filter((dest) => {
    return tripIDs.includes(dest.id)
  })
  return currentDests
}

function yearlyCost(trips, dests) {
  let targetTrips = trips.filter((trip) => {
    return trip.date.includes('2020')
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
  return totalCost
}

function getUserLogin(userName, password) {
  let userID = userName.replace('traveler', '')
  if (userName !== 'traveler' + userID || password !== 'travel') {
    return 'Access denied' //insert error handling
  } else {
    return 'Access granted'
  }
}

export {
  userTrips,
  sortPastTrips,
  sortCurrentTrips,
  yearlyCost,
  sortCurrentDests,
  sortPastDests,
  getUserLogin
}
