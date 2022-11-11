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

<script>
export default {
    name: 'submission-item',
    props: ['model', 'bottomDisplayType', 'topDisplayType'],
    computed: {
        top(){
            if(this.topDisplayType){
                switch (this.topDisplayType.toLowerCase()) {
                    case "name":
                        return this.model.name
                    case "rank":
                        return "#" + this.model.rank
                    case "votes":
                        return this.model.votes + " votes"
                    case "rankandvotes":
                        return "#" + this.model.rank + ": " + this.model.votes + " votes"
                    case "month":
                        return this.model.month.toUpperCase()
                    case "creator":
                        return this.model.creator.fullname
                    default:
                        return null;
                }
            }
            return null
        },
        bottom(){
            if(this.bottomDisplayType){
                switch (this.bottomDisplayType.toLowerCase()) {
                    case "name":
                        return this.model.name
                    case "rank":
                        return "#" + this.model.rank
                    case "votes":
                        return this.model.votes + " votes"
                    case "rankandvotes":
                        return "#" + this.model.rank + ": " + this.model.votes + " votes"
                    case "month":
                        return this.model.month.toUpperCase()
                    case "creator":
                        return this.model.creator.fullname
                    default:
                        return null;
                }
            }
            return null
        },
        friendlyImageUrl() {
            if(this.model.image == null || this.model.image == "" || this.model.image.length < 1){
                return require(`@/assets/video-fallback.png`) // the module request
            }else {
                return this.model.image
            }
        }
    },
    data() {
        return {
            
        }
    }
}
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
        overflow: hidden;
    }

    .sub-image {
        width: auto;
        height: 100%;
        display: block;
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