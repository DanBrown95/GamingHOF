<template>
    <a @click="$emit('click')" class="button" :style="{'background-color': buttonColor}">
        <span class="material-icons" :style="{'color': iconColor}">{{icon}}</span>
        <span class="text" :style="{'color': textColor}">{{upperText}}</span>
    </a>
</template>

<script>

export default {
    name: 'NeuButton',
    emits: ['click'],
    props: {
        text: {
            type: String,
            default: 'Upvote'
        },
        icon: {
            type: String,
            default: 'report' //'thumb_up_alt'
        },
        iconColor: {
            type: String,
            default: '#1899D6'
        },
        buttonColor: {
            type: String,
            default: '#fff'
        },
        textColor: {
            type: String,
            default: '#3c4043'
        }
    },
    data(){
        return {
            upperText: this.text.toUpperCase()
        }
    }
}
</script>

<style scoped>

    /* old button style */
    /* .button {
        margin: 0 auto;
        justify-content: center;
        border: solid 1px grey; 
        border-radius: 20px; 
        padding: 10px 15px;
        width: fit-content;
        padding: 1.5em 2em;
    } */

    .material-icons {
        color: #1899D6;
        margin-right: 10px;
    }

    .button {
        margin: 10px 20px;
        justify-content: center;
        align-items: center;
        appearance: none;
        background-color: #fff;
        border-radius: 24px;
        border-style: none;
        box-shadow:  14px 14px 28px #7d7d7d,
                    -14px -14px 28px #ffffff;
        box-sizing: border-box;
        color: #3c4043;
        cursor: pointer;
        display: inline-flex;
        fill: currentcolor;
        font-family: "Google Sans",Roboto,Arial,sans-serif;
        font-size: 14px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        letter-spacing: .25px;
        line-height: normal;
        max-width: 100%;
        overflow: visible;
        padding: 2px 24px;
        position: relative;
        text-align: center;
        text-transform: none;
        transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        width: auto;
        will-change: transform,opacity;
        z-index: 0;
    }

    .button:hover {
        background: #F6F9FE;
        color: #174ea6;
    }

    .button:active {
        box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
        outline: none;
    }

    .button:focus {
        outline: none;
        border: 2px solid #4285f4;
    }

    .button:not(:disabled) {
        box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
    }

    .button:not(:disabled):hover {
        box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
    }

    .button:not(:disabled):focus {
        box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
    }

    .button:not(:disabled):active {
        box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, inset rgba(60, 64, 67, .15) 0 2px 20px 0;
    }

    a.disabled {
        /* box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px; */
        box-shadow: none !important;
        cursor: default !important;
        background-color: lightgray !important;
    }

</style>