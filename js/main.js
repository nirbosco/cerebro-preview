// תפריט מובייל
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
}

// חפיסת התמונות בפתיחה: הקלף העליון "מחולק" הצידה ועובר לתחתית
const deck = document.querySelector('.deck');
if (deck) {
  const cards = [...deck.querySelectorAll('.deck__card')];
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let busy = false, timer = null;
  const deal = () => {
    if (busy) return;
    busy = true;
    const top = cards.find((c) => c.dataset.pos === '0');
    top.classList.add('is-leaving');
    setTimeout(() => {
      cards.forEach((c) => { c.dataset.pos = c === top ? String(cards.length - 1) : String(Number(c.dataset.pos) - 1); });
      top.classList.remove('is-leaving');
      busy = false;
    }, still ? 0 : 520);
  };
  const start = () => { if (!still && !timer) timer = setInterval(deal, 3800); };
  const stop = () => { clearInterval(timer); timer = null; };
  deck.addEventListener('click', () => { stop(); deal(); start(); });
  deck.addEventListener('mouseenter', stop);
  deck.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  start();
}
