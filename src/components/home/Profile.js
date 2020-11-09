import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import { login } from '../UserFunctions'
import { Chart } from 'react-google-charts'


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            nome: '',
            email: '',
            password: '',
            nivel: 1,
            experiencia: 0,
            questoes_respondidas: 0,
            tentativas: 0,
            pontuacao: 0
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            this.setState({
                nome: decoded.nome,
                email: decoded.email,
                password: decoded.password,
                nivel: decoded.nivel,
                experiencia: decoded.experiencia,
                questoes_respondidas: decoded.questoes_respondidas,
                tentativas: decoded.tentativas,
                pontuacao: decoded.pontuacao
            })
        }

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(user => {
            const token = localStorage.usertoken
            if (token) {
                const decoded = jwt_decode(token)
                this.setState({
                    nome: decoded.nome,
                    email: decoded.email,
                    senha: decoded.password,
                    nivel: decoded.nivel,
                    experiencia: decoded.experiencia,
                    pontuacao: decoded.pontuacao_fornecida
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }



    render() {
        const profile = (
            <div className='container p-5'>
                <Navbar />
                <div style={{paddingTop:60}}>
                    <h3>Seus Dados</h3>
                </div>
                <div className='jumbotron mt-5'>
                    <div class="linha">
                        <div class="coluna-75">
                            <h2>Nome: {this.state.nome}</h2>
                        </div>
                        <div class="coluna-25">
                            <h2 style={{ color: "green" }}>Pontuação: {this.state.pontuacao}</h2>
                        </div>
                    </div>
                    <div class="linha">
                        <div class="coluna-75">
                            <h2>E-mail: {this.state.email}</h2>
                        </div>
                        <div class="coluna-25">
                            <h2 style={{ color: "green" }}>Nivel: {this.state.nivel}</h2>
                        </div>
                    </div>
                    <div class="linha">
                        <div class="coluna-75">
                        </div>
                        <div class="coluna-25">
                            <h2 style={{ color: "green" }}>Experiencia: {this.state.experiencia}</h2>
                        </div>
                    </div>
                    <hr class="my-4"></hr>
                    <div class="linha">
                        <div class="coluna-75">
                            <h3>Questoes Respondidas: {this.state.questoes_respondidas}</h3>
                        </div>
                        <div class="coluna-25">
                            <h3>Tentativas: {this.state.tentativas}</h3>
                        </div>
                    </div>
                    <div class="linha">
                        <div class="coluna-100" style={{paddingLeft: 200}}>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Exercicios', 'Estatistica'],
                                    ['Tentativas', this.state.tentativas],
                                    ['Corretas', this.state.questoes_respondidas],
                                ]}
                                options={{
                                    legend: 'none',
                                    pieSliceText: 'label',
                                    title: '',
                                    pieStartAngle: this.state.tentativas,
                                }}
                                rootProps={{ 'data-testid': '4' }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Seus Trofeus</h3>
                </div>
                <div className='jumbotron mt-5'>
                    <div class="linha">
                        <div class="coluna-33">
                            <div class="card" style={{ width: 230 }}>
                                <div class="card" style={{ width: 230 }}>
                                    <img class="card-img-top trofeu" src={(this.state.questoes_respondidas >= 6) ? './img/trofeu_bronze.png' : './img/trofeu_escondido.png'} alt="Card image cap"></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Questões respondidas corretamente {this.state.questoes_respondidas}/6</h5>
                                        <p class="card-text">Responda corretamente 6 questões para desbloquear este trofeu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="coluna-33 pl-3">
                            <div class="card" style={{ width: 230 }}>
                                <div class="card" style={{ width: 230 }}>
                                    <img class="card-img-top trofeu" src={(this.state.questoes_respondidas >= 12) ? './img/trofeu_prata.png' : './img/trofeu_escondido.png'} alt="Card image cap"></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Questões respondidas corretamente {this.state.questoes_respondidas}/12</h5>
                                        <p class="card-text">Responda corretamente 12 questões para desbloquear este trofeu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="coluna-33 pl-5">
                            <div class="card" style={{ width: 230 }}>
                                <div class="card" style={{ width: 230 }}>
                                    <img class="card-img-top trofeu" src={(this.state.questoes_respondidas >= 24) ? './img/trofeu_ouro.png' : './img/trofeu_escondido.png'} alt="Card image cap"></img>
                                    <div class="card-body">
                                        <h5 class="card-title">Questões respondidas corretamente {this.state.questoes_respondidas}/24</h5>
                                        <p class="card-text">Responda corretamente 24 questões para desbloquear este trofeu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

        return localStorage.usertoken ? profile : <Redirect to='/login'></Redirect>
    }
}

export default Profile