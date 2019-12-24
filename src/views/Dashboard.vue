<template>
  <div class="bg-gray-300">
      <Navbar/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import { mapGetters } from "vuex";
import Navbar from "../components/Navbar";


export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  components: {
    Navbar
  }
};
</script>

<style scoped>
  
</style>
