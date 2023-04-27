<template>
  <div class="about">
    <AddGrammarLessonForm />
    <br />
    <AddGrammarPartForm />
  </div>
</template>

<script>
import AddGrammarPartForm from "@/components/grammar/AddGrammarPartForm.vue";
import AddGrammarLessonForm from "@/components/grammar/AddGrammarLessonForm.vue";

export default {
  name: "GrammarView",
  components: { AddGrammarPartForm, AddGrammarLessonForm },
};
</script>
