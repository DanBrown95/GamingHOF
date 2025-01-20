<template>
    <div>
        <table class="table">
            <tr>
                <th>Creator</th>
                <td><router-link :to="{name: 'creatorHome', params: { id: details.creator.id }}">
                        {{ details.creator.gamertag }}
                    </router-link>
                </td>
            </tr>
            <tr>
                <th>Game</th>
                <td>{{ details.game.name }}</td>
            </tr>
            <tr>
                <th>Platform</th>
                <td>{{ details.platform.name }}</td>
            </tr>
            <tr>
                <th>Rank</th>
                <td :style="{color: rankColor}"># {{ details.rank }}</td>
            </tr>
            <tr>
                <th>Votes</th>
                <td>{{ details.votes }}</td>
            </tr>
            <tr>
                <th>Date</th>
                <td>{{ localTime }}</td>
            </tr>
        </table>
    </div>    
</template>

<script setup>
import {defineProps, computed} from 'vue';

const props = defineProps({
    details: {
        creator: {
            id: String,
            fullname: String
        },
        console: String,
        submitted: String,
        rank: Number,
        votes: Number
    }
})

const localTime = computed(() => {
    return new Date(props.details.submitted).toDateString()
})

const rankColor = computed(() => {
    switch (props.details.rank) {
        case 1:
            return "goldenrod"
        case 2:
            return "#C0C0C0"
        case 3: 
            return "#CD7F32"
        default:
            return ""
    }
})
</script>

<style scoped>
    
.table {
    width: 90%;
    border-spacing: 0;
    margin: 0 auto;
    border-radius: 20px;
    background-color: #F1F5F8;
    box-shadow: inset 10px 7px 11px #bfbcd9d9, inset -7px -6px 3px #ffffff;
}

tr {
    height: 50px;
}

th {
    width: 30%;
}

td {
    padding-left: 20px;
    text-align: left;
}

td > a {
    text-decoration: none;
}

td > a:hover {
    color: darkgray;
}

</style>