<template>
    <div>
        <div id="user-image-section">
          <img :src="creatorDetails.bannerImage" />
        </div>
        <StickyToolbar :gameFilters="gameFilters" @gameFilterChanged="gameFilterChanged" height="100px" @filterSelected="toolBarFilterSelected"></StickyToolbar>
        <SubmissionGrid :items="submissions" :filter="clickedSubmissionFilterLink" :gameIdFilter="selectedFilterGameId"></SubmissionGrid>
    </div>
</template>

<script setup>
import {onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import StickyToolbar from '@/components/creator/StickyToolbar.vue'
import SubmissionGrid from '@/components/submission/SubmissionGrid.vue'

import { GetSubmissionsByCreator as _submissionRepo_GetAllByCreator } from "@/store/submission/repository.js";
import { GetCreatorDetails as _creatorRepo_GetDetails } from "@/store/creator/repository.js"

let submissions = ref([])
let creatorDetails = ref({})
let clickedSubmissionFilterLink = ref("")
let gameFilters = ref([])
let selectedFilterGameId = ref(null)

// Access the route params
const route = useRoute();

onMounted(() => {
    var id = route.params.id
    retrieveCreatorDetails(id);
    populateSubmissions(id);
})

async function populateSubmissions(id){
    const response = await _submissionRepo_GetAllByCreator(id);
    submissions.value = response;
    gameFilters.value = [
        ...new Map(response.map((x) => x.game).map((item) => [item["name"], item])).values()
    ];
}

async function retrieveCreatorDetails(id){
    creatorDetails.value = await _creatorRepo_GetDetails(id);
}

function toolBarFilterSelected(e) {
    clickedSubmissionFilterLink.value = e
}

function gameFilterChanged(gameId) {
    selectedFilterGameId.value = gameId
}


</script>

<style scoped>
    #user-image-section {
        height: calc((100vw - 240px)/6.2 - 1px);
        overflow: hidden;
    }

    #user-image-section > img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>