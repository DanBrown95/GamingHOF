<template>
    <div v-if="submissionDetails">
        <div class="center">
            <p class="title">{{ submissionDetails.name }}</p>
        </div>
        <video-element v-if="submissionDetails.url" class="video" :src="submissionDetails.url" :styleConfig="customPlayerStyle" :autoplay="true"></video-element>
        <div class="button-container">
            <neu-button id="upvoteBtn" @click="voteClicked" :icon="voteIcon" :text="voteText"></neu-button>
            <neu-button id="reportBtn" @click="reportClicked" icon="report" text="Report" iconColor="red"></neu-button>
        </div>
        <details-table :details="submissionDetails"></details-table>
    </div>
</template>
    
<script>
import VideoElement from "@/components/shared/VideoElement.vue"
import DetailsTable from "@/components/submission/DetailsTable.vue"
import NeuButton from "@/components/shared/NeuButton.vue"

import { GetSubmissionById as _submissionRepo_GetById, 
        VoteForSubmission as _submissionRepo_vote } from "@/store/submission/repository.js";

export default {
    name: "SubmissionDetails",
    components: {
        VideoElement,
        DetailsTable,
        NeuButton
    },
    data() {
        return {
            detailsLoaded: false,
            customPlayerStyle: {
                height: "400px",
                width: "600px",
                cornerRadius: "20px"
            },
            submissionDetails: null,
            
            voteEnabled: true,
            voteIcon: "thumb_up_alt",
            voteText: "upvote",
        }
    },
    mounted() {
        // Get details from id and populate submission details.
        // pass url to videoPlayer
        var id = this.$route.params.id
        this.populateDetails(id)
    },
    methods: {
        async populateDetails(id){
            var details = await _submissionRepo_GetById(id)
            this.submissionDetails = details
            this.detailsLoaded = true
        },
        async voteClicked(){
            if(!this.voteEnabled){
                return;
            }
            console.log("enabled");
            var success =  await _submissionRepo_vote('222222222',this.submissionDetails.id);
            if(success == true){
                var id = this.$route.params.id
                await this.populateDetails(id);

                //disable the vote button
                this.voteEnabled = false;
                document.getElementById("upvoteBtn").classList.add("disabled");
                this.voteIcon = "check";
                this.voteText = "voted";
            }
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