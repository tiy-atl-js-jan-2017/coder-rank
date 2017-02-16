import $ from 'jquery';
import GH_TOKEN from './token';

import { rankingsTemplate as rankingsTmpl,
         searchTemplate as searchTmpl,
         coderTemplate as coderTmpl } from './templates';
import { repoStats } from './github';

var BASE_URL = "https://api.github.com";
var retryCount = 0;

var searchButton = $(".search-page");
var rankingsButton = $(".rankings-page");

searchButton.click(startSearch);
rankingsButton.click(startRanking);

function startRanking (event) {
  $(".main-content").html(rankingsTmpl);
  $("form").submit(getRepoStats);
}

function startSearch (event) {
  $(".main-content").html(searchTmpl);
//  $("form").submit(getProjects);
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
    setTimeout(function () { showRepoRanks(); }, 60000);
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
      var html = coderTmpl(rank.author, totals);
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

function showRepoRanks () {
  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  repoStats(user, repo).then(displayStats, displayError);
}

function getRepoStats (event) {
  event.preventDefault();
  showRepoRanks();
}
