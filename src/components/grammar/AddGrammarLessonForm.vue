<template>
  <v-container>
    <v-card>
      <v-card-title> Add new Grammar Lesson </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="lessonNumber"
            :rules="[
              rules.required,
              (value) =>
                (value && /^\d+$/.test(value)) || 'Input must be a number',
            ]"
            label="Lesson Number (1, 2, 3, ...)"
          ></v-text-field>
          <v-text-field
            v-model="title"
            :rules="[rules.required]"
            label="Title"
          ></v-text-field>
          <v-textarea
            v-model="details"
            :rules="[rules.required]"
            label="Details (optional)"
          ></v-textarea>
          <v-btn :disabled="!valid" color="primary" type="submit"
            >Save Grammar Lesson</v-btn
          >
        </v-form>
      </v-card-text>
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
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
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
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
