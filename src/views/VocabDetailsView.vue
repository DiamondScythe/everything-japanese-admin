<template>
  <div>
    <v-card>
      <v-card-title>
        {{ vocab.title }}
      </v-card-title>
      <v-card-text>
        <a href="#" @click.prevent="deleteLesson(vocab.lessonNumber)">
          [Delete lesson]</a
        >
      </v-card-text>
      <v-card-text>
        <div><strong>Lesson No.</strong> {{ vocab.lessonNumber }}</div>
        <div>
          <strong>Difficulty:</strong>
          <div v-if="!editing.difficulty">
            {{ vocab.difficulty }}
            <a
              href="#"
              @click.prevent="editing.difficulty = !editing.difficulty"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-select
              v-model="vocab.difficulty"
              :items="difficulties"
            ></v-select>
            <v-btn @click="saveField('difficulty', vocab.difficulty)"
              >Save</v-btn
            >
          </div>
        </div>
        <div>
          <strong>Summary:</strong>
          <div v-if="!editing.summary">
            {{ vocab.summary }}
            <a href="#" @click.prevent="editing.summary = !editing.summary"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-textarea v-model="vocab.summary"></v-textarea>
            <v-btn @click="saveField('summary', vocab.summary)">Save</v-btn>
          </div>
        </div>
        <div>
          <strong>Details:</strong>
          <div v-if="!editing.details">
            {{ vocab.details }}
            <a href="#" @click.prevent="editing.details = !editing.details"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-textarea v-model="vocab.details"></v-textarea>
            <v-btn @click="saveField('details', vocab.details)">Save</v-btn>
          </div>
        </div>
        <div>
          <strong>Parts:</strong>
          <ul>
            <li v-for="(part, index) in vocab.parts" :key="part._id">
              <div>
                Part {{ index + 1 }}: {{ part.explanation }}
                <a href="#" @click.prevent="deletePart(part._id)">[Delete]</a>
              </div>
              <ul>
                <li v-for="example in part.examples" :key="example._id">
                  <div>{{ example.example }}</div>
                  <div>{{ example.translation }}</div>
                  <div>
                    {{ example.exampleAudioFileName }}
                    <a
                      href="#"
                      @click.prevent="playAudio(example.exampleAudioFileName)"
                      >[Play audio]</a
                    >
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
    <!-- <AddVocabPartForm :lessonNumber="vocab.lessonNumber" /> -->
    <AddVocabPartForm :lessonNumber="vocab.lessonNumber" />
  </div>
</template>

<script>
import axios from "axios";
import AddVocabPartForm from "@/components/vocab/AddVocabPartForm.vue";

export default {
  name: "VocabDetailsView",

  components: { AddVocabPartForm },

  props: ["id"],

  data() {
    return {
      editing: {
        lessonNumber: false,
        title: false,
        difficulty: false,
        summary: false,
        details: false,
      },
      editedVocab: {
        lessonNumber: null,
        title: null,
        difficulty: null,
        summary: null,
        details: null,
        parts: null,
      },
      difficulties: ["Beginner", "Intermediate", "Advanced"],
      vocab: {},
    };
  },

  mounted() {
    this.getVocab();
  },

  methods: {
    getVocab() {
      axios
        .get("http://localhost:3000/api/oneVocab/" + this.id)
        .then((res) => {
          this.vocab = res.data.vocab;
          this.parts = res.data.vocab.parts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleEditMode(fieldName) {
      this.isEditing[fieldName] = !this.isEditing[fieldName];
      if (!this.isEditing[fieldName]) {
        // compile an updated version of the original vocab object
        const updatedVocab = Object.assign({}, this.vocab);
        updatedVocab[fieldName] = this.editedVocab[fieldName];
        // send the updated vocab to the server to update
        this.$http.put("/api/vocab/" + this.vocab._id, updatedVocab);
      }
    },

    saveField(field, value) {
      this.vocab[field] = value;
      this.updateVocab();
      this.editing[field] = !this.editing[field];
    },

    savePartField(partIndex, field, value) {
      this.vocab.parts[partIndex][field] = value;
      this.updateVocab();
    },

    updateVocab() {
      axios
        .post("http://localhost:3000/updateVocab", {
          lessonNumber: this.vocab.lessonNumber,
          vocab: this.vocab,
        })
        .then((res) => {
          console.log(res.data);
          alert("Vocab updated successfully!");
        })
        .catch((err) => console.log(err));
    },

    deletePart(partId) {
      if (confirm("Are you sure you want to delete this part?")) {
        axios
          .post("http://localhost:3000/deleteVocabPart", {
            lessonNumber: this.vocab.lessonNumber,
            partId: partId,
          })
          .then((res) => {
            console.log(res.data);
            this.refreshPage();
          })
          .catch((err) => console.log(err));
      }
    },

    playAudio(audioFileName) {
      const audio = new Audio("http://localhost:3000/audio/" + audioFileName);
      audio.play();
    },

    deleteLesson(lessonNumber) {
      if (confirm("Are you sure you want to delete this lesson?")) {
        axios
          .post("http://localhost:3000/deleteVocabLesson", {
            lessonNumber: lessonNumber,
          })
          .then((res) => {
            alert("Lesson deleted successfully!");
            //redirect to the vocab page
            this.$router.push({ name: "vocab" });
          })
          .catch((err) => console.log(err));
      }
    },

    refreshPage() {
      window.location.reload();
    },
  },
};
</script>
