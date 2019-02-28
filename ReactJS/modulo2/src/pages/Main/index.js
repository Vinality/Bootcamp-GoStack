import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./style";
import CompareList from "../../components/CompareList/";
import api from "../../services/api";
import moment from "moment";

class Main extends Component {
  state = {
    max: {
      stars: 0,
      forks: 0,
      issues: 0
    },

    loading: false,
    repoError: false,
    repoInput: "",
    repositories: []
  };

  async componentDidMount() {
    this.setState({ loading: true });

    this.setState({
      loading: false,
      repositories: await this.getLocalRepositories(),
      max: await this.getLocalMax()
    });
  }

  getLocalRepositories = async () =>
    JSON.parse(await localStorage.getItem("@repositories")) || [];

  getLocalMax = async () =>
    JSON.parse(await localStorage.getItem("@max")) || {
      stars: 0,
      forks: 0,
      issues: 0,
    };

  handleNewRepo = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${this.state.repoInput}`);
      response.data.lastCommit = moment(response.data.pushed_at).fromNow();

      if (
        Math.max(response.data.stargazers_count, this.state.max.stars) ===
        response.data.stargazers_count
      ) {
        this.setState({
          max: {
            ...this.state.max,
            stars: response.data.stargazers_count,
          }
        });
      }

      if (
        Math.max(response.data.forks_count, this.state.max.forks) ===
        response.data.forks_count
      ) {
        this.setState({
          max: {
            ...this.state.max,
            forks: response.data.forks_count,
          }
        });
      }

      if (
        Math.max(response.data.open_issues_count, this.state.max.issues) ===
        response.data.open_issues_count
      ) {
        this.setState({
          max: {
            ...this.state.max,
            issues: response.data.open_issues_count,
          }
        });
      }

      this.setState({
        repoInput: "",
        repositories: [...this.state.repositories, response.data]
      });

      await localStorage.setItem(
        "@repositories",
        JSON.stringify(this.state.repositories)
      );

      await localStorage.setItem("@max", JSON.stringify(this.state.max));
    } catch (error) {
      this.setState({ repoError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRemoveRepo = async repoId => {
    const updateRepo = this.state.repositories.filter(
      repo => repo.id !== repoId
    );

    const updateMaxStars = Math.max.apply(
      Math,
      updateRepo.map(function(repo) {
        return repo.stargazers_count;
      })
    );

    const updateMaxForks = Math.max.apply(
      Math,
      updateRepo.map(function(repo) {
        return repo.forks_count;
      })
    );

    const updateMaxIssues = Math.max.apply(
      Math,
      updateRepo.map(function(repo) {
        return repo.open_issues_count;
      })
    );

    this.setState({
      repositories: updateRepo,
      max: {
        stars: updateMaxStars,
        forks: updateMaxForks,
        issues: updateMaxIssues
      }
    });

    await localStorage.setItem("@repositories", JSON.stringify(updateRepo));
    await localStorage.setItem("@max", JSON.stringify(this.state.max));
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleNewRepo} repoError={this.state.repoError}>
          <input
            type="text"
            placeholder="Usuario/Repositorio"
            value={this.state.repoInput}
            onChange={e => {
              this.setState({ repoInput: e.target.value });
            }}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "Ok"
            )}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          max={this.state.max}
          removeRepo={this.handleRemoveRepo}
        />
      </Container>
    );
  }
}
export default Main;
