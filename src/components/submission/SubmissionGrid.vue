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

<script>
import Submission from '@/components/submission/Submission.vue'

export default {
    name: "submission-grid",
    props: ['items', 'filter', 'gameIdFilter'],
    data() {
        return {
            
        }
    },
    computed: {
        filteredItems() {
            if (this.filter === "" || this.filter === "ALL" || this.filter == null) {
                if(this.gameIdFilter && this.gameIdFilter > 0){
                    return this.items.filter(x => x.game.id == this.gameIdFilter)
                }
                return this.items;
            }else{
                if(this.gameIdFilter && this.gameIdFilter > 0){
                    return this.items.filter(o => o.platform.name.toUpperCase() === this.filter && o.game.id == this.gameIdFilter);
                }
                return this.items.filter(o => o.platform.name.toUpperCase() === this.filter);
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