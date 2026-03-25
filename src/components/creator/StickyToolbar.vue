<template>
    <div class="toolbar-wrapper" :style="{ height }">
        <nav class="toolbar">
            <div class="filter-pills">
                <button
                    v-for="f in filters"
                    :key="f.value"
                    class="pill"
                    :class="{ active: activeLink === f.value }"
                    @click="filterSelected(f.value)"
                >
                    {{ f.label }}
                </button>
            </div>

            <div class="game-filter">
                <vSelect
                    class="game-select"
                    :options="gameFilters"
                    label="name"
                    v-model="selectedGameFilter"
                    :resetOnOptionsChange="true"
                    placeholder="Filter by game"
                />
            </div>
        </nav>
    </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

defineProps({ height: String, gameFilters: {} })

const emit = defineEmits(['filterSelected', 'gameFilterChanged'])
const activeLink = ref("ALL")
const selectedGameFilter = ref(null)

const filters = [
    { label: 'HOF Winners', value: 'HOF WINNERS' },
    { label: 'All',         value: 'ALL' },
    { label: 'Xbox',        value: 'XBOX' },
    { label: 'PlayStation', value: 'PLAYSTATION' },
    { label: 'PC',          value: 'PC' },
]

function filterSelected(value) {
    emit("filterSelected", value);
    activeLink.value = value;
}

watch(selectedGameFilter, (game) => {
    emit("gameFilterChanged", game?.id ?? null);
})
</script>

<style scoped>
.toolbar-wrapper {
    background: var(--bg, #eef1f5);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 3;
    display: flex;
    align-items: center;
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0 1.5rem;
    width: 100%;
}

/* ─── Filter pills ───────────────────────────────────────────── */
.filter-pills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.pill {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-xl, 32px);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary, #64748b);
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-out, 4px 4px 10px #c8ccd2, -4px -4px 10px #ffffff);
    cursor: pointer;
    transition: box-shadow var(--transition, 0.25s ease), color var(--transition, 0.25s ease), transform var(--transition, 0.25s ease);
    border: none;
    outline: none;
    font-family: inherit;
    letter-spacing: 0.02em;
}

.pill:hover {
    color: var(--text-primary, #2d3748);
    transform: translateY(-1px);
}

.pill.active {
    box-shadow: var(--neu-in, inset 3px 3px 7px #c8ccd2, inset -3px -3px 7px #ffffff);
    color: var(--accent-dark, #22c55e);
    transform: translateY(0);
}

/* ─── Game select ────────────────────────────────────────────── */
.game-filter {
    min-width: 220px;
}

.game-select {
    --vs-border-color: transparent;
    --vs-border-radius: var(--radius-xl, 32px);
    --vs-font-size: 0.8rem;
    --vs-line-height: 1.5;
    --vs-controls-color: var(--text-muted, #94a3b8);
    --vs-selected-color: var(--text-primary, #2d3748);
    --vs-dropdown-bg: var(--bg, #eef1f5);
    --vs-dropdown-option-color: var(--text-primary, #2d3748);
    --vs-dropdown-option--active-bg: var(--accent-dim, rgba(74,222,128,0.15));
    --vs-dropdown-option--active-color: var(--accent-dark, #22c55e);
}

.game-select :deep(.vs__dropdown-toggle) {
    background: var(--bg, #eef1f5);
    box-shadow: var(--neu-out, 4px 4px 10px #c8ccd2, -4px -4px 10px #ffffff);
    border: none;
    border-radius: var(--radius-xl, 32px);
    padding: 0.25rem 0.75rem;
}

.game-select :deep(.vs__search::placeholder) {
    color: var(--text-muted, #94a3b8);
    font-size: 0.8rem;
}

.game-select :deep(.vs__dropdown-menu) {
    border-radius: var(--radius-md, 16px);
    border: none;
    box-shadow: var(--neu-out-lg, 10px 10px 22px #c8ccd2, -10px -10px 22px #ffffff);
    margin-top: 0.5rem;
    overflow: hidden;
}
</style>
