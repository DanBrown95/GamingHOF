<template>
  <div class="share-wrap">
    <button class="share-btn" @click="share" :title="copied ? 'Copied!' : 'Share'">
      <span class="material-icons">{{ copied ? 'check' : 'share' }}</span>
      <span class="btn-text">{{ copied ? 'Copied!' : 'Share' }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(false)

async function share() {
  const url = window.location.href
  if (navigator.share) {
    try { await navigator.share({ title: document.title, url }) } catch (_) { console.warn('Share cancelled or failed') }
  } else {
    await navigator.clipboard.writeText(url)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<style scoped>
.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius-xl);
  background: var(--bg);
  box-shadow: var(--neu-out);
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: box-shadow var(--transition), transform var(--transition);
}

.share-btn .material-icons {
  font-size: 1.2rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.btn-text {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.share-btn:hover {
  transform: translateY(-1px);
  box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light);
}

.share-btn:hover .material-icons {
  color: var(--accent-dark);
}

.share-btn:active {
  box-shadow: var(--neu-in);
  transform: translateY(0);
}
</style>
