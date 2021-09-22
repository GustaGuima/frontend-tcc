import React, { Component } from "react";
import {
  questaoIncorreta,
  adicionarExperiencia,
  encontrarUsuario,
} from "../UserFunctions";
import {
    criarExercicio
  } from "../ExercicioFunctions";
import Navbar from "../partials/Navbar";
import jwt_decode from "jwt-decode";

class CreateExercise extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      nivel: 1,
      enunciado: "",
      resposta: "",
      resposta_incorreta1: "",
      resposta_incorreta2: "",
      resposta_incorreta3: "",
      experiencia_fornecida: 0,
      pontuacao_fornecida: 0,
      respondido: 0,

      //Dados Usuario
      email: "",
      tentativas: 0,
      questoes_respondidas: 0,
      estaCorreta: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newExercicio = {
        titulo: this.state.titulo,
        nivel: this.state.nivel,
        enunciado: this.state.enunciado,
        resposta: this.state.resposta,
        resposta_incorreta1: this.state.resposta_incorreta1,
        resposta_incorreta2: this.state.resposta_incorreta2,
        resposta_incorreta3: this.state.resposta_incorreta3,
        experiencia_fornecida: this.state.experiencia_fornecida,
        pontuacao_fornecida: this.state.pontuacao_fornecida,
    }

    criarExercicio(newExercicio).then(res => {
        this.props.history.push(`/home`)
    })
  }

  componentDidMount() {
    if (!localStorage.usertoken) {
      this.props.history.push(`/login`);
    }

    const tokenLogin = localStorage.usertoken;
    if (tokenLogin) {
      const decodedLogin = jwt_decode(tokenLogin);

      const user = {
        email: decodedLogin.email,
      };

      encontrarUsuario(user).then((res) => {
        this.setState({
          email: res.email,
          tentativas: res.tentativas,
          questoes_respondidas: res.questoes_respondidas,
          sequencia_certas: res.sequencia_certas,
        });
      });
    }
  }

  render() {
    const createExercise = (
      <div className="container">
        <div className="container-home">
          <Navbar />
        </div>
        <div className="flex-register">
          <div class="content-box-register-exercise">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h2 mb-5 font-weight-bold text-center">
                    Registrar Exercício
                  </h1>
                  <div className="form-group">
                    <p class="form-create-exercise">Titulo</p>
                    <input
                      type="text"
                      className="form-control"
                      name="titulo"
                      placeholder="Titulo"
                      value={this.state.titulo}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <p class="form-create-exercise">Enunciado</p>
                    <textarea
                      type="text"
                      className="form-control"
                      name="enunciado"
                      placeholder="Enunciado da Questão"
                      value={this.state.enunciado}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <p class="form-create-exercise">Resposta</p>
                    <textarea
                      type="text"
                      className="form-control"
                      name="resposta"
                      placeholder="Resposta Correta"
                      value={this.state.resposta}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <p class="form-create-exercise">Resposta Incorreta 1</p>
                    <textarea
                      type="text"
                      className="form-control"
                      name="resposta_incorreta1"
                      placeholder="Resposta Incorreta"
                      value={this.state.resposta_incorreta1}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <p class="form-create-exercise">Resposta Incorreta 2</p>
                    <textarea
                      type="text"
                      className="form-control"
                      name="resposta_incorreta2"
                      placeholder="Resposta Incorreta"
                      value={this.state.resposta_incorreta2}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <p class="form-create-exercise">Resposta Incorreta 3</p>
                    <textarea
                      type="text"
                      className="form-control"
                      name="resposta_incorreta3"
                      placeholder="Resposta Incorreta"
                      value={this.state.resposta_incorreta3}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="form-group">
                      <p class="form-create-exercise">Pontuação Fornecida</p>
                      <input
                        type="number"
                        className="form-control"
                        name="pontuacao_fornecida"
                        placeholder="Pontuação"
                        value={this.state.pontuacao_fornecida}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <p class="form-create-exercise">Experiencia Fornecida</p>
                      <input
                        type="number"
                        className="form-control"
                        name="experiencia_fornecida"
                        placeholder="Experiencia"
                        value={this.state.experiencia_fornecida}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div class="form-check">
                      <input
                        type="radio"
                        name="nivel"
                        id="nivel1"
                        value={1}
                        onChange={this.onChange}
                      />
                      <label for="nivel1">
                        Nivel 1 
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        type="radio"
                        name="nivel"
                        id="nivel2"
                        value={2}
                        onChange={this.onChange}
                      />
                      <label for="nivel2">
                        Nivel 2
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        type="radio"
                        name="nivel"
                        id="nivel3"
                        value={3}
                        onChange={this.onChange}
                      />
                      <label for="nivel3">
                         Nivel 3
                      </label>
                    </div>
                  </div>
                  <div className="text-center mb-5 mt-2">
                    <button type="submit" className="btn btn-success">
                      Cadastrar
                    </button>
                    <a style={{ marginLeft: 15 }} href="/home">
                      <button type="button" className="btn btn-danger">
                        Voltar
                      </button>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return createExercise;
  }
}

export default CreateExercise;
