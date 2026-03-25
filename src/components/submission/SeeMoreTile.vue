<template>
    <router-link :to="{name: 'seeMore', params: { platform: platform }}" class="see-more-link">
        <div class="neu-card">
            <span class="material-icons arrow-icon">chevron_right</span>
            <span class="label">See More</span>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({ platform: String })
</script>

<style scoped>
.see-more-link {
    display: block;
    height: 100%;
    text-decoration: none;
}

.neu-card {
    height: 100%;
    border-radius: var(--radius-md, 16px);
    padding: 7px;
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-in, inset 4px 4px 10px #c8ccd2, inset -4px -4px 10px #ffffff);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: box-shadow var(--transition, 0.25s ease), transform var(--transition, 0.25s ease);
}

.neu-card:hover {
    transform: translateY(-2px);
    box-shadow: inset 3px 3px 7px var(--shadow-dark, #c8ccd2), inset -3px -3px 7px var(--shadow-light, #ffffff),
                0 6px 20px rgba(0,0,0,0.08);
}

.arrow-icon {
    font-size: 2rem;
    color: var(--accent, #4ade80);
    transition: transform 0.25s ease;
}

.neu-card:hover .arrow-icon {
    transform: translateX(4px);
}

.label {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--text-secondary, #64748b);
    text-transform: uppercase;
}
</style>
