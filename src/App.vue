<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="item in items" :key="item.title" :to="item.to" link>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="10" offset-sm="1">
            <v-sheet min-height="70vh" rounded="lg">
              <!--  -->
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    items: [
      { title: "Home", icon: "mdi-home", to: "/home" },
      { title: "Grammar", icon: "mdi-help-box", to: "/grammar" },
      { title: "Vocab", icon: "mdi-help-box", to: "/vocab" },
    ],
  }),
};
</script>
