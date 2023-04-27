<template>
  <v-container>
    <v-card elevation="3" outlined shaped tile height="auto" width="1000px">
      <v-row>
        <v-col sm="12" lg="12">
          <v-btn text @click="show = !show" block tile>
            Add new grammar part</v-btn
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
                <v-btn text color="primary" @click="addExample"
                  >Add Example</v-btn
                >
                <v-btn :disabled="!valid" color="primary" type="submit"
                  >Add Grammar Part</v-btn
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
  data() {
    return {
      lessonNumber: "",
      explanation: "",
      examples: [{ example: "", translation: "", audioFileName: "" }],
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
      show: false,
    };
  },
  name: "AddGrammarPartForm",
  props: {},
  methods: {
    addExample() {
      this.examples.push({ example: "", translation: "", audioFileName: "" });
    },
    removeExample(index) {
      this.examples.splice(index, 1);
    },
    submitForm() {
      const part = {
        explanation: this.explanation,
        examples: this.examples,
      };
      //post to localhost 3000 with axios
      axios
        .post("http://localhost:3000/addGrammarPart", {
          lessonNumber: this.lessonNumber,
          part: part,
        })
        .then((response) => {
          console.log(response);
          alert("Grammar Part Added");
        })
        .catch((error) => {
          console.log(error);
          alert("Error Adding Grammar Part");
        });
    },
  },
};
</script>
