<template>
    <a @click="$emit('clicked')" class="neu-btn" :style="buttonStyle">
        <span class="material-icons" :style="{'color': iconColor}">{{ icon }}</span>
        <span class="btn-text" :style="{'color': textColor}">{{ upperText }}</span>
    </a>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    text: String,
    icon: String,
    iconColor: String,
    buttonColor: String,
    textColor: String
})

defineEmits(['clicked'])

const upperText = computed(() => props.text.toUpperCase())

const buttonStyle = computed(() => ({
    'background-color': props.buttonColor || 'var(--bg, #eef1f5)'
}))
</script>

<style scoped>
.neu-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.5rem;
    border-radius: var(--radius-xl, 32px);
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-out, 6px 6px 14px #c8ccd2, -6px -6px 14px #ffffff);
    cursor: pointer;
    user-select: none;
    transition: box-shadow var(--transition, 0.25s ease), transform var(--transition, 0.25s ease);
    -webkit-user-select: none;
    touch-action: manipulation;
}

.neu-btn .material-icons {
    font-size: 1.2rem;
    color: var(--accent, #4ade80);
}

.btn-text {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: var(--text-secondary, #64748b);
    white-space: nowrap;
}

.neu-btn:hover {
    box-shadow: 8px 8px 18px var(--shadow-dark, #c8ccd2), -8px -8px 18px var(--shadow-light, #ffffff);
    transform: translateY(-1px);
}

.neu-btn:active {
    box-shadow: var(--neu-in, inset 4px 4px 10px #c8ccd2, inset -4px -4px 10px #ffffff);
    transform: translateY(0);
}

.neu-btn.disabled {
    box-shadow: none !important;
    transform: none !important;
    cursor: default;
    opacity: 0.5;
}
</style>
