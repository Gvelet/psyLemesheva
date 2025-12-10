document.addEventListener('DOMContentLoaded', function () {
  // АККОРДЕОН: supervision + faq
  const accordions = document.querySelectorAll('.accordion__item');

  accordions.forEach(item => {
    const content = item.querySelector('.accordion__content');

    item.addEventListener('click', (event) => {
      if (event.target.closest('a')) return; // не ломаем ссылки

      const parentAccordion = item.closest('.accordion');
      const isSingle = parentAccordion.classList.contains('accordion--single'); // только supervision
      const isOpen = item.classList.contains('accordion__item--active');

      // если это одиночный режим (supervision) — закрываем остальные в том же контейнере
      if (isSingle) {
        parentAccordion.querySelectorAll('.accordion__item').forEach(other => {
          if (other !== item) {
            other.classList.remove('accordion__item--active');
            const otherContent = other.querySelector('.accordion__content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });
      }

      // переключаем текущий
      if (isOpen) {
        item.classList.remove('accordion__item--active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('accordion__item--active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu-mobile');
    const body = document.body;

    burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('body-lock');
    });

    document.querySelectorAll('.menu-mobile .menu__link').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('body-lock');
    });
    });

    window.addEventListener('load', function() {
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    });
});