<template>
    <div v-if="submissionDetails">
        <div class="center">
            <p class="title">{{ submissionDetails.name }}</p>
        </div>
        <video-element v-if="submissionDetails.url" class="video" :src="submissionDetails.url" :styleConfig="customPlayerStyle" :autoplay="true"></video-element>
        <div class="button-container" v-if="isLoggedIn">
            <neu-button id="upvoteBtn" @clicked="voteClicked" :icon="voteIcon" :text="voteText"></neu-button>
            <neu-button id="reportBtn" @clicked="reportClicked" icon="report" text="Report" iconColor="red"></neu-button>
        </div>
        <details-table :details="submissionDetails"></details-table>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'

import VideoElement from "@/components/shared/VideoElement.vue"
import DetailsTable from "@/components/submission/DetailsTable.vue"
import NeuButton from "@/components/shared/NeuButton.vue"

import { GetSubmissionById as _submissionRepo_GetById, 
        VoteForSubmission as _submissionRepo_vote } from "@/store/submission/repository.js";

// Use the Vuex store in Composition API
const store = useStore();

// Access state via computed properties
const isLoggedIn = computed(() => store.state.isAuthenticated);
//const user = computed(() => store.state.user);

const detailsLoaded = ref(false)
const customPlayerStyle = reactive({
  height: "400px",
  width: "600px",
  cornerRadius: "20px"
});
const submissionDetails = ref(null)
const voteEnabled = ref(true)
const voteIcon = ref("thumb_up_alt")
const voteText = ref("upvote")

// Access the route params
const route = useRoute();

onMounted(() => {
    var id = route.params.id
    populateDetails(id)
})

async function populateDetails(id){
    var details = await _submissionRepo_GetById(id)
    submissionDetails.value = details
    detailsLoaded.value = true
}

async function voteClicked(){
    console.log("voting")
    if(!voteEnabled.value){
        return;
    }

    var success =  await _submissionRepo_vote('222222222',submissionDetails.value.id);
    if(success == true){
        var id = route.params.id
        await populateDetails(id);

        //disable the vote button
        disabledVoteButton();
        voteIcon.value = "check";
        voteText.value = "voted";
    }else{
        disabledVoteButton();
        voteIcon.value = "error_outline";
        voteText.value = "Already Voted";
    }
}

function reportClicked(){
    console.log("reported");
}

function disabledVoteButton(){
    voteEnabled.value = false;
    document.getElementById("upvoteBtn").classList.add("disabled");
}
</script>

<style scoped>

.title {
    min-width: 600px;
    padding: 10px 50px;
    border-radius: 20px;
    background-color: #F1F5F8;
    box-shadow: 8px 8px 12px #5d5a5a;
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