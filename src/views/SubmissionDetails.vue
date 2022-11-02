<template>
    <div>
        <div class="center">
            <p class="title">{{ submissionDetails.title }}</p>
        </div>
        <video-element class="video" :src="submissionDetails.url" :styleConfig="customPlayerStyle" :autoplay="true"></video-element>
        <div class="button-container">
            <neu-button @click="voteClicked" icon="thumb_up_alt" text="upvote"></neu-button>
            <neu-button @click="reportClicked" icon="report" text="Report" iconColor="red"></neu-button>
        </div>
        <details-table :details="submissionDetails"></details-table>
    </div>
</template>

<script>
import VideoElement from "@/components/shared/VideoElement.vue"
import DetailsTable from "@/components/submission/DetailsTable.vue"
import NeuButton from "@/components/shared/NeuButton.vue"

export default {
    name: "SubmissionDetails",
    components: {
        VideoElement,
        DetailsTable,
        NeuButton
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
    },
    methods: {
        voteClicked(){
            console.log("voted");
        },
        reportClicked(){
            console.log("reported");
        }
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

.button-container {
    margin: 20px 0;
}
</style>