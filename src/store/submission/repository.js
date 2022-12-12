import axios from 'axios'

export function GetSubmissionsByPlatform(platformId) {
    return axios({
        url: 'https://localhost:44318/api/submission/GetSubmissionsByPlatform',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(platformId)
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}

export function GetSubmissionById(id) {
    return axios({
        url: 'https://localhost:44318/api/submission/GetById',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: id
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}

export function GetSubmissionsByCreator(id) {
    return axios({
        url: 'https://localhost:44318/api/submission/GetAllByCreator',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(id)
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}

export function GetAllSubmissionsIncludingCreator() {
    return axios({
        url: 'https://localhost:44318/api/submission/GetAllIncludingCreator',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}

export function GetAllSubmissions() {
    return axios({
        url: 'https://localhost:44318/api/submission/getall',
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}


// export function PhoneConfirmation(userId, accessToken){
//     return axios({
//         url: 'https://localhost:44318/api/account/ResendPhoneConfirmation',
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`
//         },
//         data: JSON.stringify(userId)
//     })
//     .then(response => { return response.data; })
//     .catch(error => console.log(JSON.stringify(error.response.data.errors)));
// }