<template>
  <div>
    <v-card>
      <v-card-title>
        Vocab Lessons
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="vocab"
        :search="search"
        @click:row="redirectToDetailsPage"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VocabLessonTable",

  data() {
    return {
      vocab: [],
      show: false,
      search: "",
      headers: [
        {
          text: "Lesson No.",
          align: "start",
          width: "150px",
          value: "lessonNumber",
        },
        { text: "Title", value: "title", sortable: false },
      ],
    };
  },

  mounted() {
    this.getLessons();
  },

  methods: {
    getLessons() {
      axios
        .get("http://localhost:3000/allVocab")
        .then((response) => {
          this.vocab = response.data.vocabList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    redirectToDetailsPage(item) {
      this.$router.push({
        name: "VocabDetails",
        params: { id: item.lessonNumber },
      });
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
