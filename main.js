const REPO = 'kteodorovich/kteodorovich.github.io';

async function fetchLastCommitDate() {
  const dateEl = document.getElementById('last-commit-date');
  if (!dateEl) return;

  const path = window.location.pathname.replace(/\/+$/, '');

  const files = {
    '': 'index.md',
    '/piping': 'piping.md',
    '/projects': 'projects.md',
    '/thoughts': 'thoughts.md'
  };

  const file = files[path];

  if (!file) {
    dateEl.textContent = 'Unavailable';
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(file)}&sha=main`
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const commits = await response.json();

    if (commits.length === 0) {
      dateEl.textContent = 'Unavailable';
      return;
    }

    const date = new Date(commits[0].commit.author.date);

    dateEl.textContent = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  } catch (error) {
    console.error('Error fetching commit date:', error);
    dateEl.textContent = 'Unavailable';
  }
}

fetchLastCommitDate();


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

// Re-run once each image finishes loading, since images can change
// .main's natural height after the initial calculation
document.querySelectorAll('img').forEach((img) => {
  if (img.complete) return;
  img.addEventListener('load', updateMainWrapperHeight);
});