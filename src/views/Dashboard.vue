<template>
  <div>
    <!-- Two columns -->

    <div class="flex mb-4">
      <div class="w-1/5 h-12">
        <Navbar/>
      </div>
      <div class="w-4/5 bg-gray-500 h-12">
      
      </div>
    </div>
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

<style scoped></style>
