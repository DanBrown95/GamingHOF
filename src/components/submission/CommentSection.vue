<template>
  <div class="comment-section">
    <div class="section-header">
      <span class="accent-bar"></span>
      <h3 class="section-title">Comments <span class="count" v-if="comments.length">({{ comments.length }})</span></h3>
    </div>

    <!-- Add comment (logged in only) -->
    <div class="add-comment" v-if="isLoggedIn">
      <div class="input-row">
        <textarea
          v-model="newBody"
          class="comment-input"
          placeholder="Write a comment..."
          rows="2"
          maxlength="2000"
          @keydown.ctrl.enter="postComment"
        ></textarea>
        <button class="post-btn" @click="postComment" :disabled="!newBody.trim() || posting">
          <span class="material-icons">send</span>
        </button>
      </div>
    </div>

    <!-- Comment list -->
    <div class="comment-list" v-if="comments.length > 0">
      <div v-for="c in comments" :key="c.id" class="comment">
        <div class="comment-avatar">
          <span class="material-icons">person</span>
        </div>
        <div class="comment-body-wrap">
          <div class="comment-header">
            <span class="gamertag">{{ c.gamertag }}</span>
            <span class="posted">{{ formatDate(c.posted) }}</span>
            <button v-if="isLoggedIn && c.userId === currentUserId" class="delete-btn" @click="deleteComment(c.id)">
              <span class="material-icons">delete_outline</span>
            </button>
          </div>
          <p class="comment-text">{{ c.body }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="no-comments">
      <span class="material-icons">chat_bubble_outline</span>
      <p>No comments yet. Be the first!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps } from 'vue'
import { useStore } from 'vuex'
import { GetComments, AddComment, DeleteComment } from '@/store/comment/repository.js'

const props = defineProps({ submissionId: String })
const store = useStore()
const isLoggedIn = computed(() => store.state.isAuthenticated)
const currentUserId = '222222222'

const comments = ref([])
const newBody = ref('')
const posting = ref(false)
const loading = ref(true)

onMounted(async () => {
  const data = await GetComments(props.submissionId)
  comments.value = data || []
  loading.value = false
})

async function postComment() {
  if (!newBody.value.trim() || posting.value) return
  posting.value = true
  await AddComment({ submissionId: props.submissionId, userId: currentUserId, body: newBody.value.trim() })
  newBody.value = ''
  const data = await GetComments(props.submissionId)
  comments.value = data || []
  posting.value = false
}

async function deleteComment(id) {
  await DeleteComment(id, currentUserId)
  comments.value = comments.value.filter(c => c.id !== id)
}

function formatDate(d) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.comment-section { display: flex; flex-direction: column; gap: 1rem; }

.section-header { display: flex; align-items: center; gap: 0.625rem; }
.accent-bar { display: block; width: 4px; height: 1.25rem; border-radius: 2px; background: var(--accent); flex-shrink: 0; }
.section-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; }
.count { font-weight: 400; color: var(--text-muted); }

/* Add comment */
.input-row { display: flex; gap: 0.625rem; align-items: flex-end; }

.comment-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-in);
  border: none; outline: none; resize: none;
  font-family: inherit; font-size: 0.875rem; color: var(--text-primary);
  line-height: 1.5;
}
.comment-input::placeholder { color: var(--text-muted); }

.post-btn {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--bg); box-shadow: var(--neu-out);
  display: flex; align-items: center; justify-content: center;
  border: none; cursor: pointer; flex-shrink: 0;
  transition: box-shadow var(--transition), transform var(--transition);
}
.post-btn .material-icons { font-size: 1.1rem; color: var(--accent-dark); }
.post-btn:hover:not(:disabled) { transform: translateY(-1px); }
.post-btn:disabled { opacity: 0.4; cursor: default; }

/* Comment list */
.comment-list { display: flex; flex-direction: column; gap: 0.875rem; }

.comment {
  display: flex; gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: var(--radius-md);
  background: var(--bg); box-shadow: var(--neu-in-sm);
}

.comment-avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--bg); box-shadow: var(--neu-out);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.comment-avatar .material-icons { font-size: 1.1rem; color: var(--text-muted); }

.comment-body-wrap { flex: 1; min-width: 0; }

.comment-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
.gamertag { font-size: 0.825rem; font-weight: 700; color: var(--text-primary); }
.posted { font-size: 0.75rem; color: var(--text-muted); margin-left: auto; }
.delete-btn { display: flex; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 0; transition: color 0.2s; }
.delete-btn:hover { color: #dc2626; }
.delete-btn .material-icons { font-size: 1rem; }

.comment-text { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

.no-comments { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.875rem; padding: 1rem 0; }
.no-comments .material-icons { font-size: 1.2rem; }
</style>
