<template>
  <button class="follow-btn" :class="{ following }" @click="toggle" :disabled="loading || !isLoggedIn">
    <span class="material-icons">{{ following ? 'person_remove' : 'person_add' }}</span>
    <span class="btn-text">{{ following ? 'Following' : 'Follow' }}</span>
  </button>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { FollowCreator, UnfollowCreator, IsFollowing } from '@/store/creator/repository.js'

const props = defineProps({ creatorId: String })
const store = useStore()
const isLoggedIn = computed(() => store.state.isAuthenticated)
const followerId = '222222222'

const following = ref(false)
const loading = ref(false)

onMounted(async () => {
  if (!isLoggedIn.value || !props.creatorId) return
  following.value = await IsFollowing(followerId, props.creatorId) || false
})

async function toggle() {
  if (!isLoggedIn.value || loading.value) return
  loading.value = true
  if (following.value) {
    await UnfollowCreator(followerId, props.creatorId)
    following.value = false
  } else {
    await FollowCreator(followerId, props.creatorId)
    following.value = true
  }
  loading.value = false
}
</script>

<style scoped>
.follow-btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-xl);
  background: var(--bg); box-shadow: var(--neu-out);
  border: none; cursor: pointer; font-family: inherit;
  transition: box-shadow var(--transition), transform var(--transition), background var(--transition);
}
.follow-btn .material-icons { font-size: 1.1rem; color: var(--text-secondary); transition: color 0.2s; }
.btn-text { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); transition: color 0.2s; }
.follow-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 8px 8px 18px var(--shadow-dark), -8px -8px 18px var(--shadow-light); }
.follow-btn:disabled { opacity: 0.4; cursor: default; }

.follow-btn.following .material-icons,
.follow-btn.following .btn-text { color: var(--accent-dark); }
.follow-btn.following { box-shadow: var(--neu-in); }
</style>
