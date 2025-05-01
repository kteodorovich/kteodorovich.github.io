fetch(`https://api.github.com/repos/kteodorovich/kteodorovich.github.io/commits?sha=main`)
  .then(response => response.json())
  .then(data => {
    const lastCommitDate = new Date(data[0].commit.author.date);
    const formattedDate = lastCommitDate.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    document.getElementById('last-commit-date').textContent = formattedDate;
  })
  .catch(error => {
    console.error('Error fetching commit data:', error);
    document.getElementById('last-commit-date').textContent = 'Unavailable';
  });