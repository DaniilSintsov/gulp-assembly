// Модуль работы со спойлерами
/*
 Структура HTML
 ------------------------------------------------------------------------------------------------------------------------
 Пример блока с двумя спойлерами:
 <!--
 <div data-spollers class="spollers">
 <div class="spollers__item">
 <button type="button" data-spoller class="spollers__title">
 Заголовок спойлера
 </button>
 <div class="spollers__body">Контент спойлера</div>
 </div>
 </div>
 -->
 В момент инициализации (включения) функционала спойлера, контент
 будет скрыт, а к элементу с атрибутом data-spollers будет добавлен
 класс _spoller-init
 ------------------------------------------------------------------------------------------------------------------------

 Отключение/включение функционала на определенной ширине экрана
 ------------------------------------------------------------------------------------------------------------------------
 Для того, чтобы отключить/включить функционал спойлера на
 определенной ширине экрана, необходимо для атрибута data-spollers
 через запятую указать нужную ширину экрана а также тип:
 max (по умолчанию) - функционал включится на ширине меньшей чем указанная
 min - функционал включится на ширине большей чем указанная
 <!--
 <div data-spollers="768,min" class="spollers">
 ...
 </div>
 -->
 ------------------------------------------------------------------------------------------------------------------------

 Включение режима "аккордеон"
 ------------------------------------------------------------------------------------------------------------------------
 Для того, чтобы включить режим «аккордеон», необходимо для
 элемента с атрибутом data-spollers добавить атрибут data-one-spoller:
 <!--
 <div data-spollers data-one-spoller class="spollers">
 ...
 </div>
 -->
 Теперь, при открытии спойлера, другой открытый спойлер в блоке будет закрываться
 ------------------------------------------------------------------------------------------------------------------------

 Управление скоростью анимации
 ------------------------------------------------------------------------------------------------------------------------
 Для того, чтобы управлять временем анимации открытия/закрытия
 спойлера, необходимо для элемента с атрибутом data-spollers добавить
 атрибут data-spollers-speed, а в качестве значения указать время
 анимации в миллисекундах (по умолчанию 500).
 <!--
 <div data-spollers data-spollers-speed="1000" class="spollers">
 ...
 </div>
 -->
 ------------------------------------------------------------------------------------------------------------------------
 */

// Подключение функционала
import {
  dataMediaQueries,
  _slideToggle,
  _slideUp
} from './services/services.js';
// Подключение файла стилей
// Базовые стили подключаются в src/scss/base/base.scss
// Файл базовых стилей: src/scss/base/spollers.scss

// Модуль работы со спойлерами
export function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Получение обычных спойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (
      item,
      index,
      self
    ) {
      return !item.dataset.spollers.split(',')[0];
    });
    // Инициализация обычных спойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener('click', setSpollerAction);
        } else {
          spollersBlock.classList.remove('_spoller-init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener('click', setSpollerAction);
        }
      });
    }

    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(
          item => item.closest('[data-spollers]') === spollersBlock
        );
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_spoller-active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed
          ? parseInt(spollersBlock.dataset.spollersSpeed)
          : 500;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (
            oneSpoller &&
            !spollerTitle.classList.contains('_spoller-active')
          ) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_spoller-active');
          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }
        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector(
        '[data-spoller]._spoller-active'
      );
      const spollerSpeed = spollersBlock.dataset.spollersSpeed
        ? parseInt(spollersBlock.dataset.spollersSpeed)
        : 500;
      if (
        spollerActiveTitle &&
        !spollersBlock.querySelectorAll('._slide').length
      ) {
        spollerActiveTitle.classList.remove('_spoller-active');
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }

    // Закрытие при клике вне спойлера
    const spollersClose = document.querySelectorAll('[data-spoller-close]');
    if (spollersClose.length) {
      document.addEventListener('click', function (e) {
        const el = e.target;
        if (!el.closest('[data-spollers]')) {
          spollersClose.forEach(spollerClose => {
            const spollersBlock = spollerClose.closest('[data-spollers]');
            const spollerSpeed = spollersBlock.dataset.spollersSpeed
              ? parseInt(spollersBlock.dataset.spollersSpeed)
              : 500;
            spollerClose.classList.remove('_spoller-active');
            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          });
        }
      });
    }
  }
}
