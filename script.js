/* ============================================================
   Nova Marketing — Interacciones
   ============================================================ */
(function () {
  'use strict';

  /* ---- Año dinámico en el footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header: estado al hacer scroll ---- */
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menú móvil ---- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });

  /* ---- Reveal al hacer scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Contadores animados ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString('es-ES') + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---- FAQ: solo una abierta a la vez ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---- Formulario de contacto ----
     Sin backend: validamos y abrimos el cliente de correo con el
     mensaje ya redactado. Para recibir los envíos automáticamente,
     conecta un servicio como Formspree (ver README) cambiando
     USE_FORMSPREE a true y poniendo tu endpoint.                    */
  var USE_FORMSPREE = false;
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/tu-id';
  var DESTINO_EMAIL = 'hola@novamarketing.es';

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      note.className = 'form-note';
      note.textContent = '';

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var sector = form.sector.value;
      var message = form.message.value.trim();

      // Validación mínima
      var firstInvalid = null;
      [['name', !!name], ['email', isEmail(email)], ['sector', !!sector]].forEach(function (pair) {
        var fieldEl = form[pair[0]];
        if (!pair[1]) {
          fieldEl.classList.add('invalid');
          if (!firstInvalid) firstInvalid = fieldEl;
        } else {
          fieldEl.classList.remove('invalid');
        }
      });

      if (firstInvalid) {
        note.className = 'form-note err';
        note.textContent = 'Revisa los campos marcados: nombre, email y sector son obligatorios.';
        firstInvalid.focus();
        return;
      }

      if (USE_FORMSPREE) {
        var data = new FormData(form);
        note.textContent = 'Enviando…';
        fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (r.ok) {
              form.reset();
              note.className = 'form-note ok';
              note.textContent = '¡Gracias! Hemos recibido tu solicitud. Te contactamos en menos de 24 h.';
            } else {
              throw new Error('error');
            }
          })
          .catch(function () {
            note.className = 'form-note err';
            note.textContent = 'No se pudo enviar. Escríbenos directamente a ' + DESTINO_EMAIL + '.';
          });
        return;
      }

      // Fallback sin backend: componer correo
      var subject = 'Diagnóstico gratuito — ' + sector + ' (' + name + ')';
      var body =
        'Nombre: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Teléfono: ' + (phone || '-') + '\n' +
        'Sector: ' + sector + '\n\n' +
        'Mensaje:\n' + (message || '-');
      window.location.href = 'mailto:' + DESTINO_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      note.className = 'form-note ok';
      note.textContent = 'Se abrirá tu correo con la solicitud lista para enviar. ¿No se abre? Escríbenos a ' + DESTINO_EMAIL + '.';
    });

    // Quitar el estado de error al escribir
    form.addEventListener('input', function (e) {
      if (e.target.classList) e.target.classList.remove('invalid');
    });
  }
})();
