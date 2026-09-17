async function showLastCommitDate() {
  const dateEl = document.getElementById('last-commit-date');

  try {
    const response = await fetch(
        'https://api.github.com/repos/kteodorovich/kteodorovich.github.io/commits?sha=main'
    );

    if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const commits = await response.json();
    const lastCommitDate = new Date(commits[0].commit.author.date);

    dateEl.textContent = lastCommitDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  } catch (error) {
      console.error('Error fetching commit data:', error);
      dateEl.textContent = 'Unavailable';
  }
}

showLastCommitDate();
