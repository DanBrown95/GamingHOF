<template>
  <div class="home">
      <div v-for="items in groupedSubmissions" :key="items" style="height: 250px; margin: 20px 0; margin-left: 85px;">
        <SubmissionRow :items="items" :label="items[0].platform" sortBy="votes" subTopDisplayType="rank" subBottomDisplayType="name"></SubmissionRow>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SubmissionRow from '@/components/submission/SubmissionRow.vue'
import { GetAllSubmissionsIncludingCreator as _submissionRepo_GetAll } from "@/store/submission/repository.js";

export default {
  name: 'HomeView',
  components: {
    SubmissionRow
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
