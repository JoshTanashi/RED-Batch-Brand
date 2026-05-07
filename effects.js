/* RED-BATCH · Visual Effects — custom cursor */

/* ── Custom Cursor ── */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let rx = 0, ry = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  const lerp = (a, b, t) => a + (b - a) * t;
  const tick = () => {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tick);
  };
  tick();

  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
  });

  document.addEventListener('mouseover', e => {
    const el = e.target.closest('button,a,[data-hover]');
    if (el) {
      ring.style.width  = '44px';
      ring.style.height = '44px';
      ring.style.borderColor = '#B22222';
    } else {
      ring.style.width  = '28px';
      ring.style.height = '28px';
      ring.style.borderColor = 'rgba(178,34,34,0.5)';
    }
  });
})();
