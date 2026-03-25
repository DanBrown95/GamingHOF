import axios from 'axios'

const BASE = 'https://localhost:44318/api/creator'

const post = (action, data) => axios.post(`${BASE}/${action}`, data, { headers: { 'Content-Type': 'application/json' } }).then(r => r.data).catch(console.error)
const get  = (action, params) => axios.get(`${BASE}/${action}`, { params }).then(r => r.data).catch(console.error)

export const GetCreatorDetails = (id)                         => post('GetCreatorDetails', JSON.stringify(id))
export const GetCreatorStats   = (id)                         => post('Stats', JSON.stringify(id))
export const FollowCreator     = (followerId, creatorId)      => post('Follow',     { followerId, creatorId })
export const UnfollowCreator   = (followerId, creatorId)      => post('Unfollow',   { followerId, creatorId })
export const IsFollowing       = (followerId, creatorId)      => post('IsFollowing',{ followerId, creatorId })
export const GetTopCreators    = (limit = 20)                 => get('TopCreators', { limit })
