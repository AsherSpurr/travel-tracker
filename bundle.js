/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allDests: () => (/* binding */ allDests),
/* harmony export */   allTrips: () => (/* binding */ allTrips),
/* harmony export */   createTrip: () => (/* binding */ createTrip),
/* harmony export */   currentDests: () => (/* binding */ currentDests),
/* harmony export */   estimateCost: () => (/* binding */ estimateCost),
/* harmony export */   getUserLogin: () => (/* binding */ getUserLogin),
/* harmony export */   handleAllData: () => (/* binding */ handleAllData),
/* harmony export */   login: () => (/* reexport safe */ _domUpdates__WEBPACK_IMPORTED_MODULE_1__.login),
/* harmony export */   sortCurrentDests: () => (/* binding */ sortCurrentDests),
/* harmony export */   sortCurrentTrips: () => (/* binding */ sortCurrentTrips),
/* harmony export */   sortPastDests: () => (/* binding */ sortPastDests),
/* harmony export */   sortPastTrips: () => (/* binding */ sortPastTrips),
/* harmony export */   userId: () => (/* binding */ userId),
/* harmony export */   userTrips: () => (/* binding */ userTrips)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _images_loc1_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _images_loc2_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _images_loc3_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);
/* eslint-disable max-len */

// eslint-disable-next-line max-len









let userId;
let allTrips;
let allDests;
let pastTrips;
let currentTrips;

function handleAllData(userData, tripsData, destData) {
  userTrips(userData, tripsData)
  sortPastDests(pastTrips, destData)
  sortCurrentDests(currentTrips, destData)
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderTripSelect)(destData)
  allTrips = tripsData;
  allDests = destData;
}

function getUserLogin(userName, password) {
  let userID = userName.replace('traveler', '')
  if (userName !== 'traveler' + userID || password !== 'travel') {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.loginError)()
  } else {
    sessionStorage.setItem('user', userID)
    ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.getData)(userID)
  }
  userId = sessionStorage.getItem('user')
}
userId = sessionStorage.getItem('user')

function userTrips(userData, tripsData) {
  let trips = tripsData.trips
  let sortedTrips = trips.filter((trip) => {
    return userData.id === trip.userID
  })
  sortPastTrips(sortedTrips)
  sortCurrentTrips(sortedTrips)
  return sortedTrips
}

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
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderPastTrips)(pastTrips, pastDests)
  return pastDests
}

let currentDests;
function sortCurrentDests(currentTrips, dests) {
  let allDests = dests.destinations
  let tripIDs = currentTrips.map((trip) => {
    return trip.destinationID
  })
  currentDests = allDests.filter((dest) => {
    return tripIDs.includes(dest.id)
  })
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderCurrentTrips)(currentTrips, currentDests)
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
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderTotalSpent)(totalCost)
  return totalCost
}

function createTrip(dateValue, durationValue, travelersValue, destIDValue) {
  let durationNum = Number(durationValue)
  let travelerNum = Number(travelersValue)
  let destIDNum = Number(destIDValue)
  let userIdNum = Number(userId)
  let targetIndex = allTrips.trips.length + 1
  let formatDate = dateValue.replaceAll('-', '/')

  let trip = {
    id: targetIndex,
    userID: userIdNum,
    destinationID: destIDNum,
    travelers: travelerNum,
    date: formatDate,
    duration: durationNum,
    status: 'pending',
    suggestedActivities: [],
  }
  ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__.postTrip)(trip)
}

function estimateCost(duration, travelers, destID, destsData) {
  let dests = destsData.destinations
  let destNum = Number(destID)
  let targetDest = dests.find((dest) => {
    return destNum === dest.id
  })
  let totalCost = 0;
  let flightCost = 0;
  let lodgingCost = 0;
  if (targetDest) {
    flightCost += targetDest.estimatedFlightCostPerPerson * travelers
    lodgingCost += targetDest.estimatedLodgingCostPerDay * duration
    let agencyFee = (flightCost + lodgingCost) * .10
    totalCost += flightCost + lodgingCost + agencyFee
  }
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderFlightCost)(flightCost)
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderLodgingCost)(lodgingCost)
  ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderEstimatedCost)(totalCost)
  return totalCost
}

