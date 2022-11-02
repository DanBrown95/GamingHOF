<template>
    <div>
        <table class="table">
            <tr>
                <th>Creator</th>
                <td>{{ details.creator }}</td>
            </tr>
            <tr>
                <th>Console</th>
                <td>{{ details.console }}</td>
            </tr>
            <tr>
                <th>Date</th>
                <td>{{ details.date }}</td>
            </tr>
            <tr>
                <th>Rank</th>
                <td>#{{ details.rank }}</td>
            </tr>
            <tr>
                <th>Votes</th>
                <td>{{ details.votes }}</td>
            </tr>
        </table>
    </div>    
</template>

<script>
export default {
    name: 'DetailsTable',
    props: {
        details: {
            creator: String,
            console: String,
            date: String,
            rank: Number,
            votes: Number
        }
    },
    setup() {
        
    },
}
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
</style>