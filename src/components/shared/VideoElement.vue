<template>
    <div>
        <div class="player" ref="artRef" :style="{'height': styleConfig.height, 'width': styleConfig.width, 'border-color': styleConfig.borderColor, 'border-width': styleConfig.borderSize, 'border-radius': styleConfig.cornerRadius }"></div>
    </div>
</template>

<script>
import Artplayer from 'artplayer';
import Hls from 'hls.js'

export default {
    name: 'VideoElement',
    props: ['src', 'styleConfig', 'autoplay'],
    data(){
        return {
            instance: null,
            option: {
                url: "",
                setting: true,
                fullscreen: true,
                fullscreenWeb: true,
                pip: true,
                autoplay: false,
                autoOrientation: true,
            },
        }
    },
    mounted() {
        this.option.url = this.src;
        if(this.autoplay === true){
            this.option.autoplay = true;
        }
        this.instance = new Artplayer({
            ...this.option,            
            container: this.$refs.artRef,
            customType: {
                m3u8: function (video, url) {
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = url;
                    } else {
                        this.instance.notice.show = 'Does not support playback of m3u8';
                    }
                },
            }
        });
        document.getElementsByClassName('art-state')[0].style.display = "none";

        this.$nextTick(() => {
            this.$emit("get-instance", this.instance);
        });

        // rewind to start of video when ended.
        this.instance.on('video:ended', () => {
            this.instance.seek = 0;
        });
    },
    beforeUnmount() {
        if (this.instance && this.instance.destroy) {
            this.instance.destroy(false);
        }
    }
}
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