// CleanUp Experience — small site behaviours (no dependencies)
(function () {
  var WHATSAPP = '12369927065';
  var EMAIL = 'info@cleanupexperience.ca';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('main-nav');

  // Header shadow on scroll
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!header.classList.contains('menu-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // "Get a quote" on a service card pre-selects that service in the form
  var serviceSelect = document.getElementById('q-service');
  document.querySelectorAll('[data-service]').forEach(function (link) {
    link.addEventListener('click', function () {
      var value = link.getAttribute('data-service');
      Array.prototype.forEach.call(serviceSelect.options, function (o) { if (o.text === value) serviceSelect.value = o.value; });
      setTimeout(function () { document.getElementById('q-name').focus({ preventScroll: true }); }, 500);
    });
  });

  // Don't allow picking a date in the past
  var dateInput = document.getElementById('q-date');
  var today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  // Quote form -> WhatsApp or email with a ready-made message
  var form = document.getElementById('quote-form');
  var channel = 'whatsapp';
  form.querySelectorAll('button[data-channel]').forEach(function (b) {
    b.addEventListener('click', function () { channel = b.getAttribute('data-channel'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nameInput = form.elements.name;
    if (!nameInput.value.trim()) {
      nameInput.setCustomValidity('Please tell us your name');
      nameInput.reportValidity();
      nameInput.addEventListener('input', function () { nameInput.setCustomValidity(''); }, { once: true });
      return;
    }
    var f = form.elements;
    var date = f.date.value ? new Date(f.date.value + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Flexible';
    var lines = [
      'Hi CleanUp Experience! I would like a free quote.',
      '',
      'Name: ' + f.name.value.trim(),
      'Service: ' + f.service.value,
      'Size: ' + f.size.value,
      'Frequency: ' + f.frequency.value,
      'Preferred date: ' + date,
      'Area: ' + (f.area.value.trim() || '-')
    ];
    if (f.details.value.trim()) lines.push('', 'Details: ' + f.details.value.trim());
    var text = lines.join('\n');

    if (channel === 'email') {
      var subject = 'Quote request - ' + f.service.value + ' - ' + f.name.value.trim();
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
    } else {
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    }
  });

  // Reveal-on-scroll animation
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
