<template>
    <div>
        <div class="player" ref="artRef" :style="{'height': styleConfig.height, 'width': styleConfig.width, 'border-color': styleConfig.borderColor, 'border-width': styleConfig.borderSize, 'border-radius': styleConfig.cornerRadius }"></div>
    </div>
</template>

<script setup>
import { defineProps, ref, reactive, onMounted, onBeforeUnmount, getCurrentInstance, nextTick, defineEmits} from 'vue';
import Artplayer from 'artplayer';
import Hls from 'hls.js'

const props = defineProps(['src', 'styleConfig', 'autoplay'])
const emit = defineEmits(['get-instance'])

const instance = ref(null)
const option = reactive({
    url: "",
    setting: true,
    fullscreen: true,
    fullscreenWeb: true,
    pip: true,
    autoplay: false,
    autoOrientation: true,
})

onMounted(() => {
    const { refs } = getCurrentInstance();

    option.url = props.src;
    if(props.autoplay === true){
        option.autoplay = true;
    }
    instance.value = new Artplayer({
        ...option,            
        container: refs.artRef,
        customType: {
            m3u8: function (video, url) {
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url;
                } else {
                    instance.value.notice.show = 'Does not support playback of m3u8';
                }
            },
        }
    });
    document.getElementsByClassName('art-state')[0].style.display = "none";

    nextTick(() => {
        emit("get-instance", instance.value);
    });

    // rewind to start of video when ended.
    if (instance.value) {
        instance.value.on('video:ended', () => {
            instance.value.seek = 0;  // Rewind video to the start when it ends
        });
    }
})

onBeforeUnmount(() => {
    if (instance.value && instance.value.destroy) {
        instance.value.destroy(false);
    }
})
</script>

<style scoped>
    .player {
        min-width: 600px;
        min-height: 400px;
        margin: 0 auto;
        border-radius: 0px;
        overflow: hidden;
    }
</style>