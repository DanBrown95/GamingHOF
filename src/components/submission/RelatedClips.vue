<template>
  <div class="related-section" v-if="clips.length > 0">
    <div class="section-header">
      <span class="accent-bar"></span>
      <h3 class="section-title">Related Clips</h3>
    </div>
    <div class="clips-grid">
      <div class="clip-slot" v-for="item in clips" :key="item.id">
        <submission :model="item" bottomDisplayType="name" topDisplayType="game" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import Submission from '@/components/submission/Submission.vue'
import { GetRelated } from '@/store/submission/repository.js'

const props = defineProps({
  submissionId: String,
  gameId: Number,
  creatorId: String
})

const clips = ref([])

async function load() {
  if (!props.submissionId) return
  const data = await GetRelated({
    submissionId: props.submissionId,
    gameId: props.gameId,
    creatorId: props.creatorId
  })
  clips.value = data || []
}

onMounted(load)
watch(() => props.submissionId, load)
</script>

<style scoped>
.related-section { display: flex; flex-direction: column; gap: 1rem; }

.section-header { display: flex; align-items: center; gap: 0.625rem; }
.accent-bar { display: block; width: 4px; height: 1.25rem; border-radius: 2px; background: var(--accent); flex-shrink: 0; }
.section-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; }

.clips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.clip-slot { aspect-ratio: 16/9; }
</style>
