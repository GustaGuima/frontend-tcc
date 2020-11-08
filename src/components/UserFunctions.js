import axios from 'axios'

export const register = newUser => {
    return axios
    .post('users/register', {
        nome: newUser.nome,
        sobrenome: newUser.sobrenome,
        email: newUser.email,
        password: newUser.password,
        professor: newUser.professor    
    })
    .then(res => {
        console.log('Registrado')
    })
}

export const login = user => {
    return axios
    .post('users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data)
        return res.data
    })
    .catch(err =>{
        console.log(err)
    })
}

export const adicionarExperiencia = experiencia => {
    return axios
    .put('users/experiencia', {
        email: experiencia.email,
        experiencia : experiencia.experiencia,
        pontuacao: experiencia.pontuacao
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const questaoIncorreta = experiencia => {
    return axios
    .put('users/experiencia/tentativas', {
        email: experiencia.email
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const ranking = alunos => {
    return axios
    .get('users/alunos/ranking', {
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const encontrarUsuario = user => {
    return axios
    .get('users/findUser', {
        email: user.email
    })
    .then(res => {
        return res.data
    })
    .catch(err =>{
        console.log(err)
    })
}
