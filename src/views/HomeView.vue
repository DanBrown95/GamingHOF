<template>
  <div class="home">
      <div v-for="items in groupedSubmissions" :key="items" style="height: 350px; margin: 20px 0;">
        <SubmissionList :items="items" :label="items[0].platform" sortBy="rank" subTopDisplayType="rank" subBottomDisplayType="name"></SubmissionList>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SubmissionList from '@/components/submission/Submissions.vue'
import { GetAllSubmissionsIncludingCreator as _submissionRepo_GetAll } from "@/store/submission/repository.js";

export default {
  name: 'HomeView',
  components: {
    SubmissionList
  },
  data() {
    return {
      groupedSubmissions: []
    }
  },
  mounted() {
    this.populateSubmissions();
  },
  methods: {
    async populateSubmissions(){
      var submissions = await _submissionRepo_GetAll();

      const byGroup = fn => [(acc, item) => ((acc[fn(item)] ??= []).push(item), acc), {}];
      var grouped = submissions.reduce(...byGroup(x => x.platform));

      this.groupedSubmissions = grouped;
    }
  }

}
</script>
