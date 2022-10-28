<template>
    <div class="outer">
        <img id="sub-image"
            src="https://media.geeksforgeeks.org/wp-content/uploads/20200325132558/download311.png">
        <!--overlay title-->
        <div class="title">{{model.title}}</div>
    </div>
</template>

<script>
export default {
    name: 'submission-item',
    props: ['model'],
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

    #sub-image {
        width: 100%;
        display: block;
    }

    .title {
        background-color: rgb(0, 0, 0, 0.5);
        
        /*positioned relative to parent div (container) */
        position: absolute;   

        /* bottom margin is 0 so that it
            coincides with container's bottom margin*/
        bottom: 1px;           
        color: white;
        width: 100%;
        font-size: 25px;
        padding: 15px 0;
        text-align: center;

        /*invisible because opacity is 0*/
        opacity: 0;           
        transition: 0.6s;
    }

    .outer:hover .title {
        /*becomes visible on hover*/
        opacity: 1;       
    }
</style>