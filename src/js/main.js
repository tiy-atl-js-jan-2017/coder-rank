import $ from 'jquery';

import { rankingsTemplate as rankingsTmpl,
         searchTemplate as searchTmpl,
         coderTemplate as coderTmpl } from './templates';
import { repoStats, processStats } from './github';

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

function retryStats () {
  var messages = $(".messages");
  retryCount++;
  messages.empty();
  messages.append(`<p>This is retry number ${retryCount}.</p>`);
  messages.append("<p>The data for that project is being processed.</p>");
  messages.append("<p>We will resend your request in 60 seconds. 😍</p>");
  setTimeout(function () { showRepoRanks(); }, 60000);
}

function displayStats (data, status, request) {
  console.log(request.getAllResponseHeaders());

  if (request.status === 202) {
    retryStats();
  } else {
    $(".rankings").empty();
    var githubData = processStats(data);
    githubData.forEach(function (user) {
      var html = coderTmpl(user);
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
