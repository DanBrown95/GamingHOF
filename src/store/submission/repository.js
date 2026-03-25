import axios from 'axios'

const BASE = 'https://localhost:44318/api/submission'

const post = (action, data) => axios.post(`${BASE}/${action}`, data, { headers: { 'Content-Type': 'application/json' } }).then(r => r.data).catch(console.error)
const get  = (action, params) => axios.get(`${BASE}/${action}`, { params }).then(r => r.data).catch(console.error)

export const GetSubmissionsByPlatform    = (platformId)       => post('GetAllByPlatformAsync', platformId)
export const GetSubmissionById           = (id)               => post('GetById', JSON.stringify(id))
export const GetSubmissionsByCreator     = (id)               => post('GetAllByCreator', JSON.stringify(id))
export const GetAllSubmissionsIncludingCreator = ()           => get('GetAllIncludingCreator')
export const GetAllSubmissions           = ()                 => get('GetAllAsync')
export const VoteForSubmission           = (userId, submissionId) => post('Upvote', { userId, submissionId })
export const SubmitClip                  = (model)            => post('Submit', model)
export const SearchSubmissions           = (query)            => post('Search', query)
export const GetTrending                 = (limit = 10)       => get('Trending', { limit })
export const GetLeaderboard              = (platformId, limit = 50) => get('Leaderboard', { platformId, limit })
export const GetHof                      = ()                 => get('Hof')
export const GetRandom                   = ()                 => get('Random')
export const GetRelated                  = (model)            => post('Related', model)
export const GetArchive                  = (model)            => post('Archive', model)
export const GetArchiveMonths            = ()                 => get('ArchiveMonths')
export const ReportSubmission            = (userId, submissionId) => post('Report', { userId, submissionId })
export const GetVoteHistory              = (userId)           => post('VoteHistory', JSON.stringify(userId))
