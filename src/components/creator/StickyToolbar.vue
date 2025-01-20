<template>
        <nav class="container" :style="{'height': height}">
            <ul>
                <li><a v-on:click="filterSelected($event, 'HOF Winners')" :class="{active: activeLink === 'HOF WINNERS'}">HOF Winners</a></li>
                <li><a v-on:click="filterSelected($event, 'All')" :class="{active: activeLink == '' || activeLink === 'ALL'}">All</a></li>
                <li><a v-on:click="filterSelected($event, 'XBOX')" :class="{active: activeLink === 'XBOX'}">Xbox</a></li>
                <li><a v-on:click="filterSelected($event, 'Playstation')" :class="{active: activeLink === 'PLAYSTATION'}">Playstation</a></li>
                <li><a v-on:click="filterSelected($event, 'PC')" :class="{active: activeLink === 'PC'}">PC</a></li>
                <li><vSelect class="game-select" :options="gameFilters" label="name" v-model="selectedGameFilter" :resetOnOptionsChange="true" placeholder="Filter by Game"></vSelect>
                </li>
            </ul>
        </nav>
</template>

<script setup>
import {defineProps, ref, defineEmits, watch} from 'vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'

defineProps({
    height: String,
    gameFilters: {}
})

const emit = defineEmits(['filterSelected','gameFilterChanged'])

const activeLink = ref("")
const selectedGameFilter = ref(null)

function filterSelected(event, filter){
    emit("filterSelected", filter.toUpperCase());
    activeLink.value = filter.toUpperCase();
}

watch(selectedGameFilter, (game) => {
    if(game){
        emit("gameFilterChanged", game.id);
    }else{
        emit("gameFilterChanged", null);
    }
})

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