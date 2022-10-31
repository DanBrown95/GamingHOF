<template>
  <div class="home">
    <div style="height: 300px;">
      <SubmissionList :items="items" label="Xbox" displayType="rank"></SubmissionList>
    </div>
    <div style="height: 300px;">
      <SubmissionList :items="items" label="Playstation" displayType="rank"></SubmissionList>
    </div>
    <div style="height: 300px;">
      <SubmissionList :items="items" label="PC" displayType="month"></SubmissionList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SubmissionList from '@/components/Submissions.vue'

export default {
  name: 'HomeView',
  components: {
    SubmissionList
  },
  data() {
    return {
      items: [{id:'57657', title: 'This is a test of a long name', rank: 1, votes: 9, link: "https://www.google.com", image: "https://media.geeksforgeeks.org/wp-content/uploads/20200325132558/download311.png", month: 'january' }, {id: '86888', title: 'Bar', rank: 2, votes: 8,  month: 'febuary'}, {id: '4334', title: 'Gary', rank: 3, votes: 7,  month: 'march' },
              {id:'43554', title: 'Foo', rank: 4, votes: 6,  month: 'april' }, {id: '465546', title: 'Bar', rank: 5, votes: 5,  month: 'may' }, {id: '345345', title: 'Gary', rank: 6, votes: 4,  month: 'june' },
              {id:'5464', title: 'Foo', rank: 7, votes: 3,  month: 'july' }, {id: '353', title: 'Bar', rank: 8, votes: 2,  month: 'august' }, {id: '7574', title: 'Gary', rank: 9, votes: 1,  month: 'september' },  {id: '8798', title: 'Gary2', rank: 10, votes: 0,  month: 'october' }]
    }
  }
}
</script>
