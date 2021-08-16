import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { encontrarUsuario } from "../UserFunctions";
import $ from "jquery";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      nivel: 1,
      experiencia: 0,
    };
  }

  componentDidMount() {
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
        });

        $(".progress-value").width(res.experiencia * 4)
        if(res.experiencia > 0)
            $(".porcentagem").html(res.experiencia + "%")
      });
    }
  }

  logOut(e) {
    e.preventDefault();
    window.location.reload();
    localStorage.removeItem("usertoken");
    this.props.history.push("/login");
  }

  render() {
    const userLink = (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-dark main-navigation">
        <div class="navbar">
          <ul class="navbar-nav">
            <li class="nav-item pl-2">
              <a class="navbar-brand" href="/profile">
                <h4
                  style={{ color: "white", fontSize: 25, fontStyle: "normal" }}
                >
                  Bem vindo, {this.state.nome}
                </h4>
              </a>
            </li>
          </ul>
        </div>

        <div className="topnav-centered">
          <div class="progress">
            <div class="progress-value"><p class="porcentagem"></p></div>
          </div>
        </div>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/home" className="nav-link">
                <button
                  type="button"
                  style={{ fontSize: 20 }}
                  class="btn btn-light btn-sm"
                >
                  Pagina Inicial
                </button>
              </a>
            </li>
            <li className="nav-item">
              <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                <button
                  type="button"
                  style={{ fontSize: 20 }}
                  class="btn btn-light btn-sm"
                >
                  LogOut
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );

    return localStorage.usertoken ? userLink : null;
  }
}

export default withRouter(Navbar);
