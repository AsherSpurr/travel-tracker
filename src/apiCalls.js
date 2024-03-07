/* eslint-disable max-len */

import { handleAllData, login, userId } from "./scripts"

import { renderFetchError, renderSuccessMessage, renderPlanError} from "./domUpdates"

function getData(userID) {
  const user = fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      renderFetchError()
    })
    // .then((resp) => {
    //   if (!resp.ok) {
    //     console.log('FUCK')
    //     renderFetchError()
    //   } else {
    //     resp.json()
    //   }
    // })

  const trips = fetch('http://localhost:3001/api/v1/trips')
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      renderFetchError()
    })

  const destinations = fetch('http://localhost:3001/api/v1/destinations') 
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      renderFetchError
    })

  Promise.all([user, trips, destinations])
    .then((data) => {
      let [user, trips, destinations] = data
      console.log('user', user)
      console.log('trip', trips)
      console.log('destinations', destinations)
      handleAllData(user, trips, destinations)
      login()
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
    .then((resp) => {
      if (!resp.ok || trip.travelers === null || trip.duration === null) {
        console.log('no')
        renderPlanError()
      } else {
        console.log('yes')
        resp.json()
        renderSuccessMessage()
        const modalContentCurrent = document.querySelector('#modal-content-current')
        modalContentCurrent.innerHTML = ''
        getData(userId)
      }
    })
    .catch((err) => {
      console.log(err)
    })
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