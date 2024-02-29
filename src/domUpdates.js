
const modalPast = document.querySelector('#modal-past')
const modalCurrent = document.querySelector('#modal-current')
const totalSpent = document.querySelector('.total-spent')
// const modalPast = document.querySelector('#modal-past')

document.querySelectorAll('.image').forEach(img => {
  img.addEventListener('click', () => {
    removeModal(img.id) 
  })
})

function removeModal(imgValue) {
  if (imgValue === 'img-past') {
    modalPast.classList.remove('hidden')
  } 
  if (imgValue === 'img-current') {
    modalCurrent.classList.remove('hidden')
  }
  console.log('trip image value', imgValue)
}

function renderTotalSpent(total) {
  totalSpent.innerText = total
}

export {
  renderTotalSpent
}