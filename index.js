document.addEventListener('DOMContentLoaded', function () {
  const spoilers = document.querySelectorAll('.supervision__spoiler');

  spoilers.forEach(spoiler => {
    const content = spoiler.querySelector('.supervision__spoiler-content');

    spoiler.addEventListener('click', (event) => {
      // не ломаем переход по кнопке «ЗАПИСАТЬСЯ»
      if (event.target.closest('a')) return;

      const isOpen = spoiler.classList.contains('supervision__spoiler--active');

      spoilers.forEach(item => {
        item.classList.remove('supervision__spoiler--active');
        const c = item.querySelector('.supervision__spoiler-content');
        c.style.maxHeight = null;
      });

      if (!isOpen) {
        spoiler.classList.add('supervision__spoiler--active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

    //Бургер
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
            // Очищаем хэш из URL без изменения истории
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    });
});