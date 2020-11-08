import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import { ranking } from '../UserFunctions'
import { login } from '../UserFunctions'


var alunosRanking = {}
class Home extends Component {

    constructor() {
        super()
        this.state = {
            nome: '',
            nivel: 1,
            experiencia: 0,
            lists: []
        }
    }

    componentDidMount() {


        ranking().then(alunos => {
            alunosRanking = alunos  
            this.setState({
                lists: alunos
            })    
            this.state.lists.map((data, key) => {console.log(data)})
        })

        const token = localStorage.usertoken
        if (token) {
            const decoded = jwt_decode(token)
            console.log(decoded)
            this.setState({
                nome: decoded.nome,
                nivel: decoded.nivel,
                experiencia: decoded.experiencia
            })
        }

        if (localStorage.getItem('exercicioToken')) {
            localStorage.removeItem('exercicioToken')
        }
    }

    render() {
        const home = (
            <div class='container'>

                <div class="linha">

                    <div class="coluna-75">
                        <div className='container-home'>
                            <Navbar />
                            <div>
                                <div class='pt-5'>
                                    <h2>Nivel 1</h2>
                                </div>
                                <grid className='container-box' direction="row" justify="center">
                                    <div className='flex-box container-box'>
                                        <div className='mx-auto container-box'>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-sm mt-5">
                                                        <a href='/exercicio'><button class='button image-button' type='button' value="1" onClick={() => localStorage.setItem('exercicioToken', 1)}><img src='./img/exercicio1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 1</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-5 ">
                                                        <a href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 2)}><img src='./img/exercicio2-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 2</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 3)}><img src='./img/exercicio3-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 3</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 4)}><img src='./img/exercicio4-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 4</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a href='/exercicio'><button href='/exercicio' class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 5)}><img src='./img/exercicio5-nivel1.jpg'></img></button></a>
                                                        <label class='pl-4'>Exercicio 5</label>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 6)}><img src='./img/exercicio6-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 6</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </grid>
                            </div>
                        </div>
                    </div >

                    <div class="coluna-25">
                        <div className='container-home'>
                            <div class="table-wrapper-scroll-y my-custom-scrollbar">
                                <table class="table table-bordered table-striped mb-0">
                                    <thead>
                                        <caption>Ranking</caption>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Pontuação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {this.state.lists.map((data, key) => {
                                                return(<tr><td>{data.nome}</td></tr>)
                                            })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>


                <div class='linha'>
                    <div class="coluna-50">
                        <div class='mt-5'>
                            <h2>Nivel 2</h2>
                            <div className='flex-box container-box'>
                                <grid className='container-box' direction="row" justify="center">
                                    <div className='flex-box container-box'>
                                        <div className='mx-auto container-box'>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-sm mt-5">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' value="1" onClick={() => localStorage.setItem('exercicioToken', 7)}><img src='./img/exercicio1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 1</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-5 ">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 8)}><img src='./img/exercicio2-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 2</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 9)}><img src='./img/exercicio3-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 3</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 10)}><img src='./img/exercicio4-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 4</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button href='/exercicio' class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 11)}><img src='./img/exercicio5-nivel1.jpg'></img></button></a>
                                                        <label class='pl-4'>Exercicio 5</label>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 2) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 12)}><img src='./img/exercicio6-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 6</label>
                                                        </div>
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

                <div class='linha'>
                    <div class="coluna-50">
                        <div class='mt-5'>
                            <h2>Nivel 3</h2>
                            <div className='flex-box container-box'>
                                <grid className='container-box' direction="row" justify="center">
                                    <div className='flex-box container-box'>
                                        <div className='mx-auto container-box'>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-sm mt-5">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' value="1" onClick={() => localStorage.setItem('exercicioToken', 13)}><img src='./img/exercicio1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 1</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-5 ">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 14)}><img src='./img/exercicio2-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 2</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 15)}><img src='./img/exercicio3-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 3</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 16)}><img src='./img/exercicio4-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 4</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button href='/exercicio' class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 17)}><img src='./img/exercicio5-nivel1.jpg'></img></button></a>
                                                        <label class='pl-4'>Exercicio 5</label>
                                                    </div>
                                                    <div class="col-sm mt-2">
                                                        <a class={(this.state.nivel >= 3) ? '' : 'isDisabled'} href='/exercicio'><button class='button image-button' type='button' onClick={() => localStorage.setItem('exercicioToken', 18)}><img src='./img/exercicio6-nivel1.jpg'></img></button></a>
                                                        <div>
                                                            <label class='pl-4'>Exercicio 6</label>
                                                        </div>
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
        )

        return localStorage.usertoken ? home : <Redirect to='/login'></Redirect>
    }
}

export default Home