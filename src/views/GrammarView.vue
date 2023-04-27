<template>
  <div class="about">
    <AddGrammarLessonForm />
    <GrammarLessonTable />
  </div>
</template>

<script>
import AddGrammarLessonForm from "@/components/grammar/AddGrammarLessonForm.vue";
import GrammarLessonTable from "@/components/grammar/GrammarLessonTable.vue";

export default {
  name: "GrammarView",
  components: { AddGrammarLessonForm, GrammarLessonTable },
};
</script>
