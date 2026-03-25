<template>
  <div class="hof-page">
    <div class="page-header">
      <div class="header-icon">
        <span class="material-icons">workspace_premium</span>
      </div>
      <div>
        <h1 class="page-title">Hall of Fame</h1>
        <p class="page-subtitle">The most recent #1 winner from each platform</p>
      </div>
    </div>

    <div v-if="loading" class="loading-grid">
      <div v-for="i in 5" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else-if="hofEntries.length === 0" class="empty-state">
      <span class="material-icons empty-icon">workspace_premium</span>
      <p>No Hall of Fame entries yet</p>
    </div>

    <div v-else class="hof-grid">
      <router-link
        v-for="entry in hofEntries"
        :key="entry.id"
        :to="{ name: 'submissionDetails', params: { id: entry.id } }"
        class="hof-card"
      >
        <div class="hof-card-inner">
          <div class="platform-badge">{{ entry.platform.name }}</div>
          <img class="hof-thumb" :src="entry.image || fallback" loading="lazy" />
          <div class="hof-overlay">
            <div class="hof-rank">
              <span class="material-icons trophy">emoji_events</span>
              <span>#{{ entry.rank }}</span>
            </div>
            <h3 class="hof-name">{{ entry.name }}</h3>
            <div class="hof-meta">
              <span class="material-icons sm">person</span>{{ entry.creator.gamertag }}
              <span class="sep">·</span>
              <span class="material-icons sm">thumb_up</span>{{ entry.votes }} votes
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetHof } from '@/store/submission/repository.js'

const hofEntries = ref([])
const loading = ref(true)
const fallback = require('@/assets/video-fallback.png')

onMounted(async () => {
  const data = await GetHof()
  hofEntries.value = data || []
  loading.value = false
})
</script>

<style scoped>
.hof-page { padding: 2rem 2rem 3rem; }

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.header-icon {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--bg);
  box-shadow: var(--neu-out);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon .material-icons { font-size: 1.75rem; color: #d97706; }

.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); margin-top: 0.125rem; }

/* Grid */
.hof-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.hof-card { display: block; text-decoration: none; }

.hof-card-inner {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--bg);
  box-shadow: var(--neu-out-lg);
  transition: transform var(--transition), box-shadow var(--transition);
}

.hof-card:hover .hof-card-inner {
  transform: translateY(-4px);
  box-shadow: 12px 12px 28px var(--shadow-dark), -12px -12px 28px var(--shadow-light);
}

.hof-thumb { width: 100%; height: 100%; object-fit: cover; display: block; }

.platform-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0,0,0,0.7);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
  backdrop-filter: blur(4px);
}

.hof-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1rem 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
  color: #fff;
}

.hof-rank {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.25rem;
}

.trophy { font-size: 1rem; }

.hof-name {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.375rem;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

.hof-meta {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
}

.hof-meta .sm { font-size: 0.875rem; }
.sep { margin: 0 0.25rem; opacity: 0.5; }

/* Skeleton */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.skeleton-card {
  aspect-ratio: 16/9;
  border-radius: var(--radius-md);
  background: linear-gradient(90deg, var(--shadow-dark) 25%, var(--bg) 50%, var(--shadow-dark) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  border-radius: var(--radius-md);
  box-shadow: var(--neu-in);
  color: var(--text-muted);
}
.empty-icon { font-size: 3rem; }
</style>
