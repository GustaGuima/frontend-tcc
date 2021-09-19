import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Navbar from "../partials/Navbar";
import { ranking } from "../UserFunctions";
import { encontrarUsuario } from "../UserFunctions";
import { Hidden } from "@material-ui/core";
import { exercicios } from "../ExercicioFunctions";
import $ from "jquery";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      nivel: 1,
      experiencia: 0,
      questoes_respondidas: 0,
      pontuacao: 0,
      lists: [],
      nivel1: [],
      nivel2: [],
      nivel3: []
    };
  }

  componentDidMount() {
    if (!localStorage.usertoken) {
      this.props.history.push(`/login`);
    }

    ranking().then((alunos) => {
      this.setState({
        lists: alunos,
      });
    });

    exercicios().then((exercicio) => {
      const nivel1 = []
      const nivel2 = []
      const nivel3 = []

      for(let i=0; i<exercicio.length; i++){
        if(exercicio[i].nivel == 1){
          nivel1.push(exercicio[i])
        }
        if(exercicio[i].nivel == 2){
          nivel2.push(exercicio[i])
        }
        if(exercicio[i].nivel == 3){
          nivel3.push(exercicio[i])
        }
      }

      this.setState({
        nivel1: nivel1,
        nivel2: nivel2,
        nivel3: nivel3
      })

      if(this.state.nivel1.length == 0){
        $(".nivel1").attr("style","display: none")
      } else{
        $(".nivel1").removeAttr("style")
      }

      if(this.state.nivel2.length == 0){
        $(".nivel2").attr("style","display: none")
      } else{
        $(".nivel2").removeAttr("style")
      }

      if(this.state.nivel3.length == 0){
        $(".nivel3").attr("style","display: none")
      } else{
        $(".nivel3").removeAttr("style")
      }

    })

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
          pontuacao: res.pontuacao,
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
                  <div class="nivel-exercicios nivel1">
                    <p style={{color: "#fafafa", marginTop: 5, fontSize: 25}}>Nivel 1</p>
                  </div>
                  <grid
                    className="container-box"
                    direction="row"
                    justify="center"
                  >
                    <div className="flex-box container-box">
                      <div class="container">
                        <div class="lista-exercicios">
                          {this.state.nivel1.map((exercicio, index) => (
                            <div class="col-sm mt-5">
                              <a href="/exercicio">
                                <button
                                  class="button image-button"
                                  type="button"
                                  value="1"
                                  onClick={() =>
                                    localStorage.setItem(
                                      "exercicioToken",
                                      exercicio.id
                                    )
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
                                <label class="pl-4">{exercicio.titulo}</label>
                              </div>
                            </div>
                          ))}
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
                  <div class="nivel-exercicios nivel2">
                    <p style={{color: "#fafafa", marginTop: 5, fontSize: 25}}>Nivel 2</p>
                  </div>
                  <grid
                    className="container-box"
                    direction="row"
                    justify="center"
                  >
                    <div className="flex-box container-box">
                      <div class="container">
                        <div class="lista-exercicios">
                          {this.state.nivel2.map((exercicio, index) => (
                            <div class="col-sm mt-5">
                              <a href="/exercicio" class={this.state.nivel >= 2 ? "" : "isDisabled"}>
                                <button
                                  class="button image-button"
                                  type="button"
                                  value="1"
                                  onClick={() =>
                                    localStorage.setItem(
                                      "exercicioToken",
                                      exercicio.id
                                    )
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
                                <label class="pl-4">{exercicio.titulo}</label>
                              </div>
                            </div>
                          ))}
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
                  <div class="nivel-exercicios nivel3">
                    <p style={{color: "#fafafa", marginTop: 5, fontSize: 25}}>Nivel 3</p>
                  </div>
                  <grid
                    className="container-box"
                    direction="row"
                    justify="center"
                  >
                    <div className="flex-box container-box">
                      <div class="container">
                        <div class="lista-exercicios">
                          {this.state.nivel3.map((exercicio, index) => (
                            <div class="col-sm mt-5">
                              <a href="/exercicio" class={this.state.nivel >= 3 ? "" : "isDisabled"}>
                                <button
                                  class="button image-button"
                                  type="button"
                                  value="1"
                                  onClick={() =>
                                    localStorage.setItem(
                                      "exercicioToken",
                                      exercicio.id
                                    )
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
                                <label class="pl-4">{exercicio.titulo}</label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </grid>
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
                <tr>
                  <td>
                    <img
                      style={{ width: 60, height: 60 }}
                      class="card-img-top trofeu"
                      src={
                        this.state.pontuacao >= 5000
                          ? "./img/5000_pts.png"
                          : "./img/trofeu_escondido.png"
                      }
                      alt="Card image cap"
                    ></img>
                  </td>
                  <td>
                    <p style={{ fontSize: 15 }} class="card-title">
                      Consiga 5000 de pontuação total {this.state.pontuacao}
                      /5000
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
    return home;
  }
}

export default Home;
