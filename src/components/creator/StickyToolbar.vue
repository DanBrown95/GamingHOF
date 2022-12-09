<template>
        <nav class="container" :style="{'height': height}">
            <ul>
                <li><a v-on:click="filterSelected($event, 'HOF Winners')">HOF Winners</a></li>
                <li><a v-on:click="filterSelected($event, 'All')" class="active">All</a></li>
                <li><a v-on:click="filterSelected($event, 'XBOX')">XBOX</a></li>
                <li><a v-on:click="filterSelected($event, 'Playstation')">Playstation</a></li>
                <li><a v-on:click="filterSelected($event, 'PC')">PC</a></li>
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
        filterSelected: function(event, filter) {
            this.$emit("filterSelected", filter.toUpperCase());
        },
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
    padding: 0 10px;
}

/* style the navbar links */
nav a {
  display: inline-block;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

a:hover {
  cursor:pointer;
 }
</style>