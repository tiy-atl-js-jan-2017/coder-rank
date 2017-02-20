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

function getUser (username) {
  return $.ajax({
    url: `${BASE_URL}/users/${username}`,
    dataType: "json",
    headers: {
      "Authorization": `token ${GH_TOKEN}`
    }
  });
}

function commitTotals (weeks) {
  var totals = { added: 0, deleted: 0, commits: 0 };
  weeks.forEach(function (week) {
    totals.added += week.a;
    totals.deleted += week.d;
    totals.commits += week.c;
  });
  return totals;
}

function rankCoders (statsData, userInfo) {
  var totals = commitTotals(statsData.weeks);
  return {
    name: userInfo.name,
    username: userInfo.login,
    location: userInfo.location,
    blog_url: userInfo.blog,
    profile_pic: userInfo.avatar_url,
    profile_url: userInfo.html_url,
    employer: userInfo.company,
    hireable: userInfo.hireable,
    additions: totals.added,
    deletions: totals.deleted,
    commits: totals.commits
  };
}

function processStats (data) {
  var userRequests = data.map(function (statsData) {
    var username = statsData.author.login;
    return getUser(username).then(function (userInfo) {
      return rankCoders(statsData, userInfo);
    });
  });
  return Promise.all(userRequests);
}

export { searchRepos, repoStats, processStats };
