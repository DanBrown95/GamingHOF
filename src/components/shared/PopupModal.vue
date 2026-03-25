<template>
    <transition name="modal-fade">
        <div v-if="showModal" class="modal-backdrop" @click.self="close">
            <div class="modal" role="dialog" aria-labelledby="modalTitle">
                <div class="modal-header">
                    <div class="modal-title-group">
                        <span class="material-icons title-icon">tune</span>
                        <h2 id="modalTitle">Settings</h2>
                    </div>
                    <button class="close-btn" @click="close" aria-label="Close">
                        <span class="material-icons">close</span>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="setting-row">
                        <div class="setting-info">
                            <span class="material-icons setting-icon">dark_mode</span>
                            <span class="setting-label">Dark Mode</span>
                        </div>
                        <toggle-switch v-model="darkModeState"></toggle-switch>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import ToggleSwitch from "@/components/shared/ToggleSwitch.vue"

defineProps({ showModal: Boolean })
const emit = defineEmits(['close'])

const darkModeState = ref(false)

onMounted(() => {
    darkModeState.value = localStorage.getItem("useDarkMode") === 'true';
})

function close() {
    emit('close')
}

watch(darkModeState, (newV) => {
    localStorage.setItem("useDarkMode", newV);
    document.body.classList.toggle('darkMode', newV);
})
</script>

<style>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    backdrop-filter: blur(4px);
}

.modal {
    background: var(--bg, #eef1f5);
    border-radius: var(--radius-lg, 24px);
    box-shadow: var(--neu-out-lg, 10px 10px 22px #c8ccd2, -10px -10px 22px #ffffff);
    width: 380px;
    max-width: calc(100vw - 2rem);
    overflow: hidden;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(0,0,0,0.06);
}

.modal-title-group {
    display: flex;
    align-items: center;
    gap: 0.625rem;
}

.modal-title-group .title-icon {
    font-size: 1.25rem;
    color: var(--accent, #4ade80);
}

.modal-title-group h2 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary, #2d3748);
    letter-spacing: -0.01em;
}

.close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    background: none;
    border: none;
    color: var(--text-muted, #94a3b8);
    transition: background 0.2s ease, color 0.2s ease;
}

.close-btn:hover {
    background: rgba(0,0,0,0.06);
    color: var(--text-primary, #2d3748);
}

.close-btn .material-icons {
    font-size: 1.2rem;
}

.modal-body {
    padding: 1.25rem 1.5rem;
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md, 16px);
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-in-sm, inset 3px 3px 7px #c8ccd2, inset -3px -3px 7px #ffffff);
}

.setting-info {
    display: flex;
    align-items: center;
    gap: 0.625rem;
}

.setting-icon {
    font-size: 1.1rem;
    color: var(--text-secondary, #64748b);
}

.setting-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary, #2d3748);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(0.96);
}
</style>
