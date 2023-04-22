<template>
  <div class="about">
    <h1>This is the form for add new grammar points to the database</h1>
    <!-- form with inputs for title, explanation and example sentence text fields-->
    <form>
      <label for="title">Title</label>
      <input type="text" id="title" name="title" />
      <label for="explanation">Explanation</label>
      <input type="text" id="explanation" name="explanation" />
      <label for="example">Example</label>
      <input type="text" id="example" name="example" />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddGrammarForm",
  props: {},
};
</script>
