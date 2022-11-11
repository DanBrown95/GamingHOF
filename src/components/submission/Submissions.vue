<template>
    <div class="container">
        <h3 class="label">{{label}}</h3>
        <div class="scroll-container">
            <div v-for="item in sortedItems" :key="item.id" class="submission">
                <Submission :model="item" :topDisplayType="subTopDisplayType" :bottomDisplayType="subBottomDisplayType"></Submission>
            </div>
        </div> 
    </div>
</template>

<script>
import Submission from '@/components/submission/Submission.vue'

export default {
    name: "submission-list",
    props: ['items', 'label', 'sortBy', "subTopDisplayType", "subBottomDisplayType"],
    components: {
        Submission
    },
    data() {
        return {

        }
    },
    computed: {
        sortedItems(){
            switch (this.sortBy.toLowerCase()) {
                case "rank":
                    return this.items.slice().sort(function(a, b) {
                                return a.rank - b.rank;
                            });
                case "month":
                    //tbi
                    return this.items;        
                default:
                    return this.items;
            }
        }
    }
}
</script>

<style scoped>
    .container {
        height: 100%;
    }

    h3 {
        padding: 10px 0 0 25px;
        font-size: 2em;
        text-align: left;
    }

    .scroll-container {
        overflow: auto;
        white-space: nowrap;
        background: transparent;
        height: 80%;
        overflow-y: hidden;
        text-align: left;

        /* hide horizontal scroll bar in IE and Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* customize horizontal scrollbar for Chrome, Safari and Opera */
    .scroll-container::-webkit-scrollbar {
        width: 5px;
        max-height: 5px;

        /* uncomment to hide scroll bar entirely in chrome */
        /* display: none; */
    }
    
    .scroll-container::-webkit-scrollbar-thumb {
        background: #666;
        border-radius: 20px;
    }

    .scroll-container::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 20px;
        margin: 0 200px;
    }

    .label {
        height: 20%;
    }

    .submission {
        height: 100%;
        padding: 0 5px;
        display: inline-block;
        align-items: center;
        padding-bottom: 5px;
    }
</style>