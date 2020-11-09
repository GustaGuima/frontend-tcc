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

export const exercicioRespondido = experiencia => {
    return api
    .put('exercicio/exercicioRespondido', {
        id: experiencia.id
    }).then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}
