<template>
    <div class="container">
        <div class="submission" v-for="item in filteredItems" :key="item.id">
            <submission :model="item" bottomDisplayType="name" topDisplayType="game"></submission>
        </div>
        <div v-show="filteredItems.length < 1">
            <h3 class="no-content">No content</h3>
        </div>
    </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';
import Submission from '@/components/submission/Submission.vue'

const props = defineProps(['items', 'filter', 'gameIdFilter'])

const filteredItems = computed(() => {
    if (props.filter === "" || props.filter === "ALL" || props.filter == null) {
        if(props.gameIdFilter && props.gameIdFilter > 0){
            return props.items.filter(x => x.game.id == props.gameIdFilter)
        }
        return props.items;
    }else{
        if(props.gameIdFilter && props.gameIdFilter > 0){
            return props.items.filter(o => o.platform.name.toUpperCase() === props.filter && o.game.id == props.gameIdFilter);
        }
        return props.items.filter(o => o.platform.name.toUpperCase() === props.filter);
    }  
})
</script>

<style scoped>
    .container {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .submission { 
        display: inline-block;
        aspect-ratio: 16 / 9;
        height: 200px;
        margin: 5px 10px;
    }

    h3.no-content {
        margin-top: 20px;
    }
</style>