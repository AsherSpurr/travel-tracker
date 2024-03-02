
import { handleAllData } from "./scripts"

function getData(userID) {

  const user = fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(resp => resp.json())

  const trips = fetch('http://localhost:3001/api/v1/trips')
    .then(resp => resp.json())

  const destinations = fetch('http://localhost:3001/api/v1/destinations') 
    .then(resp => resp.json())
    
  Promise.all([user, trips, destinations])
    .then((data) => {
      let [user, trips, destinations] = data
      // console.log('sorted trips', userTrips(user, trips))
      // sortPastDests(arr, destinations)
      console.log('user', user)
      console.log('trip', trips)
      console.log('destinations', destinations)
      handleAllData(user, trips, destinations)
    })
}

function postTrip(trip) {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(trip),
    headers: {
      'Content-Type': 'application/json' 
    }
  })
    .then(resp => console.log(resp.json()))
    .catch(err => console.log(err))
}

function deleteTrip(tripNum) {
  fetch(`http://localhost:3001/api/v1/trips/${tripNum}`, {
    method: 'DELETE',
    body: JSON.stringify(tripNum),
    headers: {
      'Content-Type': 'application/json' 
    }
  })
    .then(resp => console.log(resp.json()))
}

export {
  getData,
  postTrip,
  deleteTrip
}