<template>
  <div class="game-page">
    <div class="page-header">
      <div class="header-icon"><span class="material-icons">videogame_asset</span></div>
      <div>
        <h1 class="page-title">{{ gameName }}</h1>
        <p class="page-subtitle">All clips for this game</p>
      </div>
    </div>

    <div v-if="loading" class="loading-grid">
      <div v-for="i in 8" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else-if="submissions.length === 0" class="empty-state">
      <span class="material-icons empty-icon">videogame_asset</span>
      <p>No clips for this game yet</p>
    </div>

    <div v-else class="results-grid">
      <div class="grid-slot" v-for="item in submissions" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="rank" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Submission from '@/components/submission/Submission.vue'
import { SearchSubmissions } from '@/store/submission/repository.js'

const route = useRoute()
const submissions = ref([])
const loading = ref(true)

const gameId = computed(() => Number(route.params.id))
const gameName = computed(() => submissions.value[0]?.game?.name || 'Game')

onMounted(async () => {
  const data = await SearchSubmissions({ query: '', gameId: gameId.value })
  submissions.value = data || []
  loading.value = false
})
</script>

<style scoped>
.game-page { padding: 2rem 2rem 3rem; }
.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }
.results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.grid-slot { aspect-ratio: 16/9; }
.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.skeleton-card { aspect-ratio: 16/9; border-radius: var(--radius-md); background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); }
.empty-icon { font-size: 2.5rem; }
</style>
