<template>
    <router-link :to="{name: 'submissionDetails', params: { id: model.id }}">
        <div class="neu-inset">
            <div class="outer">
                <div v-if="top" class="top-title">{{top}}</div>
                <img class="sub-image"
                    :src="friendlyImageUrl" />
                <!--overlay title-->
                <div v-if="bottom" class="bottom-title">{{bottom}}</div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
    model: {},
    topDisplayType: String,
    bottomDisplayType: String
})

const top = computed(() => {
    if(props.topDisplayType){
        switch (props.topDisplayType.toLowerCase()) {
            case "name":
                return props.model.name
            case "rank":
                return "#" + props.model.rank
            case "votes":
                return props.model.votes + " votes"
            case "rankandvotes":
                return "#" + props.model.rank + ": " + props.model.votes + " votes"
            case "month":
                return props.model.month.toUpperCase()
            case "creator":
                return props.model.creator.gamertag
            case "game":
                return props.model.game.name
            default:
                return null;
        }
    }
    return null
})

const bottom = computed(() => {
    if(props.bottomDisplayType){
        switch (props.bottomDisplayType.toLowerCase()) {
            case "name":
                return props.model.name
            case "rank":
                return "#" + props.model.rank
            case "votes":
                return props.model.votes + " votes"
            case "rankandvotes":
                return "#" + props.model.rank + ": " + props.model.votes + " votes"
            case "month":
                return props.model.month.toUpperCase()
            case "creator":
                return props.model.creator.gamertag
            case "game":
                return props.model.game.name
            default:
                return null;
        }
    }
    return null
})

const friendlyImageUrl = computed(() => {
    if(props.model.image == null || props.model.image == "" || props.model.image.length < 1){
        return require(`@/assets/video-fallback.png`) // the module request
    }else {
        return props.model.image
    }
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

    .outer {
        height: 100%;
        position: relative;
        border-radius: 15px;
        display: flex; /* use flexbox layout for the div */
        align-items: center; /* center the items horizontally and vertically */
        overflow: hidden; /* hide any overflow */
    }

    .sub-image {
        width: 100%;
        min-height: 100%;
    }

    .bottom-title {
        background-color: rgb(0, 0, 0, 0.5);
        
        /*positioned relative to parent div (container) */
        position: absolute;   

        /* bottom margin is 0 so that it
            coincides with container's bottom margin*/
        bottom: 0px;           
        color: white;
        width: 100%;
        font-size: 15px;
        padding: 10px 0;
        text-align: center;

        /*invisible because opacity is 0*/
        opacity: 0;           
        transition: 0.6s;
    }

    .top-title {
        background-color: rgb(0, 0, 0, 0.5);
        
        /*positioned relative to parent div (container) */
        position: absolute;   

        /* top margin is 0 so that it
            coincides with container's bottom margin*/
        top: 0px;           
        color: white;
        width: 100%;
        font-size: 15px;
        padding: 10px 0;
        text-align: center;

        /*invisible because opacity is 0*/
        opacity: 0;           
        transition: 0.6s;
    }

    .outer:hover .bottom-title, .outer:hover .top-title {
        /*becomes visible on hover*/
        opacity: 1;       
    }
</style>