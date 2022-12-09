<template>
    <div class="container">
        <div class="video" v-for="item in duplicatedList" :key="item.id">
            <submission :model="item" bottomDisplayType="name"></submission>
        </div>
    </div>
</template>

<script>
import Submission from '@/components/submission/Submission.vue'

export default {
    name: "submission-grid",
    props: ['items'],
    data() {
        return {
            
        }
    },
    computed: {
        duplicatedList() {
            let result = [...this.items]; // start with a copy of the original list

            // use a for loop to repeat the duplication process four times
            for (let i = 0; i < 3; i++) {
                // use the map() method to iterate over the result array
                // and return a new list containing copies of the original objects
                const duplicates = result.map(obj => Object.assign({}, obj));

                // use the concat() method to combine the result array with the new list of duplicates
                result = result.concat(duplicates);
            }

            return result;
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