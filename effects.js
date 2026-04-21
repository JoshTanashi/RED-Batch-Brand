/* RED-BATCH · Visual Effects — film grain + custom cursor */

/* ── Film Grain ── */
(function () {
  const canvas = document.getElementById('grain');
  const ctx = canvas.getContext('2d');
  let w, h, buf;

  const resize = () => {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
    buf = ctx.createImageData(w, h);
  };
  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  const draw = () => {
    frame++;
    if (frame % 2 === 0) {
      const d = buf.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255 | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = (Math.random() * 40) | 0;
      }
      ctx.putImageData(buf, 0, 0);
    }
    requestAnimationFrame(draw);
  };
  draw();
})();

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
