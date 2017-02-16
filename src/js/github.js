import $ from 'jquery';
import GH_TOKEN from './token';

var BASE_URL = "https://api.github.com";

function searchRepos (query) {
  return $.ajax({
    url: `${BASE_URL}/search/repositories`,
    dataType: "json",
    headers: {
      "Authorization": `token ${GH_TOKEN}`
    },
    data: {
      q: query,
      sort: 'forks'
    }
  });
}

function repoStats (user, repo) {
  return $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    method: "GET",
    headers: {
      "Authorization": `token ${GH_TOKEN}`
    }
  });
}



function processStats (data) {
  return data.map(function (rank) {
    var totals = { added: 0, deleted: 0, commits: 0 };
    rank.weeks.forEach(function (week) {
      totals.added += week.a;
      totals.deleted += week.d;
      totals.commits += week.c;
    });

    return {
      login: rank.author.login,
      profile_url: rank.author.html_url,
      additions: totals.added,
      deletions: totals.deleted,
      commits: totals.commits
    };
  });
}

export { searchRepos, repoStats, processStats };
