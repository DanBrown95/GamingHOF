<template>
    <div class="container">
        <h3>{{label}}</h3>
        <div class="scroll-container">
            <div class="grid-scroll">
                <div v-for="item in items" :key="item.id" class="column">
                    <Submission :model="item"></Submission>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import Submission from '@/components/Submission.vue'

export default {
    name: "submission-list",
    props: ['items', 'label'],
    components: {
        Submission
    },
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
    .container {
        padding-bottom: 20px;
    }

    h3 {
        padding: 10px 0 0 25px;
        font-size: 2em;
        text-align: left;
    }

    .scroll-container {
        overflow: auto;
        white-space: nowrap;
        padding: 5px 70px 5px 20px;
        background: transparent;
        height: 100%;
        border-radius:15px;

        /* hide horizontal scroll bar */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }

    /* customize horizontal scrollbar for Chrome, Safari and Opera */
    .scroll-container::-webkit-scrollbar {
        width: 5px;
        max-height: 5px;
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

    .column {
        padding: 5px;
        display: inline-block;
        align-items: center;
    }

    .row::after {
        content: "";
        clear: both;
    }
</style>