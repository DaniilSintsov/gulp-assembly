// Блокировка прокрутки и скачка
export let bodyLockStatus = true

export let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay)
  } else {
    bodyLock(delay)
  }
}

export let bodyUnlock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    let lockPadding = document.querySelectorAll('[data-lp]')
    setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index]
        el.style.paddingRight = '0px'
      }
      body.style.paddingRight = '0px'
      document.documentElement.classList.remove('lock')
    }, delay)
    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}

export let bodyLock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    let lockPadding = document.querySelectorAll('[data-lp]')
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index]
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px'
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    document.documentElement.classList.add('lock')

    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}

//=======================================================================================================================
// Проверка мобильного браузера
export let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  },
}
