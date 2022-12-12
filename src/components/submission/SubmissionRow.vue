<template>
    <div class="container">
        <h3 v-if="!sideLabel" class="label">{{labelFriendly}}</h3>
        <div class="scroll-container">
            <div v-if="sideLabel" class="side-label-outer">
                <h3 class="rotated-text">{{labelFriendly}}</h3>
            </div>
            <div v-for="item in sortedItems" :key="item.id" class="submission">
                <Submission :model="item" :topDisplayType="subTopDisplayType" :bottomDisplayType="subBottomDisplayType"></Submission>
            </div>
            <div v-if="addSeeMore" class="submission">
                <SeeMoreTile :platform="label"></SeeMoreTile>
            </div>
        </div> 
    </div>
</template>

<script>
import Submission from '@/components/submission/Submission.vue'
import SeeMoreTile from '@/components/submission/SeeMoreTile.vue'

export default {
    name: "submission-row",
    props: {
        items: {},
        label: String,
        sortBy: String,
        subTopDisplayType: String,
        subBottomDisplayType: String,
        sideLabel: Boolean,
        limit: {
            type: String,
            default: "0"
        }
    },
    components: {
        Submission,
        SeeMoreTile
    },
    data() {
        return {
            seeMoreModel: {

            }
        }
    },
    computed: {
        addSeeMore() {
            if(this.limit > 0 && this.limit < this.items.length){
                return true
            }else{
                return false
            }
        },
        sortedItems(){
            var lim = parseInt(this.limit) > 0 ? this.limit : this.items.length
            switch (this.sortBy.toLowerCase()) {
                case "rank":
                    return this.items.slice().sort((a, b) => a.rank - b.rank).slice(0, lim)
                case "votes":
                    return this.items.slice().sort((a, b) => b.votes - a.votes).slice(0, lim)
                default:
                    return this.items.slice(0, lim);
            }
        },
        labelFriendly() {
            if(this.label){
                return this.label.toUpperCase()
            }
            return ""
        }
    }
}
</script>

<style scoped>
    .container {
        height: 100%;
    }

    .side-label-outer {
        display: inline-block; 
        width: 50px; 
        height: 100%; 
        position: relative;
    }

    .rotated-text {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
        -webkit-transform: translateX(-50%) translateY(-50%) rotate(-90deg);
        transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
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
        aspect-ratio: 16 / 9;
        padding: 0 5px;
        display: inline-block;
        align-items: center;
        padding-bottom: 5px;
    }
</style>