import React from "react";
import { Container, Repo } from "./style";
import propTypes from "prop-types";

const CompareList = ({ repositories, maxForks, maxStars, maxIssues }) => (
  <Container>
    {repositories.map(repository => (
      <Repo key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
          <small id="description">{repository.description}</small>
        </header>

        <ul>
          <li id={repository.id === maxStars ? "max" : undefined}>
            <strong>{repository.stargazers_count}</strong>
            <small>stars</small>
          </li>
          <li id={repository.id === maxForks ? "max" : undefined}>
            <strong>{repository.forks_count}</strong>
            <small>forks</small>
          </li>
          <li id={repository.id === maxIssues ? "max" : undefined}>
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
