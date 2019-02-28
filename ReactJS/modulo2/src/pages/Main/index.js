import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./style";
import CompareList from "../../components/CompareList/";
import api from "../../services/api";
import moment from "moment";

class Main extends Component {
  state = {
    maxStars: 0,
    maxForks: 0,
    maxIssues: 0,

    idMaxStars: 0,
    idMaxForks: 0,
    idMaxIssues: 0,

    repoInput: "",
    repositories: []
  };

  handleNewRepo = async e => {
    e.preventDefault();
    console.log(this.state);

    try {
      const response = await api.get(`/repos/${this.state.repoInput}`);
      response.data.lastCommit = moment(response.data.puhsed_at).fromNow();

      if (
        Math.max(response.data.stargazers_count, this.state.maxStars) ===
        response.data.stargazers_count
      ) {
        this.setState({
          maxStars: response.data.stargazers_count,
          idMaxStars: response.data.id
        });
      }

      if (
        Math.max(response.data.open_issues_count, this.state.maxIssues) ===
        response.data.open_issues_count
      ) {
        this.setState({
          maxIssues: response.data.open_issues_count,
          idMaxIssues: response.data.id
        });
      }

      if (
        Math.max(response.data.forks_count, this.state.maxForks) ===
        response.data.forks_count
      ) {
        this.setState({
          maxForks: response.data.forks_count,
          idMaxForks: response.data.id
        });
      }

      this.setState({
        repoInput: "",
        repositories: [...this.state.repositories, response.data]
      });
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleNewRepo}>
          <input
            type="text"
            placeholder="Usuario/Repositorio"
            value={this.state.repoInput}
            onChange={e => {
              this.setState({ repoInput: e.target.value });
            }}
          />
          <button type="submit">Vai</button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          maxForks={this.state.idMaxForks}
          maxStars={this.state.idMaxStars}
          maxIssues={this.state.idMaxIssues}
        />
      </Container>
    );
  }
}

export default Main;
