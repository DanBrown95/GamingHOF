<template>
  <div class="submit-page">
    <div class="page-header">
      <div class="header-icon"><span class="material-icons">add_circle</span></div>
      <div>
        <h1 class="page-title">Submit a Clip</h1>
        <p class="page-subtitle">Share your best gaming moment</p>
      </div>
    </div>

    <div class="form-card" v-if="!submitted">
      <div class="field">
        <label class="field-label">Clip Title</label>
        <input v-model="form.name" type="text" class="field-input" placeholder="e.g. Insane triple collateral" maxlength="100" />
        <span class="char-count">{{ form.name.length }}/100</span>
      </div>

      <div class="field">
        <label class="field-label">Platform</label>
        <div class="select-wrap">
          <select v-model="form.platformId" class="field-select" @change="form.gameId = null; loadGames()">
            <option disabled :value="null">Select platform</option>
            <option v-for="p in platforms" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
          <span class="material-icons select-arrow">expand_more</span>
        </div>
      </div>

      <div class="field">
        <label class="field-label">Game</label>
        <div class="select-wrap">
          <select v-model="form.gameId" class="field-select" :disabled="!form.platformId">
            <option disabled :value="null">{{ form.platformId ? 'Select game' : 'Select a platform first' }}</option>
            <option v-for="g in games" :key="g.id" :value="g.id">{{ g.name }}</option>
          </select>
          <span class="material-icons select-arrow">expand_more</span>
        </div>
      </div>

      <div class="field">
        <label class="field-label">Video URL <span class="optional">(m3u8 / mp4)</span></label>
        <input v-model="form.url" type="url" class="field-input" placeholder="https://..." />
      </div>

      <div class="field">
        <label class="field-label">Thumbnail Image URL <span class="optional">(optional)</span></label>
        <input v-model="form.image" type="url" class="field-input" placeholder="https://..." />
        <div v-if="form.image" class="thumb-preview">
          <img :src="form.image" alt="Preview" @error="form.image = ''" />
        </div>
      </div>

      <div class="form-error" v-if="error">{{ error }}</div>

      <button class="submit-btn" @click="submitClip" :disabled="submitting || !isValid">
        <span class="material-icons" v-if="!submitting">send</span>
        <span v-if="submitting">Submitting...</span>
        <span v-else>Submit Clip</span>
      </button>
    </div>

    <!-- Success state -->
    <div v-else class="success-card">
      <span class="material-icons success-icon">check_circle</span>
      <h2 class="success-title">Clip Submitted!</h2>
      <p class="success-body">Your clip has been submitted for review. It will appear once approved.</p>
      <button class="pill-btn" @click="resetForm">Submit another</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SubmitClip } from '@/store/submission/repository.js'
import { GetGamesByPlatform } from '@/store/game/repository.js'

const platforms = [
  { id: 1,  name: 'XBOX' },
  { id: 2,  name: 'PlayStation' },
  { id: 4,  name: 'PC' },
  { id: 8,  name: 'Switch' },
  { id: 16, name: 'Mobile' },
]

const form = ref({ name: '', platformId: null, gameId: null, url: '', image: '', userId: '222222222' })
const games = ref([])
const submitted = ref(false)
const submitting = ref(false)
const error = ref('')

const isValid = computed(() =>
  form.value.name.trim().length > 0 &&
  form.value.platformId !== null &&
  form.value.gameId !== null &&
  form.value.url.trim().length > 0
)

async function loadGames() {
  if (!form.value.platformId) return
  games.value = await GetGamesByPlatform(form.value.platformId) || []
}

async function submitClip() {
  if (!isValid.value) return
  submitting.value = true
  error.value = ''
  try {
    await SubmitClip(form.value)
    submitted.value = true
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  }
  submitting.value = false
}

function resetForm() {
  form.value = { name: '', platformId: null, gameId: null, url: '', image: '', userId: '222222222' }
  games.value = []
  submitted.value = false
  error.value = ''
}
</script>

<style scoped>
.submit-page { padding: 2rem 2rem 3rem; display: flex; flex-direction: column; align-items: center; }
.page-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; width: 100%; max-width: 560px; }
.header-icon { width: 52px; height: 52px; border-radius: var(--radius-md); background: var(--bg); box-shadow: var(--neu-out); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.header-icon .material-icons { font-size: 1.75rem; color: var(--accent-dark); }
.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; }
.page-subtitle { font-size: 0.875rem; color: var(--text-muted); }

.form-card {
  width: 100%; max-width: 560px;
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: var(--bg);
  box-shadow: var(--neu-out-lg);
  display: flex; flex-direction: column; gap: 1.25rem;
}

.field { display: flex; flex-direction: column; gap: 0.375rem; position: relative; }
.field-label { font-size: 0.775rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
.optional { font-weight: 400; text-transform: none; letter-spacing: 0; }

.field-input {
  padding: 0.75rem 1rem;
  border: none; outline: none; border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-in);
  font-family: inherit; font-size: 0.9rem; color: var(--text-primary);
}
.field-input::placeholder { color: var(--text-muted); }
.char-count { font-size: 0.7rem; color: var(--text-muted); text-align: right; }

.select-wrap { position: relative; }
.field-select {
  width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: none; outline: none; border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-in);
  font-family: inherit; font-size: 0.9rem; color: var(--text-primary);
  appearance: none; cursor: pointer;
}
.field-select:disabled { opacity: 0.5; cursor: default; }
.select-arrow { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-muted); font-size: 1.2rem; }

.thumb-preview { margin-top: 0.5rem; border-radius: var(--radius-sm); overflow: hidden; max-height: 120px; }
.thumb-preview img { width: 100%; height: 100%; object-fit: cover; }

.form-error { padding: 0.75rem 1rem; border-radius: var(--radius-sm); background: #fee2e2; color: #dc2626; font-size: 0.825rem; }

.submit-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.875rem 2rem;
  border-radius: var(--radius-xl);
  background: var(--bg); box-shadow: var(--neu-out);
  border: none; cursor: pointer; font-family: inherit;
  font-size: 0.875rem; font-weight: 700;
  color: var(--accent-dark);
  transition: box-shadow var(--transition), transform var(--transition);
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light); }
.submit-btn:active:not(:disabled) { box-shadow: var(--neu-in); transform: translateY(0); }
.submit-btn:disabled { opacity: 0.5; cursor: default; }

.success-card {
  width: 100%; max-width: 400px;
  padding: 3rem 2rem;
  border-radius: var(--radius-lg); background: var(--bg); box-shadow: var(--neu-out-lg);
  display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center;
}
.success-icon { font-size: 3.5rem; color: var(--accent-dark); }
.success-title { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
.success-body { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }
.pill-btn { padding: 0.6rem 1.5rem; border-radius: var(--radius-xl); background: var(--bg); box-shadow: var(--neu-out); border: none; cursor: pointer; font-family: inherit; font-size: 0.825rem; font-weight: 600; color: var(--accent-dark); margin-top: 0.5rem; transition: box-shadow var(--transition); }
.pill-btn:hover { box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light); }
</style>
