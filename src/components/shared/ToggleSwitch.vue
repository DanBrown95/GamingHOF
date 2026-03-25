<template>
    <label class="switch">
        <input type="checkbox" v-model="mutableValue">
        <div class="slider round"></div>
    </label>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

const mutableValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});
</script>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
    flex-shrink: 0;
}

.switch input {
    display: none;
}

.slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-color: var(--shadow-dark, #c8ccd2);
    transition: background-color 0.3s ease;
}

.slider::before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.15);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:checked + .slider {
    background-color: var(--accent, #4ade80);
}

input:checked + .slider::before {
    transform: translateX(22px);
}

.slider.round {
    border-radius: 26px;
}

.slider.round::before {
    border-radius: 50%;
}
</style>
