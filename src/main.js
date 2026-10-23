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

  // Frame width. The slider retargets a max-width transition; readouts follow the real width every frame
  // while it moves. When the stage is too narrow to reach a breakpoint, the control hides itself.
  var frame = document.getElementById('frame'), stage = frame.parentElement, width = document.getElementById('width'), widthv = document.getElementById('widthv'), ruler = document.getElementById('ruler'), variant = document.getElementById('variant'), bp = document.getElementById('bp'), widthCtl = width.closest('.ctl');
  var tracking = false, trackUntil = 0;
  function stageWidth(){ var cs = getComputedStyle(stage); return stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); }
  function readout(){
    var w = frame.offsetWidth;
    ruler.textContent = w + 'px';
    variant.textContent = w >= 880 ? 'expanded, with releases' : w >= 520 ? 'expanded' : 'stacked';
    bp.textContent = w >= 880 ? '880px and up' : w >= 520 ? '520 to 879px' : 'under 520px';
  }
  function track(){ readout(); if (performance.now() < trackUntil) requestAnimationFrame(track); else tracking = false; }
  function follow(){ trackUntil = performance.now() + 750; if (!tracking) { tracking = true; requestAnimationFrame(track); } }
  function setWidth(){
    var w = +width.value, fill = w >= +width.max;
    frame.style.maxWidth = fill ? '100%' : w + 'px';
    widthv.textContent = fill ? 'fill' : w + 'px';
    width.style.setProperty('--fill', ((w - width.min) / (width.max - width.min) * 100) + '%');
    follow();
  }
  function fitControl(){
    var room = stageWidth() >= 520;
    widthCtl.hidden = !room; document.getElementById('widthhint').hidden = !room;
    if (!room && +width.value < +width.max) { width.value = width.max; }
    setWidth();
  }
  width.addEventListener('input', setWidth);
  frame.addEventListener('transitionend', readout);
  window.addEventListener('resize', fitControl);
  fitControl();

  refresh();
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refresh);
  new MutationObserver(refresh).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  // Motion. Each dot runs one infinite animation: out at its token duration and curve, hold, back, hold.
  // Nothing restarts, so nothing snaps. Off screen it pauses in place. Drag a dot back and let go and it
  // springs home, then rejoins its loop at the hold.
  var motion = document.getElementById('motion-demo'), dots = Array.prototype.slice.call(motion.querySelectorAll('.dot'));
  var HOLD = 1300, easeOut = 'cubic-bezier(.2,.7,.2,1)', spring = 'cubic-bezier(.3,1.5,.4,1)';
  var onScreen = false, canAnimate = !reduce && !!dots[0].animate;
  function endOf(d){ return d.parentElement.clientWidth - 20; }
  function loopFor(d, startAt){
    var cs = getComputedStyle(d), dur = parseFloat(cs.getPropertyValue('--d')) || 300, ease = cs.getPropertyValue('--e').trim() || easeOut;
    var T = dur * 2 + HOLD * 2, end = endOf(d) + 'px';
    var anim = d.animate([
      { left: '2px', offset: 0, easing: ease },
      { left: end, offset: dur / T, easing: 'linear' },
      { left: end, offset: (dur + HOLD) / T, easing: easeOut },
      { left: '2px', offset: (dur * 2 + HOLD) / T, easing: 'linear' },
      { left: '2px', offset: 1 }
    ], { duration: T, iterations: Infinity, fill: 'both' });
    anim.currentTime = startAt || 0;
    if (!onScreen) anim.pause();
    d._loop = anim; d._dur = dur;
    return anim;
  }
  function buildLoops(){ dots.forEach(function(d){ var t = d._loop ? d._loop.currentTime : 0; if (d._loop) d._loop.cancel(); loopFor(d, t); }); }
  function setOnScreen(v){ onScreen = v; dots.forEach(function(d){ if (d._loop) { if (v) d._loop.play(); else d._loop.pause(); } }); }
  if (canAnimate) {
    buildLoops();
    if ('IntersectionObserver' in window) new IntersectionObserver(function(es){ es.forEach(function(e){ setOnScreen(e.isIntersecting && !document.hidden); }); }, { threshold: .2 }).observe(motion);
    else setOnScreen(true);
    document.addEventListener('visibilitychange', function(){ if (document.hidden) setOnScreen(false); else { var r = motion.getBoundingClientRect(); setOnScreen(r.bottom > 0 && r.top < innerHeight); } });
    var resizeTimer; window.addEventListener('resize', function(){ clearTimeout(resizeTimer); resizeTimer = setTimeout(buildLoops, 150); });

    dots.forEach(function(d){
      var startX = 0, startLeft = 0, dragging = false, held = false;
      d.addEventListener('pointerdown', function(ev){
        if (d._snap) return;
        held = true; dragging = false; startX = ev.clientX;
        startLeft = d.getBoundingClientRect().left - d.parentElement.getBoundingClientRect().left;
        d._loop.pause(); d.setPointerCapture(ev.pointerId); ev.preventDefault();
      });
      d.addEventListener('pointermove', function(ev){
        if (!held) return;
        var dx = ev.clientX - startX;
        if (!dragging) { if (Math.abs(dx) < 4) return; dragging = true; d.classList.add('held'); d._loop.cancel(); d.style.left = startLeft + 'px'; }
        d.style.left = Math.max(2, Math.min(endOf(d), startLeft + dx)) + 'px';
      });
      function release(){
        if (!held) return; held = false;
        if (!dragging) { d._loop.play(); return; }
        dragging = false; d.classList.remove('held');
        var from = parseFloat(d.style.left) || 2, to = endOf(d), pull = Math.max(0, to - from);
        var dur = 160 + Math.min(260, pull * 0.5);
        var snap = d.animate([{ left: from + 'px' }, { left: to + 'px' }], { duration: dur, easing: spring, fill: 'forwards' });
        d._snap = snap;
        snap.onfinish = function(){ d.style.left = ''; snap.cancel(); d._snap = null; loopFor(d, d._dur + 1); if (onScreen) d._loop.play(); };
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
