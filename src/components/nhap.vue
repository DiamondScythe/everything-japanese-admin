<template>
  <v-container>
    <v-card>
      <v-card-title> Add grammar point </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min(6)]"
            label="Password"
          ></v-text-field>
          <v-btn :disabled="!valid" @click="submitForm">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      skills: [],
      valid: false,
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) =>
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) ||
          "Invalid Email Address.",
        min: (value) => (value && value.length >= 6) || "Min 6 characters.",
      },
    };
  },
  name: "nhap",
  props: {},
  methods: {
    submitForm() {
      console.log(this.name, this.email, this.password);
    },
    methods: {
      addSkill() {
        this.skills.push("");
      },
      submitForm() {
        console.log(this.name, this.email, this.skills);
      },
    },
  },
};
</script>
