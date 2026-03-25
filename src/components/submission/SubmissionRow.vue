<template>
    <div class="row-container">
        <div v-if="!sideLabel" class="row-header">
            <span class="accent-bar"></span>
            <h3 class="row-label">{{ labelFriendly }}</h3>
        </div>

        <div class="scroll-wrapper">
            <div v-if="sideLabel" class="side-label-outer">
                <h3 class="rotated-text">{{ labelFriendly }}</h3>
            </div>
            <div class="scroll-container">
                <div v-for="item in sortedItems" :key="item.id" class="submission-slot">
                    <Submission
                        :model="item"
                        :topDisplayType="subTopDisplayType"
                        :bottomDisplayType="subBottomDisplayType">
                    </Submission>
                </div>
                <div v-if="addSeeMore" class="submission-slot">
                    <SeeMoreTile :platform="label"></SeeMoreTile>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import Submission from '@/components/submission/Submission.vue'
import SeeMoreTile from '@/components/submission/SeeMoreTile.vue'

const props = defineProps({
    items: {},
    label: String,
    sortBy: String,
    subTopDisplayType: String,
    subBottomDisplayType: String,
    sideLabel: Boolean,
    limit: { type: String, default: "0" }
})

const addSeeMore = computed(() =>
    props.limit > 0 && props.limit < props.items.length
)

const sortedItems = computed(() => {
    const lim = parseInt(props.limit) > 0 ? parseInt(props.limit) : props.items.length
    switch (props.sortBy?.toLowerCase()) {
        case "rank":  return props.items.slice().sort((a, b) => a.rank - b.rank).slice(0, lim)
        case "votes": return props.items.slice().sort((a, b) => b.votes - a.votes).slice(0, lim)
        default:      return props.items.slice(0, lim)
    }
})

const labelFriendly = computed(() => props.label?.toUpperCase() ?? "")
</script>

<style scoped>
.row-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

/* ─── Section header ─────────────────────────────────────────── */
.row-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
    flex-shrink: 0;
}

.accent-bar {
    display: block;
    width: 4px;
    height: 1.25rem;
    border-radius: 2px;
    background: var(--accent, #4ade80);
    flex-shrink: 0;
}

.row-label {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary, #64748b);
}

/* ─── Side label variant ─────────────────────────────────────── */
.scroll-wrapper {
    flex: 1;
    display: flex;
    min-height: 0;
}

.side-label-outer {
    width: 40px;
    flex-shrink: 0;
    position: relative;
}

.rotated-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary, #64748b);
    transform: translateX(-50%) translateY(-50%) rotate(-90deg);
    white-space: nowrap;
}

/* ─── Scroll container ───────────────────────────────────────── */
.scroll-container {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    height: 100%;
    scrollbar-width: thin;
    scrollbar-color: var(--shadow-dark, #c8ccd2) transparent;
}

.scroll-container::-webkit-scrollbar {
    height: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
    background: var(--shadow-dark, #c8ccd2);
    border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-track {
    background: transparent;
    margin: 0 120px;
}

/* ─── Individual tile ────────────────────────────────────────── */
.submission-slot {
    display: inline-block;
    height: 100%;
    aspect-ratio: 16 / 9;
    padding: 0 5px;
    vertical-align: top;
}
</style>
