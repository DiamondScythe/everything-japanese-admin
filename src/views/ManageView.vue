<template>
  <div class="about">
    <h1>This is the page for managing grammar stuff</h1>
    <AddGrammarLessonForm />
    <br />
    <AddGrammarForm />
  </div>
</template>

<script>
import AddGrammarForm from "@/components/grammar/AddGrammarForm.vue";
import AddGrammarLessonForm from "@/components/grammar/AddGrammarLessonForm.vue";

export default {
  name: "ManageView",
  components: { AddGrammarForm, AddGrammarLessonForm },
};
</script>