//  deleteTrip('208')




/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteTrip: () => (/* binding */ deleteTrip),
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   postTrip: () => (/* binding */ postTrip)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* eslint-disable max-len */





function getData(userID) {
  const user = fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderFetchError)()
    })

  const trips = fetch('http://localhost:3001/api/v1/trips')
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderFetchError)()
    })

  const destinations = fetch('http://localhost:3001/api/v1/destinations') 
    .then(resp => resp.json())
    .catch(err => () => {
      console.log(err)
      ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderFetchError)()
    })

  Promise.all([user, trips, destinations])
    .then((data) => {
      let [user, trips, destinations] = data
      ;(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.handleAllData)(user, trips, destinations)
      ;(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.login)()
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
      if (!resp.ok) {
        (0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderPlanError)()
      } else {
        resp.json()
        ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_1__.renderSuccessMessage)()
        const modalContentCurrent = document.querySelector('#modal-content-current')
        const modalContentPast = document.querySelector('#modal-content-past')
        modalContentPast.innerHTML = ''
        modalContentCurrent.innerHTML = ''
        getData(_scripts__WEBPACK_IMPORTED_MODULE_0__.userId)
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



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   loginError: () => (/* binding */ loginError),
/* harmony export */   renderCurrentTrips: () => (/* binding */ renderCurrentTrips),
/* harmony export */   renderEstimatedCost: () => (/* binding */ renderEstimatedCost),
/* harmony export */   renderFetchError: () => (/* binding */ renderFetchError),
/* harmony export */   renderFlightCost: () => (/* binding */ renderFlightCost),
/* harmony export */   renderLodgingCost: () => (/* binding */ renderLodgingCost),
/* harmony export */   renderPastTrips: () => (/* binding */ renderPastTrips),
/* harmony export */   renderPlanError: () => (/* binding */ renderPlanError),
/* harmony export */   renderSuccessMessage: () => (/* binding */ renderSuccessMessage),
/* harmony export */   renderTotalSpent: () => (/* binding */ renderTotalSpent),
/* harmony export */   renderTripSelect: () => (/* binding */ renderTripSelect)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* eslint-disable max-len */



const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')

const totalSpent = document.querySelector('.total-spent')

const inputs = document.querySelectorAll('input')
const options = document.querySelector('.trip-select')
const buttonPlan = document.querySelector('#button-plan')
const formContainer = document.querySelector('.plan-trip-cont')
const mainTop = document.querySelector('.section-main-top')
const mainBottom = document.querySelector('.section-main-bottom')
const buttonHome = document.querySelector('#button-home')
const overlay = document.querySelector('.overlay')

const estimatedCost = document.querySelector('#estimated-cost')
const buttonEstimate = document.querySelector('.estimate-cost')
const flightCost = document.querySelector('#estimated-flight')
const lodgingCost = document.querySelector('#estimated-lodging')

const mainPage = document.querySelector('main')
const header = document.querySelector('header')
const loginPage = document.querySelector('.login-page')
const buttonLogOut = document.querySelector('#button-logout')
const errorLogin = document.querySelector('#error-login')
const bodySelect = document.querySelector('body')
const buttonDyslexic = document.querySelector('#button-dyslexia')
const buttons = document.querySelectorAll('button')
const feedbackMessage = document.querySelector('.success')
const tripForm = document.querySelector('.trip-form')
const loginForm = document.querySelector('.form-login')


window.addEventListener('load', () => {
  if (sessionStorage.getItem('user')) {
    let user = sessionStorage.getItem('user')
    ;(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getData)(user)
  }
})

buttonLogOut.addEventListener('click', logout)

loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  grabLogin()
})

buttonEstimate.addEventListener('click', renderEstimate)

buttonHome.addEventListener('click', () => {
  unhideMainPage()
  hideForm()
})

