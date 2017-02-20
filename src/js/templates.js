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

function coderTemplate (coder) {
  return `
    <li>
      <a href="${coder.profile_url}">${coder.login}</a>
      <p>
        ${coder.login} made ${coder.commits} number of commits
        adding ${coder.additions} lines and deleting
        ${coder.deletions} lines of code.
      </p>
    </li>
  `;
}

export { rankingsTemplate, searchTemplate, coderTemplate };
