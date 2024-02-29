
import { userTrips } from "./scripts"

function getData() {

  const user = fetch('http://localhost:3001/api/v1/travelers/30')
    .then(resp => resp.json())

  const trips = fetch('http://localhost:3001/api/v1/trips')
    .then(resp => resp.json())

  const destinations = fetch('http://localhost:3001/api/v1/destinations') 
    .then(resp => resp.json())
    
  Promise.all([user, trips, destinations])
    .then((data) => {
      let [user, trips, destinations] = data
      console.log('sorted trips', userTrips(user, trips))
      console.log('user', user)
      console.log('trip', trips)
      console.log('destinations', destinations)
    })
}

export {
  getData
}