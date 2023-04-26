<template>
  <div class="about">
    <h1>This is the page for managing vocab stuff</h1>
    <AddVocabLessonForm />
    <br />
    <AddVocabPartForm />
  </div>
</template>

<script>
import AddVocabLessonForm from "@/components/vocab/AddVocabLessonForm.vue";
import AddVocabPartForm from "@/components/vocab/AddVocabPartForm.vue";

export default {
  name: "ManageView",
  components: { AddVocabLessonForm, AddVocabPartForm },
};
</script>
