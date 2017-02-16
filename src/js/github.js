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

export { searchRepos, repoStats };
