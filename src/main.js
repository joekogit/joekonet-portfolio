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

  var frame = document.getElementById('frame'), wrap = document.getElementById('framewrap'), width = document.getElementById('width'), widthv = document.getElementById('widthv'), ruler = document.getElementById('ruler'), variant = document.getElementById('variant'), bp = document.getElementById('bp'), scalenote = document.getElementById('scalenote'), presets = document.getElementById('presets');
  var scale = 1;
  function setWidth(){
    var w = +width.value, fill = w >= 1100, avail = wrap.clientWidth, target = fill ? avail : w;
    scale = Math.min(1, avail / target);
    frame.classList.toggle('scaled', scale < 1);
    if (scale < 1) { frame.style.maxWidth = 'none'; frame.style.width = target + 'px'; frame.style.transform = 'scale(' + scale + ')'; }
    else { frame.style.width = ''; frame.style.transform = ''; frame.style.maxWidth = fill ? '100%' : target + 'px'; }
    widthv.textContent = fill ? 'fill' : w + 'px';
    presets.querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed', +b.dataset.v === w ? 'true' : 'false'); });
    syncHeight(); update();
  }
  function syncHeight(){ wrap.style.height = scale < 1 ? Math.round(frame.offsetHeight * scale) + 'px' : ''; }
  function update(){
    var w = frame.offsetWidth;
    ruler.textContent = w + 'px' + (scale < 1 ? ' at ' + Math.round(scale * 100) + '%' : '');
    variant.textContent = w >= 880 ? 'expanded, with releases' : w >= 520 ? 'expanded' : 'stacked';
    bp.textContent = w >= 880 ? '880px and up' : w >= 520 ? '520 to 879px' : 'under 520px';
    scalenote.textContent = scale < 1 ? 'shown at ' + Math.round(scale * 100) + '% to fit this screen' : '';
  }
  width.addEventListener('input', setWidth);
  presets.querySelectorAll('button').forEach(function(b){ b.addEventListener('click', function(){ width.value = b.dataset.v; setWidth(); }); });
  window.addEventListener('resize', setWidth);
  if ('ResizeObserver' in window) new ResizeObserver(function(){ syncHeight(); update(); }).observe(frame);
  frame.addEventListener('transitionend', update);
  setWidth();

  refresh();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refresh);
  new MutationObserver(refresh).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  // Motion demo. Dots travel out at their own token duration, hold, ease back together, and repeat while
  // on screen. Grab one, pull it back, let go, and it snaps home at a speed that matches how far you pulled.
  var motion = document.getElementById('motion-demo'), dots = Array.prototype.slice.call(motion.querySelectorAll('.dot'));
  var running = false, timer = null, anims = [], held = null;
  function endOf(d){ return d.parentElement.clientWidth - 20; }
  function clearAnims(){ anims.forEach(function(a){ a.cancel(); }); anims = []; }
  function travel(){
    if (!running || held) return;
    clearAnims(); var longest = 0;
    dots.forEach(function(d){
      var cs = getComputedStyle(d), dur = parseFloat(cs.getPropertyValue('--d')) || 300, ease = cs.getPropertyValue('--e').trim() || 'ease-out';
      longest = Math.max(longest, dur);
      anims.push(d.animate([{ left: '2px' }, { left: endOf(d) + 'px' }], { duration: dur, easing: ease, fill: 'forwards' }));
    });
    timer = setTimeout(back, longest + 1200);
  }
  function back(){
    if (!running || held) return;
    clearAnims();
    dots.forEach(function(d){ anims.push(d.animate([{ left: endOf(d) + 'px' }, { left: '2px' }], { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' })); });
    timer = setTimeout(travel, 1400);
  }
  function start(){ if (running || reduce || !dots[0].animate) return; running = true; travel(); }
  function stop(){ running = false; clearTimeout(timer); }
  if (!reduce) {
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting && !document.hidden) start(); else stop(); }); }, { threshold: .3 }).observe(motion);
    } else start();
    document.addEventListener('visibilitychange', function(){ if (document.hidden) stop(); else { var r = motion.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) start(); } });

    dots.forEach(function(d){
      var startX = 0, startLeft = 0;
      d.addEventListener('pointerdown', function(ev){
        held = d; clearTimeout(timer); clearAnims();
        dots.forEach(function(o){ o.style.left = Math.round(o.getBoundingClientRect().left - o.parentElement.getBoundingClientRect().left) + 'px'; });
        startX = ev.clientX; startLeft = parseFloat(d.style.left) || 2;
        d.classList.add('held'); d.setPointerCapture(ev.pointerId); ev.preventDefault();
      });
      d.addEventListener('pointermove', function(ev){
        if (held !== d) return;
        d.style.left = Math.max(2, Math.min(endOf(d), startLeft + (ev.clientX - startX))) + 'px';
      });
      function release(){
        if (held !== d) return;
        held = null; d.classList.remove('held');
        var from = parseFloat(d.style.left) || 2, to = endOf(d), pull = Math.max(0, to - from);
        var dur = 120 + Math.min(300, pull * 0.6);
        var a = d.animate([{ left: from + 'px' }, { left: to + 'px' }], { duration: dur, easing: 'cubic-bezier(.2,1.4,.3,1)', fill: 'forwards' });
        a.onfinish = function(){ d.style.left = to + 'px'; a.cancel(); };
        anims.push(a);
        dots.forEach(function(o){ if (o !== d) { var oa = o.animate([{ left: o.style.left || '2px' }, { left: endOf(o) + 'px' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }); oa.onfinish = function(){ o.style.left = endOf(o) + 'px'; oa.cancel(); }; anims.push(oa); } });
        clearTimeout(timer); if (running) timer = setTimeout(back, 1600);
      }
      d.addEventListener('pointerup', release); d.addEventListener('pointercancel', release);
    });
  }

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
  function setCurrent(id){
    links.forEach(function(a){ a.classList.toggle('current', a.getAttribute('href') === '#' + id); });
    var ul = docnav.querySelector('ul'), a = ul.querySelector('a.current');
    if (a && ul.scrollWidth > ul.clientWidth) { var r = a.getBoundingClientRect(), u = ul.getBoundingClientRect(); if (r.left < u.left || r.right > u.right - 28) ul.scrollTo({ left: ul.scrollLeft + (r.left - u.left) - 20, behavior: reduce ? 'auto' : 'smooth' }); }
  }
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
    clearTimeout(unlockTimer); unlockTimer = setTimeout(unlock, 'onscrollend' in window ? 4000 : 1000);
  }); });
})();
