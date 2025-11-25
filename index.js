document.addEventListener('DOMContentLoaded', function () {
  const spoilers = document.querySelectorAll('.supervision__spoiler');

  spoilers.forEach(spoiler => {
    const header = spoiler.querySelector('.supervision__spoiler-top');
    const content = spoiler.querySelector('.supervision__spoiler-content');

    header.addEventListener('click', (event) => {
      event.preventDefault();

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
});