import $ from 'jquery';
import GH_TOKEN from './token';

var BASE_URL = "https://api.github.com";
var retryCount = 0;

function rankingTemplate (user, contributions) {
  return `
    <li>
      <a href="${user.html_url}">${user.login}</a>
      <p>
        ${user.login} made ${contributions.commits} number of commits
        adding ${contributions.added} lines and deleting
        ${contributions.deleted} lines of code.
      </p>
    </li>
  `;
}

function displayStats (data, status, request) {
  var messages = $(".messages");
  console.log(request.getAllResponseHeaders());

  if (request.status === 202) {
    retryCount++;
    messages.empty();
    messages.append(`<p>This is retry number ${retryCount}.</p>`);
    messages.append("<p>The data for that project is being processed.</p>");
    messages.append("<p>We will resend your request in 60 seconds. 😍</p>");
    setTimeout(function () { fetchData(); }, 60000);
  } else {
    $(".rankings").empty();
    data.forEach(function (rank) {
      var weeks = rank.weeks;
      var totals = { added: 0, deleted: 0, commits: 0 };
      weeks.forEach(function (week) {
        totals.added += week.a;
        totals.deleted += week.d;
        totals.commits += week.c;
      });
      var html = rankingTemplate(rank.author, totals);
      $(".rankings").prepend(html);
    });
  }
}

function displayError (request, status) {
  var messages = $(".messages");
  if (request.status === 404) {
    messages.html("<p>Sorry, there is no such project. Please try a different search.</p>");
  } else {
    messages.html(`<p>There was an error with the request: ${request.statusText}</p>`);
    console.log(request.responseJSON);
  }
}

function fetchData () {
  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    headers: {
      "Authorization": `token ${GH_TOKEN}`
    },
    success: displayStats,
    error: displayError
  });
}

function getRepoStats (event) {
  event.preventDefault();
  fetchData();
}

var form = $("form");
form.submit(getRepoStats);
