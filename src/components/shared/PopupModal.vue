<template>
    <transition v-if="showModal" name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
                <header class="modal-header" id="modalTitle">
                    <h1>Settings</h1>
                    <button type="button" class="btn-close" @click="close" aria-label="Close modal">X</button>
                </header>

                <section class="modal-body" id="modalDescription">
                    <div class="row">
                        <label class="left">Dark Mode</label>
                        <toggle-switch v-model="darkModeState"></toggle-switch>
                    </div>
                </section>

                <footer class="modal-footer">
                    <slot name="footer">
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import ToggleSwitch from "@/components/shared/ToggleSwitch.vue"

export default {
    name: 'PopupModal',
    props: ["showModal"],
    components: {
        ToggleSwitch
    },
    data(){
        return {
            darkModeState: false
        }
    },
    mounted(){
        this.darkModeState = localStorage.getItem("useDarkMode") === 'true';
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
    watch: {
        darkModeState(newV){
            localStorage.setItem("useDarkMode", newV);
            if (!newV) {
                document.body.classList.remove('darkMode');
            }else{
                document.body.classList.add('darkMode');
            }
        }
    }
}
</script>
  
<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .modal {
        background: #FFFFFF;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        height: 80%;
        width: 80%;
        min-height: 500px;
    }

    .modal-header,
    .modal-footer {
        padding: 15px;
        display: flex;
    }

    .modal-header {
        position: relative;
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .modal-footer {
        border-top: 1px solid #eeeeee;
        flex-direction: column;
    }

    .modal-body {
        position: relative;
        padding: 20px 10px;
        height: 80%;
    }

    .btn-close {
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        font-weight: bold;
        color: #4AAE9B;
        background: transparent;
    }

    .btn-green {
        color: white;
        background: #4AAE9B;
        border: 1px solid #4AAE9B;
        border-radius: 2px;
    }

    .modal-fade-enter,
    .modal-fade-leave-to {
        opacity: 0;
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity .5s ease;
    }

    .row {
        display: flex;
        justify-content: center;
    }

    .left {
        display: inline-block;
        width: 110px;
        color: #777777;
        line-height: 34px;  /* added */
        margin-right: 30px;
        font-weight: bold;
    }

    .right {
        padding: 5px 10px;
    }
</style>