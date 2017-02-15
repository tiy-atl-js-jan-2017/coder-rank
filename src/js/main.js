import $ from 'jquery';

var BASE_URL = "https://api.github.com";
var retryCount = 0;

function displayStats (data, status, request) {
  var messages = $(".messages");

  if (request.status === 202) {
    retryCount++;
    messages.empty();
    messages.append(`<p>This is retry number ${retryCount}.</p>`);
    messages.append("<p>The data for that project is being processed.</p>");
    messages.append("<p>We will resend your request in 60 seconds. 😍</p>");
    setTimeout(function () { fetchData(); }, 60000);
  } else {
    console.log(data);
  }
}

function fetchData () {
  var user = $("#user-name").val();
  var repo = $("#repo-name").val();

  $.ajax({
    url: `${BASE_URL}/repos/${user}/${repo}/stats/contributors`,
    dataType: "json",
    success: displayStats
  });
}

function getRepoStats (event) {
  event.preventDefault();
  fetchData();
}

var form = $("form");
form.submit(getRepoStats);
