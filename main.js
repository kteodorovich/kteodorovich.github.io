const REPO = 'kteodorovich/kteodorovich.github.io';

async function fetchLastCommitDate() {
  const dateEl = document.getElementById('last-commit-date');

  if (!dateEl) {
    return;
  }

  const path = window.location.pathname;

  let file;

  if (path === '/' || path === '') {
    file = 'index.md';
  } else if (path === '/piping/' || path === '/piping') {
    file = 'piping.md';
  } else {
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(file)}&sha=main`
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API responded with status ${response.status}`
      );
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