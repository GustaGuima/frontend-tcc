import React, { Component } from 'react'
import { login } from '../UserFunctions'
import { Redirect } from 'react-router-dom'
import $ from "jquery";

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        
        login(user).then(res => {
            if (res) {
                $(".error-login").attr("hidden", true)
                $("#message-error").text("");
                window.location.reload(false)
                this.props.history.push(`/home`)
            } else {
                $(".error-login").removeAttr("hidden")
                $("#message-error").text("Email ou Senha de seu usuario estao incorretos");
            }
        })
    }

    render() {
        const login = (
            <div className='flex-login container-box-login'>
                <div class='content-box-login'>

                    <div hidden class="alert alert-danger error-login" role="alert">
                        <p id="message-error"></p>
                    </div>

                    <div className='col-md-4 mt-5 mx-auto'>
                        <form class='text-center' noValidate onSubmit={this.onSubmit}>
                            <h2 className='h1 mb-5 font-weight-bold'>Login</h2>
                            <div className='form-group'>
                                <input type='text' className='form-control'
                                    name='email' placeholder='E-mail' value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                            <div className='form-group'>
                                <input type='password' className='form-control'
                                    name='password' placeholder='Senha' value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                            <button type="submit" class="btn btn-outline-dark">Entrar</button>
                            <div className='form-group mt-2'>
                                <a class='text-center' href='/register'>Criar Conta</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )


        return (
            localStorage.usertoken ? <Redirect to='/home'></Redirect> : login
        )
    }

}

export default Login

