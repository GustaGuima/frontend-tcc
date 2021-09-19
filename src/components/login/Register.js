import React, { Component } from 'react'
import { register } from '../UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            nome: '',
            email: '',
            password: '',
            professor: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        if(localStorage.usertoken){
            this.props.history.push(`/home`)
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            nome: this.state.nome,
            email: this.state.email,
            password: this.state.password,
            professor: this.state.professor
        }

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        })
    }

    render() {
        const register =  (
            <div className="flex-register">
                <div class='content-box-register'>
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h2 mb-4 font-weight-bold text-center">Criar Conta</h1>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        placeholder="Seu nome"
                                        value={this.state.nome}
                                        onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className='text-center'>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success">
                                        Cadastrar
                                </button>
                                    <a style={{marginLeft: 15}} 
                                    href='/login'>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark">
                                            Voltar
                                </button>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
        return register
    }
}

export default Register