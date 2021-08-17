import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Navbar from "../partials/Navbar";
import { ranking } from "../UserFunctions";
import { encontrarUsuario } from "../UserFunctions";
import { Hidden } from "@material-ui/core";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      nivel: 1,
      experiencia: 0,
      questoes_respondidas: 0,
      lists: [],
    };
  }

  componentDidMount() {
    ranking().then((alunos) => {
      this.setState({
        lists: alunos,
      });
    });

    const token = localStorage.usertoken;
    if (token) {
      const decoded = jwt_decode(token);

      const user = {
        email: decoded.email,
      };

      encontrarUsuario(user).then((res) => {
        this.setState({
          nome: res.nome,
          nivel: res.nivel,
          experiencia: res.experiencia,
          email: res.email,
          questoes_respondidas: res.questoes_respondidas,
        });
      });
    }

    if (localStorage.getItem("exercicioToken")) {
      localStorage.removeItem("exercicioToken");
    }
  }

  render() {
    const home = (
      <div class="itens-home">
        <div class="col-sm">
          <div class="container exercicios">
            <div className="container-home">
              <Navbar />
            </div>
            <div class="linha">
              <div class="coluna-50">
                <div class="mt-5">
                  <div class="pt-5">
                    <h2>Nivel 1</h2>
                  </div>
                  <grid
                    className="container-box"
                    direction="row"
                    justify="center"
                  >
                    <div className="flex-box container-box">
                      <div class="container">
                        <div class="lista-exercicios">
                          <div class="col-sm mt-5">
                            <a href="/exercicio">
                              <button
                                class="button image-button"
                                type="button"
                                value="1"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 1)
                                }
                              >
                                <img
                                  class="img-exercicios"
                                  src="./img/exercicio1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <div>
                              <label class="pl-4">Exercicio 1</label>
                            </div>
                          </div>
                          <div class="col-sm mt-5 ">
                            <a href="/exercicio">
                              <button
                                class="button image-button"
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 2)
                                }
                              >
                                <img
                                  class="img-exercicios"
                                  src="./img/exercicio2-nivel1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <div>
                              <label class="pl-4">Exercicio 2</label>
                            </div>
                          </div>
                        </div>
                        <div class="lista-exercicios">
                          <div class="col-sm mt-2">
                            <a href="/exercicio">
                              <button
                                class="button image-button"
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 3)
                                }
                              >
                                <img class="img-exercicios"
                                  src="./img/exercicio3-nivel1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <div>
                              <label class="pl-4">Exercicio 3</label>
                            </div>
                          </div>
                          <div class="col-sm mt-2">
                            <a href="/exercicio">
                              <button
                                class="button image-button"
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 4)
                                }
                              >
                                <img
                                  class="img-exercicios"
                                  src="./img/exercicio4-nivel1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <div>
                              <label class="pl-4">Exercicio 4</label>
                            </div>
                          </div>
                        </div>
                        <div class="lista-exercicios">
                          <div class="col-sm mt-2">
                            <a href="/exercicio">
                              <button
                                href="/exercicio"
                                class="button image-button"
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 5)
                                }
                              >
                                <img
                                  class="img-exercicios"
                                  src="./img/exercicio5-nivel1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <label class="pl-4">Exercicio 5</label>
                          </div>
                          <div class="col-sm mt-2">
                            <a href="/exercicio">
                              <button
                                class="button image-button"
                                type="button"
                                onClick={() =>
                                  localStorage.setItem("exercicioToken", 6)
                                }
                              >
                                <img
                                  class="img-exercicios"
                                  src="./img/exercicio6-nivel1.jpg"
                                  alt=""
                                ></img>
                              </button>
                            </a>
                            <div>
                              <label class="pl-4">Exercicio 6</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </grid>
                </div>
              </div>
            </div>

            <div class="linha">
              <div class="coluna-50">
                <div class="mt-5">
                  <h2>Nivel 2</h2>
                  <div className="flex-box container-box">
                    <grid
                      className="container-box"
                      direction="row"
                      justify="center"
                    >
                      <div className="flex-box container-box">
                        <div class="container">
                          <div class="lista-exercicios">
                            <div class="col-sm mt-5">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  value="1"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 7)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 7</label>
                              </div>
                            </div>
                            <div class="col-sm mt-5 ">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 8)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio2-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 8</label>
                              </div>
                            </div>
                          </div>
                          <div class="lista-exercicios">
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 9)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio3-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 9</label>
                              </div>
                            </div>
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 10)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio4-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 10</label>
                              </div>
                            </div>
                          </div>
                          <div class="lista-exercicios">
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  href="/exercicio"
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 11)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio5-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <label class="pl-4">Exercicio 11</label>
                            </div>
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 2 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 12)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio6-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 12</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </grid>
                  </div>
                </div>
              </div>
            </div>

            <div class="linha">
              <div class="coluna-50">
                <div class="mt-5">
                  <h2>Nivel 3</h2>
                  <div className="flex-box container-box">
                    <grid
                      className="container-box"
                      direction="row"
                      justify="center"
                    >
                      <div className="flex-box container-box">
                        <div class="container">
                          <div class="lista-exercicios">
                            <div class="col-sm mt-5">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  value="1"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 13)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 13</label>
                              </div>
                            </div>
                            <div class="col-sm mt-5 ">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 14)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio2-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 14</label>
                              </div>
                            </div>
                          </div>
                          <div class="lista-exercicios">
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 15)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio3-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 15</label>
                              </div>
                            </div>
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 16)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio4-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 16</label>
                              </div>
                            </div>
                          </div>
                          <div class="lista-exercicios">
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  href="/exercicio"
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 17)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio5-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <label class="pl-4">Exercicio 17</label>
                            </div>
                            <div class="col-sm mt-2">
                              <a
                                class={
                                  this.state.nivel >= 3 ? "" : "isDisabled"
                                }
                                href="/exercicio"
                              >
                                <button
                                  class="button image-button"
                                  type="button"
                                  onClick={() =>
                                    localStorage.setItem("exercicioToken", 18)
                                  }
                                >
                                  <img
                                    class="img-exercicios"
                                    src="./img/exercicio6-nivel1.jpg"
                                    alt=""
                                  ></img>
                                </button>
                              </a>
                              <div>
                                <label class="pl-4">Exercicio 18</label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm">
          <div class="container-ranking">
            <table class="table-ranking">
              <thead>
                <tr>
                  <th style={{ fontSize: 20 }}>Ranking</th>
                  <th style={{ fontSize: 18, color: "#949494" }}>PONTUAÇÃO</th>
                </tr>
              </thead>
              <tbody>
                {this.state.lists.map((alunos, index) => (
                  <tr>
                    <td>
                      <span style={{ fontSize: 15 }}>{alunos.nome}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: 15 }}>{alunos.pontuacao}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div class="container-trofeus">
            <table class="table-trofeus">
              <thead>
                <tr>
                  <th style={{ fontSize: 20, color: "#949494" }}>TROFEUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img
                      style={{ width: 60, height: 60 }}
                      class="card-img-top trofeu"
                      src={
                        this.state.questoes_respondidas >= 6
                          ? "./img/trofeu_bronze.png"
                          : "./img/trofeu_escondido.png"
                      }
                      alt="Card image cap"
                    ></img>
                  </td>
                  <td>
                    <p style={{ fontSize: 15 }} class="card-title">
                      Questões respondidas corretamente{" "}
                      {this.state.questoes_respondidas}/6
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      style={{ width: 60, height: 60 }}
                      class="card-img-top trofeu"
                      src={
                        this.state.questoes_respondidas >= 12
                          ? "./img/trofeu_prata.png"
                          : "./img/trofeu_escondido.png"
                      }
                      alt="Card image cap"
                    ></img>
                  </td>
                  <td>
                    <p style={{ fontSize: 15 }} class="card-title">
                      Questões respondidas corretamente{" "}
                      {this.state.questoes_respondidas}/12
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      style={{ width: 60, height: 60 }}
                      class="card-img-top trofeu"
                      src={
                        this.state.questoes_respondidas >= 18
                          ? "./img/trofeu_ouro.png"
                          : "./img/trofeu_escondido.png"
                      }
                      alt="Card image cap"
                    ></img>
                  </td>
                  <td>
                    <p style={{ fontSize: 15 }} class="card-title">
                      Questões respondidas corretamente{" "}
                      {this.state.questoes_respondidas}/18
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return localStorage.usertoken ? home : <Redirect to="/login"></Redirect>;
  }
}

export default Home;
