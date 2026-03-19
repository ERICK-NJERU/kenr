/**
 * Kenrama Education Centre — Main JS
 */
(function() {
  'use strict';

  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => preloader.remove(), 700);
      }, 600);
    });
  }

  const header = document.getElementById('header');
  function toggleScrolled() {
    if (!header) return;
    window.scrollY > 50 ? document.body.classList.add('scrolled') : document.body.classList.remove('scrolled');
  }
  window.addEventListener('scroll', toggleScrolled);
  toggleScrolled();

  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      window.scrollY > 300 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    });
    scrollTop.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        if (mobileToggle) { mobileToggle.classList.add('bi-list'); mobileToggle.classList.remove('bi-x'); }
      }
    });
  });

  document.querySelectorAll('.navmenu .dropdown > a .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault(); e.stopPropagation();
      const parent = this.closest('.dropdown');
      parent.classList.toggle('active');
      const submenu = parent.querySelector('ul');
      if (submenu) submenu.classList.toggle('dropdown-active');
    });
  });

  const animateEls = document.querySelectorAll('[data-aos]');
  if (animateEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    animateEls.forEach(el => {
      el.style.opacity = '0';
      const delay = el.getAttribute('data-aos-delay') || 0;
      el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
      const type = el.getAttribute('data-aos');
      if (type === 'fade-right') el.style.transform = 'translateX(-30px)';
      else if (type === 'fade-left') el.style.transform = 'translateX(30px)';
      else el.style.transform = 'translateY(28px)';
      observer.observe(el);
    });
  }

  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });

  if (typeof Swiper !== 'undefined') {
    document.querySelectorAll('.swiper').forEach(el => {
      if (!el.swiper) new Swiper(el, { loop: true, autoplay: { delay: 4000 }, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } });
    });
  }

  if (typeof PureCounter !== 'undefined') new PureCounter();

  document.querySelectorAll('.facility-detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() { this.style.borderColor='rgba(244,196,48,0.35)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 40px rgba(0,0,0,0.4),0 0 40px rgba(244,196,48,0.06)'; });
    card.addEventListener('mouseleave', function() { this.style.borderColor='rgba(244,196,48,0.15)'; this.style.transform=''; this.style.boxShadow=''; });
  });

})();
