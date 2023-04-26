<template>
  <v-container>
    <v-card>
      <v-card-title> Add Vocab Part </v-card-title>
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
                v-model="example.word"
                :rules="[rules.required]"
                label="Word"
              ></v-text-field>
              <v-text-field
                v-model="example.furigana"
                :rules="[rules.required]"
                label="Furigana"
              ></v-text-field>
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
              <v-file-input
                v-model="example.file"
                label="Image"
                accept="image/*"
              ></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="red" @click="removeExample(index)"
                >Remove Example</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-btn text color="primary" @click="addExample">Add Example</v-btn>
          <v-btn :disabled="!valid" color="primary" type="submit"
            >Add Vocab Part</v-btn
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
      lessonNumber: "",
      explanation: "",
      examples: [
        {
          word: "",
          furigana: "",
          example: "",
          translation: "",
          audioFileName: "",
        },
      ],
      rules: {
        required: (value) => !!value || "Required.",
      },
      valid: false,
    };
  },
  name: "AddVocabPartForm",
  props: {},
  methods: {
    addExample() {
      this.examples.push({
        example: "",
        translation: "",
        wordAudioFileName: "",
        exampleAudioFileName: "",
        imageFileName: "",
      });
    },
    removeExample(index) {
      const example = this.examples[index];
      if (example.id) {
        this.examplesToDelete.push(example.id);
      }
      this.examples.splice(index, 1);
      delete example.file;
    },
    submitForm() {
      const part = {
        explanation: this.explanation,
        examples: this.examples,
      };

      console.log(part);
      const formData = new FormData();
      formData.append("lessonNumber", this.lessonNumber);
      formData.append("part", JSON.stringify(part));
      for (let i = 0; i < this.examples.length; i++) {
        const example = this.examples[i];
        if (example.file) {
          formData.append("images[]", example.file);
        }
      }
      axios.post("http://localhost:3000/addVocabPart", formData).then(
        (response) => {
          console.log(response);
          //alert the user
          alert("Vocab Part Added");
        },
        (error) => {
          console.log(error);
          //alert the user
          alert("Error Adding Vocab Part");
        }
      );
    },
  },
};
</script>
