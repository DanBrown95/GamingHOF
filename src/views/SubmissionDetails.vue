<template>
    <div>
        <div class="center">
            <p class="title">{{ submissionDetails.title }}</p>
        </div>
        <video-element class="video" :src="fakeUrl" :styleConfig="customPlayerStyle"></video-element>
        <div>
            <table class="table">
                <tr>
                    <th>Creator</th>
                    <td>{{ submissionDetails.creator }}</td>
                </tr>
                <tr>
                    <th>Console</th>
                    <td>{{ submissionDetails.console }}</td>
                </tr>
                <tr>
                    <th>Date</th>
                    <td>{{ submissionDetails.date }}</td>
                </tr>
                <tr>
                    <th>Rank</th>
                    <td>#{{ submissionDetails.rank }}</td>
                </tr>
                <tr>
                    <th>Votes</th>
                    <td>{{ submissionDetails.votes }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import VideoElement from "@/components/shared/VideoElement.vue"

export default {
    name: "SubmissionDetails",
    components: {
        VideoElement
    },
    data() {
        return {
            customPlayerStyle: {
                height: "400px",
                width: "600px",
                cornerRadius: "20px"
            },
            submissionDetails: { creator: 'Bob', date: '12/10/2022', console: 'xbox', title: 'WTF PWNED', votes: 234553, rank: '2' },
            fakeUrl: "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8"
        }
    },
    mounted() {
        // Get details from id
        // pass url to videoPlayer
    }
}
</script>

<style scoped>
.center {
    line-height: 80px;
    height: 80px;
    text-align: center;
}

.center p {
    line-height: 1.5;
    display: inline-block;
    vertical-align: middle;
}

.video {
    margin: 16px 0;
}

.table {
    width: 90%;
    margin: auto;
    border-radius: 20px;
    overflow: hidden;
    border-spacing: 0;
    border: solid 1px whitesmoke;
}

table tr:nth-child(odd) {
    background-color: #4C8BF5;
    color: #fff;
}

tr {
    background-color: white;
    height: 50px;
}

th {
    width: 30%;
}

td {
    padding-left: 20px;
    text-align: left;
}
</style>

<style>
body {
    background-color: gainsboro;
}
</style>