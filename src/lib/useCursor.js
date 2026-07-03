import { useEffect } from 'react';

const RED = '#C22B26';
const RED_SOFT = 'rgba(194,43,38,0.55)';

/* Dot tracks the mouse directly; ring trails it via lerp. */
export const useCursor = () => {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let rx = 0, ry = 0, mx = 0, my = 0;
    let animId;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onMouseDown = () => { dot.style.transform = 'translate(-50%,-50%) scale(1.8)'; };
    const onMouseUp   = () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; };

    const onMouseOver = (e) => {
      const el = e.target.closest('button,a,[data-hover]');
      if (el) {
        ring.style.width  = '44px';
        ring.style.height = '44px';
        ring.style.borderColor = RED;
      } else {
        ring.style.width  = '28px';
        ring.style.height = '28px';
        ring.style.borderColor = RED_SOFT;
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);
};
