
// import tripsSample from './sampleTrips';
// import userSample from './sample-user'

function userTrips(userSample, tripsSample) {
  let trips = tripsSample.trips
  let sortedTrips = trips.filter((trip) => {
    return userSample.id === trip.userID
  })
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
  yearlyCost(pastTrips, pastDests)
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
  console.log(totalCost)
  return totalCost
}
export {
  userTrips,
  sortTrips,
  sortPastTrips,
  sortCurrentTrips,
  sortPastDests,
  sortCurrentDests,
  pastTrips,
  currentTrips,
}
