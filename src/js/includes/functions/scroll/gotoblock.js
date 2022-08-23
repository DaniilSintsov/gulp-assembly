// Проверка мобильного браузера
// Получение хеша в адресе сайта
import {menuClose} from '../burgerMenu.js'
// Подключение дополнения для увеличения возможностей
// Документация: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from 'smooth-scroll'
//============================================================

// Модуль плавной прокрутки к блоку
export let gotoBlock = (
  targetBlock,
  noHeader = false,
  speed = 500,
  offsetTop = 0
) => {
  const targetBlockElement = document.querySelector(targetBlock)
  if (targetBlockElement) {
    let headerItem = ''
    let headerItemHeight = 0
    if (noHeader) {
      headerItem = 'header.header'
      headerItemHeight = document.querySelector(headerItem).offsetHeight
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    }
    // Закрываем меню, если оно открыто
    document.documentElement.classList.contains('menu-open')
      ? menuClose()
      : null

    if (typeof SmoothScroll !== 'undefined') {
      // Прокрутка с использованием дополнения
      new SmoothScroll().animateScroll(targetBlockElement, '', options)
    } else {
      // Прокрутка стандартными средствами
      let targetBlockElementPosition =
        targetBlockElement.getBoundingClientRect().top + scrollY
      targetBlockElementPosition = headerItemHeight
        ? targetBlockElementPosition - headerItemHeight
        : targetBlockElementPosition
      targetBlockElementPosition = offsetTop
        ? targetBlockElementPosition - offsetTop
        : targetBlockElementPosition
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: 'smooth',
      })
    }
  } else {
    console.log(`Блок ${targetBlock} отсутствует`)
  }
}
