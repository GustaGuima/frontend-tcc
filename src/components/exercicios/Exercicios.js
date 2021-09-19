import React, { Component } from 'react'
import { encontrarExercicio, exercicioRespondido } from '../ExercicioFunctions'
import { questaoIncorreta, adicionarExperiencia, encontrarUsuario} from '../UserFunctions'
import { Redirect } from 'react-router-dom'
import Typical from 'react-typical'
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
            respondido: 0,
            sequencia_certas: 0,

            //Dados Usuario
            email: '',
            tentativas: 0,
            questoes_respondidas: 0,
            estaCorreta: '',
        }
        this.verificarReposta = this.verificarReposta.bind(this)

    }

    componentDidMount() {

        if(!localStorage.usertoken){
            this.props.history.push(`/login`)
        }

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
                    pontuacao: decoded.pontuacao_fornecida,
                    respondido: decoded.respondido
                })
            }
        })

        const tokenLogin = localStorage.usertoken
        if (tokenLogin) {
            const decodedLogin = jwt_decode(tokenLogin)

            const user = {
                email: decodedLogin.email
            }

            encontrarUsuario(user).then(res => {
                this.setState({
                    email: res.email,
                    tentativas: res.tentativas,
                    questoes_respondidas: res.questoes_respondidas,
                    sequencia_certas: res.sequencia_certas
                })
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
                pontuacao: this.state.pontuacao, 
                exercicio_id: this.state.id,
                sequencia_certas: this.state.sequencia_certas += 1
            }
            
            adicionarExperiencia(user)

        } else {
            const user = {
                email: this.state.email
            }
            this.state.sequencia_certas = 0;
            questaoIncorreta(user)
        }

        e.preventDefault()
    }

    render() {
        const exercicios = (
            <div>
                <div class="jumbotron jumbotron-fluid mt-5">
                    <div class="container">
                        <center>
                            <h2 class="display-4">{this.state.titulo}</h2>
                            <hr class="my-4"></hr>
                            <p class="lead">
                                <Typical
                                    steps={[this.state.enunciado]}
                                    wrapper="p"
                                />
                            </p>
                        </center>
                    </div>
                    <hr class="my-4"></hr>
                    <div class="container mt-5">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" data-backdrop="static" data-keyboard="false" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.resposta}>{this.state.resposta}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" data-backdrop="static" data-keyboard="false" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta1}>{this.state.respostaIncorreta1}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" data-backdrop="static" data-keyboard="false" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta2}>{this.state.respostaIncorreta2}</button>
                    </div>
                    <div class="container mt-2">
                        <button type="button" data-toggle="modal" data-target="#modal-resposta" data-backdrop="static" data-keyboard="false" onClick={this.verificarReposta} class="btn btn-dark btn-lg btn-block" value={this.state.respostaIncorreta3}>{this.state.respostaIncorreta3}</button>
                    </div>


                    <div class="modal fade" id="modal-resposta" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" style={((this.state.respondido === 1)? {color: "red"} : (this.state.estaCorreta === this.state.respostaCorreta) ? {color: "green"} : {color: "red"})} id="exampleModalLongTitle">{((this.state.respondido === 1)? 'Exercicio ja resolvido' : (this.state.estaCorreta === this.state.respostaCorreta) ? 'Resposta Correta' : 'Resposta Incorreta')}</h5>
                                    <img class='resposta' src={(this.state.estaCorreta === this.state.respostaCorreta) ? './img/trofeu_resposta_correta.png' : './img/resposta_errada.png'}></img>
                                </div>
                                <div class="modal-body">
                                    <h5>{((this.state.respondido === 1)? 'Exercicio ja resolvido, retorne ao menu e selecione outro.' :(this.state.estaCorreta === this.state.respostaCorreta) ? 'Parabéns, você respondeu corretamente.' : 'Que pena, você respondeu incorretamente. Tente novamente para receber as recompensas.')}</h5>
                                </div>
                                <div class="modal-body">
                                    <h5>Suas recompensas:</h5>
                                    <h5 style={((this.state.respondido === 1)? {color: "red"} : (this.state.estaCorreta === this.state.respostaCorreta) ? {color: "green"} : {color: "red"})}>{((this.state.respondido === 1)? 'Você ja resgatou as recompensas dessa questão, selecione outra questão.' : (this.state.estaCorreta === this.state.respostaCorreta) ? this.state.experiencia_fornecida + ' de Experiência recebida' : 'Sem Recompensas, Tente novamente.')}</h5>
                                    <h5 style={((this.state.respondido === 1)? {color: "red"} : (this.state.estaCorreta === this.state.respostaCorreta) ? {color: "green"} : {color: "red"})}>{((this.state.respondido === 1)? '' : (this.state.estaCorreta === this.state.respostaCorreta) ? this.state.pontuacao + ' de Pontuação recebida' : '')}</h5>
                                </div>
                                <div class="modal-body">
                                    <h6>{(this.state.estaCorreta === this.state.respostaCorreta) ? 'Continue nesse ritmo' : ''}</h6>
                                </div>
                                <div class="modal-footer">
                                    <a href='/home'><button type='button' class='btn btn-danger'>Sair</button></a>
                                    {((this.state.respondido === 1)? '' : (this.state.estaCorreta === this.state.respostaCorreta) ? <a href='/exercicio'><button type='button' class='btn btn-success' onClick={() => localStorage.setItem('exercicioToken', this.state.id += 1)}>Proxima</button></a> : <a href='/exercicio'><button type='button' class='btn btn-danger'>Tente Novamente</button></a>)}
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
        return exercicios
    }
}

export default Exercicios