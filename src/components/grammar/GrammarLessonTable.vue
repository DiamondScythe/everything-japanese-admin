<template>
  <div>
    <v-card>
      <v-card-title>
        Grammar Lessons
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
        :items="grammar"
        :search="search"
        @click:row="redirectToDetailsPage"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GrammarLessonTable",

  data() {
    return {
      grammar: [],
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
        .get("http://localhost:3000/allGrammar")
        .then((response) => {
          this.grammar = response.data.grammarList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    redirectToDetailsPage(item) {
      this.$router.push({
        name: "GrammarDetails",
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
