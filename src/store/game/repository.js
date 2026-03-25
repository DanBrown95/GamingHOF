import axios from 'axios'

const BASE = 'https://localhost:44318/api/game'

const get  = (action, params) => axios.get(`${BASE}/${action}`, { params }).then(r => r.data).catch(console.error)
const post = (action, data)   => axios.post(`${BASE}/${action}`, data, { headers: { 'Content-Type': 'application/json' } }).then(r => r.data).catch(console.error)

export const GetAllGames       = ()           => get('GetAll')
export const GetGamesByPlatform = (platformId) => post('GetByPlatform', platformId)
