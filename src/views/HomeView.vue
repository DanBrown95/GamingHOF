<template>
  <div class="home">
    <div class="home-header">
      <h1 class="home-title">Browse Submissions</h1>
      <p class="home-subtitle">Top clips from the gaming community, ranked by votes</p>
    </div>

    <!-- Trending row -->
    <div class="platform-row" v-if="trendingItems.length > 0">
      <SubmissionRow
        :items="trendingItems"
        label="Trending Now"
        sortBy="votes"
        subTopDisplayType="votes"
        subBottomDisplayType="name"
      />
    </div>

    <!-- Per-platform rows -->
    <div
      v-for="items in groupedSubmissions"
      :key="items[0]?.platformId"
      class="platform-row"
    >
      <SubmissionRow
        :items="items"
        :label="platformIdToPlatform(items[0].platformId)"
        sortBy="votes"
        subTopDisplayType="rank"
        subBottomDisplayType="name"
        limit="8"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import SubmissionRow from '@/components/submission/SubmissionRow.vue'
import { GetAllSubmissionsIncludingCreator, GetTrending } from '@/store/submission/repository.js'

const groupedSubmissions = reactive({})
const trendingItems = ref([])

onMounted(async () => {
  const [all, trending] = await Promise.all([
    GetAllSubmissionsIncludingCreator(),
    GetTrending(10)
  ])

  const byGroup = fn => [(acc, item) => ((acc[fn(item)] ??= []).push(item), acc), {}]
  Object.assign(groupedSubmissions, (all || []).reduce(...byGroup(x => x.platformId)))
  trendingItems.value = trending || []
})

function platformIdToPlatform(id) {
  const map = { 1: 'XBOX', 2: 'PlayStation', 4: 'PC', 8: 'Switch', 16: 'Mobile' }
  return map[id] ?? 'Other'
}
</script>

<style scoped>
.home { padding: 2rem 2rem 3rem; }

.home-header { margin-bottom: 2.5rem; }
.home-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin-bottom: 0.25rem; }
.home-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.platform-row { height: 220px; margin-bottom: 2.5rem; }
</style>
