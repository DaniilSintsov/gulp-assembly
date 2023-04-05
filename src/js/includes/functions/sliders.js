// Слайдер swiper
/*
 Документация слайдера: https://swiperjs.com/swiper-api
 */

// Подключаем слайдер Swiper из node_modules
import Swiper, { EffectFade, Navigation } from 'swiper';
/*
 При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
 Пример: { Navigation, Autoplay }
 Основные модули слайдера:
 Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation
 Подробнее смотри https://swiperjs.com/swiper-api
 */
// Стили Swiper
// Базовые стили подключаются в src/scss/base/base.scss
// Файл базовых стилей: src/scss/base/swiper.scss

// Инициализация слайдеров
function initSliders() {
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на странице
  if (document.querySelector('.goods-offer-slider__slider')) {
    // Указываем класс нужного слайдера
    // Создаем слайдер
    new Swiper('.goods-offer-slider__slider', {
      // Указываем класс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 6,
      slideToClickedSlide: true,
      spaceBetween: 30,
      autoHeight: true,
      speed: 500,

      //touchRatio: 0,
      //simulateTouch: false,
      // loop: true,
      //preloadImages: false,
      //lazy: true,

      /*
       // Эффекты
       effect: 'fade',
       autoplay: {
       delay: 3000,
       disableOnInteraction: false,
       },
       */

      // Пагинация
      /*
       pagination: {
       el: '.swiper-pagination',
       clickable: true,
       },
       */

      // Скроллбар
      /*
       scrollbar: {
       el: '.swiper-scrollbar',
       draggable: true,
       },
       */

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.goods-offer-slider__button-prev',
        nextEl: '.goods-offer-slider__button-next'
      },

      // Брейк-пойнты
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        530: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        710: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        910: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1100: {
          slidesPerView: 5,
          spaceBetween: 30
        },
        1300: {
          slidesPerView: 6,
          spaceBetween: 30
        }
      },
      // События
      on: {
        slideChangeTransitionEnd: function () {
          const activeSlide = document.querySelector(
            '.goods-offer-slider__slide.swiper-slide-active'
          );
          const activeTab = document.querySelector(
            '.goods-offer-slider__slide._tab-active'
          );

          if (activeTab) {
            activeTab.classList.remove('_tab-active');
          }
          if (activeSlide) {
            activeSlide.classList.add('_tab-active');
          }
        }
      }
    });
  }

  if (document.querySelector('.main-offer-slider__slider')) {
    new Swiper('.main-offer-slider__slider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 500,
      simulateTouch: false
    });
  }

  if (document.querySelector('.products-offer-slider__slider')) {
    new Swiper('.products-offer-slider__slider', {
      modules: [Navigation, EffectFade],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 500,
      nested: true,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        prevEl: '.products-offer-slider__button-prev',
        nextEl: '.products-offer-slider__button-next'
      },
      touchRatio: 2
    });
  }
}

// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true
        }
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener('load', function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll()
});
