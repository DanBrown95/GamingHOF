<template>
    <div class="details-table">
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">person</span>
                Creator
            </span>
            <router-link
                :to="{name: 'creatorHome', params: { id: details.creator.id }}"
                class="detail-value link">
                {{ details.creator.gamertag }}
            </router-link>
        </div>
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">videogame_asset</span>
                Game
            </span>
            <span class="detail-value">{{ details.game.name }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">sports_esports</span>
                Platform
            </span>
            <span class="detail-value">{{ details.platform.name }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">emoji_events</span>
                Rank
            </span>
            <span class="detail-value rank-value" :style="{ color: rankColor }">
                # {{ details.rank }}
            </span>
        </div>
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">thumb_up</span>
                Votes
            </span>
            <span class="detail-value">{{ details.votes }}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">
                <span class="material-icons row-icon">calendar_today</span>
                Date
            </span>
            <span class="detail-value">{{ localTime }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    details: {
        creator: { id: String, fullname: String },
        console: String,
        submitted: String,
        rank: Number,
        votes: Number
    }
})

const localTime = computed(() => new Date(props.details.submitted).toDateString())

const rankColor = computed(() => {
    switch (props.details.rank) {
        case 1:  return '#d97706'
        case 2:  return '#94a3b8'
        case 3:  return '#b45309'
        default: return 'var(--text-primary, #2d3748)'
    }
})
</script>

<style scoped>
.details-table {
    border-radius: var(--radius-md, 16px);
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-in, inset 4px 4px 10px #c8ccd2, inset -4px -4px 10px #ffffff);
    overflow: hidden;
}

.detail-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    transition: background 0.2s ease;
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-row:hover {
    background: rgba(0, 0, 0, 0.02);
}

.detail-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--text-muted, #94a3b8);
    min-width: 110px;
}

.row-icon {
    font-size: 1rem;
    color: var(--text-muted, #94a3b8);
}

.detail-value {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-primary, #2d3748);
    text-align: right;
}

.detail-value.link {
    color: var(--accent-dark, #22c55e);
    cursor: pointer;
    transition: color 0.2s ease;
}

.detail-value.link:hover {
    color: var(--accent, #4ade80);
}

.rank-value {
    font-weight: 700;
    font-size: 1rem;
}
</style>
