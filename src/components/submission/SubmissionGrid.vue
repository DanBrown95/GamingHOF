<template>
  <div class="grid-container">
    <div class="submissions-grid" v-if="filteredItems.length > 0">
      <div class="grid-slot" v-for="item in filteredItems" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="game" />
      </div>
    </div>

    <div v-if="filteredItems.length < 1" class="empty-state">
      <span class="material-icons empty-icon">inbox</span>
      <p class="empty-text">No submissions found</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import Submission from '@/components/submission/Submission.vue'

const props = defineProps(['items', 'filter', 'gameIdFilter'])

const filteredItems = computed(() => {
  if (props.filter === 'HOF WINNERS') {
    return props.items.filter(item => item.rank === 1)
  }

  const byPlatform = props.filter && props.filter !== '' && props.filter !== 'ALL'
  const byGame     = props.gameIdFilter && props.gameIdFilter > 0

  return props.items.filter(item => {
    const platformMatch = !byPlatform || item.platform.name.toUpperCase() === props.filter
    const gameMatch     = !byGame     || item.game.id == props.gameIdFilter
    return platformMatch && gameMatch
  })
})
</script>

<style scoped>
.grid-container { padding: 1.5rem 1.5rem 3rem; }

.submissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
.grid-slot { aspect-ratio: 16/9; }

.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 4rem 2rem; gap: 0.75rem;
  border-radius: var(--radius-md); background: var(--bg);
  box-shadow: var(--neu-in); margin-top: 1rem;
}
.empty-icon { font-size: 2.5rem; color: var(--text-muted); }
.empty-text { font-size: 0.875rem; font-weight: 500; color: var(--text-muted); }
</style>
