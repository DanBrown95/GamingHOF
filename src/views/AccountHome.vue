<template>
  <div class="account-page">
    <div class="page-header">
      <div class="header-icon">
        <span class="material-icons">account_circle</span>
      </div>
      <div>
        <h1 class="page-title">Account</h1>
        <p class="page-subtitle">Your profile and activity</p>
      </div>
    </div>

    <!-- Profile card -->
    <div class="profile-card" v-if="user">
      <div class="avatar">
        <span class="material-icons avatar-icon">person</span>
      </div>
      <div class="profile-info">
        <p class="profile-name">{{ user.name || user.nickname || 'Gamer' }}</p>
        <p class="profile-email">{{ user.email }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.key" class="tab-pill" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
        <span class="material-icons tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Vote History -->
    <div v-if="activeTab === 'votes'">
      <div v-if="loadingVotes" class="loading-text">Loading...</div>
      <div v-else-if="voteHistory.length === 0" class="empty-state">
        <span class="material-icons empty-icon">thumb_up</span>
        <p>No votes yet — go upvote some clips!</p>
      </div>
      <div v-else class="submission-grid">
        <div class="grid-slot" v-for="s in voteHistory" :key="s.id">
          <submission :model="s" bottomDisplayType="name" topDisplayType="game" />
        </div>
      </div>
    </div>

    <!-- My Submissions -->
    <div v-if="activeTab === 'submissions'">
      <div v-if="loadingSubs" class="loading-text">Loading...</div>
      <div v-else-if="mySubmissions.length === 0" class="empty-state">
        <span class="material-icons empty-icon">video_library</span>
        <p>No submissions yet — <router-link :to="{name:'submit'}" class="link">submit a clip</router-link></p>
      </div>
      <div v-else class="submission-grid">
        <div class="grid-slot" v-for="s in mySubmissions" :key="s.id">
          <submission :model="s" bottomDisplayType="name" topDisplayType="game" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import Submission from '@/components/submission/Submission.vue'
import { GetVoteHistory, GetSubmissionsByCreator } from '@/store/submission/repository.js'

const store = useStore()
const user = computed(() => store.state.user)
const activeTab = ref('votes')

const tabs = [
  { key: 'votes',       label: 'Vote History',    icon: 'thumb_up' },
  { key: 'submissions', label: 'My Submissions',  icon: 'video_library' },
]

const voteHistory   = ref([])
const mySubmissions = ref([])
const loadingVotes  = ref(true)
const loadingSubs   = ref(true)

onMounted(async () => {
  const userId = '222222222'
  const [votes, subs] = await Promise.all([
    GetVoteHistory(userId),
    GetSubmissionsByCreator(userId)
  ])
  voteHistory.value   = votes || []
  mySubmissions.value = subs  || []
  loadingVotes.value  = false
  loadingSubs.value   = false
})
</script>

<style scoped>
.account-page { padding: 2rem 2rem 3rem; }

.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.profile-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius-md);
  background: var(--bg);
  box-shadow: var(--neu-out);
  margin-bottom: 2rem;
}

.avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--bg);
  box-shadow: var(--neu-in);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.avatar-icon { font-size: 2rem; color: var(--text-muted); }
.profile-name { font-size: 1rem; font-weight: 600; color: var(--text-primary); }
.profile-email { font-size: 0.825rem; color: var(--text-muted); margin-top: 0.125rem; }

.tabs { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }

.tab-pill {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-xl);
  font-size: 0.825rem; font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg);
  box-shadow: var(--neu-out);
  cursor: pointer; border: none; font-family: inherit;
  transition: box-shadow var(--transition), color var(--transition);
}
.tab-icon { font-size: 1rem; }
.tab-pill.active { box-shadow: var(--neu-in); color: var(--accent-dark); }
.tab-pill:hover:not(.active) { color: var(--text-primary); }

.submission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.grid-slot { aspect-ratio: 16/9; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); text-align: center; }
.empty-icon { font-size: 2.5rem; }
.link { color: var(--accent-dark); font-weight: 600; }
.loading-text { color: var(--text-muted); padding: 2rem; text-align: center; font-size: 0.875rem; }
</style>
