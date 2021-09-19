import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { encontrarUsuario } from "../UserFunctions";
import $ from "jquery";
import { Row } from "react-bootstrap";

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
    if (!token) {
      this.props.history.push(`/login`);
    }

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

        $(".progress-value").width(res.experiencia * 4);
        if (res.experiencia > 0) $(".porcentagem").html(res.experiencia + "%");
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
            <li
              class="nav-item pl-2"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <a href="/profile"> 
                <button
                  type="button"
                  style={{ width: "auto", height: "auto", borderRadius: 30 }}
                  class="btn btn-light btn-sm"
                >
                  <img
                    src="./img/profile-icon.png"
                    style={{ width: 35, height: 35, borderRadius: 0 }}
                  ></img>
                </button>
              </a>
              <a
                class="navbar-brand"
                href="/profile"
                style={{ marginLeft: 15 }}
              >
                <p style={{ color: "white", fontSize: 13, marginBottom: 0 }}>
                  Bem vindo,
                </p>
                <p style={{ marginBottom: 0 }}>
                  <strong style={{ color: "white", fontSize: 14 }}>
                    {this.state.nome}
                  </strong>
                </p>
              </a>
            </li>
          </ul>
        </div>

        <div className="topnav-centered">
          <div class="progress">
            <div class="progress-value">
              <p class="porcentagem"></p>
            </div>
          </div>
          <div>
            <p
              style={{
                color: "#ffff",
                marginBottom: 0,
                marginLeft: 415,
                marginTop: -20,
              }}
            >
              {this.state.nivel}
            </p>
          </div>
        </div>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/home" className="nav-link">
                <button
                  type="button"
                  style={{ width: 50, height: 35 }}
                  class="btn btn-light btn-sm"
                >
                  <img
                    src="./img/home-icon.jpg"
                    style={{ width: 20, height: 20, borderRadius: 0 }}
                  ></img>
                </button>
              </a>
            </li>
            <li className="nav-item">
              <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                <button
                  type="button"
                  style={{ width: 50, height: 35, borderRadius: 15 }}
                  class="btn btn-danger btn-sm"
                >
                  <img
                    src="./img/logout.png"
                    style={{ width: 20, height: 20, borderRadius: 0 }}
                  ></img>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
    return userLink;
  }
}

export default withRouter(Navbar);
