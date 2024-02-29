
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

export {
  userTrips,
  sortTrips
}