buttonPlan.addEventListener('click', () => {
  hideMainPage()
  unhideForm()
})

options.addEventListener('change', checkIfSelected)

tripForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let date;
  let duration;
  let travelers;
  let destinationID = checkIfSelected()
  inputs.forEach((input) => {
    if (input.id === 'date') {
      date = input.value
    }
    if (input.id === 'duration') {
      duration = input.value
    }
    if (input.id === 'travelers') {
      travelers = input.value
    } else {
      feedbackMessage.innerText = "Please fill out all parts of the form"
    }
  })
  ;(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.createTrip)(date, duration, travelers, destinationID)
})

document.querySelectorAll('.button-modal').forEach((button) => {
  button.addEventListener('click', () => {
    hideModal(button.id)
  })
})

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('click', () => {
    renderModal(img.id)
  })
  img.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      renderModal(img.id)
    }
  })
})

buttonDyslexic.addEventListener('click', () => {
  bodySelect.classList.toggle('dyslexia-font')
  buttons.forEach((button) => {
    button.classList.toggle('dyslexia-font')
  })
})

function checkIfSelected() {
  let x = document.querySelector('.trip-select').value
  return x
}

function grabLogin() {
  let userName;
  let password;
  inputs.forEach((input) => {
    if (input.id === 'userName') {
      userName = input.value
    }
    if (input.id === 'password') {
      password = input.value
    }
  })
  ;(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.getUserLogin)(userName, password)
}

function login() {
  mainPage.classList.remove('hidden')
  header.classList.remove('hidden')
  loginPage.classList.add('hidden')
}

function loginError() {
  errorLogin.innerText = 'Username or Password incorrect'
  setTimeout(removeError, 3000)
}

function removeError() {
  errorLogin.innerText = ''
}

function logout() {
  document.querySelector('.form-login').reset()
  sessionStorage.clear('user')
  location.reload()
}

function renderModal(imgValue) {
  if (imgValue === 'img-past') {
    modalPast.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }
  if (imgValue === 'img-current') {
    modalCurrent.classList.remove('hidden')
    overlay.classList.remove('hidden')
  }
}

function hideModal(buttonValue) {
  if (buttonValue === 'modal-button-past') {
    modalPast.classList.add('hidden')
    overlay.classList.add('hidden')
  }
  if (buttonValue === 'modal-button-current') {
    modalCurrent.classList.add('hidden')
    overlay.classList.add('hidden')
  }
}

function renderTotalSpent(total) {
  totalSpent.innerText = `$${total}`
}

function renderPastTrips(trips, dests) {
  const modalContent = document.querySelector('#modal-content-past')
  let counter = 0;
  trips.forEach((trip) => {
    counter++
    let date = trip.date
    let dateRev = date.split('/').reverse().join('/')
    let targetDest = dests.find((dest) => {
      return dest.id === trip.destinationID
    })
    let lodging = targetDest.estimatedLodgingCostPerDay * trip.duration
    let flightCost = targetDest.estimatedFlightCostPerPerson * trip.travelers
    modalContent.innerHTML += `
    <div class="card-cont" >
      <div class="card-inner">
        <div class="card-front">
          <img class="modal-img" id="${counter}" src="${targetDest.image}" alt="${targetDest.alt}" height="250px" width="250px"/>
          <figcaption>${targetDest.destination}</figcaption>
        </div>
        <div class="card-back">
          <p class="modal-date">${dateRev}</P>
          <p>Length of stay: ${trip.duration} days</p>
          <p>Lodging costs: $${lodging}</p>
          <p>Flight costs: $${flightCost}</p>
        </div>
      </div>
    </div>
 `
  })
}

