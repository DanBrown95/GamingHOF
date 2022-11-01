<template>
    <div>
        <div class="center">
            <p class="title">{{ submissionDetails.title }}</p>
        </div>
        <video-element class="video" :src="submissionDetails.url" :styleConfig="customPlayerStyle" :autoplay="true"></video-element>
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
            submissionDetails: { creator: 'Bob', date: '12/10/2022', console: 'xbox', title: 'WTF PWNED', votes: 234553, rank: '2', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
        }
    },
    mounted() {
        // Get details from id and populate submission details.
        // pass url to videoPlayer
    }
}
</script>

<style scoped>

.title {
    min-width: 600px;
    padding: 10px 50px;
    border-radius: 20px;
    background-color: #F1F5F8;
    box-shadow: 8px 8px 12px #5d5a5a, -8px -8px 12px #ffffff;
}

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
    border-spacing: 0;
    margin: 0 auto;
    border-radius: 20px;
    background-color: #F1F5F8;
    box-shadow: inset 10px 7px 11px #bfbcd9d9, inset -7px -6px 3px #ffffff;
}

tr {
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