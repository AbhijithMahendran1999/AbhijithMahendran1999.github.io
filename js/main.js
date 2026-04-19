/* ============================================================
   1. CURSOR SPOTLIGHT
      Tracks mouse position → feeds CSS custom properties
      → radial gradient in .spotlight follows cursor
   ============================================================ */
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
  document.documentElement.style.setProperty('--my', `${e.clientY}px`);
}, { passive: true });


/* ============================================================
   2. TYPEWRITER EFFECT
      Cycles through role strings, types and deletes them
      with a blinking cursor appended in the DOM
   ============================================================ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Backend & AI Engineer',
    'RAG Pipeline Developer',
    'Agentic Workflow Builder',
    'LLM App Developer',
    'Cloud & Backend Engineer',
  ];

  const textNode = document.createTextNode('');
  const cursor   = document.createElement('span');
  cursor.className = 'tw-cursor';
  el.appendChild(textNode);
  el.appendChild(cursor);

  let ri = 0;
  let ci = 0;
  let deleting = false;

  function tick() {
    const word = roles[ri];

    if (!deleting) {
      ci++;
      textNode.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        return setTimeout(tick, 2200);
      }
    } else {
      ci--;
      textNode.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        return setTimeout(tick, 500);
      }
    }

    setTimeout(tick, deleting ? 42 : 72);
  }

  setTimeout(tick, 800);
})();


/* ============================================================
   3. ACTIVE NAV LINK
      IntersectionObserver on each section.
      When a section crosses the middle of the viewport
      the corresponding sidebar nav link gets .active
   ============================================================ */
(function initActiveNav() {
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        link.classList.toggle(
          'active',
          link.dataset.section === entry.target.id
        );
      });
    });
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach(s => observer.observe(s));
})();


/* ============================================================
   4. SMOOTH SCROLL
      Override default anchor jump for all #links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href   = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
