<template>
  <div class="about">
    <h1>This is the page for managing stuff</h1>
    <AddGrammarForm />
  </div>
</template>

<script>
import AddGrammarForm from "@/components/AddGrammarForm.vue";
export default {
  name: "ManageView",
  components: { AddGrammarForm },
};
</script>
