<template>
  <div class="about">
    <AddVocabLessonForm />
    <VocabLessonTable />
  </div>
</template>

<script>
import AddVocabLessonForm from "@/components/vocab/AddVocabLessonForm.vue";
import VocabLessonTable from "@/components/vocab/VocabLessonTable.vue";

export default {
  name: "ManageView",
  data() {
    return {
      show: false,
    };
  },
  components: { AddVocabLessonForm, VocabLessonTable },
};
</script>
