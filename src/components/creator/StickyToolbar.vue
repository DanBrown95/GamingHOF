<template>
        <nav class="container" :style="{'height': height}">
            <ul>
                <li><a v-on:click="filterSelected($event, 'HOF Winners')" :class="{active: activeLink === 'HOF WINNERS'}">HOF Winners</a></li>
                <li><a v-on:click="filterSelected($event, 'All')" :class="{active: activeLink == '' || activeLink === 'ALL'}">All</a></li>
                <li><a v-on:click="filterSelected($event, 'XBOX')" :class="{active: activeLink === 'XBOX'}">Xbox</a></li>
                <li><a v-on:click="filterSelected($event, 'Playstation')" :class="{active: activeLink === 'PLAYSTATION'}">Playstation</a></li>
                <li><a v-on:click="filterSelected($event, 'PC')" :class="{active: activeLink === 'PC'}">PC</a></li>
                <li><v-select class="game-select" :options="gameFilters" label="name" v-model="selectedGameFilter" :resetOnOptionsChange="true" placeholder="Filter by Game"></v-select>
                </li>
            </ul>
        </nav>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

export default {
    name: "StickyNav",
    props: {
        height: String,
        gameFilters: {}
    },
    components: {
        vSelect
    },
    data() {
        return {
            activeLink: "",
            selectedGameFilter: null
        }
    },
    methods:{
        filterSelected: function(event, filter) {
            this.$emit("filterSelected", filter.toUpperCase());
            this.activeLink = filter.toUpperCase();
        }
    },
    watch: {
        selectedGameFilter(game){
            if(game){
                this.$emit("gameFilterChanged", game.id);
            }else{
                this.$emit("gameFilterChanged", null);
            }
        }
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

 .active {
    color: green;
 }

 .game-select {
    display: inline-block;
    min-width: 250px;
 }
</style>