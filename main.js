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