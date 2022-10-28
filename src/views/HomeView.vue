<template>
  <div class="home">
    <SubmissionList :items="items" label="Xbox"></SubmissionList>
    <SubmissionList :items="items" label="Playstation"></SubmissionList>
    <SubmissionList :items="items" label="PC"></SubmissionList>
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
      items: [{id:'57657', title: 'Foo' }, {id: '86888', title: 'Bar' }, {id: '4334', title: 'Gary' },
              {id:'43554', title: 'Foo' }, {id: '465546', title: 'Bar' }, {id: '345345', title: 'Gary' },
              {id:'5464', title: 'Foo' }, {id: '353', title: 'Bar' }, {id: '7574', title: 'Gary' }]
    }
  }
}
</script>
