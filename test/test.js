/* eslint-disable max-len */
import chai from 'chai';
const expect = chai.expect;

import tripsSample from './sample-trips';
import { userTrips, sortPastTrips, sortCurrentTrips } from './script-test';
import userSample from './sample-user';

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

describe('', () => {
  it.skip('', () => {

  })
})

describe('', () => {
  it.skip('', () => {

  })
})
