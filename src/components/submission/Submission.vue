<template>
    <router-link :to="{name: 'submissionDetails', params: { id: model.id }}" class="submission-link">
        <div class="neu-card">
            <div class="inner">
                <div v-if="top" class="overlay top-overlay">{{ top }}</div>
                <img class="sub-image" :src="friendlyImageUrl" loading="lazy" />
                <div v-if="bottom" class="overlay bottom-overlay">{{ bottom }}</div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    model: {},
    topDisplayType: String,
    bottomDisplayType: String
})

function resolveDisplay(type) {
    if (!type) return null
    switch (type.toLowerCase()) {
        case "name":         return props.model.name
        case "rank":         return `#${props.model.rank}`
        case "votes":        return `${props.model.votes} votes`
        case "rankandvotes": return `#${props.model.rank} · ${props.model.votes} votes`
        case "month":        return props.model.month?.toUpperCase()
        case "creator":      return props.model.creator?.gamertag
        case "game":         return props.model.game?.name
        default:             return null
    }
}

const top    = computed(() => resolveDisplay(props.topDisplayType))
const bottom = computed(() => resolveDisplay(props.bottomDisplayType))

const friendlyImageUrl = computed(() => {
    if (!props.model.image || props.model.image.length < 1) {
        return require(`@/assets/video-fallback.png`)
    }
    return props.model.image
})
</script>

<style scoped>
.submission-link {
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
    transition: box-shadow var(--transition, 0.25s ease), transform var(--transition, 0.25s ease);
}

.neu-card:hover {
    box-shadow: inset 3px 3px 7px var(--shadow-dark, #c8ccd2), inset -3px -3px 7px var(--shadow-light, #ffffff),
                0 6px 20px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}

.inner {
    height: 100%;
    position: relative;
    border-radius: calc(var(--radius-md, 16px) - 4px);
    overflow: hidden;
    display: flex;
    align-items: center;
}

.sub-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* ─── Overlays ───────────────────────────────────────────────── */
.overlay {
    position: absolute;
    left: 0;
    width: 100%;
    padding: 0.5rem 0.75rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 1;
}

.top-overlay {
    top: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.bottom-overlay {
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    padding-top: 1.5rem;
}

.inner:hover .overlay {
    opacity: 1;
}
</style>
