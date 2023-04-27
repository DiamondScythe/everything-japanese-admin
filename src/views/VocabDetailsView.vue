<template>
  <div>
    <v-card>
      <v-card-title>
        {{ grammar.title }}
      </v-card-title>
      <v-card-text>
        <a href="#" @click.prevent="deleteLesson(grammar.lessonNumber)">
          [Delete lesson]</a
        >
      </v-card-text>
      <v-card-text>
        <div><strong>Lesson No.</strong> {{ grammar.lessonNumber }}</div>
        <div>
          <strong>Difficulty:</strong>
          <div v-if="!editing.difficulty">
            {{ grammar.difficulty }}
            <a
              href="#"
              @click.prevent="editing.difficulty = !editing.difficulty"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-select
              v-model="grammar.difficulty"
              :items="difficulties"
            ></v-select>
            <v-btn @click="saveField('difficulty', grammar.difficulty)"
              >Save</v-btn
            >
          </div>
        </div>
        <div>
          <strong>Summary:</strong>
          <div v-if="!editing.summary">
            {{ grammar.summary }}
            <a href="#" @click.prevent="editing.summary = !editing.summary"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-textarea v-model="grammar.summary"></v-textarea>
            <v-btn @click="saveField('summary', grammar.summary)">Save</v-btn>
          </div>
        </div>
        <div>
          <strong>Details:</strong>
          <div v-if="!editing.details">
            {{ grammar.details }}
            <a href="#" @click.prevent="editing.details = !editing.details"
              >[Edit]</a
            >
          </div>
          <div v-else>
            <v-textarea v-model="grammar.details"></v-textarea>
            <v-btn @click="saveField('details', grammar.details)">Save</v-btn>
          </div>
        </div>
        <div>
          <strong>Parts:</strong>
          <ul>
            <li v-for="(part, index) in grammar.parts" :key="part._id">
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
      editing: {
        lessonNumber: false,
        title: false,
        difficulty: false,
        summary: false,
        details: false,
      },
      editedGrammar: {
        lessonNumber: null,
        title: null,
        difficulty: null,
        summary: null,
        details: null,
        parts: null,
      },
      difficulties: ["Beginner", "Intermediate", "Advanced"],
      grammar: {},
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
    toggleEditMode(fieldName) {
      this.isEditing[fieldName] = !this.isEditing[fieldName];
      if (!this.isEditing[fieldName]) {
        // compile an updated version of the original grammar object
        const updatedGrammar = Object.assign({}, this.grammar);
        updatedGrammar[fieldName] = this.editedGrammar[fieldName];
        // send the updated grammar to the server to update
        this.$http.put("/api/grammar/" + this.grammar._id, updatedGrammar);
      }
    },

    saveField(field, value) {
      this.grammar[field] = value;
      this.updateGrammar();
      this.editing[field] = !this.editing[field];
    },

    savePartField(partIndex, field, value) {
      this.grammar.parts[partIndex][field] = value;
      this.updateGrammar();
    },

    updateGrammar() {
      axios
        .post("http://localhost:3000/updateGrammar", {
          lessonNumber: this.grammar.lessonNumber,
          grammar: this.grammar,
        })
        .then((res) => {
          console.log(res.data);
          alert("Grammar updated successfully!");
        })
        .catch((err) => console.log(err));
    },

    deletePart(partId) {
      if (confirm("Are you sure you want to delete this part?")) {
        axios
          .post("http://localhost:3000/deleteGrammarPart", {
            lessonNumber: this.grammar.lessonNumber,
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
          .post("http://localhost:3000/deleteGrammarLesson", {
            lessonNumber: lessonNumber,
          })
          .then((res) => {
            alert("Lesson deleted successfully!");
            //redirect to the grammar page
            this.$router.push({ name: "grammar" });
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
