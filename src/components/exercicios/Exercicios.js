import React, { Component } from 'react'
import { encontrarExercicio } from '../ExercicioFunctions'
import { questaoIncorreta } from '../UserFunctions'
import { adicionarExperiencia } from '../UserFunctions'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class Exercicios extends Component {

    constructor() {

        super()
        this.state = {
            //DADOS EXERCICIO
            id: localStorage.exercicioToken,
            titulo: '',
            nivel: 1,
            enunciado: '',
            respostaCorreta: '',
            resposta: '',
            respostaIncorreta1: '',
            respostaIncorreta2: '',
            respostaIncorreta3: '',
            experiencia_fornecida: 0,
            pontuacao: 0,

            //Dados Usuario
            email: '',
            estaCorreta: '',
        }
        this.verificarReposta = this.verificarReposta.bind(this)

    }

    componentDidMount() {

        console.log(localStorage.exercicioToken)
        const exercicio = {
            id: localStorage.exercicioToken
        }

        encontrarExercicio(exercicio).then(exercicio => {
            const token = localStorage.exercicioTokenData
            if (token) {
                const decoded = jwt_decode(token)
                let respostas = [decoded.resposta, decoded.resposta_incorreta1, decoded.resposta_incorreta2, decoded.resposta_incorreta3]
                respostas.sort(() => .5 - Math.random())
                this.setState({
                    id: decoded.id,
                    titulo: decoded.titulo,
                    nivel: decoded.nivel,
                    enunciado: decoded.enunciado,
                    respostaCorreta: decoded.resposta,
                    resposta: respostas[0],
                    respostaIncorreta1: respostas[1],
                    respostaIncorreta2: respostas[2],
                    respostaIncorreta3: respostas[3],
                    experiencia_fornecida: decoded.experiencia_fornecida,
                    pontuacao: decoded.pontuacao_fornecida
                })
            }
        })

        const tokenLogin = localStorage.usertoken
        if (tokenLogin) {
            const decodedLogin = jwt_decode(tokenLogin)

            this.setState({
                email: decodedLogin.email
            })
        }
    }

    verificarReposta(e) {


        this.setState({ estaCorreta: e.target.value })

        console.log(this.state.email)

        if (e.target.value === this.state.respostaCorreta) {

            const user = {
                email: this.state.email,
                experiencia: this.state.experiencia_fornecida,
                pontuacao: this.state.pontuacao
            }
            adicionarExperiencia(user)
        } else {
            const user = {
                email: this.state.email,
            }
            questaoIncorreta(user)
        }

        e.preventDefault()
    }

    render() {
        const home = (
            <div>
                <div class="jumbotron jumbotron-fluid mt-5">
                    <div class="container">
                        <center>
                            <h2 class="display-4">{this.state.titulo}</h2>
                            <hr class="my-4"></hr>
                            <p class="lead">{this.state.enunciado}</p>
                        </center>
                    </div>
                    <hr class="my-4"></hr>
                    <div class="container mt-5">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.resposta}>{this.state.resposta}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta1}>{this.state.respostaIncorreta1}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta2}>{this.state.respostaIncorreta2}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta3}>{this.state.respostaIncorreta3}</button>
                    </div>


                    <div class="modal fade" id="modal-resposta" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">{(this.state.estaCorreta === this.state.respostaCorreta) ? 'Resposta Correta' : 'Resposta Incorreta'}</h5>
                                </div>
                                <div class="modal-body">
                                    {(this.state.estaCorreta === this.state.respostaCorreta) ? this.state.experiencia_fornecida + ' de experiencia recebida' : 'Tente novamente ou escolha outro exercício'}
                                </div>
                                <div class="modal-footer">
                                    <a href='/home'><button type='button' class='btn btn-dark'>Sair</button></a>
                                    {(this.state.estaCorreta === this.state.respostaCorreta) ? <a href='/exercicio'><button type='button' class='btn btn-success' onClick={() => localStorage.setItem('exercicioToken', this.state.id += 1)}>Proxima</button></a> : <a href='/exercicio'><button type='button' class='btn btn-danger'>Tente Novamente</button></a>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container" style={{padding:20}}>
                        <a href='/home'><button type="button" class="btn btn-danger">Voltar</button></a>
                    </div>
                </div>
            </div>
        )
        return localStorage.usertoken ? home : <Redirect to='/login'></Redirect>
    }
}

export default Exercicios