function renderCurrentTrips(trips, dests) {
  const modalContentCurrent = document.querySelector('#modal-content-current')
  let counter = 0;
  trips.forEach((trip) => {
    counter++
    let date = trip.date
    let dateRev = date.split('/').reverse().join('/')
    let targetDest = dests.find((dest) => {
      return dest.id === trip.destinationID
    })
    let lodging = targetDest.estimatedLodgingCostPerDay * trip.duration
    let flightCost = targetDest.estimatedFlightCostPerPerson * trip.travelers
    modalContentCurrent.innerHTML += `
    <div class="card-cont" >
      <div class="card-inner">
        <div class="card-front">
          <img class="modal-img" id="${counter}" src="${targetDest.image}" alt="${targetDest.alt}" height="250px" width="250px"/>
          <figcaption>${targetDest.destination}</figcaption>
        </div>
        <div class="card-back">
          <p class="modal-date">${dateRev}</P>
          <p>Length of stay: ${trip.duration} days</p>
          <p>Lodging costs: $${lodging}</p>
          <p>Flight costs: $${flightCost}</p>
        </div>
      </div>
    </div>
 `
  })
}

function renderTripSelect(dests) {
  const tripSelect = document.querySelector('.trip-select')
  let allDests = dests.destinations
  allDests.forEach((dest) => {
    tripSelect.innerHTML += `
   <option class="dest" id="destination" value="${dest.id}">${dest.destination}</option>
   `
  })
}

function renderEstimate() {
  let duration;
  let travelers;
  let destinationID = checkIfSelected()
  inputs.forEach((input) => {
    if (input.id === 'duration') {
      duration = input.value
    }
    if (input.id === 'travelers') {
      travelers = input.value
    }
  })
  ;(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.estimateCost)(duration, travelers, destinationID, _scripts__WEBPACK_IMPORTED_MODULE_0__.allDests)
}

function renderSuccessMessage() {
  feedbackMessage.innerText = "Trip added successfully"
  setTimeout(removeSuccessMessage, 6000)
}

function removeSuccessMessage() {
  feedbackMessage.innerText = ""
}

function renderEstimatedCost(num) {
  estimatedCost.innerText = `$${num}`
}

function renderFlightCost(num) {
  flightCost.innerText = `$${num}`
}

function renderLodgingCost(num) {
  lodgingCost.innerText = `$${num}`
}

function hideForm() {
  formContainer.classList.add('hidden')
}

function hideMainPage() {
  mainTop.classList.add('hidden')
  mainBottom.classList.add('hidden')
}

function unhideForm() {
  formContainer.classList.remove('hidden')
}

function unhideMainPage() {
  mainTop.classList.remove('hidden')
  mainBottom.classList.remove('hidden')
}

function renderPlanError() {
  feedbackMessage.innerText = `Sorry an unexpected error has occured.`
}

function renderFetchError() {
  errorLogin.innerText = 'Sorry an unexpected issue has occured fetching the web information.'
}





