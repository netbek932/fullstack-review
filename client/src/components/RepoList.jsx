import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos:
    <ul>
      {props.repos.map((repo) => <li key={repo.repo_id}><a href={repo.repo_url} target="_blank">{repo.repo_name}</a> {repo.stargazers_count}</li>)}
    </ul>
  </div>
)

export default RepoList;