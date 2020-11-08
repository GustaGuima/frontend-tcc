import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import StarRatings from 'react-star-ratings';
import { login } from '../UserFunctions'

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
            tentativas: 0
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
                tentativas: decoded.tentativas
            })
        }

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        
        login(user).then(user => {
            console.log('chego aq')
            const token = localStorage.usertoken
            if (token) {
                const decoded = jwt_decode(token)
                this.setState({
                    nome: decoded.nome,
                    email: decoded.email,
                    senha: decoded.password,
                    nivel: decoded.nivel,
                    experiencia: decoded.experiencia
                })
            }
        }).catch(err => {
            console.log(err)
        })  
    }

    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
      }

    render() {
        const profile = (
            <div className='container p-5'>
                <Navbar />
                <div className='jumbotron mt-5'>
                    <table className='table col-md-12 mx-auto'>
                        <tbody>
                            <tr>
                                <td>Nome</td>
                                <td>{this.state.nome}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Nivel</td>
                                <td>{this.state.nivel}</td>
                            </tr>
                            <tr>
                                <td>Experiencia</td>
                                <td>{this.state.experiencia}</td>
                            </tr>
                            <tr>
                                <td>Questões Respondidas</td>
                                <td>{this.state.questoes_respondidas}</td>
                            </tr>
                            <tr>
                                <td>Tentativas</td>
                                <td>{this.state.tentativas}</td>
                            </tr>
                            <tr>
                                <td>Tentativas</td>
                                <td><StarRatings
                                    rating={((Number.isInteger(this.state.tentativas) * 10 )/Number.isInteger(this.state.questoes_respondidas))/5}
                                    starRatedColor="aqua"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='jumbotron mt-5'>
                </div>

            </div>
        )

        return localStorage.usertoken ? profile : <Redirect to='/login'></Redirect>
    }
}

export default Profile