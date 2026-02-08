(function() {
  if (typeof gtag !== 'function') return;

  function trackScrollDepth() {
    var thresholds = [25, 50, 75, 100];
    var reached = {};

    function check() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      var pct = Math.round((scrollTop / scrollHeight) * 100);

      thresholds.forEach(function(t) {
        if (pct >= t && !reached[t]) {
          reached[t] = true;
          gtag('event', 'scroll_depth', { depth_percent: t });
        }
      });
    }

    window.addEventListener('scroll', check, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', trackScrollDepth);
})();
