
import { handleAllData } from "./scripts"

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
      // console.log('sorted trips', userTrips(user, trips))
      // sortPastDests(arr, destinations)
      console.log('user', user)
      console.log('trip', trips)
      console.log('destinations', destinations)
      handleAllData(user, trips, destinations)
    })
}

export {
  getData
}