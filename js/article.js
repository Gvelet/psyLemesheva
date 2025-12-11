document.addEventListener('DOMContentLoaded', () => {
  // 1) Берём заголовок статьи из первого h1 на странице
  const h1 = document.querySelector('h1');
  const crumbSpan = document.querySelector('.breadcrumbs span:last-child');

  if (h1 && crumbSpan) {
    crumbSpan.textContent = h1.textContent.trim();
  }

  // 2) Каноникал по текущему URL
  const url = new URL(window.location.href);
  const canonicalHref = `https://psylemesheva.ru${url.pathname.replace(/index\.html$/i, '')}`;

  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = canonicalHref;

  // 3) Title, meta description, OG и Twitter
  if (h1) {
    const articleTitle = h1.textContent.trim();

    // <title>
    document.title = articleTitle;

    // <meta name="description">
    const descText =
      `Статья на тему «${articleTitle}» от психолога Регины Лемешевой о причинах, проявлениях и пути к изменениям.`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descText);

    // ---------- Open Graph ----------
    const ogTitle = articleTitle;
    const ogDesc = descText;
    const ogUrl = canonicalHref;
    const ogImage = 'https://psylemesheva.ru/images/bg.png';

    function setOg(name, content) {
      let tag = document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }

    setOg('og:title', ogTitle);
    setOg('og:description', ogDesc);
    setOg('og:type', 'article');
    setOg('og:url', ogUrl);
    setOg('og:site_name', 'Психолог Регина Лемешева');
    setOg('og:locale', 'ru_RU');
    setOg('og:image', ogImage);
    setOg('og:image:width', '1200');
    setOg('og:image:height', '630');
    setOg('og:image:type', 'image/png');

    // ---------- Twitter ----------
    function setTw(name, content) {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }

    setTw('twitter:title', ogTitle);
    setTw('twitter:description', ogDesc);
    setTw('twitter:card', 'summary_large_image');
    setTw('twitter:image', ogImage);
  }
});
