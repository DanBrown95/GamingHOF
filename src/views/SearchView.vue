<template>
  <div class="search-page">
    <div class="page-header">
      <div class="header-icon"><span class="material-icons">search</span></div>
      <div>
        <h1 class="page-title">Search</h1>
        <p class="page-subtitle">Find clips by title, game, or creator</p>
      </div>
    </div>

    <div class="search-bar-wrap">
      <div class="search-bar">
        <span class="material-icons search-icon">search</span>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Search clips, games, creators..."
          class="search-input"
          @keydown.enter="doSearch"
        />
        <button v-if="query" class="clear-btn" @click="query = ''; results = []">
          <span class="material-icons">close</span>
        </button>
      </div>
      <button class="search-btn" @click="doSearch" :disabled="!query.trim()">Search</button>
    </div>

    <!-- Filters -->
    <div class="filter-row">
      <button v-for="f in platformFilters" :key="f.id" class="pill" :class="{ active: platformId === f.id }" @click="platformId = f.id">{{ f.label }}</button>
    </div>

    <!-- Results -->
    <div v-if="loading" class="loading-grid">
      <div v-for="i in 8" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else-if="searched && results.length === 0" class="empty-state">
      <span class="material-icons empty-icon">search_off</span>
      <p>No results for "{{ lastQuery }}"</p>
    </div>

    <div v-else-if="results.length > 0" class="results-header">
      <span class="results-count">{{ results.length }} results for "{{ lastQuery }}"</span>
    </div>

    <div v-if="results.length > 0" class="results-grid">
      <div class="grid-slot" v-for="item in results" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="game" />
      </div>
    </div>

    <div v-if="!searched" class="idle-state">
      <span class="material-icons idle-icon">manage_search</span>
      <p>Start typing to search the library</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Submission from '@/components/submission/Submission.vue'
import { SearchSubmissions } from '@/store/submission/repository.js'

const route = useRoute()
const query = ref('')
const lastQuery = ref('')
const results = ref([])
const loading = ref(false)
const searched = ref(false)
const platformId = ref(null)
const inputRef = ref(null)

const platformFilters = [
  { id: null, label: 'All Platforms' },
  { id: 1,    label: 'XBOX' },
  { id: 2,    label: 'PlayStation' },
  { id: 4,    label: 'PC' },
  { id: 8,    label: 'Switch' },
  { id: 16,   label: 'Mobile' },
]

async function doSearch() {
  if (!query.value.trim()) return
  loading.value = true
  searched.value = true
  lastQuery.value = query.value
  const data = await SearchSubmissions({ query: query.value, platformId: platformId.value })
  results.value = data || []
  loading.value = false
}

onMounted(() => {
  if (route.query.q) {
    query.value = route.query.q
    doSearch()
  } else {
    inputRef.value?.focus()
  }
})
</script>

<style scoped>
.search-page { padding: 2rem 2rem 3rem; }

.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.search-bar-wrap { display: flex; gap: 0.75rem; margin-bottom: 1rem; }

.search-bar {
  flex: 1;
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0 1rem;
  border-radius: var(--radius-xl);
  background: var(--bg);
  box-shadow: var(--neu-in);
}
.search-icon { font-size: 1.2rem; color: var(--text-muted); flex-shrink: 0; }
.search-input {
  flex: 1; border: none; background: transparent; outline: none;
  font-family: inherit; font-size: 0.9rem; color: var(--text-primary);
  padding: 0.75rem 0;
}
.search-input::placeholder { color: var(--text-muted); }
.clear-btn { display: flex; align-items: center; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 0; }
.clear-btn .material-icons { font-size: 1.1rem; }

.search-btn {
  padding: 0 1.5rem;
  border-radius: var(--radius-xl);
  background: var(--bg);
  box-shadow: var(--neu-out);
  font-family: inherit; font-size: 0.825rem; font-weight: 600;
  color: var(--accent-dark); border: none; cursor: pointer;
  transition: box-shadow var(--transition), transform var(--transition);
}
.search-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light); }
.search-btn:disabled { opacity: 0.4; cursor: default; }

.filter-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.pill { padding: 0.35rem 0.875rem; border-radius: var(--radius-xl); font-size: 0.775rem; font-weight: 600; color: var(--text-secondary); background: var(--bg); box-shadow: var(--neu-out); cursor: pointer; border: none; font-family: inherit; transition: box-shadow var(--transition), color var(--transition); }
.pill.active { box-shadow: var(--neu-in); color: var(--accent-dark); }

.results-header { margin-bottom: 1rem; }
.results-count { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

.results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.grid-slot { aspect-ratio: 16/9; }

.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.skeleton-card { aspect-ratio: 16/9; border-radius: var(--radius-md); background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state, .idle-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); text-align: center; margin-top: 1rem; }
.empty-icon, .idle-icon { font-size: 2.5rem; }
</style>
