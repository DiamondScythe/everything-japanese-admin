<template>
  <div class="about">
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
  data() {
    return {
      show: false,
    };
  },
  components: { AddVocabLessonForm, AddVocabPartForm },
};
</script>
