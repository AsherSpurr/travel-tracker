/* eslint-disable max-len */
import chai from 'chai';
const expect = chai.expect;

import tripsSample from './sample-trips';
import { userTrips, sortPastTrips, sortCurrentTrips, sortCurrentDests, sortPastDests,
  yearlyCost, getUserLogin, createTrip, estimateCost } from './script-test';
import userSample from './sample-user';
import destsSample from './sample-dests'

describe('userTrips', () => {
  it('should return a single users trips', () => {
    let e = userTrips(userSample, tripsSample)

    expect(e).to.deep.equal([
      {
        "id": 36,
        "userID": 30,
        "destinationID": 26,
        "travelers": 5,
        "date": "2019/10/20",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 92,
        "userID": 30,
        "destinationID": 4,
        "travelers": 2,
        "date": "2020/12/24",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 152,
        "userID": 30,
        "destinationID": 40,
        "travelers": 1,
        "date": "2020/03/26",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  })
})

describe('sortPastTrips', () => {
  it('should return trips with a status of approved', () => {
    let sorted = userTrips(userSample, tripsSample)
    let e = sortPastTrips(sorted)

    expect(e).to.deep.equal([
      {
        "id": 36,
        "userID": 30,
        "destinationID": 26,
        "travelers": 5,
        "date": "2019/10/20",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 92,
        "userID": 30,
        "destinationID": 4,
        "travelers": 2,
        "date": "2020/12/24",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 152,
        "userID": 30,
        "destinationID": 40,
        "travelers": 1,
        "date": "2020/03/26",
        "duration": 16,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  })
})

describe('sortCurrentTrips', () => {
  it('should return trips with a status of pending', () => {
    let sorted = userTrips(userSample, tripsSample)
    let e = sortCurrentTrips(sorted)

    expect(e).to.deep.equal([])
  })
})

describe('sortPastDests', () => {
  it('should return array of destination objects matching to past trips', () => {
    let sorted = userTrips(userSample, tripsSample)
    let past = sortPastTrips(sorted)
    let e = sortPastDests(past, destsSample)

    expect(e).to.deep.equal([
      {
        "id": 4,
        "destination": "Cartagena, Colombia",
        "estimatedLodgingCostPerDay": 65,
        "estimatedFlightCostPerPerson": 350,
        "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "alt": "boats at a dock during the day time"
      },
      {
        "id": 26,
        "destination": "London, England",
        "estimatedLodgingCostPerDay": 100,
        "estimatedFlightCostPerPerson": 1000,
        "image": "https://images.unsplash.com/photo-1549471156-52ee71691122?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "city with bridge under night sky"
      },
      {
        "id": 40,
        "destination": "La Isla Tortuga, Costa Rica",
        "estimatedLodgingCostPerDay": 600,
        "estimatedFlightCostPerPerson": 80,
        "image": "https://images.unsplash.com/photo-1536708880921-03a9306ec47d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1336&q=80",
        "alt": "trees near seashore"
      }
    ])
  })
})

describe('sortCurrentDests', () => {
  it('should return an array of destination objects matching current trips', () => {
    let sorted = userTrips(userSample, tripsSample)
    let current = sortCurrentTrips(sorted)
    let e = sortCurrentDests(current, destsSample)

    expect(e).to.deep.equal([])
  })
})

describe('yearlyCost', () => {
  it('should return a total spent on past trips for the year 2020 including 10% agency fee', () => {
    let sorted = userTrips(userSample, tripsSample)
    let pastTrips = sortPastTrips(sorted)
    let pastDests = sortPastDests(pastTrips, destsSample)
    let e = yearlyCost(pastTrips, pastDests)

    expect(e).to.equal(12562)
  })
})

describe('getUserLogin', () => {
  it('should allow user entry if login is correct', () => {
    let userName = 'traveler30'
    let password = 'travel'
    let e = getUserLogin(userName, password)
    expect(e).to.equal('Access granted')
  })
  it('should allow different users to log in', () => {
    let userName = 'traveler25'
    let password = 'travel'
    let e = getUserLogin(userName, password)
    expect(e).to.equal('Access granted')
  })
  it('should deny entry if username is incorrect', () => {
    let userName = 'travelr30'
    let password = 'travel'
    let e = getUserLogin(userName, password)
    expect(e).to.equal('Access denied')
  })
  it('should deny entry if password is incorrect', () => {
    let userName = 'traveler30'
    let password = 'traveler'
    let e = getUserLogin(userName, password)
    expect(e).to.equal('Access denied')
  })
})

describe('createTrip', () => {
  it('should create an object to POST', () => {
    let e = createTrip('2024/03/12', '1', '1', '4', '11', tripsSample)
    console.log(tripsSample.trips.length)
    expect(e).to.deep.equal({
      "id": 204,
      "userID": 11,
      "destinationID": 4,
      "travelers": 1,
      "date": "2024/03/12",
      "duration": 1,
      "status": "pending",
      "suggestedActivities": [
        "none"
      ]
    })
  })
})

describe('estimateCost', () => {
  it('should calculate expenses for the trip with 10% agency fee', () => {
    let e = estimateCost('1', '1', '4', destsSample)
    expect(e).to.equal(456.5)
  })
})
