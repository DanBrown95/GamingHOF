<template>
  <div class="creator-page">
    <!-- Banner -->
    <div class="banner-section">
      <img v-if="creatorDetails.bannerImage" :src="creatorDetails.bannerImage" class="banner-img" alt="Creator banner" />
      <div class="banner-overlay"></div>
      <div class="banner-info">
        <h2 class="gamertag" v-if="creatorDetails.gamertag">{{ creatorDetails.gamertag }}</h2>
        <div class="banner-actions">
          <follow-button v-if="creatorDetails.id" :creatorId="creatorDetails.id" />
        </div>
      </div>
    </div>

    <!-- Stats -->
    <creator-stats v-if="creatorDetails.id" :creatorId="creatorDetails.id" />

    <!-- Filter toolbar -->
    <StickyToolbar
      :gameFilters="gameFilters"
      height="64px"
      @gameFilterChanged="gameFilterChanged"
      @filterSelected="toolBarFilterSelected"
    />

    <!-- Submission grid -->
    <SubmissionGrid
      :items="submissions"
      :filter="clickedSubmissionFilterLink"
      :gameIdFilter="selectedFilterGameId"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import StickyToolbar  from '@/components/creator/StickyToolbar.vue'
import SubmissionGrid  from '@/components/submission/SubmissionGrid.vue'
import FollowButton    from '@/components/creator/FollowButton.vue'
import CreatorStats    from '@/components/creator/CreatorStats.vue'

import { GetSubmissionsByCreator } from '@/store/submission/repository.js'
import { GetCreatorDetails }       from '@/store/creator/repository.js'

let submissions               = ref([])
let creatorDetails            = ref({})
let clickedSubmissionFilterLink = ref('')
let gameFilters               = ref([])
let selectedFilterGameId      = ref(null)

const route = useRoute()

onMounted(() => {
  const id = route.params.id
  retrieveCreatorDetails(id)
  populateSubmissions(id)
})

async function populateSubmissions(id) {
  const response = await GetSubmissionsByCreator(id)
  submissions.value = response || []
  gameFilters.value = [
    ...new Map((response || []).map(x => x.game).map(item => [item['name'], item])).values()
  ]
}

async function retrieveCreatorDetails(id) {
  creatorDetails.value = await GetCreatorDetails(id) || {}
}

function toolBarFilterSelected(e)  { clickedSubmissionFilterLink.value = e }
function gameFilterChanged(gameId) { selectedFilterGameId.value = gameId }
</script>

<style scoped>
.creator-page { min-height: 100vh; }

.banner-section {
  position: relative;
  height: clamp(140px, 18vw, 280px);
  overflow: hidden;
  background: var(--sidebar-bg, #1e293b);
}
.banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.banner-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%); }
.banner-info { position: absolute; bottom: 1.25rem; left: 1.75rem; right: 1.75rem; display: flex; align-items: flex-end; justify-content: space-between; }
.gamertag { font-size: 1.5rem; font-weight: 700; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.4); letter-spacing: -0.02em; }
.banner-actions { display: flex; gap: 0.75rem; }
</style>
