(function(){
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var probe = document.createElement('span'); probe.style.position = 'absolute'; probe.style.visibility = 'hidden'; document.body.appendChild(probe);
  function resolve(token){ probe.style.color = 'var(' + token + ')'; return getComputedStyle(probe).color; }
  function toHex(rgb){ var m = rgb.match(/\d+(\.\d+)?/g); if (!m) return rgb; return '#' + m.slice(0,3).map(function(n){ return ('0' + Math.round(+n).toString(16)).slice(-2); }).join('').toUpperCase(); }
  function refresh(){
    document.querySelectorAll('[data-token]').forEach(function(td){ td.textContent = toHex(resolve(td.dataset.token)); });
    document.querySelectorAll('[data-size]').forEach(function(k){ var sz = parseFloat(getComputedStyle(k.nextElementSibling).fontSize); k.textContent = k.dataset.size + '  ' + Math.round(sz) + 'px'; });
  }
  window.addEventListener('resize', refresh);

  function seg(id, fn){
    var box = document.getElementById(id);
    box.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){
        box.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        fn(b.dataset.v); refresh();
      });
    });
  }
  seg('theme', function(v){ if (v === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', v); });
  seg('radius', function(v){ root.style.setProperty('--radius', v); });
  seg('density', function(v){ root.style.setProperty('--density', v); });
  seg('accent', function(v){
    var map = { site: '#6BA3D0', moss: '#8FB36A', amber: '#E0A84A' };
    if (!map[v]) { root.style.removeProperty('--accent'); root.style.removeProperty('--accent-ink'); }
    else { root.style.setProperty('--accent', map[v]); root.style.setProperty('--accent-ink', '#0F1215'); }
  });

  var frame = document.getElementById('frame'), width = document.getElementById('width'), widthv = document.getElementById('widthv'), ruler = document.getElementById('ruler'), variant = document.getElementById('variant');
  function setWidth(){ var w = +width.value; frame.style.maxWidth = w >= 1100 ? '100%' : w + 'px'; widthv.textContent = w >= 1100 ? 'fill' : w + 'px'; requestAnimationFrame(update); }
  var bp = document.getElementById('bp');
  function update(){ var w = frame.getBoundingClientRect().width; ruler.textContent = Math.round(w) + 'px'; variant.textContent = w >= 880 ? 'expanded, with releases' : w >= 520 ? 'expanded' : 'stacked'; bp.textContent = w >= 880 ? '880px and up' : w >= 520 ? '520 to 879px' : 'under 520px'; }
  width.addEventListener('input', setWidth); window.addEventListener('resize', update); setWidth();
  if (!reduce) { var t = 0; (function tick(){ update(); if (t++ < 40) requestAnimationFrame(tick); })(); }

  refresh();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refresh);
  new MutationObserver(refresh).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  var motion = document.getElementById('motion-demo');
  function play(){ motion.classList.remove('play'); void motion.offsetWidth; motion.classList.add('play'); }
  document.getElementById('replay').addEventListener('click', play);
  if ('IntersectionObserver' in window) { var once = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { play(); once.disconnect(); } }); }, { threshold: .4 }); once.observe(motion); } else play();

  document.querySelectorAll('.copy').forEach(function(btn){
    btn.addEventListener('click', function(){
      var el = btn.previousElementSibling, text = el.textContent;
      function fallback(){ var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function(){ btn.textContent = 'Copied'; }, fallback); else fallback();
      setTimeout(function(){ btn.textContent = 'Copy'; }, 1600);
    });
  });

  var links = Array.prototype.slice.call(document.querySelectorAll('.docnav nav a'));
  var sections = links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var docnav = document.querySelector('.docnav'), locked = null, unlockTimer = null;
  function setCurrent(id){ links.forEach(function(a){ a.classList.toggle('current', a.getAttribute('href') === '#' + id); }); }
  function navOffset(){ return matchMedia('(min-width: 960px)').matches ? 48 : docnav.getBoundingClientRect().height + 40; }
  function spy(){
    if (locked) { setCurrent(locked); return; }
    var y = scrollY + navOffset(), cur = sections[0];
    sections.forEach(function(sec){ if (sec.getBoundingClientRect().top + scrollY - 8 <= y) cur = sec; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) cur = sections[sections.length - 1];
    setCurrent(cur.id);
  }
  function unlock(){ locked = null; spy(); }
  addEventListener('scroll', spy, { passive: true }); addEventListener('resize', spy); spy();
  if ('onscrollend' in window) addEventListener('scrollend', function(){ if (locked) unlock(); });
  links.forEach(function(a){ a.addEventListener('click', function(ev){
    var t = document.querySelector(a.getAttribute('href')); if (!t) return;
    ev.preventDefault(); locked = t.id; setCurrent(t.id);
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    clearTimeout(unlockTimer); unlockTimer = setTimeout(unlock, 1000);
  }); });
})();
