document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO;
  const profileImg = document.querySelector('.brand-photo img');
  const profileFrame = document.querySelector('.brand-photo');
  if (profileImg && profileFrame) {
    const markPhotoReady = () => profileFrame.classList.add('has-photo');
    profileImg.addEventListener('load', markPhotoReady, { once: true });
    profileImg.addEventListener('error', () => profileFrame.classList.remove('has-photo'), { once: true });
    if (profileImg.complete && profileImg.naturalWidth > 0) markPhotoReady();
  }

  const capGrid = document.querySelector('#capabilities-grid');
  const expList = document.querySelector('#experience-list');
  const mobileMenu = document.querySelector('#mobile-menu');
  const menuBtn = document.querySelector('.menu-btn');

  capGrid.innerHTML = data.capabilities.map((item, i) => `
    <article class="cap-card reveal">
      <div class="cap-card-top"><span>0${i + 1}</span><em>${item.tag}</em></div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <span class="card-arrow" aria-hidden="true">↗</span>
    </article>
  `).join('');

  expList.innerHTML = data.experience.map((item) => `
    <article class="exp-row reveal">
      <div class="exp-index">${item.index}</div>
      <div class="exp-main">
        <div class="exp-title"><h3>${item.title}</h3><span>${item.org}</span></div>
        <p>${item.desc}</p>
        <div class="tag-row">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
      </div>
      <div class="exp-mark" aria-hidden="true">↗</div>
    </article>
  `).join('');

  document.querySelector('#year').textContent = new Date().getFullYear();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  }));
});
