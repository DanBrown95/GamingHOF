import axios from 'axios'

const BASE = 'https://localhost:44318/api/comment'

const post = (action, data) => axios.post(`${BASE}/${action}`, data, { headers: { 'Content-Type': 'application/json' } }).then(r => r.data).catch(console.error)

export const GetComments    = (submissionId) => post('GetBySubmission', JSON.stringify(submissionId))
export const AddComment     = (model)        => post('Add', model)
export const DeleteComment  = (id, userId)   => post('Delete', { id, userId })
