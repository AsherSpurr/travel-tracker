
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
    return trip.date.includes('2022')
  })

  let totalCost = 0;
  targetTrips.forEach((trip) => {
    let destination = dests.find((dest) => dest.id === trip.destinationID)
    if (destination) {
      // eslint-disable-next-line max-len
      let flightCost = destination.estimatedFlightCostPerPerson * trip.travelers
      let lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration
      totalCost += flightCost + lodgingCost;
    }
  })
  return totalCost
}



export {
  userTrips,
  sortPastTrips,
  sortCurrentTrips,
  yearlyCost,
  sortCurrentDests,
  sortPastDests
}
