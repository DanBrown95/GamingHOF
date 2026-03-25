<template>
  <div class="leaderboard-page">
    <div class="page-header">
      <div class="header-icon"><span class="material-icons">leaderboard</span></div>
      <div>
        <h1 class="page-title">Leaderboard</h1>
        <p class="page-subtitle">Top clips ranked by votes</p>
      </div>
    </div>

    <!-- Platform filter -->
    <div class="filter-row">
      <button v-for="f in filters" :key="f.label" class="pill" :class="{ active: activePlatform === f.id }" @click="selectPlatform(f.id)">
        {{ f.label }}
      </button>
    </div>

    <div v-if="loading" class="loading-list">
      <div v-for="i in 10" :key="i" class="skeleton-row"></div>
    </div>

    <div v-else class="leaderboard-list">
      <router-link
        v-for="(item, index) in entries"
        :key="item.id"
        :to="{ name: 'submissionDetails', params: { id: item.id } }"
        class="entry"
      >
        <div class="rank-badge" :class="rankClass(index)">{{ index + 1 }}</div>
        <img class="entry-thumb" :src="item.image || fallback" loading="lazy" />
        <div class="entry-info">
          <p class="entry-name">{{ item.name }}</p>
          <p class="entry-meta">
            <span>{{ item.creator.gamertag }}</span>
            <span class="sep">·</span>
            <span>{{ item.game.name }}</span>
            <span class="sep">·</span>
            <span>{{ item.platform.name }}</span>
          </p>
        </div>
        <div class="entry-votes">
          <span class="material-icons vote-icon">thumb_up</span>
          <span class="vote-count">{{ item.votes }}</span>
        </div>
      </router-link>

      <div v-if="entries.length === 0" class="empty-state">
        <span class="material-icons empty-icon">leaderboard</span>
        <p>No submissions found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { GetLeaderboard } from '@/store/submission/repository.js'

const route = useRoute()
const entries = ref([])
const loading = ref(true)
const activePlatform = ref(null)
const fallback = require('@/assets/video-fallback.png')

const filters = [
  { id: null, label: 'All' },
  { id: 1,    label: 'XBOX' },
  { id: 2,    label: 'PlayStation' },
  { id: 4,    label: 'PC' },
  { id: 8,    label: 'Switch' },
  { id: 16,   label: 'Mobile' },
]

async function load() {
  loading.value = true
  const data = await GetLeaderboard(activePlatform.value, 50)
  entries.value = data || []
  loading.value = false
}

function selectPlatform(id) {
  activePlatform.value = id
}

function rankClass(index) {
  if (index === 0) return 'gold'
  if (index === 1) return 'silver'
  if (index === 2) return 'bronze'
  return ''
}

onMounted(() => {
  if (route.query.platformId) activePlatform.value = Number(route.query.platformId)
  load()
})

watch(activePlatform, load)
</script>

<style scoped>
.leaderboard-page { padding: 2rem 2rem 3rem; }

.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.filter-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }

.pill {
  padding: 0.4rem 1rem; border-radius: var(--radius-xl);
  font-size: 0.8rem; font-weight: 600; color: var(--text-secondary);
  background: var(--bg); box-shadow: var(--neu-out);
  cursor: pointer; border: none; font-family: inherit;
  transition: box-shadow var(--transition), color var(--transition);
}
.pill.active { box-shadow: var(--neu-in); color: var(--accent-dark); }
.pill:hover:not(.active) { color: var(--text-primary); }

.leaderboard-list { display: flex; flex-direction: column; gap: 0.625rem; }

.entry {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-out);
  text-decoration: none; color: inherit;
  transition: transform var(--transition), box-shadow var(--transition);
}
.entry:hover { transform: translateX(4px); box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light); }

.rank-badge {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.875rem; font-weight: 700; flex-shrink: 0;
  background: var(--bg); box-shadow: var(--neu-in-sm);
  color: var(--text-secondary);
}
.rank-badge.gold   { background: #fef3c7; color: #d97706; box-shadow: none; }
.rank-badge.silver { background: #f1f5f9; color: #64748b; box-shadow: none; }
.rank-badge.bronze { background: #fef3c7; color: #b45309; box-shadow: none; }

.entry-thumb { width: 80px; height: 45px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0; }

.entry-info { flex: 1; min-width: 0; }
.entry-name { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.entry-meta { font-size: 0.775rem; color: var(--text-muted); margin-top: 0.15rem; }
.sep { margin: 0 0.3rem; opacity: 0.5; }

.entry-votes { display: flex; align-items: center; gap: 0.3rem; flex-shrink: 0; }
.vote-icon { font-size: 1rem; color: var(--accent-dark); }
.vote-count { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); }

.loading-list { display: flex; flex-direction: column; gap: 0.625rem; }
.skeleton-row { height: 70px; border-radius: var(--radius-md); background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); }
.empty-icon { font-size: 2.5rem; }
</style>
