/* ORCHIDELIRIUM — small behaviours for a paper diary
   No dependencies. Everything degrades to a working page without JS. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Tab strip / mobile menu
     The tab strip is always visible on wide screens, so `hidden`
     is only applied while the narrow layout is active.
  --------------------------------------------------------- */
  (function menu() {
    var btn  = document.querySelector('.menu-btn');
    var tabs = document.getElementById('tabs');
    if (!btn || !tabs) return;

    var narrow = window.matchMedia('(max-width: 900px)');

    function close() {
      tabs.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }

    function sync() {
      if (narrow.matches) {
        close();
      } else {
        tabs.hidden = false;
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    btn.addEventListener('click', function () {
      var willOpen = tabs.hidden;
      tabs.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && narrow.matches && !tabs.hidden) {
        close();
        btn.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!narrow.matches || tabs.hidden) return;
      if (!tabs.contains(e.target) && !btn.contains(e.target)) close();
    });

    if (narrow.addEventListener) {
      narrow.addEventListener('change', sync);
    } else if (narrow.addListener) {
      narrow.addListener(sync);       // Safari < 14
    }
    // belt and braces: some embedded viewports resize without firing the media query
    window.addEventListener('resize', sync);

    sync();
  }());

  /* ---------------------------------------------------------
     2. Reveal on scroll — pages settle onto the desk
  --------------------------------------------------------- */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 90) + 'ms';
      io.observe(el);
    });
  }());

  /* ---------------------------------------------------------
     3. Glossary filter
  --------------------------------------------------------- */
  (function glossary() {
    var input = document.getElementById('term-search');
    var list  = document.getElementById('terms');
    if (!input || !list) return;

    var groups = Array.prototype.slice.call(list.querySelectorAll(':scope > div'));
    var empty  = document.getElementById('no-results');
    var count  = document.getElementById('term-count');

    function filter() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;

      groups.forEach(function (group) {
        var match = !q || group.textContent.toLowerCase().indexOf(q) !== -1;
        group.hidden = !match;
        if (match) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
      if (count) {
        count.textContent = shown + (shown === 1 ? ' term' : ' terms');
      }
    }

    input.addEventListener('input', filter);
    filter();
  }());

  /* ---------------------------------------------------------
     4. "Turn the card" — cycles the pressed-fact on the cover
  --------------------------------------------------------- */
  (function facts() {
    var box = document.getElementById('fact-box');
    var btn = document.getElementById('fact-btn');
    if (!box || !btn) return;

    var lines = Array.prototype.slice.call(box.querySelectorAll('[data-fact]'));
    if (lines.length < 2) return;

    var i = 0;
    btn.addEventListener('click', function () {
      lines[i].hidden = true;
      i = (i + 1) % lines.length;
      lines[i].hidden = false;
    });
  }());

  /* ---------------------------------------------------------
     5. Footer year
  --------------------------------------------------------- */
  (function year() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }());
}());
