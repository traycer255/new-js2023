const overlayOrder = document.querySelector('.overlay_order');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const btnsOrder = document.querySelectorAll('.product__button_order');
const headerConsultation = document.querySelector('.header__consultation')
const order = overlayOrder.querySelector('.modal__order')
const modalTitle = modal.querySelector('.modal__title')

// for (let i = 0; i < btnsOrder.length; i++) {
//   btnsOrder[i].addEventListener('click', () => {
//     overlay.classList.add('overlay_active')
//   })

// }

// modalClose.addEventListener('click', () => {
//   overlay.classList.remove('overlay_active')
// })

headerConsultation.addEventListener('click', () => {
  modalTitle.textContent = 'Оставьте заявку на консультацию и мы вам перезвоним в течении 10 минут'
  overlayOrder.classList.add('overlay_active')
})

btnsOrder.forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = 'Оформить заказ'
    overlayOrder.classList.add('overlay_active')
    order.value = btn.dataset.order

  })
})

overlayOrder.addEventListener('click', event => {
  if (event.target === overlayOrder || event.target.closest('.modal__close')) {
    overlayOrder.classList.remove('overlay_active')
  }
})



