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

  // Motion. One run: the dots set off a beat apart, each at its own token duration and curve, and rest at
  // the end. It plays once when it first comes into view, and again on Replay. Drag a dot back and let go
  // and it springs home. Nothing loops on its own.
  var motion = document.getElementById('motion-demo'), dots = Array.prototype.slice.call(motion.querySelectorAll('.dot')), replay = document.getElementById('replay');
  var STAGGER = 110, easeOut = 'cubic-bezier(.2,.7,.2,1)', spring = 'cubic-bezier(.3,1.5,.4,1)';
  var canAnimate = !reduce && !!dots[0].animate, busy = false;
  function endOf(d){ return d.parentElement.clientWidth - 20; }
  function settle(d, left){ d.style.left = left + 'px'; if (d._anim) { d._anim.cancel(); d._anim = null; } }
  function run(){
    busy = true; replay.disabled = true; var done = 0;
    dots.forEach(function(d, i){
      var cs = getComputedStyle(d), dur = parseFloat(cs.getPropertyValue('--d')) || 300, ease = cs.getPropertyValue('--e').trim() || easeOut;
      settle(d, 2);
      var a = d.animate([{ left: '2px' }, { left: endOf(d) + 'px' }], { duration: dur, easing: ease, delay: i * STAGGER, fill: 'both' });
      d._anim = a;
      a.onfinish = function(){ settle(d, endOf(d)); if (++done === dots.length) { busy = false; replay.disabled = false; } };
    });
  }
  function rewindThenRun(){
    if (busy) return;
    busy = true; replay.disabled = true; var done = 0;
    dots.forEach(function(d, i){
      var from = d.getBoundingClientRect().left - d.parentElement.getBoundingClientRect().left;
      settle(d, from);
      var a = d.animate([{ left: from + 'px' }, { left: '2px' }], { duration: 320, easing: easeOut, delay: (dots.length - 1 - i) * 60, fill: 'both' });
      d._anim = a;
      a.onfinish = function(){ settle(d, 2); if (++done === dots.length) run(); };
    });
  }
  if (canAnimate) {
    dots.forEach(function(d){ d.style.left = '2px'; });
    var played = false;
    function firstPlay(){ if (played) return; played = true; run(); }
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { firstPlay(); io.disconnect(); } }); }, { threshold: .4 }); io.observe(motion); }
    else firstPlay();
    replay.addEventListener('click', rewindThenRun);

    dots.forEach(function(d){
      var startX = 0, startLeft = 0, dragging = false, held = false;
      d.addEventListener('pointerdown', function(ev){
        if (busy) return;
        held = true; dragging = false; startX = ev.clientX;
        startLeft = d.getBoundingClientRect().left - d.parentElement.getBoundingClientRect().left;
        settle(d, startLeft); d.setPointerCapture(ev.pointerId); ev.preventDefault();
      });
      d.addEventListener('pointermove', function(ev){
        if (!held) return;
        var dx = ev.clientX - startX;
        if (!dragging) { if (Math.abs(dx) < 4) return; dragging = true; d.classList.add('held'); }
        d.style.left = Math.max(2, Math.min(endOf(d), startLeft + dx)) + 'px';
      });
      function release(){
        if (!held) return; held = false;
        if (!dragging) return;
        dragging = false; d.classList.remove('held');
        var from = parseFloat(d.style.left) || 2, to = endOf(d), pull = Math.max(0, to - from);
        var a = d.animate([{ left: from + 'px' }, { left: to + 'px' }], { duration: 160 + Math.min(260, pull * 0.5), easing: spring, fill: 'both' });
        d._anim = a; a.onfinish = function(){ settle(d, to); };
      }
      d.addEventListener('pointerup', release); d.addEventListener('pointercancel', release);
    });
    window.addEventListener('resize', function(){ if (!busy) dots.forEach(function(d){ if (parseFloat(d.style.left) > 2) settle(d, endOf(d)); }); });
  } else { replay.hidden = true; }

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
