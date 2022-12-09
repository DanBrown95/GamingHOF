<template>
        <nav class="container" :style="{'height': height}">
            <ul>
                <li><a href="">HOF Winners</a></li>
                <li><a href="" class="active">All</a></li>
                <li><a href="">XBOX</a></li>
                <li><a hred="">Playstation</a></li>
                <li><a href="">PC</a></li>
            </ul>
        </nav>
</template>

<script>
export default {
    name: "StickyNav",
    props: {
        height: String
    },
    data() {
        return {
        }
    },
    mounted () {
    },
    unmounted () {
    },
    methods:{
    }
}
</script>

<style scoped>

.container {
    background-color: #F1F5F8;
    border-bottom: thin solid lightgray;
    position: sticky;
    top: 0;
    z-index: 3;
}

nav {
    display: flex;
    align-items: center;
    padding: 0;
    text-align: center;
    list-style: none;
    justify-content: center;
}

nav li {
    display: inline;
}

/* style the navbar links */
nav a {
  display: inline-block;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

</style>