<template>
  <div class="about">
    <h1>This is the page for managing grammar stuff</h1>
    <AddGrammarLessonForm />
    <br />
    <AddGrammarPartForm />
  </div>
</template>

<script>
import AddGrammarPartForm from "@/components/grammar/AddGrammarPartForm.vue";
import AddGrammarLessonForm from "@/components/grammar/AddGrammarLessonForm.vue";

export default {
  name: "ManageView",
  components: { AddGrammarPartForm, AddGrammarLessonForm },
};
</script>
