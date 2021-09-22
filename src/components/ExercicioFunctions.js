import api from '../services/api'

export const encontrarExercicio = exercicio => {
    return api
    .post('exercicio/exercicio', { 
        id: exercicio.id
    })
    .then(res => {
        localStorage.setItem('exercicioTokenData', res.data) 
    })
    .catch(err =>{
        console.log(err)
    })
}

export const criarExercicio = newExercicio => {
    return api
    .post('exercicio/createExercicio', { 
        titulo: newExercicio.titulo,
        nivel: newExercicio.nivel,
        enunciado: newExercicio.enunciado,
        resposta: newExercicio.resposta,
        resposta_incorreta1: newExercicio.resposta_incorreta1,
        resposta_incorreta2: newExercicio.resposta_incorreta2,
        resposta_incorreta3: newExercicio.resposta_incorreta3,
        experiencia_fornecida: newExercicio.experiencia_fornecida,
        pontuacao_fornecida: newExercicio.pontuacao_fornecida,
        respondido: 0
    })
    .then(res => {
        console.log('Registrado')
    })
    .catch(err =>{
        console.log(err)
    })
}

export const exercicioRespondido = respondido => {
    return api
    .post('exercicio/exercicioRespondido', {
        aluno_id: respondido.aluno_id,
        exercicio_id: respondido.exercicio_id,
        respondido: respondido.respondido
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const exercicios = exercicio => {
    return api
    .get('exercicio/exercicios', {
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const verificarExercicios = aluno => {
    return api
    .post('exercicio/verificarExercicios', {
        aluno_id: aluno.aluno_id
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}