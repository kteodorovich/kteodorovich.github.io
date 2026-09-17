const REPO = 'kteodorovich/kteodorovich.github.io';

// Each tab's content lives in its own file, so its "last updated" date
// can be based on that file's own commit history rather than the whole repo.
const tabs = {
  home: 'content/home.html',
  piping: 'content/piping.html',
};

const lastUpdatedDates = {};
let activeTab = 'home';

async function fetchLastCommitDate(path) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(path)}&sha=main`
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const commits = await response.json();
    if (commits.length === 0) {
      return 'Unavailable';
    }

    const date = new Date(commits[0].commit.author.date);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error(`Error fetching commit data for ${path}:`, error);
    return 'Unavailable';
  }
}

async function loadTabContent(tabId, path) {
  const container = document.getElementById(tabId);

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(`Error loading content for ${tabId}:`, error);
  }
}

function showLastUpdated(tabId) {
  const dateEl = document.getElementById('last-commit-date');
  dateEl.textContent = lastUpdatedDates[tabId] ?? '...';
}

async function initTabs() {
  await Promise.all(
    Object.entries(tabs).map(async ([tabId, path]) => {
      await loadTabContent(tabId, path);
      lastUpdatedDates[tabId] = await fetchLastCommitDate(path);
      if (tabId === activeTab) {
        showLastUpdated(tabId);
      }
    })
  );
}

function setupTabSwitching() {
  const tabLinks = document.querySelectorAll('.tab-link');

  function activateTab(link, moveFocus) {
    activeTab = link.dataset.tab;

    tabLinks.forEach((otherLink) => {
      const isSelected = otherLink === link;
      otherLink.setAttribute('aria-selected', isSelected);
      document.getElementById(otherLink.dataset.tab).hidden = !isSelected;
    });

    showLastUpdated(activeTab);

    if (moveFocus) {
      document.getElementById(activeTab).focus();
    }
  }

  tabLinks.forEach((link) => {
    link.addEventListener('click', () => activateTab(link, true));
  });

  // Show the Home tab by default, without stealing focus on page load.
  activateTab(tabLinks[0], false);
}

setupTabSwitching();
initTabs();