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
    <div class="coder">
      <div class="card">
        <div class="card-image">
          <figure class="image">
            <img src="${coder.profile_pic}" alt="Image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media-content">
            <p class="title is-4">${coder.name}</p>
            <p class="subtitle is-6">
              <a href="${coder.profile_url}">@${coder.username}</a>
            </p>
          </div>
        </div>

        <div class="content">

          <table>
            <thead>
              <tr>
                <th>Code Stat</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Commits Made</td>
                <td>${coder.commits}</td>
              </tr>
              <tr>
                <td>Lines Added</td>
                <td>${coder.additions}</td>
              </tr>
              <tr>
                <td>Lines Deleted</td>
                <td>${coder.deletions}</td>
              </tr>
            </tbody>
          </table>

          <ul>
            <li>Location: ${coder.location}</li>
            <li>Company: ${coder.employer}</li>
            <li>Hireable: ${coder.hireable}</li>
          </ul>

        </div>
      </div>
    </div>
  </div>
  `;
}

export { rankingsTemplate, searchTemplate, coderTemplate };
