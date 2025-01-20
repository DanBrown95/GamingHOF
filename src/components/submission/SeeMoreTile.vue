<template>
    <router-link :to="{name: 'seeMore', params: { platform: platform }}">
        <div class="neu-inset">
            <slot><h2>See More</h2></slot>
        </div>
    </router-link>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
    platform: String
})
</script>

<style scoped>
    .neu-inset {
        height: 100%;
        position: relative;
        border-radius: 15px;
        border: solid 1px white;
        overflow: hidden;

        padding: 8px;
        background: #ffffff;
        box-shadow: inset 6px 6px 9px #c9c9c9,
            inset -6px -6px 9px #ffffff;
    }

    h2 {
        color: black;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>