<template>
  <div v-if="submissionDetails" class="details-page">
    <div class="details-container">

      <!-- Title -->
      <div class="title-card">
        <h1 class="submission-title">{{ submissionDetails.name }}</h1>
      </div>

      <!-- Video player -->
      <div v-if="submissionDetails.url" class="video-wrapper">
        <video-element :src="submissionDetails.url" :styleConfig="customPlayerStyle" :autoplay="true" />
      </div>

      <!-- Action buttons -->
      <div class="action-row">
        <neu-button v-if="isLoggedIn" id="upvoteBtn" @clicked="voteClicked" :icon="voteIcon" :text="voteText" />
        <neu-button v-if="isLoggedIn" id="reportBtn" @clicked="reportClicked" icon="report" text="Report" iconColor="red" />
        <share-button />
      </div>

      <!-- Details table -->
      <details-table :details="submissionDetails" />

      <!-- Related clips -->
      <related-clips
        :submissionId="submissionDetails.id"
        :gameId="submissionDetails.game?.id"
        :creatorId="submissionDetails.creator?.id"
      />

      <!-- Comments -->
      <comment-section :submissionId="submissionDetails.id" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import VideoElement   from '@/components/shared/VideoElement.vue'
import DetailsTable   from '@/components/submission/DetailsTable.vue'
import NeuButton      from '@/components/shared/NeuButton.vue'
import ShareButton    from '@/components/submission/ShareButton.vue'
import RelatedClips   from '@/components/submission/RelatedClips.vue'
import CommentSection from '@/components/submission/CommentSection.vue'

import { GetSubmissionById, VoteForSubmission, ReportSubmission } from '@/store/submission/repository.js'

const store = useStore()
const isLoggedIn = computed(() => store.state.isAuthenticated)
const route = useRoute()

const submissionDetails = ref(null)
const voteEnabled = ref(true)
const voteIcon = ref('thumb_up_alt')
const voteText = ref('upvote')

const customPlayerStyle = reactive({ height: '100%', width: '100%' })

onMounted(() => populateDetails(route.params.id))

async function populateDetails(id) {
  submissionDetails.value = await GetSubmissionById(id)
}

async function voteClicked() {
  if (!voteEnabled.value) return
  const success = await VoteForSubmission('222222222', submissionDetails.value.id)
  if (success === true) {
    await populateDetails(route.params.id)
    disableVoteButton(); voteIcon.value = 'check'; voteText.value = 'voted'
  } else {
    disableVoteButton(); voteIcon.value = 'error_outline'; voteText.value = 'Already Voted'
  }
}

async function reportClicked() {
  await ReportSubmission('222222222', submissionDetails.value.id)
}

function disableVoteButton() {
  voteEnabled.value = false
  document.getElementById('upvoteBtn')?.classList.add('disabled')
}
</script>

<style scoped>
.details-page { padding: 2rem; display: flex; justify-content: center; }

.details-container {
  width: 100%; max-width: 780px;
  display: flex; flex-direction: column; gap: 1.5rem;
}

.title-card {
  padding: 1.25rem 2rem;
  border-radius: var(--radius-md); background: var(--bg);
  box-shadow: var(--neu-out); text-align: center;
}
.submission-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }

.video-wrapper {
  width: 100%; aspect-ratio: 16/9;
  border-radius: var(--radius-md); overflow: hidden;
  box-shadow: var(--neu-out);
}

.action-row { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; }
</style>
