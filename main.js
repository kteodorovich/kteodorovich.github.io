/* ==========================================================================
   Mobile scaling — keep .main-wrapper's height in sync with the scaled
   (transform: scale()) size of .main, since transform doesn't affect
   layout flow on its own.
   ========================================================================== */

function updateMainWrapperHeight() {
  const wrapper = document.querySelector('.main-wrapper');
  const main = document.querySelector('.main');
  if (!wrapper || !main) return;

  if (window.innerWidth <= 900) {
    const scale = window.innerWidth / 900;
    wrapper.style.height = (main.offsetHeight * scale) + 'px';
  } else {
    wrapper.style.height = 'auto';
  }
}

window.addEventListener('load', updateMainWrapperHeight);
window.addEventListener('resize', updateMainWrapperHeight);

// Watch .main's actual rendered size continuously, so the wrapper stays
// in sync with any content change that affects height.
const mainEl = document.querySelector('.main');
if (mainEl && 'ResizeObserver' in window) {
  new ResizeObserver(updateMainWrapperHeight).observe(mainEl);
}