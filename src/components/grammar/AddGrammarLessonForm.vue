<template>
  <v-container>
    <v-card elevation="3" outlined shaped tile height="auto" width="1000px">
      <v-row>
        <v-col sm="12" lg="12">
          <v-btn text @click="show = !show" block tile>
            Add new grammar lesson</v-btn
          >
        </v-col>
      </v-row>
      <v-expand-transition>
        <div v-show="show">
          <v-card>
            <v-card-text>
              <v-form v-model="valid" @submit.prevent="submitForm">
                <v-text-field
                  v-model="lessonNumber"
                  :rules="[
                    rules.required,
                    (value) =>
                      (value && /^\d+$/.test(value)) ||
                      'Input must be a number',
                  ]"
                  label="Lesson Number (1, 2, 3, ...)"
                ></v-text-field>
                <v-text-field
                  v-model="title"
                  :rules="[rules.required]"
                  label="Title"
                ></v-text-field>
                <v-select
                  v-model="selectedDifficulty"
                  :items="difficultyOptions"
                  :rules="[rules.required]"
                  label="Difficulty"
                ></v-select>
                <v-textarea
                  v-model="details"
                  :rules="[rules.required]"
                  label="Details"
                ></v-textarea>
                <v-textarea
                  v-model="summary"
                  :rules="[rules.required]"
                  label="Summary"
                ></v-textarea>
                <v-btn :disabled="!valid" color="primary" type="submit"
                  >Save Grammar Lesson</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "AddGrammarLessonForm",

  data() {
    return {
      lessonNumber: "",
      title: "",
      details: "",
      selectedDifficulty: "",
      difficultyOptions: ["Beginner", "Intermediate", "Advanced"],
      summary: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
      show: false,
    };
  },

  methods: {
    submitForm() {
      console.log(this.title, this.details);
      axios
        .post("http://localhost:3000/oneGrammar", {
          lessonNumber: this.lessonNumber,
          title: this.title,
          details: this.details,
          difficulty: this.selectedDifficulty,
          summary: this.summary,
        })
        .then((response) => {
          console.log(response);
          //clear all fields
          this.lessonNumber = "";
          this.title = "";
          this.details = "";
          this.selectedDifficulty = "";
          this.summary = "";
          //alert user
          alert("Grammar Lesson Added!");
          //refresh page
          this.refreshPage();
        })
        .catch((error) => {
          //alert user
          alert("Error! Grammar Lesson Not Added!");
          console.log(error);
        });
    },
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>
