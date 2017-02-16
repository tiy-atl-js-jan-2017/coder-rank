var rankingsTemplate = `
    <form>
      <input id="user-name" type="text" placeholder="User Name" />
      <input id="repo-name" type="text" placeholder="Repo Name"/>
      <button>Fetch Ranks</button>
    </form>

    <h3>Top Contributors</h3>
    <ul class="rankings">
    </ul>
`;

var searchTemplate = `
  <form>
    <input id="search-query" type="text"
            placeholder="Project Query" />
    <button>Search!</button>
  </form>

  <h3>Search Results</h3>
  <ul class="results">
  </ul>
`;

function coderTemplate (user, contributions) {
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

export { rankingsTemplate, searchTemplate, coderTemplate };
