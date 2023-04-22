<template>
  <v-container>
    <v-card>
      <v-card-title> Add Grammar Lesson </v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="title"
            :rules="[rules.required]"
            label="Title"
          ></v-text-field>
          <v-textarea
            v-model="explanation"
            :rules="[rules.required]"
            label="Explanation"
          ></v-textarea>
          <v-card
            v-for="(example, index) in examples"
            :key="index"
            class="my-3"
          >
            <v-card-title> Example {{ index + 1 }} </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="example.example"
                :rules="[rules.required]"
                label="Example"
              ></v-text-field>
              <v-text-field
                v-model="example.translation"
                :rules="[rules.required]"
                label="Translation"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="red" @click="removeExample(index)"
                >Remove Example</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-btn text color="primary" @click="addExample">Add Example</v-btn>
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
  data() {
    return {
      title: "",
      explanation: "",
      examples: [{ example: "", translation: "" }],
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
    };
  },
  name: "AddGrammarForm",
  props: {},
  methods: {
    addExample() {
      this.examples.push({ example: "", translation: "" });
    },
    removeExample(index) {
      this.examples.splice(index, 1);
    },
    submitForm() {
      console.log(this.title, this.explanation, this.examples);
      //post to localhost 8081 with axios
      axios
        .post("http://localhost:8081/oneGrammar", {
          title: this.title,
          explanation: this.explanation,
          examples: this.examples,
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
