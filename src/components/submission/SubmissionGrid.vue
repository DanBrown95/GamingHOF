<template>
    <div class="container">
        <div class="video" v-for="item in filteredItems" :key="item.id">
            <submission :model="item" bottomDisplayType="name"></submission>
        </div>
    </div>
</template>

<script>
import Submission from '@/components/submission/Submission.vue'

export default {
    name: "submission-grid",
    props: ['items', 'filter'],
    data() {
        return {
            
        }
    },
    computed: {
        filteredItems() {
            if (this.filter === "" || this.filter === "ALL" || this.filter == null) {
                return this.items;
            }else{
                return this.items.filter(o => o.platform.toUpperCase() === this.filter);
            }            
        }
    },
    components: {
        Submission
    }
}
</script>

<style scoped>
    .container {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
    }

    .video { 
        display: inline-block;
        aspect-ratio: 16 / 9;
        height: 200px;
        margin: 5px 10px;
    }
</style>