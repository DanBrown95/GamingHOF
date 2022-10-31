<template>
    <router-link :to="{name: 'submissionDetails', params: { id: model.id }}">
        <div class="outer">
            <div class="top-title">{{top}}</div>
            <img class="sub-image"
                :src="friendlyImageUrl" />
            <!--overlay title-->
            <div class="bottom-title">{{bottom}}</div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'submission-item',
    props: ['model', 'displayType'],
    computed: {
        top(){
            if(this.displayType && this.displayType == "rank"){
                return "#" + this.model.rank + ": " + this.model.votes + " votes";
            }else if(this.displayType == "month"){
                return this.model.month.toUpperCase();
            }else if (this.displayType == "creator"){
                return this.model.creator;
            }
            return "";
        },
        bottom(){
            return this.model.title;
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
    .outer {
        height: 100%;
        position: relative;
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
        bottom: 1px;           
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

        /* bottom margin is 0 so that it
            coincides with container's bottom margin*/
        top: 1px;           
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