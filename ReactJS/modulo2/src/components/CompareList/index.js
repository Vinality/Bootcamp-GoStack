import React from "react";
import { Container, Repo } from "./style";
import propTypes from "prop-types";

const CompareList = ({ repositories, max, removeRepo }) => (
  <Container>
    {repositories.map(repository => (
      <Repo key={repository.id}>
        <header>
          <button type="button" onClick={() => removeRepo(repository.id)}>
            x
          </button>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
          <small id="description">{repository.description}</small>
        </header>

        <ul>
          <li id={repository.stargazers_count === max.stars ? "max" : undefined}>
            <strong>{repository.stargazers_count}</strong>
            <small>stars</small>
          </li>
          <li id={repository.forks_count === max.forks ? "max" : undefined}>
            <strong>{repository.forks_count}</strong>
            <small>forks</small>
          </li>
          <li id={repository.open_issues_count === max.issues ? "max" : undefined}>
            <strong>{repository.open_issues_count}</strong>
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
      </Repo>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      stargazers_count: propTypes.number,
      forks_count: propTypes.number,
      open_issues_count: propTypes.number,
      pushed_at: propTypes.string,

      owner: propTypes.shape({
        avatar_url: propTypes.string,
        login: propTypes.string
      })
    })
  ).isRequired
};

export default CompareList;
