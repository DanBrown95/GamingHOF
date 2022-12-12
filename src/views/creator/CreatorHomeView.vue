<template>
    <div>
        <div id="user-image-section">
          <img :src="creatorDetails.bannerImage" />
        </div>
        <StickyToolbar :gameFilters="gameFilters" @gameFilterChanged="gameFilterChanged" height="100px" @filterSelected="toolBarFilterSelected"></StickyToolbar>
        <SubmissionGrid :items="submissions" :filter="clickedSubmissionFilterLink" :gameIdFilter="selectedFilterGameId"></SubmissionGrid>
    </div>
</template>

<script>
import StickyToolbar from '@/components/creator/StickyToolbar.vue'
import SubmissionGrid from '@/components/submission/SubmissionGrid.vue'

import { GetSubmissionsByCreator as _submissionRepo_GetAllByCreator } from "@/store/submission/repository.js";
import { GetCreatorDetails as _creatorRepo_GetDetails } from "@/store/creator/repository.js"

export default {
    name: 'CreatorHomeView',
    components: {
        StickyToolbar,
        SubmissionGrid
    },
    data() {
        return {
            submissions: [],
            creatorDetails: {},
            clickedSubmissionFilterLink: "",
            gameFilters: [],

            // id of the game selected in the game frilter dropdown. pass to grid to filter the results
            selectedFilterGameId: null
        }
    },
    mounted() {
        var id = this.$route.params.id
        this.retrieveCreatorDetails(id);
        this.populateSubmissions(id);
    },
    methods: {
        async populateSubmissions(id){
            this.submissions = await _submissionRepo_GetAllByCreator(id);
            this.gameFilters =  [... new Map(this.submissions.map((x) => x.game).map((item) => [item["name"], item])).values(),];
        },
        async retrieveCreatorDetails(id){
            this.creatorDetails = await _creatorRepo_GetDetails(id);
        },
        toolBarFilterSelected: function(e) {
            this.clickedSubmissionFilterLink = e
        },
        gameFilterChanged: function(gameId) {
            this.selectedFilterGameId = gameId
        }
    }
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