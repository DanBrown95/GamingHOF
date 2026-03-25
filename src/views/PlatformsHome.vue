<template>
  <div class="platforms-page">
    <div class="page-header">
      <div class="header-icon">
        <span class="material-icons">sports_esports</span>
      </div>
      <div>
        <h1 class="page-title">Platforms</h1>
        <p class="page-subtitle">Vote for this month's top clip on each platform</p>
      </div>
    </div>

    <!-- Platform filter pills -->
    <div class="filter-row">
      <button
        v-for="f in filters"
        :key="f.id ?? 'all'"
        class="pill"
        :class="{ active: activePlatform === f.id }"
        @click="activePlatform = f.id"
      >
        <span class="material-icons pill-icon">{{ f.icon }}</span>
        {{ f.label }}
      </button>
    </div>

    <div v-if="loading" class="loading-grid">
      <div v-for="i in 8" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else-if="filteredSubmissions.length === 0" class="empty-state">
      <span class="material-icons empty-icon">sports_esports</span>
      <p>No submissions for this month yet</p>
    </div>

    <div v-else class="submissions-grid">
      <div class="grid-slot" v-for="item in filteredSubmissions" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="game" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Submission from '@/components/submission/Submission.vue'
import { GetArchive } from '@/store/submission/repository.js'

const filters = [
  { id: null, label: 'All',         icon: 'apps' },
  { id: 1,    label: 'XBOX',        icon: 'sports_esports' },
  { id: 2,    label: 'PlayStation', icon: 'sports_esports' },
  { id: 4,    label: 'PC',          icon: 'computer' },
  { id: 8,    label: 'Switch',      icon: 'sports_esports' },
  { id: 16,   label: 'Mobile',      icon: 'smartphone' },
]

const submissions = ref([])
const loading = ref(true)
const activePlatform = ref(null)

const filteredSubmissions = computed(() => {
  if (activePlatform.value === null) return submissions.value
  return submissions.value.filter(s => s.platformId === activePlatform.value)
})

onMounted(async () => {
  const now = new Date()
  const data = await GetArchive({ month: now.getMonth() + 1, year: now.getFullYear() })
  submissions.value = data || []
  loading.value = false
})
</script>

<style scoped>
.platforms-page { padding: 2rem 2rem 3rem; }

.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); margin-top: 0.125rem; }

.filter-row { display: flex; flex-wrap: wrap; gap: 0.625rem; margin-bottom: 1.75rem; }

.pill {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xl); font-size: 0.825rem; font-weight: 600;
  color: var(--text-secondary); background: var(--bg); box-shadow: var(--neu-out);
  cursor: pointer; border: none; font-family: inherit;
  transition: box-shadow var(--transition), color var(--transition);
}
.pill-icon { font-size: 1rem; }
.pill.active { box-shadow: var(--neu-in); color: var(--accent-dark); }
.pill:hover:not(.active) { color: var(--text-primary); }

.submissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.grid-slot { aspect-ratio: 16/9; }

.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.skeleton-card { aspect-ratio: 16/9; border-radius: var(--radius-md); background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); }
.empty-icon { font-size: 2.5rem; }
</style>
