    document.querySelectorAll('.mouse_cursor_gradient_tracking').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
        btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    });