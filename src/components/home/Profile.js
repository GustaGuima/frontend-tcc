import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Navbar from "../partials/Navbar";
import { encontrarUsuario, ranking } from "../UserFunctions";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      email: "",
      password: "",
      nivel: 1,
      experiencia: 0,
      questoes_respondidas: 0,
      tentativas: 0,
      pontuacao: 0,
      lists: [],
    };
  }

  componentDidMount() {
    if (!localStorage.usertoken) {
      this.props.history.push(`/login`);
    }

    const token = localStorage.usertoken;

    ranking().then((alunos) => {
      this.setState({
        lists: alunos,
      });
    });

    if (token) {
      const decoded = jwt_decode(token);

      const user = {
        email: decoded.email,
      };

      encontrarUsuario(user).then((res) => {
        this.setState({
          nome: res.nome,
          email: res.email,
          nivel: res.nivel,
          experiencia: res.experiencia,
          questoes_respondidas: res.questoes_respondidas,
          tentativas: res.tentativas,
          pontuacao: res.pontuacao,
        });
      });

      this.setState({});
    }
  }

  render() {
    const data = [
      {
        name: "Incorretas",
        value: this.state.tentativas - this.state.questoes_respondidas,
      },
      { name: "Corretas", value: this.state.questoes_respondidas },
    ];

    const COLORS = ["#EF321E", "#00C49F"];

    const profile = (
      <div className="container p-5">
        <div className="container-home" style={{ marginTop: 120 }}>
          <Navbar />
        </div>

        <div className="container-perfil">
          <div className="informacoes-usuario">
            <strong style={{ fontSize: 25 }}>{this.state.nome}</strong>
           {/*  <button className="btn btn-outline-warning">Editar</button> */}
          </div>
          <div>
            <p style={{ color: "#c3c3c3" }}>{this.state.email}</p>
          </div>
          <div className="estatisticas-perfil">
            <div class="box-estatistica">
              <img class="image-perfil" src="./img/try-again-icon.png"></img>
              <strong class="estatistica" style={{ color: "#f9344c" }}>
                {this.state.tentativas}
              </strong>
              <p
                class="estatistica"
                style={{ color: "#6f6f6f", marginTop: 35 }}
              >
                Tentativas
              </p>
            </div>
            <div class="box-estatistica">
              <img class="image-perfil" src="./img/score-icon.png"></img>
              <strong class="estatistica" style={{ color: "rgb(239 188 7)" }}>
                {this.state.pontuacao}
              </strong>
              <p
                class="estatistica"
                style={{ color: "#6f6f6f", marginTop: 35 }}
              >
                Pontuação
              </p>
            </div>
            <div class="box-estatistica">
              <img class="image-perfil" src="./img/success-icon.png"></img>
              <strong class="estatistica" style={{ color: "#0aa06e" }}>
                {this.state.questoes_respondidas}
              </strong>
              <p
                class="estatistica"
                style={{ color: "#6f6f6f", marginTop: 35 }}
              >
                Questões Corretas
              </p>
            </div>
          </div>
        </div>
        <hr className="divisoria-perfil"></hr>
        <div
          class={this.state.tentativas == 0 ? "div_chart_none" : "div_chart"}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill={COLORS[index % COLORS.length]}
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].name} ({value})
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div class="itens-perfil">
          <div class="col-sm">
            <div class="container-trofeus-perfil">
              <table class="table-trofeus">
                <thead>
                  <tr>
                    <th
                      style={{
                        display: "flex",
                        fontSize: 20,
                        color: "#949494",
                      }}
                    >
                      <img
                        class="table-trofeu-icon"
                        src="./img/icon-trofeu-table.png"
                      ></img>
                      TROFEUS
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        style={{ width: 60, height: 60 }}
                        class="card-img-top trofeu"
                        src={
                          this.state.questoes_respondidas >= 6
                            ? "./img/trofeu_bronze.png"
                            : "./img/trofeu_escondido.png"
                        }
                        alt="Card image cap"
                      ></img>
                    </td>
                    <td>
                      <p style={{ fontSize: 15 }} class="card-title">
                        Questões respondidas corretamente{" "}
                        {this.state.questoes_respondidas >= 6
                          ? "6/6"
                          : this.state.questoes_respondidas + "/6"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ width: 60, height: 60 }}
                        class="card-img-top trofeu"
                        src={
                          this.state.questoes_respondidas >= 12
                            ? "./img/trofeu_prata.png"
                            : "./img/trofeu_escondido.png"
                        }
                        alt="Card image cap"
                      ></img>
                    </td>
                    <td>
                      <p style={{ fontSize: 15 }} class="card-title">
                        Questões respondidas corretamente{" "}
                        {this.state.questoes_respondidas >= 12
                          ? "12/12"
                          : this.state.questoes_respondidas + "/12"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ width: 60, height: 60 }}
                        class="card-img-top trofeu"
                        src={
                          this.state.questoes_respondidas >= 18
                            ? "./img/trofeu_ouro.png"
                            : "./img/trofeu_escondido.png"
                        }
                        alt="Card image cap"
                      ></img>
                    </td>
                    <td>
                      <p style={{ fontSize: 15 }} class="card-title">
                        Questões respondidas corretamente{" "}
                        {this.state.questoes_respondidas >= 18
                          ? "18/18"
                          : this.state.questoes_respondidas + "/18"}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        style={{ width: 60, height: 60 }}
                        class="card-img-top trofeu"
                        src={
                          this.state.pontuacao >= 5000
                            ? "./img/5000_pts.png"
                            : "./img/trofeu_escondido.png"
                        }
                        alt="Card image cap"
                      ></img>
                    </td>
                    <td>
                      <p style={{ fontSize: 15 }} class="card-title">
                        Consiga 5000 de pontuação total{" "}
                        {this.state.pontuacao >= 5000
                          ? "5000/5000"
                          : this.state.pontuacao + "/5000"}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-sm">
            <div class="container-ranking-perfil">
              <table class="table-ranking-perfil">
                <thead>
                  <tr>
                    <th style={{ fontSize: 20 }}>Ranking</th>
                    <th style={{ fontSize: 18, color: "#949494" }}>
                      PONTUAÇÃO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lists.map((alunos, index) => (
                    <tr>
                      <td>
                        <span style={{ fontSize: 15 }}>{alunos.nome}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: 15 }}>{alunos.pontuacao}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
    return profile;
  }
}

export default Profile;
