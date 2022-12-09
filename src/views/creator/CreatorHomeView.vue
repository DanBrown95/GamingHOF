<template>
    <div>
        <div id="user-image-section">
            
        </div>
        <StickyToolbar height="100px"></StickyToolbar>
        <SubmissionGrid :items="submissions"></SubmissionGrid>
    </div>
</template>

<script>
import StickyToolbar from '@/components/creator/StickyToolbar.vue'
import SubmissionGrid from '@/components/submission/SubmissionGrid.vue'

import { GetSubmissionsByCreator as _submissionRepo_GetAllByCreator } from "@/store/submission/repository.js";

export default {
    name: 'CreatorHomeView',
    components: {
        StickyToolbar,
        SubmissionGrid
    },
    data() {
        return {
            submissions: []
        }
    },
    mounted() {
        var id = this.$route.params.id
        this.populateSubmissions(id);
    },
    methods: {
        async populateSubmissions(id){
            this.submissions = await _submissionRepo_GetAllByCreator(id);
        }
    }
}
</script>

<style scoped>
    #user-image-section {
        min-height: calc((100vw - 240px)/6.2 - 1px);
        border: solid 1px red;
    }
</style>