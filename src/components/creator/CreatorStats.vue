<template>
  <div class="stats-row" v-if="stats">
    <div class="stat-card">
      <span class="stat-value">{{ stats.totalSubmissions }}</span>
      <span class="stat-label">Clips</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{{ stats.totalVotes }}</span>
      <span class="stat-label">Total Votes</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{{ stats.hofWins }}</span>
      <span class="stat-label">HOF Wins</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">{{ stats.followerCount }}</span>
      <span class="stat-label">Followers</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import { GetCreatorStats } from '@/store/creator/repository.js'

const props = defineProps({ creatorId: String })
const stats = ref(null)

async function load() {
  if (!props.creatorId) return
  stats.value = await GetCreatorStats(props.creatorId)
}

onMounted(load)
watch(() => props.creatorId, load)
</script>

<style scoped>
.stats-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.5rem;
}

.stat-card {
  flex: 1;
  min-width: 80px;
  display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
  padding: 1rem 0.75rem;
  border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-out);
}

.stat-value { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); line-height: 1; }
.stat-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); }
</style>
