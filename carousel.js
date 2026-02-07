(function () {
  const INTERVAL = 4500;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot-btn');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const progressEl = document.querySelector('.carousel-progress');
  let index = 0;
  let timer = null;
  let progressTimer = null;

  function goTo(i) {
    index = ((i % slides.length) + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('carousel-slide--active', j === index));
    dots.forEach((d, j) => d.classList.toggle('active', j === index));
    resetProgress();
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function runProgress() {
    progressEl.style.setProperty('--progress', '0%');
    const start = Date.now();
    progressTimer = setInterval(function () {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / INTERVAL) * 100);
      progressEl.style.setProperty('--progress', pct + '%');
    }, 50);
  }

  function resetProgress() {
    clearInterval(progressTimer);
    runProgress();
  }

  function startAuto() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  if (slides.length && dots.length) {
    runProgress();
    startAuto();

    prevBtn?.addEventListener('click', function () {
      prev();
      stopAuto();
      startAuto();
    });

    nextBtn?.addEventListener('click', function () {
      next();
      stopAuto();
      startAuto();
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
        stopAuto();
        startAuto();
      });
    });

    const frame = document.querySelector('.carousel-frame');
    frame?.addEventListener('mouseenter', stopAuto);
    frame?.addEventListener('mouseleave', startAuto);
  }
})();
