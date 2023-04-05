// Табы (вкладки)
/*
 Структура HTML
 ------------------------------------------------------------------------------------------------------------------------
 Пример блока с тремя табами:
 <!--
 <div data-tabs class="tabs">
 <nav data-tabs-titles class="tabs__navigation">
 <button type="button" class="tabs__title _tab-active">Таб №1</button>
 <button type="button" class="tabs__title">Таб №2</button>
 <button type="button" class="tabs__title">Таб №3</button>
 </nav>
 <div data-tabs-body class="tabs__content">
 <div class="tabs__body">Содержимое первого таба</div>
 <div class="tabs__body">Содержимое второго таба</div>
 <div class="tabs__body">Содержимое третьего таба</div>
 </div>
 </div>
 -->
 Добавление класса _tab-active для заголовка таба сделает таб активным (открытым)
 ------------------------------------------------------------------------------------------------------------------------

 Превращение табов в спойлеры
 ------------------------------------------------------------------------------------------------------------------------
 Для того, чтобы табы превращались в спойлеры, необходимо для
 элемента с атрибутом data-tabs указать значение ширины экрана ниже
 которой произойдет превращение:
 <!--
 <div data-tabs="768" class="tabs">
 ...
 </div>
 -->
 В момент превращения, к объекту с атрибутом data-tabs добавится
 класс _tab-spoller, по которому можно изменить стили для нового
 представления табов-спойлеров.
 ------------------------------------------------------------------------------------------------------------------------

 Анимация при открытии таба
 ------------------------------------------------------------------------------------------------------------------------
 Для того, чтобы табы открывались плавно, необходимо объекту с
 атрибутом data-tabs, добавить атрибут data-tabs-animate, а в качестве
 значения указать количество миллисекунд за которые откроется таб (по
 умолчанию 500).
 <!--
 <div data-tabs data-tabs-animate="1000" class="tabs">
 ...
 </div>
 -->
 ------------------------------------------------------------------------------------------------------------------------
 */

// Подключение функционала
import {
  dataMediaQueries,
  getHash,
  setHash,
  _slideDown,
  _slideUp
} from './services/services.js';
// Подключение файла стилей
// Базовые стили подключаются в src/scss/base/base.scss
// Файл базовых стилей: src/scss/base/tabs.scss

export function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener('click', setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, 'tabs');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      );
      tabsContentItems = Array.from(tabsContentItems).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      );
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }

  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-titles]>._tab-active'
      );
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden =
          !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }

    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      );
      tabsTitles = Array.from(tabsTitles).filter(
        item => item.closest('[data-tabs]') === tabsBlock
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }

  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (
        !tabTitle.classList.contains('_tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-title]._tab-active'
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              item => item.closest('[data-tabs]') === tabsBlock
            ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('_tab-active')
          : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
