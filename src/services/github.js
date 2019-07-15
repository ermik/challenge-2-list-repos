const githubGQLEndpoint = 'https://api.github.com/graphql';
const loneToken = 'fbdd0859ad6c874f586d0c23a16ab0da08f68cc4';

const githubGraphqlFetch = (query, variables) => fetch(githubGQLEndpoint, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${loneToken}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({ query, variables })
})
  .then(r => r.json())
  .catch(e => console.error(e));

export async function getUserAndRepos(username) {
  const {data} = await githubGraphqlFetch(reposQuery, {
    user: username
  })

  try {
    // Avoid malformed objects
    return data.user;
  } catch (e) {
    return [];
  }
}

const reposQuery = `query($user: String!) {
  user(login: $user) {
    avatarUrl
    name
    login
    followers {
      totalCount
    }
    organizations {
      totalCount
    }
    contributionsCollection {
      totalIssueContributions
      totalCommitContributions
      totalRepositoryContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
    }
    starredRepositories {
      totalCount
    }
    repositories(privacy: PUBLIC, affiliations: OWNER, first: 10) {
      nodes {
        createdAt
        name
        description
        watchers {
          totalCount
        }
        forkCount
        stargazers {
          totalCount
        }
        url
      }
    }
  }
}`

const findUserQuery = `query($query: String!) {
  search(query: $query, type: USER, first: 10) {
    userCount
    nodes {
      ... on User {
        name
        login
      }
    }
  }
}`;

export async function findUserByName(string) {
  const { data } = await githubGraphqlFetch(findUserQuery, {
    query: string,
  })

  try {
    // Avoid malformed objects
    return data.search.nodes;
  } catch (e) {
    return [];
  }
}
