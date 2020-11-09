import api from '../services/api'

export const register = newUser => {
    return api
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
    return api
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
    return api
    .put('users/experiencia', {
        email: experiencia.email,
        experiencia : experiencia.experiencia,
        pontuacao: experiencia.pontuacao,
        exercicio_id: experiencia.exercicio_id
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const questaoIncorreta = experiencia => {
    return api
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
    return api
    .get('users/alunos/ranking', {
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
export const encontrarUsuario = alunos => {
    return api
    .get('users/encontrarUsuario', {
        email: alunos.email
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