/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 4 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 5 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 6 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 8 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 9 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 10 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody{\n  background: white;\n  overflow-y: scroll;\n  margin: 0;\n  min-width: 100%;\n  min-height: 100vh;\n  font-family: 'Enriqueta', serif;\n}\n\n.dyslexia-font {\n  font-family: 'lexend', sans-serif;\n}\n\n#button-dyslexia {\n  font-size: .8em;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: .5px rgba(0, 0, 0, 0.5) solid;\n  width: 100%;\n}\n\nh1 {\n  margin-left: 1.5em;\n}\n\nbutton {\n  font-family: 'Enriqueta', serif;\n}\n\n#button-login,\n.button-nav {\n  border-radius: 30px;\n  min-height: 60px;\n  min-width: 80px;\n  font-size: 1.2rem;\n  font-weight: 800;\n  border-style: none;\n  background: none;\n}\n\n.button-form,\n.estimate-cost {\n  border-radius: 15px;\n  border-style: none;\n  min-height: 50px;\n  min-width: none;\n  font-size: 1.2rem;\n  background: #000;\n  color: white;\n  margin-top: 10px;\n}\n\n.button-nav:hover {\n  background:  rgba(226, 185, 185, .15);\n}\n\n#button-login,\n#button-logout {\n  background: #000;\n  color: white;\n  font-weight: 300;\n  min-width: 90px;\n}\n\n#button-login:hover,\n#button-logout:hover,\n.button-form:hover,\n.estimate-cost:hover {\n  background: rgba(49, 28, 28, 0.8);\n}\n\n#button-logout {\n  margin-right: 4em;\n}\n\n#button-login {\n  margin-left: 3em;\n}\n\n.margin-right {\n  margin-right: 5em;\n}\n\n.overlay {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  backdrop-filter: blur(3px);\n  background:rgba(0, 0, 0, 0.5);\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.login-page {\n  height: 100vh;\n  width: 100%;\n  background-color: rgb(226, 185, 185, .5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-cont {\n  background-color: white;\n  min-height: 50vh;\n  min-width: 30vw;\n  border-radius: 15px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.input-cont {\n  margin-bottom: 2em;\n}\n\n.form-login {\n  font-size: larger;\n}\n\n#userName,\n#password {\n  min-height: 25px;\n  min-width: 200px;\n  border-radius: 5px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px .5px .5px rgba(0, 0, 0, 0.2);\n}\n\n.plan-trip-cont {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  padding-top: 5em;\n  justify-content: center;\n}\n\n.trip-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#date,\n#duration,\n#travelers,\nselect {\n  margin-right: 10em;\n  min-height: 25px;\n  min-width: 400px;\n  border-radius: 5px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px .5px .5px rgba(0, 0, 0, 0.2);\n}\n\nlabel {\n  font-size: 1.5rem;\n}\n\ndd {\n  font-size: x-large;\n}\n\ndt {\n  margin-top: 10px;\n  font-weight: 500;\n}\n\ndl {\n  border: 3px rgba(49, 28, 28, 0.5) dashed;\n  border-radius: 10px;\n  width: 120%;\n  height: 30%;\n  padding-left: 1em;\n}\n\n.section-main-top {\n  min-width: 100%;\n  min-height: 30vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#article-main-top {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nh2 {\n  margin-bottom: 0;\n  font-size: 4rem;\n}\n\n.total-spent {\n  font-size: 6rem;\n  margin: 0;\n}\n\n.section-main-bottom {\n  display: flex;\n  justify-content: center;\n  margin-top: 5em;\n}\n\n#article-main-bottom {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  margin-bottom: 5em;\n  background: rgb(226, 185, 185, .3);\n  box-shadow: .5px .5px 4px rgba(0, 0, 0, 0.2);\n}\n\n.article-flex {\n  display: flex;\n  flex-direction: row;\n}\n\nh3 {\n  font-size: xx-large;\n  margin-right: 65%;\n}\n\nh4 {\n  font-size: 1.3rem;\n  font-weight: 800;\n}\n\n.image {\n  display: block;\n  height: 300px;\n  width: 350px;\n  border-radius: 15px;\n}\n\n.image:hover {\n  cursor: pointer;\n  opacity: 50%;\n}\n\n.flex {\n  display: flex;\n  justify-content: end;\n  margin-right: 10px;\n  margin-top: 10px;\n}\n\n.modal-content {\n  display: grid;\n  grid-template-columns: repeat(3, 2fr);\n  grid-row-gap: 50px;\n  justify-items: center;\n  padding-top: 80px;\n  padding-bottom: 80px;\n}\n\n.modal-img {\n  border-radius: 10px;\n}\n\n.modal-date {\n  border-radius: 15px;\n  border: 1px white solid;\n  max-width: fit-content;\n  padding-left: 1em;\n  padding-right: 1em;\n  margin-left: 1em;\n}\n\nfigcaption {\n  font-weight: 800;\n}\n\n.button-modal {\n  height: 5.5vh;\n  width: 3.1vw;\n  border-radius: 25px;\n  border: none;\n  font-size: x-large;\n  position: absolute;\n}\n\n.button-modal:hover {\n  background: rgba(0, 0, 0, 0.2);\n}\n\n.modal {\n  width: 70%;\n  height: 60%;\n  display: grid;\n  gap: 0.4rem;\n  overflow-y: scroll;\n  min-height: 250px;\n  position: absolute;\n  left: 15%;\n  top: 15%;\n  background-color: white;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n  z-index: 2;\n}\n\n.modal .flex-column {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.overlay-text {\n  font-size: 1.2em;\n  font-weight: 800;\n} \n\n.card-back {\n  top: 0;\n  left: 0;\n  width: 250px;\n  height: 250px;\n  border-radius: 15px;\n  background-color: rgb(108, 193, 208);\n  color: white;\n  font-weight: 500;\n  transform: rotateY(180deg);\n}\n\n.card-cont {\n  display: flex;\n  justify-content: center;\n  width: 250px;\n  height: 250px;\n}\n\n.card-inner {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  text-align: baseline;\n  text-indent: 1em;\n  transition: transform 0.8s;\n  transform-style: preserve-3d;\n}\n\n.card-cont:hover .card-inner {\n  transform: rotateY(180deg);\n}\n\n.card-front, .card-back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n\n.error {\n  color: rgb(135, 0, 0);\n  font-size: xx-large;\n}\n\n.success {\n  font-size: 2em;\n  margin-left: 7em;\n  margin-top: 4em;\n}\n\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["\nbody{\n  background: white;\n  overflow-y: scroll;\n  margin: 0;\n  min-width: 100%;\n  min-height: 100vh;\n  font-family: 'Enriqueta', serif;\n}\n\n.dyslexia-font {\n  font-family: 'lexend', sans-serif;\n}\n\n#button-dyslexia {\n  font-size: .8em;\n}\n\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: .5px rgba(0, 0, 0, 0.5) solid;\n  width: 100%;\n}\n\nh1 {\n  margin-left: 1.5em;\n}\n\nbutton {\n  font-family: 'Enriqueta', serif;\n}\n\n#button-login,\n.button-nav {\n  border-radius: 30px;\n  min-height: 60px;\n  min-width: 80px;\n  font-size: 1.2rem;\n  font-weight: 800;\n  border-style: none;\n  background: none;\n}\n\n.button-form,\n.estimate-cost {\n  border-radius: 15px;\n  border-style: none;\n  min-height: 50px;\n  min-width: none;\n  font-size: 1.2rem;\n  background: #000;\n  color: white;\n  margin-top: 10px;\n}\n\n.button-nav:hover {\n  background:  rgba(226, 185, 185, .15);\n}\n\n#button-login,\n#button-logout {\n  background: #000;\n  color: white;\n  font-weight: 300;\n  min-width: 90px;\n}\n\n#button-login:hover,\n#button-logout:hover,\n.button-form:hover,\n.estimate-cost:hover {\n  background: rgba(49, 28, 28, 0.8);\n}\n\n#button-logout {\n  margin-right: 4em;\n}\n\n#button-login {\n  margin-left: 3em;\n}\n\n.margin-right {\n  margin-right: 5em;\n}\n\n.overlay {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  backdrop-filter: blur(3px);\n  background:rgba(0, 0, 0, 0.5);\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.login-page {\n  height: 100vh;\n  width: 100%;\n  background-color: rgb(226, 185, 185, .5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-cont {\n  background-color: white;\n  min-height: 50vh;\n  min-width: 30vw;\n  border-radius: 15px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.input-cont {\n  margin-bottom: 2em;\n}\n\n.form-login {\n  font-size: larger;\n}\n\n#userName,\n#password {\n  min-height: 25px;\n  min-width: 200px;\n  border-radius: 5px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px .5px .5px rgba(0, 0, 0, 0.2);\n}\n\n.plan-trip-cont {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  padding-top: 5em;\n  justify-content: center;\n}\n\n.trip-form {\n  display: flex;\n  flex-direction: column;\n}\n\n#date,\n#duration,\n#travelers,\nselect {\n  margin-right: 10em;\n  min-height: 25px;\n  min-width: 400px;\n  border-radius: 5px;\n  border: 1px rgba(0, 0, 0, 0.3) solid;\n  box-shadow: inset 0px 0px .5px .5px rgba(0, 0, 0, 0.2);\n}\n\nlabel {\n  font-size: 1.5rem;\n}\n\ndd {\n  font-size: x-large;\n}\n\ndt {\n  margin-top: 10px;\n  font-weight: 500;\n}\n\ndl {\n  border: 3px rgba(49, 28, 28, 0.5) dashed;\n  border-radius: 10px;\n  width: 120%;\n  height: 30%;\n  padding-left: 1em;\n}\n\n.section-main-top {\n  min-width: 100%;\n  min-height: 30vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n#article-main-top {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nh2 {\n  margin-bottom: 0;\n  font-size: 4rem;\n}\n\n.total-spent {\n  font-size: 6rem;\n  margin: 0;\n}\n\n.section-main-bottom {\n  display: flex;\n  justify-content: center;\n  margin-top: 5em;\n}\n\n#article-main-bottom {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  margin-bottom: 5em;\n  background: rgb(226, 185, 185, .3);\n  box-shadow: .5px .5px 4px rgba(0, 0, 0, 0.2);\n}\n\n.article-flex {\n  display: flex;\n  flex-direction: row;\n}\n\nh3 {\n  font-size: xx-large;\n  margin-right: 65%;\n}\n\nh4 {\n  font-size: 1.3rem;\n  font-weight: 800;\n}\n\n.image {\n  display: block;\n  height: 300px;\n  width: 350px;\n  border-radius: 15px;\n}\n\n.image:hover {\n  cursor: pointer;\n  opacity: 50%;\n}\n\n.flex {\n  display: flex;\n  justify-content: end;\n  margin-right: 10px;\n  margin-top: 10px;\n}\n\n.modal-content {\n  display: grid;\n  grid-template-columns: repeat(3, 2fr);\n  grid-row-gap: 50px;\n  justify-items: center;\n  padding-top: 80px;\n  padding-bottom: 80px;\n}\n\n.modal-img {\n  border-radius: 10px;\n}\n\n.modal-date {\n  border-radius: 15px;\n  border: 1px white solid;\n  max-width: fit-content;\n  padding-left: 1em;\n  padding-right: 1em;\n  margin-left: 1em;\n}\n\nfigcaption {\n  font-weight: 800;\n}\n\n.button-modal {\n  height: 5.5vh;\n  width: 3.1vw;\n  border-radius: 25px;\n  border: none;\n  font-size: x-large;\n  position: absolute;\n}\n\n.button-modal:hover {\n  background: rgba(0, 0, 0, 0.2);\n}\n\n.modal {\n  width: 70%;\n  height: 60%;\n  display: grid;\n  gap: 0.4rem;\n  overflow-y: scroll;\n  min-height: 250px;\n  position: absolute;\n  left: 15%;\n  top: 15%;\n  background-color: white;\n  border: 1px solid #ddd;\n  border-radius: 15px;\n  z-index: 2;\n}\n\n.modal .flex-column {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.overlay-text {\n  font-size: 1.2em;\n  font-weight: 800;\n} \n\n.card-back {\n  top: 0;\n  left: 0;\n  width: 250px;\n  height: 250px;\n  border-radius: 15px;\n  background-color: rgb(108, 193, 208);\n  color: white;\n  font-weight: 500;\n  transform: rotateY(180deg);\n}\n\n.card-cont {\n  display: flex;\n  justify-content: center;\n  width: 250px;\n  height: 250px;\n}\n\n.card-inner {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  text-align: baseline;\n  text-indent: 1em;\n  transition: transform 0.8s;\n  transform-style: preserve-3d;\n}\n\n.card-cont:hover .card-inner {\n  transform: rotateY(180deg);\n}\n\n.card-front, .card-back {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n\n.error {\n  color: rgb(135, 0, 0);\n  font-size: xx-large;\n}\n\n.success {\n  font-size: 2em;\n  margin-left: 7em;\n  margin-top: 4em;\n}\n\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 12 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/loc1.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/loc2.jpg");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/loc3.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map