<template>
  <div>
    <v-card>
      <v-card-title>
        {{ grammar.title }}
      </v-card-title>
      <v-card-text>
        <div><strong>Lesson No.</strong> {{ grammar.lessonNumber }}</div>
        <div><strong>Difficulty:</strong> {{ grammar.difficulty }}</div>
        <div><strong>Summary:</strong> {{ grammar.summary }}</div>
        <div><strong>Details:</strong> {{ grammar.details }}</div>
        <div>
          <strong>Parts:</strong>
          <ul>
            <li v-for="part in grammar.parts" :key="part._id">
              {{ part.explanation }}
              <ul>
                <li v-for="example in part.examples" :key="example._id">
                  <div>{{ example.example }}</div>
                  <div>{{ example.translation }}</div>
                  <div>{{ example.exampleAudioFileName }}</div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
    <!-- <AddGrammarPartForm :lessonNumber="grammar.lessonNumber" /> -->
    <AddGrammarPartForm :lessonNumber="grammar.lessonNumber" />
  </div>
</template>

<script>
import axios from "axios";
import AddGrammarPartForm from "@/components/grammar/AddGrammarPartForm.vue";

export default {
  name: "GrammarDetailsView",

  components: { AddGrammarPartForm },

  props: ["id"],

  data() {
    return {
      grammar: [],
    };
  },

  mounted() {
    this.getGrammar();
  },

  methods: {
    getGrammar() {
      axios
        .get("http://localhost:3000/api/oneGrammar/" + this.id)
        .then((res) => {
          this.grammar = res.data.grammar;
          this.parts = res.data.grammar.parts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
