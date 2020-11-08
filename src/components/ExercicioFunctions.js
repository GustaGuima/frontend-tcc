import axios from 'axios'

export const encontrarExercicio = exercicio => {
    return axios
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

