import axios from 'axios'

export function GetCreatorDetails(id) {
    return axios({
        url: 'https://localhost:44318/api/creator/GetCreatorDetails',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(id)
    })
        .then(response => { return response.data; })
        .catch(error => console.log(JSON.stringify(error.response.data.errors)))
}