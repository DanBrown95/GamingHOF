<template>
  <div class="archive-page">
    <div class="page-header">
      <div class="header-icon"><span class="material-icons">history</span></div>
      <div>
        <h1 class="page-title">Archive</h1>
        <p class="page-subtitle">The #1 clip per platform from each past month</p>
      </div>
    </div>

    <!-- Month picker -->
    <div class="month-picker" v-if="months.length > 0">
      <button
        v-for="m in months"
        :key="`${m.year}-${m.month}`"
        class="month-pill"
        :class="{ active: activeMonth === m }"
        @click="selectMonth(m)"
      >
        {{ monthName(m.month) }} {{ m.year }}
        <span class="sub-count">{{ m.submissionCount }}</span>
      </button>
    </div>

    <div v-if="loading" class="loading-grid">
      <div v-for="i in 8" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else-if="results.length === 0 && activeMonth" class="empty-state">
      <span class="material-icons empty-icon">history</span>
      <p>No submissions for this month</p>
    </div>

    <div v-else class="results-grid">
      <div class="grid-slot" v-for="item in results" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="rank" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Submission from '@/components/submission/Submission.vue'
import { GetArchive, GetArchiveMonths } from '@/store/submission/repository.js'

const months = ref([])
const activeMonth = ref(null)
const results = ref([])
const loading = ref(false)

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const monthName = (n) => monthNames[n - 1] || n

async function selectMonth(m) {
  activeMonth.value = m
  loading.value = true
  const data = await GetArchive({ month: m.month, year: m.year })
  results.value = data || []
  loading.value = false
}

onMounted(async () => {
  const data = await GetArchiveMonths()
  months.value = data || []
  if (months.value.length > 0) selectMonth(months.value[0])
})
</script>

<style scoped>
.archive-page { padding: 2rem 2rem 3rem; }
.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.month-picker { display: flex; flex-wrap: wrap; gap: 0.625rem; margin-bottom: 1.75rem; }
.month-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-radius: var(--radius-xl); font-size: 0.825rem; font-weight: 600;
  color: var(--text-secondary); background: var(--bg); box-shadow: var(--neu-out);
  cursor: pointer; border: none; font-family: inherit;
  transition: box-shadow var(--transition), color var(--transition);
}
.month-pill.active { box-shadow: var(--neu-in); color: var(--accent-dark); }
.month-pill:hover:not(.active) { color: var(--text-primary); }
.sub-count { font-size: 0.7rem; background: rgba(0,0,0,0.06); padding: 0.1rem 0.4rem; border-radius: 99px; color: var(--text-muted); }

.results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.grid-slot { aspect-ratio: 16/9; }

.loading-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.skeleton-card { aspect-ratio: 16/9; border-radius: var(--radius-md); background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 4rem; border-radius: var(--radius-md); box-shadow: var(--neu-in); color: var(--text-muted); }
.empty-icon { font-size: 2.5rem; }
</style>
